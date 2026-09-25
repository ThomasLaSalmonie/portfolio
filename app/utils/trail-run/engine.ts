export interface Point {
  x: number;
  y: number;
}
export interface Course {
  id: string;
  version: number;
  duration: string;
  theme: 'forest' | 'alpine' | 'sunset';
  difficulty: 'easy' | 'medium';
  sections: { x: number; label: string }[];
  points: Point[];
  gaps: [number, number][];
  logs: number[];
  checkpoints: number[];
  finish: number;
  summit: number;
}
export interface Input {
  direction: number;
  jump: boolean;
  jumpPressed: boolean;
  sprint: boolean;
}
export interface Runner {
  x: number;
  y: number;
  vx: number;
  vy: number;
  grounded: boolean;
  facing: number;
  stamina: number;
  elapsed: number;
  falls: number;
  checkpoint: number;
  grace: number;
  buffer: number;
  respawn: number;
  finished: boolean;
}
export const STEP = 1 / 120;
export const RULES_VERSION = 1;
export const WORLD_UNITS_PER_METER = 10;
export function ground(course: Course, x: number): number {
  const points = course.points;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]!;
    const b = points[i]!;
    if (x <= b.x) return a.y + (b.y - a.y) * Math.max(0, (x - a.x) / (b.x - a.x));
  }
  return points[points.length - 1]!.y;
}
export function surface(course: Course, x: number): number | null {
  if (course.gaps.some(([a, b]) => x > a && x < b)) return null;
  const y = ground(course, x);
  return course.logs.some((log) => Math.abs(log - x) < 13) ? y - 18 : y;
}
export function createRunner(course: Course): Runner {
  return {
    x: 70,
    y: ground(course, 70),
    vx: 0,
    vy: 0,
    grounded: true,
    facing: 1,
    stamina: 100,
    elapsed: 0,
    falls: 0,
    checkpoint: 0,
    grace: 0.1,
    buffer: 0,
    respawn: 0,
    finished: false
  };
}
export function step(course: Course, p: Runner, input: Input, dt = STEP) {
  if (p.finished) return;
  p.elapsed += dt;
  if (p.respawn > 0) {
    p.respawn = Math.max(0, p.respawn - dt);
    return;
  }
  p.buffer = input.jumpPressed ? 0.12 : Math.max(0, p.buffer - dt);
  p.grace = p.grounded ? 0.1 : Math.max(0, p.grace - dt);
  const sprint = input.sprint && input.direction !== 0 && p.stamina > 1;
  p.stamina = Math.max(0, Math.min(100, p.stamina + (sprint ? -23 : 17) * dt));
  const target = input.direction * (sprint ? 225 : 155);
  p.vx += Math.max(-1100 * dt, Math.min(1100 * dt, target - p.vx));
  if (input.direction) p.facing = input.direction;
  if (p.buffer > 0 && p.grace > 0) {
    p.vy = -345;
    p.grounded = false;
    p.grace = 0;
    p.buffer = 0;
  }
  if (!input.jump && p.vy < -140) p.vy = -140;
  const oldX = p.x;
  const oldY = p.y;
  p.x = Math.max(12, Math.min(course.finish + 30, p.x + p.vx * dt));
  const floor = surface(course, p.x);
  // Small slopes are walkable; vertical log faces require a jump.
  if (floor !== null && floor < oldY - 5 && p.vy >= 0 && oldY > floor + 3) {
    p.x = oldX;
    p.vx = 0;
  }
  const landing = surface(course, p.x);
  if (p.grounded && landing !== null && Math.abs(landing - oldY) <= 5) {
    p.y = landing;
    p.vy = 0;
  } else {
    p.grounded = false;
    p.vy += 1000 * dt;
    p.y += p.vy * dt;
    if (landing !== null && p.vy >= 0 && oldY <= landing + 3 && p.y >= landing) {
      p.y = landing;
      p.vy = 0;
      p.grounded = true;
    }
  }
  const next = course.checkpoints[p.checkpoint];
  if (next !== undefined && p.x >= next && p.grounded) p.checkpoint++;
  if (p.y > ground(course, p.x) + 230) {
    p.falls++;
    p.x = course.checkpoints[p.checkpoint - 1] ?? 70;
    p.y = ground(course, p.x);
    p.vx = 0;
    p.vy = 0;
    p.stamina = 100;
    p.grounded = true;
    p.grace = 0;
    p.buffer = 0;
    p.respawn = 0.45;
  }
  if (p.x >= course.finish && p.grounded && p.checkpoint === course.checkpoints.length)
    p.finished = true;
}
export function metrics(course: Course) {
  let distance = 0;
  let gain = 0;
  let loss = 0;
  for (let i = 1; i < course.points.length; i++) {
    const a = course.points[i - 1]!;
    const b = course.points[i]!;
    distance += Math.hypot(b.x - a.x, b.y - a.y);
    gain += Math.max(0, a.y - b.y);
    loss += Math.max(0, b.y - a.y);
  }
  return {
    distance: Math.round(distance / WORLD_UNITS_PER_METER),
    gain: Math.round(gain / WORLD_UNITS_PER_METER),
    loss: Math.round(loss / WORLD_UNITS_PER_METER)
  };
}
export function validateCourse(course: Course) {
  const finite = (value: number) => Number.isFinite(value);
  if (!course.id || !Number.isInteger(course.version) || course.version < 1)
    throw new Error('Invalid identity');
  if (course.points.length < 2 || course.points[0]!.x !== 0) throw new Error('Invalid route');
  for (let i = 0; i < course.points.length; i++) {
    const point = course.points[i]!;
    if (!finite(point.x) || !finite(point.y) || (i > 0 && point.x <= course.points[i - 1]!.x))
      throw new Error('Unordered terrain');
  }
  if (!finite(course.finish) || course.finish < 200 || course.finish !== course.points.at(-1)!.x)
    throw new Error('Invalid finish');
  if (!finite(course.summit) || course.summit < 0 || course.summit > course.finish)
    throw new Error('Invalid summit');
  let end = 100;
  for (const [a, b] of course.gaps) {
    if (!finite(a) || !finite(b) || a <= end || b <= a || b >= course.finish - 100)
      throw new Error('Invalid gap');
    end = b;
  }
  let logEnd = 100;
  for (const x of course.logs) {
    if (
      !finite(x) ||
      x <= logEnd ||
      x >= course.finish - 100 ||
      course.gaps.some(([a, b]) => x + 30 > a && x - 30 < b)
    )
      throw new Error('Invalid obstacle');
    logEnd = x + 26;
  }
  let previous = 70;
  for (const x of course.checkpoints) {
    if (
      !finite(x) ||
      x <= previous ||
      x >= course.finish ||
      [-20, 0, 20].some((offset) => surface(course, x + offset) !== ground(course, x + offset))
    )
      throw new Error('Unsafe checkpoint');
    previous = x;
  }
  if (!course.sections.length || course.sections[0]!.x !== 0) throw new Error('Missing sections');
  previous = -1;
  for (const section of course.sections) {
    if (!finite(section.x) || section.x <= previous || section.x >= course.finish || !section.label)
      throw new Error('Invalid section');
    previous = section.x;
  }
}
export function validateCatalog(courses: Course[]) {
  if (!courses.length || new Set(courses.map((course) => course.id)).size !== courses.length)
    throw new Error('Duplicate or missing courses');
  courses.forEach(validateCourse);
}
export function elevationProfile(course: Course) {
  const heights = course.points.map((point) => point.y);
  const min = Math.min(...heights);
  const range = Math.max(1, Math.max(...heights) - min);
  return course.points
    .map((point) => `${(point.x / course.finish) * 300},${10 + ((point.y - min) / range) * 50}`)
    .join(' ');
}
export function improvedBest(previous: number | null, elapsed: number, finished: boolean) {
  if (!finished || !Number.isFinite(elapsed) || elapsed <= 0) return previous;
  return previous === null || elapsed < previous ? elapsed : previous;
}
export function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toFixed(2).padStart(5, '0')}`;
}
export function recordKey(course: Course) {
  return `trail-run:${RULES_VERSION}:${course.id}:${course.version}`;
}
export function readBest(raw: string | null): number | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}
