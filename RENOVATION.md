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
   - **Review items resolved (2026-09-08):**
     1. _Paper warmth_ — keep the faint warm bias (`oklch(~0.99 0.004 85)`); do not push warmer.
     2. _Dark ground_ — keep the cool blue-black (hue 265) so cobalt reads as native to the surface.
     3. _Home carousel_ — **dropped**. Static 3-up featured-work grid (no JS, no CLS).
     4. _Timeline_ — single hairline column, one layout at every width. No alternating dots.
     5. _Skill meters_ — **no percentages**. Grouped-by-category list with an optional
        three-tier label **Core / Working / Familiar**. Needs a `Skill.level` tier field
        plus a data pass (Phase 2 sub-task).
     6. _French copy width_ — no change; pressure-test nav/button wrapping during Phase 5
        (plan ~25–35% FR string expansion).
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

## Phase 1 — Architecture cleanup ✅ done (branch `renovation/phase-1`)

- [x] Deleted `app/utils/useFetchData.ts` and `app/components/AsyncLoader.vue`. Pages now
      call the data helpers synchronously in `<script setup>` (data is static — no loading
      or error state). Also removed the stray `~/utils/useFetchData` lines sitting after
      `</style>` in several pages.
- [x] `server/db/{projects,skills,about}.ts` → `app/data/*.ts`, converted from
      `export default` to named exports (`export const projects` / `skills` / `aboutItems`).
- [x] Join logic → `app/utils/portfolio.ts` (pure functions): `getProjects`, `getProject`,
      `getProjectWithSkills`, `getFeaturedProjects` (Fisher–Yates on a **copy** — no source
      mutation), `getSkills`/`getVisibleSkills`/`getSkill`, `resolveSkills`,
      `getAboutTimeline` (resolves `projects` refs + `skills`, drops blank task strings).
- [x] Deleted all `server/api/**` routes; `server/` removed entirely (incl. its tsconfig).
- [x] `retatedProjects` → `relatedProjects` in `app/data/about.ts` **and**
      `app/utils/types/about.types.ts`; `AboutItem.projects` retyped `Project[]` →
      `ProjectRef[]` (`Pick<Project, 'name' | 'slug'>`).
- [x] `typescript.strict: true` set explicitly in `nuxt.config.ts`. `typeCheck` left off
      (CI runs `nuxt typecheck` separately; enabling it pulls vue-tsc into every build).
- [x] Demos moved `app/pages/projects/{pong,solar-system,driverjs}.vue` →
      `app/pages/lab/*`; added `app/pages/lab/index.vue`. `routeRules` redirects the old
      `/projects/*` paths to `/lab/*` (verified: redirect stubs emitted, `/lab/*` prerendered).
- [x] Bug: `index.vue` carousel no longer ships `cdn.vuetifyjs.com/.../docks.jpg` — uses
      `project.banner` (may be empty for now). Featured picks run once via `useState`
      (no SSR/client mismatch). Carousel itself is dropped in the Phase 2 redesign.
- [x] Bug: `about.vue` `watch(() => {}, …)` hack gone with `useFetchData`.
- [x] Bug: bare `<li>` in `about.vue` and `projects/[slug].vue` wrapped in `<ul>`.

**Notes:** `/skills` and `/contact` still render `<Construction />` — the real pages are
Phase 2 work (decisions #5, #6). `AsyncLoader` is gone rather than rebuilt (Phase 2 note
about it is moot — the data is synchronous).

## Phase 2 — Design system & UI (Tailwind v4 + shadcn-vue) ✅ done (branch `renovation/phase-2`)

- [x] Removed Vuetify: `vuetify`, `vite-plugin-vuetify`, `sass`, `@mdi/font` deps;
      `app/plugins/vuetify.ts`; the `vite`/`build.transpile`/`transformAssetUrls` config.
