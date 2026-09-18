export interface Point {
  x: number;
  y: number;
}
export interface Course {
  id: string;
  version: number;
  duration: string;
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
    distance: Math.round(distance / 10),
    gain: Math.round(gain / 10),
    loss: Math.round(loss / 10)
  };
}
export function validateCourse(course: Course) {
  if (course.points.length < 2 || course.points[0]!.x !== 0) throw new Error('Invalid route');
  for (let i = 1; i < course.points.length; i++) {
    if (course.points[i]!.x <= course.points[i - 1]!.x) throw new Error('Unordered terrain');
  }
  if (course.finish > course.points[course.points.length - 1]!.x) throw new Error('Invalid finish');
  let previous = 70;
  for (const x of course.checkpoints) {
    if (x <= previous || x >= course.finish || surface(course, x) !== ground(course, x))
      throw new Error('Unsafe checkpoint');
    previous = x;
  }
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
