# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio site for Thomas La Salmonie. Nuxt 4 + Vue 3, Tailwind v4 + shadcn-vue, TypeScript. Deployed as a fully static site.

> **Renovation complete.** This site was modernized Nuxt 3.8 + Vuetify → Nuxt 4 + Tailwind v4 + shadcn-vue: typed data modules, fully static, dark mode, `@nuxtjs/seo`, an a11y pass, and FR + EN i18n. Rationale (locked decisions), the deferred backlog, and the remaining owner/ops items live in [`RENOVATION.md`](./RENOVATION.md); the visual spec is [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) (transcribed from the "TLS Design System" artifact). What's left is owner-blocked content (real project write-ups + screenshots, per-project OG images, CV PDF; review the machine-drafted FR copy) and ops (apply `deploy/nginx.conf.example`, run `npm run lighthouse`).

## Commands

```bash
npm run dev        # dev server on http://localhost:3000
npm run generate   # static build -> .output/public (this is what gets deployed)
npm run build      # SSR build (not used for deploy)
npm run preview    # preview a production build locally
npm run lint       # eslint .            (lint:fix to autofix)
npm run typecheck  # nuxt typecheck (vue-tsc)
npm run format     # prettier --write .
npm run lighthouse # npx unlighthouse vs http://localhost:3000 (run `npm run preview` first) — manual, not in CI
```

