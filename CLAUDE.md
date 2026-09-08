# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio site for Thomas La Salmonie. Nuxt 4 + Vue 3 + Vuetify 3, TypeScript, SASS. Deployed as a fully static site.

> **Renovation in progress.** A full modernization is underway (Nuxt 4, Tailwind v4 + shadcn-vue, i18n, no analytics). Track and update progress in [`RENOVATION.md`](./RENOVATION.md) — check off items as they land and keep its Decisions/Deferred sections current. Design spec: the "TLS Design System" artifact linked from that file. **Phases 0–1 done (foundation + data-layer cleanup); Vuetify + the Vuetify-shaped templates stay until Phase 2.**

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
- There is **no test suite**.
- A `pre-commit` hook (`simple-git-hooks` → `lint-staged`) runs eslint + prettier on staged files.
- CI (Semaphore, `.semaphore/`): the `Verify` pipeline runs `npm ci` then `lint`, `typecheck`, `generate` — all three gate the build. On success it promotes to `deployment.yml`, which `generate`s and `scp`s `.output/public` to the droplet, then repoints a `current` symlink. Deploy is push-triggered, not run locally.

## Architecture

Nuxt 4 default layout: app code in **`app/`** (`app/pages`, `app/components`, `app/plugins`, `app/utils`, `app/data`, `app/app.vue`), static assets in **`public/`**. No `srcDir` override, **no `server/` dir** — the site is fully static with no runtime API.

### Data flow

There is no database and no API. Portfolio content is typed TS arrays in **`app/data/`** (`projects.ts`, `skills.ts`, `about.ts`), each a named export (`export const projects` / `skills` / `aboutItems`).

**`app/utils/portfolio.ts`** holds pure read/join helpers over that data — this is what pages call:

- `getProjects()`, `getProject(slug)`, `getProjectWithSkills(slug)` (attaches `skills` resolved from `technologiesUsed` by matching skill `key`).
- `getFeaturedProjects(limit)` — random pick, Fisher–Yates on a **copy** (never mutates the source).
- `getSkills()` / `getVisibleSkills()` / `getSkill(key)` / `resolveSkills(keys)`.
- `getAboutTimeline()` — each `AboutItem` with `projects` (resolved from `relatedProjects` slugs to `ProjectRef` = `{name, slug}`) and `skills` resolved; blank task strings dropped.

To add or edit content: edit the `app/data/*.ts` file and the matching type in `app/utils/types/*.types.ts`. Relations are by `key` / `slug` — no duplication.

### Page data pattern

Data is synchronous, so pages just call a helper at the top of `<script setup>` — no `useFetch`, no loading/error state, no wrapper component (the old `useFetchData` composable and `AsyncLoader` are gone). `index.vue` wraps its random pick in `useState('home:featured', …)` so the choice is stable across SSR/hydration. `projects/[slug].vue` uses `computed(() => getProjectWithSkills(route.params.slug))` for reactive in-app nav, plus a server-only `createError(404)` guard for unknown slugs at prerender.

### Pages

- Top-level routes: `app/pages/{index,work,skills,about,contact}.vue`.
- `app/pages/projects/[slug].vue` — data-driven project detail from `project.blocks`, links, skills.
- `app/pages/lab/` — `index.vue` plus the standalone hand-built demos `{pong,solar-system,driverjs}.vue` (not data-driven). Old `/projects/{pong,…}` URLs redirect here via `routeRules` in `nuxt.config.ts`.
- `/skills` and `/contact` currently render `<Construction />` — real pages are Phase 2.

### App shell & UI

- `app/app.vue` wraps everything in `<v-app>` with `<Header />`, `<NuxtPage />`, `<Footer />`.
- Vuetify is set up in `app/plugins/vuetify.ts` (`ssr: true`) plus `vite-plugin-vuetify` with `autoImport: true` in `nuxt.config.ts`, so `v-*` components are available without imports. MDI icon font is imported in the plugin.
- Per-page SEO is done inline in templates with `<Html><Head><Title>/<Meta></Head></Html>` (moves to `useSeoMeta` in Phase 4).
- Static output is configured in `nuxt.config.ts` via `nitro.prerender` (`crawlLinks: true` from `/`), so every linked route — including all `projects/*` detail pages — is prerendered to HTML.

## Conventions enforced by lint/format

- ESLint is flat config (`eslint.config.mjs`) built on `@nuxt/eslint`; stylistic rules are off (Prettier owns formatting).
- `@typescript-eslint/no-explicit-any` is an **error** — use the helper types in `app/utils/types/common.types.ts` (`Nullable`, `Maybe`, etc.). The codebase uses `import type` for type-only imports by convention; the `consistent-type-imports` rule is off (needs type-aware linting — not yet wired up).
- Import path alias is `~/` → `app/` (`~~/` → repo root).
- Vue SFC block order is `<script>` then `<template>` then `<style>`; template component refs are PascalCase; `prefer-const` and `no-unneeded-ternary` are errors; `vue/multi-word-component-names`, `vue/no-v-html`, `vue/require-default-prop` and `vue/no-multiple-template-root` are off.
- Prettier (`.prettierrc.json`): single quotes, semicolons, `printWidth` 100, no trailing commas, `vueIndentScriptAndStyle`. Run `npm run format`.
