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

- View Transitions API page transitions — **done in Phase 3** (`experimental.viewTransition`).
- Scroll-reveal — skipped by design (design system: "show the page at rest"); revisit only if wanted.
- **CV download** on About — no asset yet; needs a PDF from the owner (Phase 3).
- Skill tiers in `app/data/skills.ts` are a reasonable first pass — **owner should tune**.
- Contact email is `tlasalmonie@gmail.com` (owner's personal address) in `app/utils/contact.ts`.
- Real project screenshots / `shortDescription` copy still missing for most projects (Phase 3);
  `ProjectCard` shows a mono slug placeholder when `banner` is unset.
- `@nuxtjs/i18n` landed in Phase 5; `@nuxtjs/seo` in Phase 4.

## Phase 3 — Content & polish ✅ code-side done (branch `renovation/phase-3`) — owner content still outstanding

- [x] Typos: `personnal`→`personal`, `assitant`→`assistant`, `Pearheading`→`Spearheading` in
      `app/data/about.ts` (`carreer`/`selftaught` were already fixed in Phase 2; the home
      TL;DR was rewritten in Phase 2).
- [x] `v-html` removed from `about.vue` — the one task carrying an `<a>` ("Le capitaine") is
      now plain text; tasks render as `{{ task }}`. No sanitiser needed. (The blog link for
      "Le capitaine" was dropped — re-add via a structured `AboutItem.links` field if wanted.)
- [x] Every project now has a `shortDescription` — **conservative, first-face-value copy**
      (sector + role, no invented metrics). **Owner: verify wording and expand.**
- [x] Favicon set + manifest: `public/favicon.svg` (cobalt "T" monogram), `favicon-96x96.png`,
      `apple-touch-icon.png` (180), `web-app-manifest-{192,512}.png` (512 also `maskable`),
      `site.webmanifest`; wired in `app/app.vue` via `useHead` + light/dark `theme-color`.
      Regenerate the PNGs with `node scripts/gen-favicons.mjs` after editing the SVG.
- [x] `@nuxt/image`: `format: ['avif','webp']` + `screens` set. Broken/again-unreachable
      banners now fall back to the slug placeholder (`@error` handler in `ProjectCard` +
      `[slug].vue`) instead of a broken `<img>`.
- [~] **Image host** — `img.thomaslasalmonie.me` deliberately left OUT of `image.domains`, so
  those URLs pass through un-optimised (baking them through IPX needs the host reachable
  at every build). Pull the banners in-repo / migrate the host, then add the domain. Tied
  to the deferred hosting migration.
- [x] Route cross-fade via `experimental.viewTransition` — 360ms `--ease-standard` on
      `::view-transition-*(root)`, `animation: none` under `prefers-reduced-motion`.
- [ ] **Owner-blocked, carried forward:** real project write-ups (`project.blocks`), real
      screenshots, per-project OG images (Phase 4 ships one shared static card;
      `nuxt-og-image` is available but disabled), About CV-download PDF.

## Phase 4 — SEO, accessibility, performance ✅ code-side done (branch `renovation/phase-4`)

- [x] `@nuxtjs/seo` v5 added (`site: { url, name, description, defaultLocale }`). Gives:
  - `/sitemap.xml` (prerendered, image entries for banners/profile) + `/robots.txt`
    (indexable, Sitemap line) — both plain static files nginx serves.
  - `<link rel="canonical">`, `og:*`, `twitter:*`, `robots` meta on every page via
    `nuxt-seo-utils` defaults.
  - schema.org `@graph` — `WebSite` + `WebPage` (+ `AboutPage`/`CollectionPage` where
    it applies) + `Person` (`#identity`, `jobTitle`, `sameAs` socials) + `ImageObject`,
    from `schemaOrg.identity` in `nuxt.config.ts`. Project pages attribute the page to
    `#identity` via `useSchemaOrg(defineWebPage(...))`.
- [x] Inline `<Html><Head><Title>` blocks removed from every page; each page sets
      `useSeoMeta({ title, description })`. `app/app.vue` owns the `titleTemplate`
      (`%s — Thomas La Salmonie`, bare name on the home page) and the shared
      `ogImage` / `twitterCard` defaults.
- [~] **OG images** — `nuxt-og-image` runtime generation is **disabled**
  (`ogImage: { enabled: false }`): v6 needs a satori/takumi renderer + build-time
  font resolution, which is real CI surface for little gain here. Instead the site
  ships **one static branded card** `public/og.png` (dark ground + cobalt), built by
  `node scripts/gen-og.mjs` (sharp), referenced from `app.vue`. Per-project OG art
  stays an owner follow-up — revisit `nuxt-og-image` if it's wanted.
- [x] **Accessibility pass:**
  - Skip-to-content link + `<main id="main" tabindex="-1">` in `app.vue`.
  - `sr-only` `<h1>` added to pages that intentionally have no visible heading
    (`about`, `contact`, `lab/pong`, `lab/solar-system`).
  - Project/lab card grids are `<ul><li>` (were bare `<div>` grids); `<nav>`s labelled
    (`Primary` / `Mobile` / `Project pagination`); the work-page tech filter is a
    labelled `role="group"`; `<canvas>` on `lab/pong` has `role="img"` + `aria-label`,
    the score node is a polite live region.
  - `lab/solar-system` no longer renders a nested `<body>` (invalid) — plain `<div>`
    now, with a `prefers-reduced-motion` stop on the orbit animations.
  - Contrast: light-mode `--success` / `--warning` darkened (`0.58→0.52`, `0.66→0.55`
    L) so the status-chip text clears WCAG AA at 0.75rem. Everything else already
    passed (`muted-foreground` 5.7:1, `primary` 5.9:1; all dark-mode pairs ≥6:1).
  - Focus rings (global `:focus-visible`) and reduced-motion handling already in place
    from Phase 2 — unchanged.
- [x] `npm run lighthouse` → `npx unlighthouse` against `http://localhost:3000`
      (run `npm run preview` first). Deliberately **not** wired into CI (would pull
      Chromium into every `npm ci`); it's a local/manual budget check. Target 95+.
- [~] **Security headers** — the deploy is static files behind nginx, so Nitro
  `routeRules` headers would be inert. Instead:
  - `app/app.vue` sets a `<meta http-equiv="Content-Security-Policy">` (locked to
    `'self'` + `img.thomaslasalmonie.me` for banners; `'unsafe-inline'` kept for
    scripts/styles so Nuxt hydration + colour-mode no-flash can't break).
  - `deploy/nginx.conf.example` documents the real response headers (HSTS,
    X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy,
    COOP/CORP, the same CSP with `frame-ancestors`) + caching + static routing.
    **Owner: apply on the droplet (`178.128.238.94`) and keep the CSP in sync with
    `app.vue`.**
- [ ] **Owner-blocked, carried forward:** run `npm run lighthouse` on a deployed/preview
      build and act on the report; apply `deploy/nginx.conf.example`; per-project OG
      images; real project write-ups + screenshots; About CV-download PDF.

## Phase 5 — i18n (FR + EN) ✅ code-side done (branch `renovation/phase-5`)

- [x] `@nuxtjs/i18n` **v10** (v9 in the plan; v10 shipped — `lazy` and
      `bundle.optimizeTranslationDirective` options dropped, otherwise the same).
      `strategy: 'prefix_except_default'`, `defaultLocale: 'en'`, `fr` at `/fr/**`,
      `langDir: 'locales'`, `detectBrowserLanguage` (cookie, `redirectOn: 'root'`).
      `nitro.prerender.routes` seeds `/` and `/fr`; the header switcher + hreflang
      links are crawled → **89 routes prerendered** (was 48), every `/fr/**` page
      included.
- [x] `i18n/locales/en.json` + `fr.json` — all UI chrome (nav, buttons, section
      eyebrows/titles, status badges, skill legend + category labels, filter/empty
      states, SEO titles/descriptions, driver.js tour + prose, 404). FR is a full
      translation, not placeholders.
- [x] Translatable data fields use `LocalizedText` (`string | { en, fr }`, in
      `common.types.ts`) + `loc(value, locale)` (`app/utils/i18n.ts`). Data files
      export `RawProject[]` / `RawAboutItem[]`; `portfolio.ts` read helpers take a
      `locale` and return the resolved (`string`) `Project` / `AboutItem` shape, so
      components stay locale-agnostic. `useLang()` composable narrows the active
      locale to the `Lang` union for those calls.
  - **Translated:** every project `shortDescription`; about `title` / `company` /
    `date` / **all `tasks`**. FR here is a **first pass by the build** — owner
    should review voice/accuracy (it's a CV).
- [x] `LangSwitcher.vue` (`en / fr`, `aria-current` on active, `useSwitchLocalePath`)
      in the header — desktop nav + mobile bar. All in-app `NuxtLink`s go through
      `useLocalePath()`.
- [x] hreflang alternates (both directions, `x-default`), per-locale `<html lang>` /
      `<title>` / `canonical` / `og:locale`, and a multi-file sitemap
      (`sitemap_index.xml` → `/__sitemap__/{en-CA,fr-CA}.xml` with `xhtml:link`
      alternates; `/sitemap.xml` meta-refreshes to the index; `robots.txt` updated).
- [x] `app/error.vue` — branded, localized 404 / error page (was Nuxt's default).
- [ ] **Owner follow-up:** review the machine-drafted FR copy in `app/data/*.ts` and
      the longer marketing strings in `i18n/locales/fr.json` (hero lead, "how I work",
      services, writing). Pressure-test nav/chip wrapping at FR length (decision #9.6).

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