- Node 22 (`.nvmrc`). `.npmrc` sets `shamefully-hoist=true` **and `legacy-peer-deps=true`** — the latter works around an npm 10.9.x arborist crash on Nuxt 4's peer graph. Install with npm, not pnpm.
- `nuxt typecheck` prints one harmless `[Vue] Load plugin failed: vue-router/volar/sfc-route-blocks` line and still exits 0 (`vue-tsc` pinned `~2.2.12` to match Nuxt's bundled toolchain).
- There is **no test suite**.
- A `pre-commit` hook (`simple-git-hooks` → `lint-staged`) runs eslint + prettier on staged files.
- CI (Semaphore, `.semaphore/`): the `Verify` pipeline runs `npm ci` then `lint`, `typecheck`, `generate` — all three gate the build. On success it promotes to `deployment.yml`, which `generate`s and `scp`s `.output/public` to the droplet, then repoints a `current` symlink. Deploy is push-triggered, not run locally.

## Architecture

Nuxt 4 default layout: app code in **`app/`** (`app/pages`, `app/components`, `app/components/ui` for shadcn-vue primitives, `app/utils`, `app/data`, `app/lib`, `app/assets/css`, `app/app.vue`), static assets in **`public/`**. No `srcDir` override, **no `server/` dir**, **no `app/plugins/`** — the site is fully static with no runtime API.

### Data flow

There is no database and no API. Portfolio content is typed TS arrays in **`app/data/`** (`projects.ts`, `skills.ts`, `about.ts`), each a named export (`export const projects` / `skills` / `aboutItems`).

**`app/utils/portfolio.ts`** holds pure read/join helpers over that data — this is what pages call:

- `getProjects(locale)`, `getProject(slug, locale)`, `getProjectWithSkills(slug, locale)` (attaches `skills` resolved from `technologiesUsed` by matching skill `key`).
- `getFeaturedProjectSlugs(limit)` — random pick, Fisher–Yates on a **copy** (never mutates the source); returns slugs so the page can re-resolve copy on a locale switch.
- `getSkills()` / `getVisibleSkills()` / `getSkill(key)` / `resolveSkills(keys)` — no locale (skills carry no translatable fields).
- `getSkillGroups()` — visible skills bucketed by `category` (`SKILL_CATEGORY_ORDER`), each group sorted `core → working → familiar`. Drives the Skills page; category **labels come from i18n** (`skills.categories.*`).
- `getAboutTimeline(locale)` — each `AboutItem` with `projects` (resolved from `relatedProjects` slugs to `ProjectRef` = `{name, slug}`) and `skills` resolved; blank task strings dropped.

**i18n data:** `app/data/*.ts` export the **`Raw*`** shapes (`RawProject`, `RawAboutItem`) where translatable fields are `LocalizedText` (`string | { en, fr }`, from `common.types.ts`). `portfolio.ts` helpers take the active `locale` and return the resolved (`string`) `Project` / `AboutItem` shape via `loc()` (`app/utils/i18n.ts`), so components stay locale-agnostic. In a page: `const lang = useLang()` (narrows i18n's `locale` to the `Lang` union) then `computed(() => getProjects(lang.value))`.

`Skill` proficiency is a tier — `level: 'core' | 'working' | 'familiar'` — plus a `category`; there is no numeric percentage (see RENOVATION.md decision #9). Contact details (email, socials, location) live in `app/utils/contact.ts`.

To add or edit content: edit the `app/data/*.ts` file and the matching type in `app/utils/types/*.types.ts`. Relations are by `key` / `slug` — no duplication. New user-facing strings go in `i18n/locales/{en,fr}.json`, not hardcoded.

### Page data pattern

Data is synchronous, so pages just call a helper at the top of `<script setup>` — no `useFetch`, no loading/error state, no wrapper component (the old `useFetchData` composable and `AsyncLoader` are gone). Because the helpers are locale-aware, pages wrap them in `computed(() => getX(lang.value))`. `index.vue` keeps the random pick stable across SSR/hydration by storing **slugs** in `useState('home:featured', …)` and resolving them in a computed. `projects/[slug].vue` uses `computed(() => getProjectWithSkills(route.params.slug, lang.value))` for reactive in-app nav, plus a server-only `createError(404)` guard for unknown slugs at prerender.

### Pages

- Top-level routes: `app/pages/{index,work,skills,about,contact}.vue` — all real pages built from the data (no placeholders).
- `app/pages/projects/[slug].vue` — data-driven project detail from `project.blocks`, links, skills, plus prev/next.
- `app/pages/lab/` — `index.vue` plus the standalone hand-built demos `{pong,solar-system,driverjs}.vue` (not data-driven). Old `/projects/{pong,…}` URLs redirect here via `routeRules` in `nuxt.config.ts`.

### App shell & UI

- `app/app.vue` is a flex-column `min-h-dvh` wrapper: `<Header />`, `<main class="container-page …">`, `<Footer />`. No `<v-app>`.
- **Tailwind v4** via `@tailwindcss/vite` (`vite.plugins` in nuxt.config); the single stylesheet is **`app/assets/css/main.css`** (`css:` in nuxt.config) — it holds the OKLCH token contract (`:root` + `.dark`), `@theme inline`, `@custom-variant dark`, base layer, and `@layer components` helpers (`.container-page`, `.eyebrow`, `.chip` / `.chip--soft|--solid|--play|--pause|--stop`, `.link-accent`).
- **shadcn-vue** via `shadcn-nuxt` (`components.json`, `cn()` in `app/lib/utils.ts`). Primitives live in `app/components/ui/`, unprefixed — currently only `ui/button` (`<Button>` + `buttonVariants`; supports `as-child` to style a `NuxtLink`). Add more with the shadcn-vue CLI or by hand. `reka-ui` is used directly for the mobile-nav dialog in `Header.vue`.
- **Icons:** `@nuxt/icon` with the `lucide` collection (`<Icon name="lucide:x" />`). `icon.serverBundle.collections: ['lucide']` + `@iconify-json/lucide` → icons are inlined as CSS-mask spans at prerender, no runtime fetch.
- **Fonts:** `@nuxt/fonts` self-hosts Schibsted Grotesk (display), IBM Plex Sans (body/UI), IBM Plex Mono (labels/dates/tags/code) at build. Exposed as `--font-display` / `--font-sans` / `--font-mono` and the `font-display|sans|mono` utilities.
- **Dark mode:** `@nuxtjs/color-mode` (`classSuffix: ''` → bare `.dark` on `<html>`, system default, persisted). `ThemeToggle.vue` flips `colorMode.preference` and renders a single `<Icon>` (sun/moon by `colorMode.value`) inside `<ClientOnly>` with a sun fallback, so there's no SSR mismatch.
- **Images:** `@nuxt/image` — `<NuxtImg>` on project media (`ProjectCard`, `[slug].vue`), with an `@error` fallback to the slug placeholder. `img.thomaslasalmonie.me` is **not** in `image.domains` on purpose — those remote banners pass through un-optimised until the host is migrated / images are pulled in-repo.
- **i18n:** `@nuxtjs/i18n` v10, `strategy: 'prefix_except_default'` — `/` is English, `/fr/**` is French, both fully prerendered. UI strings in `i18n/locales/{en,fr}.json` (`useI18n().t('…')`); data strings via `LocalizedText` + `loc()` (see Data flow). `<html lang>` / hreflang / `og:locale` / per-locale sitemap come from the module — `app.vue` calls `useHead(useLocaleHead())`. In-app links use `useLocalePath()`; `LangSwitcher.vue` (header) uses `useSwitchLocalePath()`. `app/error.vue` is the branded, localized 404. Add new copy to the JSON files, never hardcode.
- **Head / favicons:** `app/app.vue` sets the `titleTemplate` (`%s — Thomas La Salmonie`, bare for the home title / site name), the favicon set (`favicon.svg` + `.ico` + `-96x96.png` + `apple-touch-icon.png`), `site.webmanifest`, light/dark `theme-color`, and a `<meta http-equiv>` **CSP** via `useHead`. Regenerate the PNGs from `public/favicon.svg` with `node scripts/gen-favicons.mjs` (not part of the build).
- **SEO:** `@nuxtjs/seo` v5 + `site: { url, name, description, defaultLocale }` in nuxt.config. It emits `/robots.txt` + a multi-file sitemap (`sitemap_index.xml` → `/__sitemap__/{en-CA,fr-CA}.xml` with `xhtml:link` alternates; `/sitemap.xml` meta-refreshes to the index), per-page `canonical` / `og:*` / `twitter:*` / `robots` meta, and a schema.org `@graph` (`WebSite` + `WebPage` + `Person` `#identity` from `schemaOrg.identity` + `ImageObject`). Pages set `useSeoMeta({ title, description })` in `<script setup>` with `t('…')` values (no more inline `<Html><Head>`); `app.vue` owns `titleTemplate` and the shared `ogImage` (`/og.png`) + `twitterCard` defaults. `projects/[slug].vue` adds `useSchemaOrg(defineWebPage(...))` to attribute the page to `#identity`.
- **OG image:** `nuxt-og-image` runtime generation is **disabled** (`ogImage: { enabled: false }` — v6 needs a satori/takumi renderer + build-time fonts, not worth the CI surface). One shared static card `public/og.png` (built by `node scripts/gen-og.mjs`, sharp) is referenced from `app.vue`. Per-project cards are an owner follow-up.
- **Security headers:** static deploy behind nginx, so Nitro `routeRules` headers are inert — real headers live in `deploy/nginx.conf.example` (apply on the droplet; keep its CSP in sync with `app.vue`'s `<meta>` CSP).
- **Route transitions:** `experimental.viewTransition` — a 360ms cross-fade (`::view-transition-*(root)` in `main.css`), disabled under `prefers-reduced-motion`.
- **A11y:** skip link + `<main id="main">` in `app.vue`; `sr-only` `<h1>` on pages with no visible heading (`about`, `contact`, `lab/pong`, `lab/solar-system`); card grids are `<ul><li>`; `<nav>`s and the work-page filter `role="group"` are labelled (labels translated). Light `--success`/`--warning` are tuned for WCAG AA on the status chips.
- Shared building blocks: `Hero`, `SectionHeading` (mono eyebrow + rule + `h2`), `ProjectCard`, `SkillItem` (chip, variant by `level`), `StatusBadge` (`play→Shipped` / `pause→Paused` / `stop→Archived`).
- Static output is configured via `nitro.prerender` (`crawlLinks: true` from `/`), so every linked route — including all `projects/*` detail pages — is prerendered to HTML.

## Conventions enforced by lint/format

- ESLint is flat config (`eslint.config.mjs`) built on `@nuxt/eslint`; stylistic rules are off (Prettier owns formatting).
- `@typescript-eslint/no-explicit-any` is an **error** — use the helper types in `app/utils/types/common.types.ts` (`Nullable`, `Maybe`, etc.). The codebase uses `import type` for type-only imports by convention; the `consistent-type-imports` rule is off (needs type-aware linting — not yet wired up).
- Import path alias is `~/` → `app/` (`~~/` → repo root).
- Vue SFC block order is `<script>` then `<template>` then `<style>`; template component refs are PascalCase; `prefer-const` and `no-unneeded-ternary` are errors; `vue/multi-word-component-names`, `vue/no-v-html`, `vue/require-default-prop`, `vue/no-multiple-template-root` and `vue/html-self-closing` are off.
- No SASS — styling is Tailwind utilities + the token helpers in `main.css`. Component `<style scoped>` blocks are plain CSS and rare (e.g. the nav underline in `Header.vue`).
- Prettier (`.prettierrc.json`): single quotes, semicolons, `printWidth` 100, no trailing commas, `vueIndentScriptAndStyle`. Run `npm run format`.
