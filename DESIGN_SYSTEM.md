# TLS Design System

The visual language for **thomaslasalmonie.me** — Nuxt 4, Tailwind v4, shadcn-vue.
Every token maps 1:1 to a CSS variable in `app/assets/css/main.css`, so this document is
both the reference and the spec.

> Transcribed from the "TLS Design System" artifact (draft v0.1, generated 2026-09-08,
> paired with `RENOVATION.md` Phase 2):
> <https://claude.ai/code/artifact/e56290af-c485-46da-86b1-f147667c7da3>
> Accent: **cobalt + graphite**. Type: **Schibsted Grotesk · IBM Plex Sans · IBM Plex Mono**.
> See [Implementation notes](#implementation-notes--deviations) for where the shipped code
> has since moved on from the draft.

---

## Principle — engineered, not decorated

The portfolio belongs to a self-taught engineer who ships web software. The system should
read the way the work does — precise, legible, unfussy. Every device on the page earns its
place by carrying information.

- **Monospace does real work.** IBM Plex Mono sets section labels, dates, metadata, tech
  tags and code — the structural parts of the page — so the sans text stays clean for
  reading.
- **Colour is rationed.** Warm off-white paper, warm near-black ink, one cobalt accent. The
  accent appears only where something is interactive or genuinely needs emphasis: a link, a
  focus ring, the primary action.
- **Status is a separate signal.** Shipped / paused / archived get their own quiet
  green-amber-red palette. They never stand in for the accent.
- **Not everything is a card.** Border, fill, radius and shadow are spent by role — the
  project grid lifts, the timeline is hairline rows, skills are chips, navigation is plain
  text.

---

## Foundations — Colour

Defined in **OKLCH** (the format Tailwind v4 and shadcn-vue ship). Hex values are
approximate, for reference only. Light is the base; dark is a **designed counterpart, not
an inversion** — the accent lightens and desaturates so it holds on the cool near-black
ground. Dark mode uses **no shadows**: separation there comes from `surface` sitting one
step lighter than `background`, plus the `border` token.

### Light

| Token             | OKLCH                    | ≈ Hex     | Role                              |
| ----------------- | ------------------------ | --------- | --------------------------------- |
| background        | `oklch(0.988 0.004 85)`  | `#FBFAF7` | page ground (faint warm bias)     |
| card / surface    | `oklch(1 0 0)`           | `#FFFFFF` | raised surfaces                   |
| muted / surface-2 | `oklch(0.966 0.005 85)`  | `#F4F2EC` | inset / secondary fills           |
| foreground        | `oklch(0.205 0.009 75)`  | `#201E19` | body text                         |
| muted-foreground  | `oklch(0.505 0.013 74)`  | `#6F6A61` | secondary text                    |
| border            | `oklch(0.912 0.006 80)`  | `#E5E1DA` | hairlines, dividers               |
| input             | `oklch(0.878 0.008 80)`  | `#DCD7CE` | form control borders              |
| primary           | `oklch(0.50 0.16 255)`   | `#3A5CCC` | links, focus ring, primary action |
| accent (tint)     | `oklch(0.955 0.021 255)` | `#EDF0FB` | accent-tinted fills               |
| accent-foreground | `oklch(0.44 0.15 255)`   | —         | text on the accent tint           |
| success           | `oklch(0.58 0.12 155)`   | `#3E8E57` | status: shipped                   |
| warning           | `oklch(0.66 0.13 68)`    | `#B57F2E` | status: paused                    |
| destructive       | `oklch(0.577 0.22 27)`   | `#D64533` | status: archived, destructive     |

### Dark

| Token             | OKLCH                    | ≈ Hex     | Role                              |
| ----------------- | ------------------------ | --------- | --------------------------------- |
| background        | `oklch(0.178 0.007 265)` | `#14151C` | page ground (cool blue-black)     |
| card / surface    | `oklch(0.214 0.009 265)` | `#1B1D25` | raised surfaces                   |
| muted / surface-2 | `oklch(0.255 0.009 265)` | `#24262F` | inset / secondary fills           |
| foreground        | `oklch(0.965 0.004 264)` | `#F1F2F6` | body text                         |
| muted-foreground  | `oklch(0.700 0.016 264)` | `#A2A6B2` | secondary text                    |
| border            | `oklch(0.292 0.010 265)` | `#34363F` | hairlines, dividers               |
| input             | `oklch(0.340 0.012 265)` | `#3D4049` | form control borders              |
| primary           | `oklch(0.74 0.13 255)`   | `#8FA6F0` | links, focus ring, primary action |
| accent (tint)     | `oklch(0.30 0.045 255)`  | `#2B3350` | accent-tinted fills               |
| accent-foreground | `oklch(0.86 0.08 255)`   | —         | text on the accent tint           |
| success           | `oklch(0.72 0.13 155)`   | `#63C089` | status: shipped                   |
| warning           | `oklch(0.80 0.13 75)`    | `#E0A94A` | status: paused                    |
| destructive       | `oklch(0.70 0.19 25)`    | `#F2765C` | status: archived, destructive     |

### Contrast (WCAG AA target)

| Pair                           | Light  | Dark   | Use                           |
| ------------------------------ | ------ | ------ | ----------------------------- |
| foreground on background       | 15.8:1 | 14.6:1 | body text — passes AAA        |
| muted-foreground on background | 5.3:1  | 5.9:1  | secondary text — passes AA    |
| primary on background          | 6.1:1  | 8.4:1  | links, standalone accent text |
| primary-foreground on primary  | 7.0:1  | 9.2:1  | button label                  |

Figures are design targets, verified in build with an automated check. The accent is never
the only channel for meaning — status also carries an icon and a label.

---

## Foundations — Typography

Self-hosted via `@nuxt/fonts` — no third-party request in production. The mono face is not
a caption afterthought; it is the system's structural voice.

| Role           | Face              | Weights               | Job                                                                                                                              |
| -------------- | ----------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Display        | Schibsted Grotesk | 500 · 700 · 900       | Page titles, section headings, hero. Set tight and heavy; always `text-wrap: balance`. Tracking −0.02em. Never below 1.25rem.    |
| Body & UI      | IBM Plex Sans     | 400 · 500 · 600 · 700 | Running text, buttons, form fields, navigation. Measure capped at ~68 characters. Line-height 1.65 for prose, 1.3 for UI.        |
| Utility & code | IBM Plex Mono     | 400 · 500             | Eyebrows, dates, table figures (`tabular-nums`), tech tags, code blocks. Uppercase for labels (+0.08em), sentence case for code. |

### Type scale

| Step                                   | Size / line-height                   | Face          | Notes                             |
| -------------------------------------- | ------------------------------------ | ------------- | --------------------------------- |
| `text-xs` — label / mono eyebrow       | 0.75rem / 1rem                       | Plex Mono 500 | letter-spacing +0.08em, uppercase |
| `text-sm` — captions, secondary UI     | 0.875rem / 1.35                      | Plex Sans 400 |                                   |
| `text-base` — body copy                | 1rem / 1.65                          | Plex Sans 400 | the reading size                  |
| `text-lg` — lead paragraph             | 1.125rem / 1.6                       | Plex Sans 400 | intro under a heading             |
| `text-xl` — card title / small heading | 1.375rem / 1.35                      | Schibsted 700 | letter-spacing −0.01em            |
| `text-2xl` — section heading (`h2`)    | 1.75rem / 1.2                        | Schibsted 700 | letter-spacing −0.02em            |
| `text-3xl` — page title (`h1`)         | 2.25rem / 1.12                       | Schibsted 900 | letter-spacing −0.02em            |
| `text-4xl` — hero                      | `clamp(2.5rem, 6vw, 3.75rem)` / 1.05 | Schibsted 900 |                                   |

---

## Foundations — Space, shape, depth

Tailwind's default 4px spacing scale is kept as-is. Only three custom radii and two shadows
are defined — the rest of the system's rhythm comes from layout `gap`, not per-element
margins.

### Spacing — the values actually used

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96` px (Tailwind steps `1 2 3 4 6 8 12 16 24`).

- Component internals: **12–20px**
- Gap between cards: **16–20px**
- Section vertical padding: **48px** mobile, **88–112px** desktop
- Content max-width **1180px**; prose blocks capped at **~68ch**

### Radius

| Token         | Value | Use                    |
| ------------- | ----- | ---------------------- |
| `--radius-sm` | 6px   | buttons, inputs, tags  |
| `--radius`    | 10px  | cards, panes, notes    |
| `--radius-lg` | 14px  | hero media, dialogs    |
| full          | 999px | pills, avatars, meters |

### Elevation

| Token         | Value                                                                         | Use                    |
| ------------- | ----------------------------------------------------------------------------- | ---------------------- |
| `--shadow-sm` | `0 1px 2px oklch(0.2 0.03 260 / 0.07), 0 1px 1px oklch(0.2 0.03 260 / 0.04)`  | resting cards          |
| `--shadow-md` | `0 6px 18px oklch(0.2 0.03 260 / 0.10), 0 2px 5px oklch(0.2 0.03 260 / 0.06)` | hover, popovers, menus |

Dark mode: **no shadows** (see Colour).

---

## Foundations — Motion — "quick, then still"

| Token                            | Value                           | Applies to                                    |
| -------------------------------- | ------------------------------- | --------------------------------------------- |
| `--dur-1`                        | 120ms                           | micro — chips, checkboxes, tag toggles        |
| `--dur-2`                        | 180ms                           | default — buttons, links, input focus, hovers |
| `--dur-3`                        | 280ms                           | larger — card lift, disclosure, drawer        |
| route transition                 | 360ms                           | page navigation via the View Transitions API  |
| `--ease` / `--ease-standard`     | `cubic-bezier(0.2, 0, 0, 1)`    | standard — most state changes                 |
| `--ease-out` / `--ease-entrance` | `cubic-bezier(0.16, 1, 0.3, 1)` | entrances — menus, toasts, reveals            |

`prefers-reduced-motion`: transforms are dropped, opacity kept, durations collapse to ~0.
Scroll-reveal always starts from a **visible resting state** — never parked at `opacity: 0`.

---

## Foundations — Iconography — "Lucide, hairline"

`@nuxt/icon` with the `lucide` collection — tree-shaken, no webfont (replaces the ~500KB
`@mdi/font`). Stroke **1.75** to match Plex's line weight; **never filled**.

| Context                 | Size |
| ----------------------- | ---- |
| inline with text        | 16px |
| buttons and nav         | 20px |
| feature / section marks | 24px |

Usage: `<Icon name="lucide:arrow-up-right" />`

---

## Components — the kit

shadcn-vue primitives with the tokens above applied. Portfolio-specific components
(project card, skill row, timeline) are composed from the same primitives.

### Button

- **Variants:** primary (solid accent), secondary (surface-2 fill + border), outline
  (border only), ghost (fill on hover only), link (accent text, underline on hover).
- **Sizes:** sm (h 32px), default (h 38px), lg (h 44px), icon (38×38 square).
- Primary hover: `color-mix(in oklab, var(--brand) 90%, var(--text))`.
- Disabled: `opacity: 0.45; pointer-events: none`.
- Radius `--radius-sm`; label is Plex Sans 500; icons 16px.

### Badge / tech tag / status chip

Pill (`border-radius: 999px`), Plex Mono 500, uppercase, +0.06em, `3px 9px` padding.

| Class          | Look                                     | Use                        |
| -------------- | ---------------------------------------- | -------------------------- |
| `.chip`        | border only, muted text                  | tech tags (Nuxt, GraphQL…) |
| `.chip--solid` | solid accent                             | "Featured"                 |
| `.chip--soft`  | accent tint fill, accent-foreground text | primary tech tag           |
| `.chip--play`  | success tint + success text              | **Shipped**                |
| `.chip--pause` | warning tint + warning text              | **Paused**                 |
| `.chip--stop`  | destructive tint + destructive text      | **Archived**               |
| `.chip--dot`   | prepends a 6px `currentColor` dot        | status chips               |

Status maps to the `project.status` field: `play → Shipped`, `pause → Paused`,
`stop → Archived`. The chip carries text, not a bare icon.

### Card

`surface` fill, `border`, `--radius`, 18px padding, `--shadow-sm` (`.card--flat` removes
it). Title is Schibsted 700 ~1.05rem; body is muted-foreground 0.9rem.

### ProjectCard

Used in the Work grid and the home featured-work section.

- `surface` fill, `border`, `--radius`, `--shadow-sm`, `overflow: hidden`.
- **Media band** (~116px): diagonal gradient from `color-mix(brand 22%, surface)` to
  `surface-2`, bottom hairline; holds the screenshot / OG image.
- **Head:** title (Schibsted 700 ~1.1rem) + status chip.
- **Desc:** muted-foreground 0.88rem.
- **Tech row:** wrapped chips, 6px gap.
- **Foot:** hairline top border; year (Plex Mono, muted) on the left, "View project ↗"
  link-button on the right.
- **Hover:** `translateY(-3px)`, `--shadow-sm → --shadow-md`, border tinted
  `color-mix(in oklab, var(--brand) 40%, var(--line))`, over `--dur-3`. Dropped under
  `prefers-reduced-motion`.

### SkillItem

`40px` icon tile (`surface-2` + border, mono initials) + label row. In the draft this
showed a percentage meter — **see [Implementation notes](#implementation-notes--deviations);
the shipped version uses a `core / working / familiar` tier chip and no numeric
percentage.**

### Form controls

- `.field`: column, 7px gap; `.field__label` is Plex Mono, uppercase, +0.06em, muted.
- `.input` / `.textarea`: `surface` fill, `input`-token border, `--radius-sm`, `9px 12px`
  padding, Plex Sans 0.9rem.
- Focus: border → `--brand`, plus `box-shadow: 0 0 0 3px color-mix(in oklab, var(--brand) 22%, transparent)`.
- `.textarea` min-height 76px, `resize: vertical`.

### Header nav

Plain text links, Plex Sans 500 0.88rem, muted-foreground → foreground on hover. Active
route: foreground text + a 2px accent underline (`::after`, `bottom: -2px`). Mobile: a
sheet from shadcn-vue, triggered by a 20px menu icon.

### Timeline (About page)

A single **hairline-separated column** — drops Vuetify's alternating-dot layout. Row grid
is `130px 1fr` (collapses to one column under 560px). Date is Plex Mono 0.74rem muted;
role is 600 ~0.98rem; company is a link; points are a `disc` list, muted, 0.86rem. Encodes
real chronology, not decoration.

### Callout / note

Grid `8px 1fr` with a 4px accent bar on the left. `.note--info` uses the accent tint;
`.note--warn` uses the warning tint (distinct from the accent). Title is a block, body is
muted.

### Empty state

Dashed `input`-token border, `--radius`, centered, muted. Label is Plex Mono, uppercase,
+0.12em (e.g. "Writing — coming soon").

---

## Patterns — page-level treatments

- **Hero** — sized to its content, **never `100vh`**. A static, typographic opener: soft
  chip eyebrow, heavy Schibsted headline (`clamp(1.8rem, 5vw, 2.7rem)`, line-height ~1.04),
  a ~52ch lead, then a primary + outline button row. Replaces the old `v-parallax` hero and
  its stock image — no parallax.
- **Section header** — mono eyebrow + short leading rule, then the `h2`, then an optional
  intro capped at 68ch. The eyebrow **names** the section ("Foundations — Colour"); it is
  never a number, because the sections are not a sequence.
- **Focus** — a 2px `--ring` outline at 2px offset on every interactive element, in both
  themes (the lighter dark-mode accent keeps it visible on the dark ground).
- **Home featured work** — a static 3-up grid, replacing the auto-rotating `v-carousel`.

---

## Implementation — wiring it into Nuxt 4

Drop this into `app/assets/css/main.css`. It is the shadcn-vue token contract
(`--background`, `--primary`, …) plus an `@theme inline` block that exposes them to
Tailwind utilities and adds the font + easing tokens.

```css
@import 'tailwindcss';
@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.625rem;

  --background: oklch(0.988 0.004 85);
  --foreground: oklch(0.205 0.009 75);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.205 0.009 75);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.205 0.009 75);
  --primary: oklch(0.5 0.16 255);
  --primary-foreground: oklch(0.985 0.002 255);
  --secondary: oklch(0.966 0.005 85);
  --secondary-foreground: oklch(0.245 0.009 75);
  --muted: oklch(0.966 0.005 85);
  --muted-foreground: oklch(0.505 0.013 74);
  --accent: oklch(0.955 0.021 255);
  --accent-foreground: oklch(0.44 0.15 255);
  --destructive: oklch(0.577 0.22 27);
  --destructive-foreground: oklch(0.985 0.002 255);
  --border: oklch(0.912 0.006 80);
  --input: oklch(0.878 0.008 80);
  --ring: oklch(0.5 0.16 255);
  --success: oklch(0.58 0.12 155);
  --warning: oklch(0.66 0.13 68);
}

