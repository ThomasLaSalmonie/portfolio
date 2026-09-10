# Portfolio Renovation

The numbered renovation (Phases 0–6) is **complete** — a Nuxt 3.8 + Vuetify app
modernized to Nuxt 4 + Tailwind v4 + shadcn-vue, fully static, bilingual, with SEO and an
a11y pass. The phase-by-phase log lived here and is now in git history; `CLAUDE.md` carries
the standing summary. This file keeps the **rationale**, the **deferred backlog**, and the
**work that's still outstanding**.

---

## What changed

| Layer     | From                                           | To                                                   |
| --------- | ---------------------------------------------- | ---------------------------------------------------- |
| Runtime   | Node 18                                        | Node 22 LTS                                          |
| Framework | Nuxt 3.8                                       | Nuxt 4.x                                             |
| UI        | Vuetify 3                                      | Tailwind v4 + shadcn-vue (Vuetify removed entirely)  |
| Icons     | `@mdi/font` (full webfont)                     | `@nuxt/icon` / Iconify (bundled at build)            |
| Fonts     | none / system                                  | `@nuxt/fonts`, self-hosted                           |
| Content   | TS arrays → Nitro API → `useFetchData` wrapper | Typed data modules in `app/data/`, imported directly |
| i18n      | dead `eslint-plugin-i18n-json` config          | `@nuxtjs/i18n` v10, FR + EN                          |
| Analytics | `nuxt-gtag` (GA4)                              | removed                                              |
| Rendering | `nuxi generate` (static)                       | stays fully static / prerendered HTML                |
| Dark mode | none                                           | `@nuxtjs/color-mode`                                 |
| SEO       | inline `<Head>` per page                       | `@nuxtjs/seo` + `useSeoMeta`                         |
| Deploy    | Semaphore → scp → symlink on droplet           | unchanged (see Deferred)                             |
| CI checks | lint commented out                             | lint + typecheck + generate gated                    |

---

## Decisions (locked)

1. **Upgrade in place** to Nuxt 4 — no rebuild from scratch.
2. **UI:** Tailwind v4 + shadcn-vue. Vuetify removed completely.
3. **Content:** structured entity data as **typed data files** (`app/data/*.ts`), imported
   directly. Join logic stays pure `utils/` functions (relations by key/slug — no
   duplication). Field-level locale maps for translatable strings (`LocalizedText` +
   `loc()`). **Nuxt Content is deferred to the blog only.**
4. **Blog:** stays "Coming soon". Real implementation deferred (see Deferred).
5. **Contact page:** static — email + social links only. No form, no backend.
6. **Skills page:** built for real from `app/data/skills.ts`.
7. **Deploy:** keep Semaphore + scp + droplet symlink flow as-is for now (see Deferred).
8. **Rendering:** fully static — prerender every route to plain HTML. No SSR runtime.
9. **Visual identity:** see [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) — transcribed from the
   **TLS Design System** artifact
   (https://claude.ai/code/artifact/e56290af-c485-46da-86b1-f147667c7da3).
   - Concept: "engineered, not decorated" — near-monochrome, mono face as structural voice.
   - Accent: **cobalt + graphite** — `oklch(0.50 0.16 255)` light / `oklch(0.74 0.13 255)`
     dark. Used only for links, focus, primary action, active nav.
   - Neutrals: warm off-white paper (light), cool blue-black (dark).
   - Type: **Schibsted Grotesk** (display) + **IBM Plex Sans** (body/UI) + **IBM Plex Mono**
     (labels, dates, tech tags, code).
   - Radii 6/10/14px; two shadows (light only); motion 120/180/280ms, `cubic-bezier(.2,0,0,1)`.
   - Review items resolved (2026-09-08): keep the faint warm paper bias; keep the cool
     blue-black dark ground; **no** home carousel (static 3-up grid); single hairline-column
     timeline; **no** skill percentages (Core / Working / Familiar tiers via `Skill.level`);
     FR strings planned at ~25–35% expansion, pressure-test nav/chip wrapping.
10. **Analytics:** removed entirely — `nuxt-gtag` dep, config block, module entry.
11. **i18n:** French + English via `@nuxtjs/i18n`. Static-friendly routing
    (`prefix_except_default`, default `en`), all locale routes prerendered.

---

## Remaining work

### Owner content (blocks the site from feeling "finished")

- [ ] Real project write-ups (`project.blocks`) + real screenshots. `ProjectCard` shows a
      mono slug placeholder until `banner` is set; `nuxt-og-image` is installed but disabled.
- [ ] Per-project OG images (Phase 4 ships one shared static `public/og.png`).
- [ ] About-page CV-download PDF (no asset yet).
- [ ] Review the machine-drafted **FR copy**: `app/data/*.ts` (project `shortDescription`,
      about `title`/`company`/`date`/`tasks`) and the longer marketing strings in
      `i18n/locales/fr.json` (hero lead, "how I work", services, writing). It's a CV — voice
      and accuracy need an owner pass.

### Ops

- [ ] Apply `deploy/nginx.conf.example` on the droplet (`178.128.238.94`) and keep its CSP
      in sync with the `<meta http-equiv>` CSP in `app/app.vue`.
- [ ] Run `npm run lighthouse` (`npx unlighthouse`) against a deployed/preview build and act
      on the report. Target 95+. Deliberately not in CI.
- [~] Image host: `img.thomaslasalmonie.me` is intentionally **not** in `image.domains`, so
  those banners pass through un-optimised. Pull them in-repo or migrate the host, then
  add the domain. Tied to the hosting migration below.

---

## Deferred backlog (revisit later)

- [ ] **Blog / "My Articles"** — implement with Nuxt Content v3 (markdown collection). Wire
      the home "Coming soon" block to it once it exists.
- [ ] **Hosting migration** — move off the droplet to Cloudflare Pages / Vercel / Netlify
      for git-push deploys, PR previews, instant rollback. Delete
      `.semaphore/deployment.yml` when done.
- [ ] **PWA** — `@vite-pwa/nuxt` (optional, low priority).
- [ ] **Component/E2E tests** — Vitest + `@nuxt/test-utils`, a few Playwright smoke tests.
- [ ] **Renovate / Dependabot** for staying current.
