# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio site for Thomas La Salmonie. Nuxt 4 + Vue 3 + Vuetify 3, TypeScript, SASS. Deployed as a fully static site.

> **Renovation in progress.** A full modernization is underway (Nuxt 4, Tailwind v4 + shadcn-vue, i18n, no analytics). Track and update progress in [`RENOVATION.md`](./RENOVATION.md) — check off items as they land and keep its Decisions/Deferred sections current. Design spec: the "TLS Design System" artifact linked from that file. **Phase 0 (foundation) is done; Vuetify is still in place until Phase 2.**

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

Nuxt 4 default layout: app code in **`app/`** (`app/pages`, `app/components`, `app/plugins`, `app/utils`, `app/app.vue`), server code in **`server/`** at the repo root, static assets in **`public/`**. No `srcDir` override.

### Data flow

There is no database. Content is hardcoded as typed TS arrays in `server/db/` (`projects.ts`, `skills.ts`, `about.ts`).

Nitro API routes in `server/api/` read those arrays and do the joins:

- `projects/[slug].get.ts` — finds the project, then attaches `project.skills` by matching each skill's `key` against the project's `technologiesUsed`.
- `about.get.ts` — for each about item, attaches related `projects` (by slug) and `skills` (by key).
- `projects/index.get.ts` — supports a `?limit=` query that returns a random subset (mutates the shared array in place — a known bug, fixed in Phase 1).

To add or edit portfolio content, edit the `db/` files and the matching type in `app/utils/types/*.types.ts`. Server files reference these types via the `~/` alias (→ `app/`). This whole layer is slated to move to `app/data/*.ts` in Phase 1.

### Client fetching pattern

`app/utils/useFetchData.ts` is a thin composable over `useFetch` returning `{ result, isLoading, hasError, error, fetchData }`. Pages construct it with an API path and then call `fetchData()` — either `await`ed at the top of `<script setup>` (e.g. `work.vue`) or inside a `watch(..., { immediate: true })` when the route param drives it (e.g. `projects/[slug].vue`).

Wrap the rendered result in `<AsyncLoader :is-loading="isLoading" :error="error">`; it has `#error` and default slots. This useFetchData + AsyncLoader pairing is the current data-driven page pattern (being replaced by direct imports in Phase 1).

### Pages

- Top-level routes: `app/pages/{index,work,skills,about,contact}.vue`.
- `app/pages/projects/[slug].vue` — data-driven project detail page rendered from `project.blocks`, links, and skills.
- `app/pages/projects/{pong,solar-system,driverjs}.vue` — standalone hand-built demo pages, **not** data-driven; they don't go through the `db/` or API layer.

### App shell & UI

- `app/app.vue` wraps everything in `<v-app>` with `<Header />`, `<NuxtPage />`, `<Footer />`.
- Vuetify is set up in `app/plugins/vuetify.ts` (`ssr: true`) plus `vite-plugin-vuetify` with `autoImport: true` in `nuxt.config.ts`, so `v-*` components are available without imports. MDI icon font is imported in the plugin.
- Per-page SEO is done inline in templates with `<Html><Head><Title>/<Meta></Head></Html>` (moves to `useSeoMeta` in Phase 4).
- Static output is configured in `nuxt.config.ts` via `nitro.prerender` (`crawlLinks: true` from `/`), so every linked route — including all `projects/*` detail pages — is prerendered to HTML.

## Conventions enforced by lint/format

- ESLint is flat config (`eslint.config.mjs`) built on `@nuxt/eslint`; stylistic rules are off (Prettier owns formatting).
- `@typescript-eslint/no-explicit-any` is an **error** — use the helper types in `app/utils/types/common.types.ts` (`Nullable`, `Maybe`, etc.). The codebase uses `import type` for type-only imports by convention; the `consistent-type-imports` rule is disabled until type-aware linting lands with strict TS in Phase 1.
- Import path alias is `~/` → `app/` (`~~/` → repo root).
- Vue SFC block order is `<script>` then `<template>` then `<style>`; template component refs are PascalCase; `prefer-const` and `no-unneeded-ternary` are errors; `vue/multi-word-component-names`, `vue/no-v-html`, `vue/require-default-prop` and `vue/no-multiple-template-root` are off.
- Prettier (`.prettierrc.json`): single quotes, semicolons, `printWidth` 100, no trailing commas, `vueIndentScriptAndStyle`. Run `npm run format`.
