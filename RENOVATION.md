# Portfolio Renovation

Tracking doc for modernizing this site. Check items off as they land. Keep the
"Decisions" and "Deferred" sections up to date when scope changes.

---

## Target stack

| Layer     | From                                           | To                                                      |
| --------- | ---------------------------------------------- | ------------------------------------------------------- |
| Runtime   | Node 18                                        | Node 22 LTS                                             |
| Framework | Nuxt 3.8                                       | Nuxt 4.x                                                |
| UI        | Vuetify 3                                      | **Tailwind v4 + shadcn-vue** (Vuetify removed entirely) |
| Icons     | `@mdi/font` (full webfont)                     | `@nuxt/icon` / Iconify (tree-shaken)                    |
| Fonts     | none / system                                  | `@nuxt/fonts`, self-hosted                              |
| Content   | TS arrays → Nitro API → `useFetchData` wrapper | Typed data modules in `app/data/`, imported directly    |
| i18n      | dead `eslint-plugin-i18n-json` config          | `@nuxtjs/i18n` v9, **FR + EN**                          |
| Analytics | `nuxt-gtag` (GA4)                              | **removed**                                             |
| Rendering | `nuxi generate` (static)                       | stays fully static / prerendered HTML                   |
| Dark mode | none                                           | `@nuxtjs/color-mode`                                    |
| SEO       | inline `<Head>` per page                       | `@nuxtjs/seo` + `useSeoMeta`                            |
| Deploy    | Semaphore → scp → symlink on droplet           | unchanged for now (see Deferred)                        |
| CI checks | lint commented out                             | lint + typecheck + build gated                          |

---

## Decisions (locked)

1. **Upgrade in place** to Nuxt 4 — no rebuild from scratch.
2. **UI:** Tailwind v4 + shadcn-vue. Remove Vuetify completely (every page/component
   currently depends on it — full component-layer rewrite).
3. **Content:** keep structured entity data as **typed data files** (`app/data/*.ts`),
   imported directly. Keep skill/project/about join logic as pure `utils/` functions
   (relations by key/slug — no content duplication). Field-level locale maps for
   translatable strings (`{ en, fr }` + `t()` helper). **Nuxt Content is deferred to
   the blog only.**
4. **Blog:** stays "Coming soon" for now. Real implementation deferred (see Deferred).
5. **Contact page:** static — email address + social links only. No form, no backend.
   Remove the `Construction` placeholder.
6. **Skills page:** build it for real from the skills data (`db/skills.ts`). Remove the
   `Construction` placeholder; the commented-out markup in `skills.vue` is the starting
   point.
