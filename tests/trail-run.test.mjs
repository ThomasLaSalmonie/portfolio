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
  metrics,
  validateCatalog,
  elevationProfile,
  recordKey,
  improvedBest
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
for (const course of courses) {
  test(`${course.id}: full route is traversable without sprint; finish freezes timing`, () => {
    const p = createRunner(course);
    let held = 0;
    for (let i = 0; i < 120 * 190 && !p.finished; i++) {
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
    const [min, max] = course.duration.split('–').map(Number);
    assert.ok(p.elapsed >= min && p.elapsed <= max, `Time ${p.elapsed} outside ${course.duration}`);
    const time = p.elapsed;
    step(course, p, input, STEP);
    assert.equal(p.elapsed, time);
  });
  test(`${course.id}: all checkpoints are safe respawn locations`, () => {
    for (let checkpoint = 1; checkpoint <= course.checkpoints.length; checkpoint++) {
      const p = createRunner(course);
      p.checkpoint = checkpoint;
      p.grounded = false;
      p.y = ground(course, p.x) + 240;
      step(course, p, input);
      assert.equal(p.x, course.checkpoints[checkpoint - 1]);
      assert.equal(p.falls, 1);
      for (let i = 0; i < 120; i++) step(course, p, input);
      assert.equal(p.grounded, true);
      assert.equal(p.falls, 1);
    }
  });
}

test('catalog rejects duplicate identities and malformed routes', () => {
  validateCatalog(courses);
  assert.throws(() => validateCatalog([course, course]));
  assert.throws(() => validateCatalog([]));
  for (const overrides of [
    {
      points: [
        { x: 0, y: NaN },
        { x: course.finish, y: 0 }
      ]
    },
    { finish: -1 },
    { summit: Infinity },
    {
      gaps: [
        [200, 250],
        [240, 300]
      ]
    },
    { gaps: [[60, 100]] },
    { logs: [1870] },
    { checkpoints: [1840] },
    { sections: [] }
  ])
    assert.throws(() => validateCourse({ ...course, ...overrides }));
});
test('course elevation profiles stay in the preview bounds', () => {
  for (const route of courses) {
    for (const pair of elevationProfile(route).split(' ')) {
      const [x, y] = pair.split(',').map(Number);
      assert.ok(x >= 0 && x <= 300);
      assert.ok(y >= 10 && y <= 60);
    }
  }
  assert.ok(metrics(courses[1]).gain > metrics(course).gain * 3);
  assert.ok(metrics(courses[2]).loss > metrics(courses[2]).gain);
});
test('records are separate by course and version; only better finished runs replace them', () => {
  const saved = new Map();
  saved.set(recordKey(course), 72);
  saved.set(recordKey(courses[1]), 140);
  assert.equal(saved.size, 2);
  assert.equal(saved.get(recordKey({ ...course, version: 2 })), undefined);
  for (const [time, finished] of [
    [75, true],
    [72, true],
    [60, false],
    [NaN, true],
    [-1, true]
  ]) {
    assert.equal(improvedBest(72, time, finished), 72);
  }
  assert.equal(improvedBest(72, 70, true), 70);
  assert.equal(improvedBest(null, 140, true), 140);
  assert.equal(improvedBest(null, 140, false), null);
});
test('invalid stored records are ignored', () => {
  for (const raw of [null, 'broken', '{}', '-1', '0', 'null', '"12"', '1e999'])
    assert.equal(readBest(raw), null);
  assert.equal(readBest('72.34'), 72.34);
});