.dark {
  --background: oklch(0.178 0.007 265);
  --foreground: oklch(0.965 0.004 264);
  --card: oklch(0.214 0.009 265);
  --card-foreground: oklch(0.965 0.004 264);
  --popover: oklch(0.214 0.009 265);
  --popover-foreground: oklch(0.965 0.004 264);
  --primary: oklch(0.74 0.13 255);
  --primary-foreground: oklch(0.2 0.03 255);
  --secondary: oklch(0.255 0.009 265);
  --secondary-foreground: oklch(0.965 0.004 264);
  --muted: oklch(0.255 0.009 265);
  --muted-foreground: oklch(0.7 0.016 264);
  --accent: oklch(0.3 0.045 255);
  --accent-foreground: oklch(0.86 0.08 255);
  --destructive: oklch(0.7 0.19 25);
  --destructive-foreground: oklch(0.985 0.002 255);
  --border: oklch(0.292 0.01 265);
  --input: oklch(0.34 0.012 265);
  --ring: oklch(0.74 0.13 255);
  --success: oklch(0.72 0.13 155);
  --warning: oklch(0.8 0.13 75);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-success: var(--success);
  --color-warning: var(--warning);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --font-sans: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  --font-display: 'Schibsted Grotesk', 'IBM Plex Sans', ui-sans-serif, sans-serif;

  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-entrance: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Modules (draft list)

```
modules: [
  '@nuxtjs/tailwindcss',   // Tailwind v4 (or the @tailwindcss/vite plugin directly)
  'shadcn-nuxt',           // { componentDir: 'app/components/ui', prefix: '' }
  '@nuxt/icon',            // lucide collection
  '@nuxt/fonts',           // self-hosts the three families below
  '@nuxt/image',           // project screenshots, responsive + AVIF/WebP
  '@nuxtjs/color-mode',    // { classSuffix: '' }  → toggles .dark / .light on <html>
  '@nuxtjs/i18n',          // { defaultLocale: 'en', locales: ['en','fr'], strategy: 'prefix_except_default' }
  '@nuxtjs/seo',           // sitemap, robots, OG images, schema.org
]
```

Font weights to pin: **Schibsted Grotesk** 500/700/900 · **IBM Plex Sans** 400/500/600/700
· **IBM Plex Mono** 400/500. `color-mode`'s `classSuffix: ''` is what makes the `.dark`
class line up with `@custom-variant dark`.

---

## For review — open calls from the draft

The draft left these decisions open. Where they've been settled, that's noted in
`RENOVATION.md`.

- **Paper warmth** — light background carries a faint warm bias (hue ~85, chroma 0.004).
  Keep, push warmer, or go dead-neutral grey?
- **Dark ground** — currently a cool blue-black (hue 265) so the cobalt accent sits
  naturally. Alternative: neutral charcoal.
- **Home carousel** — replaced by a static 3-up featured-work grid. (Settled: grid.)
- **Timeline layout** — single hairline column vs. alternating-dot. (Settled: single
  column.)
- **Skill meters** — percentage bars vs. a calmer grouped list with no numeric
  "proficiency". (Settled: `core / working / familiar` tiers, no percentage — `RENOVATION.md`
  decision #9.)
- **French copy width** — longer FR strings pressure-tested against nav and button widths
  during the i18n phase.

---

## Implementation notes / deviations

The artifact is **draft v0.1** and pairs with Phase 2. The shipped codebase (Phases 0–5)
has moved on in a few places — trust the code, use this as the intent:

- **Tailwind** is wired via `@tailwindcss/vite` in `vite.plugins` (not the
  `@nuxtjs/tailwindcss` module the draft's module list shows).
- **Skill proficiency** is a tier — `core / working / familiar` — with a category, rendered
  as a chip by `SkillItem.vue`. No numeric percentage, no meter (`RENOVATION.md` #9).
- **`--success` / `--warning`** in light mode were darkened from the draft values for WCAG
  AA on the status chips (`main.css`).
- **OG images:** `nuxt-og-image` runtime generation is **disabled**; the site ships one
  static `public/og.png`. Per-project cards are an owner follow-up.
- **i18n** is `@nuxtjs/i18n` v10, `strategy: 'prefix_except_default'` — `/` English,
  `/fr/**` French, both prerendered. UI strings in `i18n/locales/{en,fr}.json`; data
  strings via `LocalizedText` + `loc()`.
- **Component helpers** live in `main.css` `@layer components`: `.container-page`,
  `.eyebrow`, `.chip` / `.chip--soft|--solid|--play|--pause|--stop`, `.link-accent`.
- **Route transition** is `experimental.viewTransition` — a ~360ms cross-fade, disabled
  under `prefers-reduced-motion`.