7. **Deploy:** keep Semaphore + scp + droplet symlink flow as-is for now (see Deferred).
8. **Rendering:** fully static — prerender every route to plain HTML. No SSR runtime.
9. **Visual identity:** drafted — see **TLS Design System** artifact
   (https://claude.ai/code/artifact/e56290af-c485-46da-86b1-f147667c7da3).
   - Concept: "engineered, not decorated" — near-monochrome, mono face as structural voice.
   - Accent: **cobalt + graphite** — `oklch(0.50 0.16 255)` light / `oklch(0.74 0.13 255)` dark.
     Used only for links, focus, primary action, active nav.
   - Neutrals: warm off-white paper (light), cool blue-black (dark).
   - Type: **Schibsted Grotesk** (display) + **IBM Plex Sans** (body/UI) + **IBM Plex Mono**
     (labels, dates, tech tags, code).
   - Radii 6/10/14px; two shadows (light only); motion 120/180/280ms, `cubic-bezier(.2,0,0,1)`.
   - Open for owner review: paper warmth, dark ground neutrality, keep/drop home carousel,
     timeline layout, skill % meters. (Listed at the end of the artifact.)
10. **Analytics:** remove entirely — `nuxt-gtag` dep, `gtag` config block, module entry.
11. **i18n:** add French + English via `@nuxtjs/i18n`. Static-friendly routing
    strategy (`prefix_except_default`, default = `en`), prerender all locale routes.

---

## Deferred backlog (revisit later)

- [ ] **Blog / "My Articles"** — implement with Nuxt Content v3 (markdown collection).
      Wire the home "Coming soon" block to it once it exists.
- [ ] **Hosting migration** — move off the droplet to Cloudflare Pages / Vercel /
      Netlify for git-push deploys, PR previews, instant rollback. Delete
      `.semaphore/deployment.yml` when done.
- [ ] **PWA** — `@vite-pwa/nuxt` (optional, low priority).
- [ ] **Component/E2E tests** — Vitest + `@nuxt/test-utils`, a few Playwright smoke
      tests. Nice-to-have once the redesign settles.
- [ ] **Renovate/Dependabot** for staying current.

---

## Phase 0 — Foundation ✅ done (branch `renovation/phase-0`)

- [x] Bump Node to 22 LTS: `.nvmrc` (`22`), `package.json` `engines` (`>=22.0.0`),
      Semaphore `sem-version node 22` + `os_image: ubuntu2204` in both pipelines.
- [x] Nuxt 3.8 → **Nuxt 4.5**. `@nuxt/devtools` dropped (bundled in v4). `nuxt.config.ts`
      trimmed: no `srcDir`, `compatibilityDate` set, static output via `nitro.prerender`
      (`crawlLinks` from `/` — prerenders all 36 routes incl. every `projects/*`).
- [x] Nuxt 4 `app/` layout: `src/` → `app/`; `app/server` → `server/` (repo root);
      `app/public` → `public/`. Server type imports normalised to the `~/` alias.
      `tsconfig.json` → project-references form; `server/tsconfig.json` path fixed.
- [x] ESLint flat config (`eslint.config.mjs` on `@nuxt/eslint`, stylistic off).
      Removed `.eslintrc.cjs`, `.eslintignore`, `@rushstack/eslint-patch`,
      `@vue/eslint-config-*`, `eslint-plugin-{vue,import}`; eslint 8 → 9. Added
      `.prettierignore`; `format` now targets the whole repo.
- [x] Removed `eslint-plugin-i18n-json` + its rules.
- [x] CI: `.semaphore/semaphore.yml` `Verify` pipeline runs `npm ci` → `lint` →
      `typecheck` → `generate`, all gating. `deployment.yml` uses `npm ci` + `npm run generate`.
- [x] Pre-commit hook: `simple-git-hooks` → `lint-staged` (eslint --fix + prettier).
- [x] Housekeeping: `.DS_Store` files deleted (were gitignored). `dist ->` symlink is
      not tracked by git — left as-is. `.nuxt`/`.output` already ignored.

**Deviations / notes:**

- `.npmrc` gained `legacy-peer-deps=true` — npm 10.9.x's arborist crashes
  (`Cannot read properties of null (reading 'edgesOut')`) resolving Nuxt 4's peer graph.
- `nuxt-gtag` **removed now** (pulled forward from Phase 6) — an outdated v2 would not
  build on Nuxt 4 and decision #10 removes it anyway. Phase 6 is therefore also done.
- `consistent-type-imports` lint rule left **off** — it needs type-aware linting; wire it
  up with the strict-TS task in Phase 1. Codebase already follows `import type`.
- `vue-tsc` pinned to `~2.2.12` to match Nuxt's bundled toolchain (3.x throws on the
  `vue-router/volar/sfc-route-blocks` plugin). `nuxt typecheck` prints one harmless
  `[Vue] Load plugin failed` line and exits 0.
- Nuxt 4 turns on `noUncheckedIndexedAccess` by default. Only `app/pages/projects/pong.vue`
  needed hardening (canvas ctx guard + array-access guards); rest of the app was clean.
  `app/utils/useFetchData.ts` got a one-line `?? null` (file is deleted in Phase 1).

## Phase 1 — Architecture cleanup

- [ ] Delete `useFetchData.ts`. Replace usages with direct data imports (static content)
      or native `useAsyncData` where a route param is involved.
- [ ] Move `server/db/{projects,skills,about}.ts` → `app/data/*.ts` as typed modules.
- [ ] Extract join logic into `utils/` pure functions:
      `projectWithSkills(slug)`, `aboutWithRelations()`, etc. (mirrors current API route
      behaviour, minus the HTTP round-trip and the in-place `Array.sort` mutation).
- [ ] Delete `server/api/**` routes (`projects/index`, `projects/[slug]`, `skills/index`,
      `about`) once nothing references them.
- [ ] Fix data typo: `retatedProjects` → `relatedProjects` in the about data.
- [ ] Enable strict TS: `typescript.strict`, `typescript.typeCheck` in `nuxt.config`.
- [ ] Give the standalone demos (`pong`, `solar-system`, `driverjs`) a consistent shell —
      an "Experiments" / "Lab" section or route group.
- [ ] Bug: `index.vue` carousel uses a hardcoded `cdn.vuetifyjs.com/.../docks.jpg` for
      every slide — replace with real per-project imagery (or drop the carousel in the
      redesign).
- [ ] Bug: `about.vue` `watch(() => {}, fetchData, ...)` hack — gone once `useFetchData`
      is removed; verify data still loads.
- [ ] Bug: bare `<li>` without `<ul>`/`<ol>` in `about.vue` and `projects/[slug].vue`.

## Phase 2 — Design system & UI (Tailwind v4 + shadcn-vue)

- [ ] Remove Vuetify: `vuetify`, `vite-plugin-vuetify`, `sass`, `@mdi/font` deps;
      `plugins/vuetify.ts`; the `vite`/`build.transpile` Vuetify config in `nuxt.config`.
- [ ] Install Tailwind v4 (`@tailwindcss/vite` or `@nuxtjs/tailwindcss` v7) + shadcn-vue
      (follow its Nuxt setup guide; reka-ui under the hood).
