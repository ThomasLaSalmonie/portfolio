/**
 * Rasterises public/favicon.svg into the PNG sizes referenced by the app head
 * and the web manifest. Run after editing the SVG:
 *
 *   node scripts/gen-favicons.mjs
 *
 * Outputs are committed; this is not part of the build.
 */
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../public/', import.meta.url));
const svg = await readFile(new URL('../public/favicon.svg', import.meta.url));

const targets = [
  { file: 'favicon-96x96.png', size: 96 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'web-app-manifest-192x192.png', size: 192 },
  { file: 'web-app-manifest-512x512.png', size: 512 }
];

for (const { file, size } of targets) {
  await sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(root + file);
  console.log('wrote', file, `${size}x${size}`);
}
