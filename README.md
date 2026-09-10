# thomaslasalmonie.me

Personal portfolio site for **Thomas La Salmonie** — full-stack web engineer, Montréal.
Nuxt 4 + Vue 3, Tailwind v4 + shadcn-vue, TypeScript. Bilingual (EN / FR). Shipped as a
fully static site.

## Stack

| Area      | Choice                                                                        |
| --------- | ----------------------------------------------------------------------------- |
| Framework | Nuxt 4 (`app/` layout), Vue 3, SSR build → static prerender                   |
| Styling   | Tailwind v4 (`@tailwindcss/vite`), OKLCH design tokens, shadcn-vue            |
| Content   | Typed TS arrays in `app/data/` — no database, no API                          |
| i18n      | `@nuxtjs/i18n` v10 — `/` English, `/fr/**` French, both prerendered           |
| SEO       | `@nuxtjs/seo` v5 — sitemap, robots, canonicals, OG, schema.org                |
| Icons     | `@nuxt/icon` + `lucide`, bundled at build (no runtime fetch)                  |
| Fonts     | `@nuxt/fonts` — Schibsted Grotesk, IBM Plex Sans, IBM Plex Mono (self-hosted) |
| Dark mode | `@nuxtjs/color-mode` — bare `.dark` on `<html>`, system default               |
| Deploy    | `nuxt generate` → `.output/public` → nginx on a droplet (Semaphore CI)        |

## Getting started

```bash
nvm use          # Node 22 (.nvmrc)
npm install      # npm only — .npmrc sets legacy-peer-deps + shamefully-hoist
npm run dev      # http://localhost:3000
```

> Install with **npm**, not pnpm/yarn. `legacy-peer-deps=true` works around an npm 10.9.x
> arborist crash on Nuxt 4's peer graph.

## Commands

```bash
npm run dev        # dev server on http://localhost:3000
npm run generate   # static build → .output/public  (this is what gets deployed)
npm run build      # SSR build (not used for deploy)
npm run preview    # preview a production build locally
npm run lint       # eslint .          (npm run lint:fix to autofix)
npm run typecheck  # nuxt typecheck (vue-tsc)
npm run format     # prettier --write .
npm run lighthouse # npx unlighthouse vs localhost:3000 — run `npm run preview` first (manual)
```

There is **no test suite**. A `pre-commit` hook (`simple-git-hooks` → `lint-staged`) runs
eslint + prettier on staged files. `nuxt typecheck` prints one harmless
`vue-router/volar/sfc-route-blocks` line and still exits 0.

## How it's built

### Content & data flow

No database, no API. Portfolio content is typed TS arrays in **`app/data/`**
(`projects.ts`, `skills.ts`, `about.ts`). **`app/utils/portfolio.ts`** holds pure
read/join helpers over that data — this is what pages call:

- `getProjects(locale)`, `getProject(slug, locale)`, `getProjectWithSkills(slug, locale)`
- `getFeaturedProjectSlugs(limit)` — random pick on a copy, returns slugs
- `getSkills()` / `getVisibleSkills()` / `getSkillGroups()` — skills carry no translatable fields
- `getAboutTimeline(locale)` — timeline entries with related projects + skills resolved

Relations are by `key` / `slug` — no duplication. To add or edit content, edit the
`app/data/*.ts` file and the matching type in `app/utils/types/*.types.ts`.

Data is synchronous, so pages just call a helper at the top of `<script setup>` — no
`useFetch`, no loading state. Because the helpers are locale-aware, pages wrap them in
`computed(() => getX(lang.value))` where `const lang = useLang()`.

### Internationalisation

`strategy: 'prefix_except_default'` — `/` is English, `/fr/**` is French, both fully
prerendered.

- **UI strings** live in `i18n/locales/{en,fr}.json`, read with `useI18n().t('…')`. Never hardcode.
- **Data strings** use `LocalizedText` (`string | { en, fr }`, from `common.types.ts`).
  `app/data/*.ts` export the `Raw*` shapes; `portfolio.ts` helpers resolve them to plain
  strings via `loc()` (`app/utils/i18n.ts`) so components stay locale-agnostic.
- `<html lang>` / hreflang / `og:locale` / per-locale sitemap come from the module
  (`app.vue` calls `useHead(useLocaleHead())`). In-app links use `useLocalePath()`;
  `LangSwitcher.vue` uses `useSwitchLocalePath()`. `app/error.vue` is the localized 404.

### SEO & head

