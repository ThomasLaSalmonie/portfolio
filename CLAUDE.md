# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio site for Thomas La Salmonie. Nuxt 4 + Vue 3, Tailwind v4 + shadcn-vue, TypeScript. Deployed as a fully static site.

> **Renovation in progress.** A full modernization is underway. Track and update progress in [`RENOVATION.md`](./RENOVATION.md) — check off items as they land and keep its Decisions/Deferred sections current. Design spec: the "TLS Design System" artifact linked from that file. **Phases 0–3 done (foundation, data-layer cleanup, design system + full de-Vuetify, content & polish).** Remaining: Phase 4 (SEO/a11y/perf), Phase 5 (FR + EN i18n), plus owner-blocked content (real project write-ups + screenshots, CV PDF).

## Commands

```bash
npm run dev        # dev server on http://localhost:3000
npm run generate   # static build -> .output/public (this is what gets deployed)
npm run build      # SSR build (not used for deploy)
npm run preview    # preview a production build locally
npm run lint       # eslint .            (lint:fix to autofix)
npm run typecheck  # nuxt typecheck (vue-tsc)
npm run format     # prettier --write .
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

- `getProjects()`, `getProject(slug)`, `getProjectWithSkills(slug)` (attaches `skills` resolved from `technologiesUsed` by matching skill `key`).
- `getFeaturedProjects(limit)` — random pick, Fisher–Yates on a **copy** (never mutates the source).
- `getSkills()` / `getVisibleSkills()` / `getSkill(key)` / `resolveSkills(keys)`.
- `getSkillGroups()` — visible skills bucketed by `category` (`SKILL_CATEGORY_ORDER` / `SKILL_CATEGORY_LABELS`), each group sorted `core → working → familiar`. Drives the Skills page.
- `getAboutTimeline()` — each `AboutItem` with `projects` (resolved from `relatedProjects` slugs to `ProjectRef` = `{name, slug}`) and `skills` resolved; blank task strings dropped.

`Skill` proficiency is a tier — `level: 'core' | 'working' | 'familiar'` — plus a `category`; there is no numeric percentage (see RENOVATION.md decision #9). Contact details (email, socials, location) live in `app/utils/contact.ts`.

To add or edit content: edit the `app/data/*.ts` file and the matching type in `app/utils/types/*.types.ts`. Relations are by `key` / `slug` — no duplication.

### Page data pattern

Data is synchronous, so pages just call a helper at the top of `<script setup>` — no `useFetch`, no loading/error state, no wrapper component (the old `useFetchData` composable and `AsyncLoader` are gone). `index.vue` wraps its random pick in `useState('home:featured', …)` so the choice is stable across SSR/hydration. `projects/[slug].vue` uses `computed(() => getProjectWithSkills(route.params.slug))` for reactive in-app nav, plus a server-only `createError(404)` guard for unknown slugs at prerender.

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
- **Head / favicons:** `app/app.vue` sets `htmlAttrs.lang`, the favicon set (`favicon.svg` + `.ico` + `-96x96.png` + `apple-touch-icon.png`), `site.webmanifest`, and light/dark `theme-color` via `useHead`. Regenerate the PNGs from `public/favicon.svg` with `node scripts/gen-favicons.mjs` (not part of the build).
- **Route transitions:** `experimental.viewTransition` — a 360ms cross-fade (`::view-transition-*(root)` in `main.css`), disabled under `prefers-reduced-motion`.
- Shared building blocks: `Hero`, `SectionHeading` (mono eyebrow + rule + `h2`), `ProjectCard`, `SkillItem` (chip, variant by `level`), `StatusBadge` (`play→Shipped` / `pause→Paused` / `stop→Archived`).
- Per-page SEO is still done inline with `<Html><Head><Title>/<Meta></Head></Html>` (moves to `useSeoMeta` in Phase 4).
- Static output is configured via `nitro.prerender` (`crawlLinks: true` from `/`), so every linked route — including all `projects/*` detail pages — is prerendered to HTML.

## Conventions enforced by lint/format

- ESLint is flat config (`eslint.config.mjs`) built on `@nuxt/eslint`; stylistic rules are off (Prettier owns formatting).
- `@typescript-eslint/no-explicit-any` is an **error** — use the helper types in `app/utils/types/common.types.ts` (`Nullable`, `Maybe`, etc.). The codebase uses `import type` for type-only imports by convention; the `consistent-type-imports` rule is off (needs type-aware linting — not yet wired up).
- Import path alias is `~/` → `app/` (`~~/` → repo root).
- Vue SFC block order is `<script>` then `<template>` then `<style>`; template component refs are PascalCase; `prefer-const` and `no-unneeded-ternary` are errors; `vue/multi-word-component-names`, `vue/no-v-html`, `vue/require-default-prop`, `vue/no-multiple-template-root` and `vue/html-self-closing` are off.
- No SASS — styling is Tailwind utilities + the token helpers in `main.css`. Component `<style scoped>` blocks are plain CSS and rare (e.g. the nav underline in `Header.vue`).
- Prettier (`.prettierrc.json`): single quotes, semicolons, `printWidth` 100, no trailing commas, `vueIndentScriptAndStyle`. Run `npm run format`.
