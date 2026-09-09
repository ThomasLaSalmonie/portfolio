/**
 * Renders the static social-card image referenced by app.vue
 * (`useSeoMeta({ ogImage: '/og.png' })`). Run after editing the artwork below:
 *
 *   node scripts/gen-og.mjs
 *
 * Output is committed; this is not part of the build. Runtime OG generation
 * (nuxt-og-image) is disabled in nuxt.config.ts — see the comment there.
 */
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const out = fileURLToPath(new URL('../public/og.png', import.meta.url));

// 1200x630, design-system dark ground + cobalt accent. System sans only — this
// is rasterised by sharp, not the app font stack.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#14151c"/>
  <rect x="80" y="80" width="14" height="46" fill="#6b8cf5"/>
  <text x="112" y="112" fill="#a9b0c0" font-family="sans-serif" font-size="26"
        letter-spacing="4" style="text-transform:uppercase">thomaslasalmonie.me</text>
  <text x="78" y="330" fill="#fbfaf7" font-family="sans-serif" font-size="76" font-weight="700">
    <tspan x="78" dy="0">I build web software,</tspan>
    <tspan x="78" dy="92">end to end.</tspan>
  </text>
  <text x="80" y="556" fill="#a9b0c0" font-family="sans-serif" font-size="24">Thomas La Salmonie</text>
  <text x="1120" y="556" fill="#a9b0c0" font-family="sans-serif" font-size="24" text-anchor="end">Full-stack web engineer &#183; Montr&#233;al</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('wrote', out, '1200x630');
