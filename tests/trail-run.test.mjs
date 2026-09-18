import test from 'node:test';
import assert from 'node:assert/strict';
import { courses } from '../app/data/trail-run/courses.ts';
import {
  createRunner,
  step,
  STEP,
  ground,
  validateCourse,
  readBest,
  metrics
} from '../app/utils/trail-run/engine.ts';
const course = courses[0];
const input = { direction: 0, jump: false, jumpPressed: false, sprint: false };

test('course metadata and spawn geometry are valid', () => {
  validateCourse(course);
  assert.ok(metrics(course).gain > 0);
  assert.throws(() => validateCourse({ ...course, checkpoints: [1860] }));
});
test('holding jump produces a higher arc than tapping', () => {
  const heights = [false, true].map((hold) => {
    const p = createRunner(course);
    let highest = p.y;
    for (let i = 0; i < 100; i++) {
      step(course, p, { ...input, jump: hold || i === 0, jumpPressed: i === 0 });
      highest = Math.min(highest, p.y);
    }
    assert.equal(p.grounded, true);
    return highest;
  });
  assert.ok(heights[1] < heights[0] - 20);
});
test('fixed-step simulation is independent of render frequency', () => {
  const runs = [30, 60, 120].map((hz) => {
    const p = createRunner(course);
    for (let frame = 0; frame < hz * 2; frame++) {
      for (let tick = 0; tick < 120 / hz; tick++) step(course, p, { ...input, direction: 1 });
    }
    return p;
  });
  assert.deepEqual(runs[0], runs[1]);
  assert.deepEqual(runs[1], runs[2]);
});
test('fall respawns safely and retains elapsed time', () => {
  const p = createRunner(course);
  p.checkpoint = 1;
  p.x = 3330;
  p.y = ground(course, p.x) + 240;
  p.grounded = false;
  p.elapsed = 12;
  step(course, p, input);
  assert.equal(p.x, 2900);
  assert.equal(p.falls, 1);
  assert.ok(p.elapsed > 12);
  assert.equal(p.stamina, 100);
});
test('full course is traversable without sprint and finish freezes timing', () => {
  const p = createRunner(course);
  let held = 0;
  for (let i = 0; i < 120 * 110 && !p.finished; i++) {
    const obstacle =
      course.logs.find((x) => x > p.x && x - p.x < 48) ??
      course.gaps.map(([x]) => x).find((x) => x > p.x && x - p.x < 22);
    const jumpPressed = p.grounded && obstacle !== undefined && held === 0;
    if (jumpPressed) held = 75;
    step(course, p, { ...input, direction: 1, jump: held > 0, jumpPressed });
    held = Math.max(0, held - 1);
  }
  assert.equal(p.finished, true, JSON.stringify(p));
  assert.equal(p.falls, 0);
  assert.ok(p.elapsed > 60 && p.elapsed < 90);
  const time = p.elapsed;
  step(course, p, input, STEP);
  assert.equal(p.elapsed, time);
});
test('invalid stored records are ignored', () => {
  for (const raw of [null, 'broken', '{}', '-1', '0', 'null', '"12"', '1e999'])
    assert.equal(readBest(raw), null);
  assert.equal(readBest('72.34'), 72.34);
});