- [ ] Add `@nuxt/icon`, `@nuxt/fonts`, `@nuxtjs/color-mode`, `@nuxt/image`.
- [ ] **Owner input (decision #9):** lock typography scale, color palette (brand +
      neutrals), radii/spacing tokens, light + dark themes, motion language.
- [ ] Define tokens as CSS variables / Tailwind v4 `@theme`; both light and dark.
- [ ] Rebuild app shell: `app.vue` layout, header (scroll-aware, accessible mobile nav),
      footer. Replace `v-app`/`v-app-bar`/`v-navigation-drawer`/`v-footer`.
- [ ] Rebuild components without Vuetify:
  - [ ] `Header` (replace `useDisplay` with a CSS/JS breakpoint util)
  - [ ] `Footer` (social links — reuse as the contact surface)
  - [ ] `ProjectCard`
  - [ ] `SkillItem`
  - [ ] `ParallaxItem` → modern hero (no `v-parallax`)
  - [ ] `AsyncLoader` → simple loading/error wrapper or Suspense
  - [ ] Delete `Construction.vue`
- [ ] Redesign pages:
  - [ ] **Home** — real hero, featured work grid, short intro, CTA; keep a single
        "Articles — coming soon" teaser wired for later.
  - [ ] **Work** — card grid, hover/focus states, filter by tech/tag, real screenshots.
  - [ ] **Project detail** — layout, tech chips, live/repo links, gallery, prev/next.
  - [ ] **About** — restyle the timeline; add CV download.
  - [ ] **Skills** — build from skills data (decision #6).
  - [ ] **Contact** — static email + social links (decision #5).
- [ ] Motion: View Transitions API page transitions, scroll-reveal, honour
      `prefers-reduced-motion`.
- [ ] Dark mode toggle — system default, persisted.

## Phase 3 — Content & polish

- [ ] Rewrite copy; fix typos (`carreer`, `selftaught`, tighten the TL;DR).
- [ ] Real project write-ups + screenshots; per-project OG images.
- [ ] Image pipeline via `@nuxt/image` — responsive sizes, lazy, AVIF/WebP; move images
      off the ad-hoc `img.thomaslasalmonie.me` host or route them through the optimizer.
- [ ] Full favicon set + web manifest.
- [ ] Sanitize or convert the `v-html`-rendered task strings in About.

## Phase 4 — SEO, accessibility, performance

- [ ] `@nuxtjs/seo`: sitemap, robots, OG image generation, schema.org Person /
      CreativeWork, canonicals.
- [ ] Replace inline `<Html><Head>` blocks with `useSeoMeta` per page.
- [ ] Accessibility pass: contrast, visible focus rings, landmarks, alt text, keyboard
      nav, aria on the mobile nav, fixed list markup.
- [ ] Add Unlighthouse (or Lighthouse CI) with a budget; target 95+ across the board.
- [ ] Security headers via Nitro `routeRules`.

## Phase 5 — i18n (FR + EN)

- [ ] Add `@nuxtjs/i18n` v9. Strategy `prefix_except_default`, default locale `en`,
      `fr` prefixed. Ensure all locale routes are in the prerender list.
- [ ] `i18n/locales/en.json`, `i18n/locales/fr.json` for all UI strings.
- [ ] Add `{ en, fr }` locale maps to translatable fields in `app/data/*.ts`; add a
      `t(field)` / `localize()` helper that reads the active locale.
- [ ] Locale switcher in the header.
- [ ] `hreflang` alternates + localized `<title>`/meta via `@nuxtjs/seo` integration.
- [ ] French translations of project/skill/about copy (owner).

## Phase 6 — Analytics removal ✅ done (in Phase 0)

- [x] Removed `nuxt-gtag` from `package.json`, the module entry, and the `gtag: { id }`
      block in `nuxt.config.ts`.
- [x] No `useGtag`/`gtag` references remain.

---

## Known bugs (fold into the phases above)

- `server/api/projects/index.get.ts`: `results.sort(() => Math.random() - 0.5)` mutates
  the shared module-level `projects` array in place on every request; also a biased
  shuffle. (Resolved by Phase 1 rewrite — use a copy + proper shuffle in the helper.)
- `useFetchData.ts`: `try/catch` around `useFetch` never catches; `hasError` returned but
  never set; manual `fetchData()` call discards SSR hydration payload. (Deleted in Phase 1.)
- `index.vue`: placeholder `docks.jpg` shipped to production for every carousel slide.
- `about.vue`: `watch(() => {}, …)` anti-pattern; stray `eslint-disable no-explicit-any`
  with no `any` under it.
- `about.vue` / `projects/[slug].vue`: `<li>` without a list parent (invalid HTML, a11y).
- `/contact` and `/skills`: non-functional — render the jackhammer `Construction`
  component; `skills.vue` has its real markup commented out.
- CI: lint step commented out; no typecheck or build gate.