`@nuxtjs/seo` v5 + `site: { url, name, description, defaultLocale }` in `nuxt.config.ts`
emit `/robots.txt`, a multi-file sitemap (`sitemap_index.xml` → `/__sitemap__/{en-CA,fr-CA}.xml`),
per-page `canonical` / `og:*` / `twitter:*` / `robots` meta, and a schema.org `@graph`
(`WebSite` + `WebPage` + `Person` `#identity` from `schemaOrg.identity`).

Pages set `useSeoMeta({ title, description })` with `t('…')` values. `app.vue` owns the
`titleTemplate`, the favicon set, light/dark `theme-color`, a `<meta http-equiv>` **CSP**,
and the shared OG card.

Runtime OG-image generation is **disabled** (`ogImage: { enabled: false }`). One static
branded card `public/og.png` (built by `node scripts/gen-og.mjs`) is referenced from
`app.vue`. Per-project cards are an owner follow-up.

### Styling & UI shell

- Single stylesheet **`app/assets/css/main.css`**: the OKLCH token contract (`:root` + `.dark`),
  `@theme inline`, `@custom-variant dark`, base layer, and `@layer components` helpers
  (`.container-page`, `.eyebrow`, `.chip*`, `.link-accent`).
- **shadcn-vue** via `shadcn-nuxt` — primitives in `app/components/ui/`, unprefixed
  (currently `ui/button`). `reka-ui` is used directly for the mobile-nav dialog.
- `app/app.vue` is a flex-column `min-h-dvh` wrapper: `<Header />`, `<main>`, `<Footer />`,
  skip link, `<main id="main">`.
- **Icons** are inlined as CSS-mask spans at prerender via `icon.serverBundle`. Anything
  that can render on the client (theme toggle, social icons on client-side nav) is also in
  `icon.clientBundle` — the static output + CSP `connect-src 'self'` make the Iconify API
  fallback dead in production.
- **Route transitions**: `experimental.viewTransition` — a ~360ms cross-fade, disabled
  under `prefers-reduced-motion`.

### Accessibility

Skip link + focusable `<main>`; `sr-only` `<h1>` on pages with no visible heading; card
grids are `<ul><li>`; all `<nav>`s and the work-page filter are labelled (labels
translated). Light `--success` / `--warning` tokens are tuned for WCAG AA on the status chips.

## Project structure

```
app/
  pages/          index, work, skills, about, contact
    projects/[slug].vue     data-driven project detail (blocks, links, skills, prev/next)
    lab/                    index + hand-built demos: pong, solar-system, driverjs
  components/      Header, Footer, Hero, SectionHeading, ProjectCard, SkillItem,
                  StatusBadge, ThemeToggle, LangSwitcher …
    ui/           shadcn-vue primitives (unprefixed)
  data/           projects.ts, skills.ts, about.ts  ← content lives here
  utils/          portfolio.ts (read/join helpers), i18n.ts (loc()), contact.ts, types/
  composables/    useLang.ts
  assets/css/     main.css  ← the only stylesheet
  app.vue         shell + head + CSP
  error.vue       localized 404
i18n/locales/     en.json, fr.json  ← all UI strings
public/           static assets, favicons, og.png
scripts/          gen-og.mjs, gen-favicons.mjs  (not part of the build)
deploy/           nginx.conf.example  (real security headers — apply on the droplet)
```

Path alias: `~/` → `app/`, `~~/` → repo root.

## Deployment

The site is **fully static**. `nitro.prerender` (`crawlLinks: true` from `/`, `/fr`
seeded) renders every linked route — including all `projects/*` pages and both locales —
to HTML in `.output/public`.

CI is **Semaphore** (`.semaphore/`):

1. `Verify` pipeline — `npm ci`, then `lint`, `typecheck`, `generate`. All three gate the build.
2. On success it promotes to `deployment.yml`, which `generate`s and `scp`s `.output/public`
   to the droplet, then repoints a `current` symlink.

Deploy is **push-triggered**, not run locally. Security headers are served by nginx —
Nitro `routeRules` headers are inert for a static deploy, so the real headers live in
`deploy/nginx.conf.example` (keep its CSP in sync with the `<meta>` CSP in `app.vue`).

## More

- `CLAUDE.md` — conventions, architecture notes, gotchas (for both humans and Claude Code).
- `RENOVATION.md` — the modernization rationale (locked decisions), the deferred backlog,
  and the remaining owner-content / ops items. The renovation itself is complete.
- `DESIGN_SYSTEM.md` — the visual spec: tokens, type, spacing, components, the `main.css`
  token contract.