- [x] Tailwind v4 via `@tailwindcss/vite` (`vite.plugins`), single entry
      `app/assets/css/main.css` (`css:` in nuxt.config).
- [x] shadcn-vue via `shadcn-nuxt` (`components.json`, `app/lib/utils.ts` `cn()`,
      `app/components/ui/`). Vendored only what's used: `ui/button` (Button + `buttonVariants`).
      `reka-ui` used directly for the mobile-nav dialog. `class-variance-authority`, `clsx`,
      `tailwind-merge` added.
- [x] Added `@nuxt/icon` (lucide, `serverBundle.collections: ['lucide']` + `@iconify-json/lucide`
      — icons render as inlined CSS-mask spans, no runtime fetch), `@nuxt/fonts`
      (self-hosts Schibsted Grotesk / IBM Plex Sans / IBM Plex Mono at build), `@nuxt/image`
      (`NuxtImg` on project media), `@nuxtjs/color-mode` (`classSuffix: ''`).
- [x] **Owner input (decision #9):** locked — see decision #9.
- [x] Tokens: full light + dark OKLCH sets + `@theme inline` + `@custom-variant dark` +
      base/`@layer components` (`.container-page`, `.eyebrow`, `.chip*`, `.link-accent`,
      focus ring, reduced-motion) in `app/assets/css/main.css`.
- [x] App shell: `app/app.vue` = flex-column `min-h-dvh`; `Header` (sticky, scroll-aware
      border/blur, desktop nav + reka-ui `Dialog` sheet on mobile, `ThemeToggle`); `Footer`
      (border-top, email + social links — doubles as the contact surface).
- [x] Components: `ProjectCard` (link-card, `NuxtImg` media, `StatusBadge`, tech chips + `+N`,
      hover-lift), `SkillItem` (chip, variant by `level`), new `Hero` / `SectionHeading` /
      `StatusBadge` / `ThemeToggle`. Deleted `Construction.vue` and `ParallaxItem.vue`.
- [x] Pages rebuilt: **Home** (hero + TL;DR + featured 3-up + services grid + writing teaser,
      no carousel), **Work** (card grid + client-side tech filter), **Project detail**
      (hero, alternating image blocks, links, stack, prev/next), **About** (single
      hairline-column `<ol>` timeline), **Skills** (category groups + Core/Working/Familiar
      legend, built from `getSkillGroups()`), **Contact** (static email + socials + location),
      **Lab** index + `driverjs` rebuilt as a real demo — a driver.js guided tour that
      spotlights the actual header (`#btn-home`, `#nav-work`, `#theme-toggle`) and two on-page
      sections about the stack / data layer, with the popover themed to the design tokens.
- [x] `Skill` type: `progress` → `level` (`core`/`working`/`familiar`) + `category`
      (`languages`/`frameworks`/`data`/`platforms`/`testing`); `app/data/skills.ts` backfilled;
      `getSkillGroups()` + `SKILL_CATEGORY_*` added to `portfolio.ts`.
- [x] Dark mode toggle — system default, persisted by `@nuxtjs/color-mode`.
- [x] Motion: token durations/easings, hover-lift on cards, `prefers-reduced-motion` collapse.

**Notes / deferred to later phases:**

- View Transitions API page transitions — not wired yet (small; fold into Phase 3 polish).
- Scroll-reveal — skipped by design (design system: "show the page at rest"); revisit only if wanted.
- **CV download** on About — no asset yet; needs a PDF from the owner (Phase 3).
- Skill tiers in `app/data/skills.ts` are a reasonable first pass — **owner should tune**.
- Contact email is `tlasalmonie@gmail.com` (owner's personal address) in `app/utils/contact.ts`.
- Real project screenshots / `shortDescription` copy still missing for most projects (Phase 3);
  `ProjectCard` shows a mono slug placeholder when `banner` is unset.
- `@nuxtjs/i18n` / `@nuxtjs/seo` intentionally **not** added here — Phases 5 / 4.

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
