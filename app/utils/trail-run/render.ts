import { ground, surface } from './engine';
import type { Course, Runner } from './engine';

export const WIDTH = 768;
export const HEIGHT = 432;
export function render(ctx: CanvasRenderingContext2D, course: Course, p: Runner, reduced: boolean) {
  const camera = Math.max(0, Math.min(course.finish - WIDTH + 100, p.x - 230));
  const cy = ground(course, p.x) - 295;
  ctx.imageSmoothingEnabled = false;
  const rect = (x: number, y: number, w: number, h: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), w, h);
  };
  rect(0, 0, WIDTH, HEIGHT, '#c6ded9');
  rect(590, 47, 36, 36, '#f6e7b7');
  for (let layer = 0; layer < 3; layer++) {
    const shift = reduced ? 0 : camera * (0.035 + layer * 0.035);
    ctx.fillStyle = ['#a9c6c1', '#83a9a5', '#5d8986'][layer]!;
    ctx.beginPath();
    ctx.moveTo(-200, HEIGHT);
    for (let x = -200; x <= WIDTH + 220; x += 8) {
      const wx = x + shift;
      const y = 165 + layer * 39 - Math.abs(Math.sin(wx / (175 - layer * 25))) * (85 - layer * 15);
      ctx.lineTo(x, Math.round(y / 4) * 4);
    }
    ctx.lineTo(WIDTH + 220, HEIGHT);
    ctx.fill();
  }
  // Deterministic scenery is authored in code; it never affects collision.
  for (let wx = Math.floor((camera - 100) / 115) * 115; wx < camera + WIDTH + 100; wx += 115) {
    const x = wx - camera;
    const y = ground(course, wx) - cy;
    const high = wx > 4800 && wx < 7000;
    if (high) continue;
    const size = 45 + Math.abs(Math.sin(wx)) * 40;
    rect(x - 3, y - size, 6, size, '#42665e');
    for (let tier = 0; tier < 4; tier++) {
      const w = 16 + tier * 13;
      rect(x - w / 2, y - size - 20 + tier * 18, w, 23, wx % 230 === 0 ? '#315e55' : '#497467');
    }
  }
  for (let x = 0; x < WIDTH; x += 4) {
    const wx = camera + x;
    const floor = surface(course, wx);
    if (floor === null) {
      const y = ground(course, wx) - cy + 38;
      rect(x, y, 4, HEIGHT - y, '#6da8b6');
      rect(x, y, 4, 4, '#b0dad8');
      continue;
    }
    const y = ground(course, wx) - cy;
    rect(x, y, 4, Math.max(0, HEIGHT - y), '#716451');
    rect(x, y, 4, 7, '#b9ae7c');
    rect(x, y + 7, 4, 5, '#8c875d');
    for (let d = 24; d < HEIGHT - y; d += 27) {
      if (Math.floor(wx / 4 + d) % 7 === 0) rect(x, y + d, 4, 3, '#95816a');
    }
  }
  for (const wx of course.logs) {
    const x = wx - camera;
    const y = ground(course, wx) - cy;
    rect(x - 13, y - 18, 26, 18, '#624c3c');
    rect(x - 10, y - 15, 20, 4, '#a5845b');
    rect(x + 7, y - 14, 4, 11, '#c6a77a');
  }
  for (const [index, wx] of course.checkpoints.entries()) {
    const x = wx - camera;
    const y = ground(course, wx) - cy;
    rect(x, y - 62, 3, 62, '#eff1da');
    rect(x + 3, y - 62, 24, 16, p.checkpoint > index ? '#e6bd60' : '#367baf');
    rect(x + 6, y - 59, 4, 4, '#f5f1d9');
  }
  const finishX = course.finish - camera;
  const finishY = ground(course, course.finish) - cy;
  rect(finishX, finishY - 88, 4, 88, '#f2eed8');
  rect(finishX + 58, finishY - 88, 4, 88, '#f2eed8');
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 3; j++)
      rect(finishX + i * 8, finishY - 88 + j * 8, 8, 8, (i + j) % 2 ? '#31574f' : '#f2eed8');
  const x = Math.round(p.x - camera);
  const y = Math.round(p.y - cy);
  if (p.respawn > 0 && Math.floor(p.respawn * 15) % 2 === 0) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(p.facing, 1);
  const stride = p.grounded && Math.abs(p.vx) > 10 ? Math.sin(p.elapsed * 19) * 5 : 0;
  rect(-6, -15, 5, 10 + stride, '#263d48');
  rect(2, -15, 5, 10 - stride, '#263d48');
  rect(-7, -5 + stride, 7, 4, '#e8dab9');
  rect(2, -5 - stride, 8, 4, '#e8dab9');
  rect(-7, -30, 14, 16, '#317dc1');
  rect(-10, -29, 5, 13, '#233e52');
  rect(4, -27, 5, 12, '#d69f7a');
  rect(-4, -40, 11, 10, '#dfb08b');
  rect(-5, -43, 13, 5, '#246499');
  rect(6, -40, 6, 3, '#246499');
  rect(5, -36, 2, 2, '#283e43');
  rect(-3, -28, 3, 13, '#91c6d6');
  if (!reduced && p.grounded && Math.abs(p.vx) > 100) {
    rect(-18 - (Math.floor(p.elapsed * 12) % 7), -4, 4, 3, '#d2c597');
  }
  ctx.restore();
}
