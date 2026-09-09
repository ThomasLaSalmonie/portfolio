import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-09-08',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    'shadcn-nuxt'
  ],
  css: ['~/assets/css/main.css'],
  // FR + EN. `prefix_except_default` → `/` is English, `/fr/**` is French. Every
  // localized route is prerendered (the header language switcher + hreflang links
  // are crawled from `/`, and `/fr` is seeded explicitly below). UI strings live
  // in i18n/locales/*.json; translatable data fields use `loc()` (app/utils/i18n.ts).
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    langDir: 'locales',
    baseUrl: 'https://thomaslasalmonie.me',
    locales: [
      { code: 'en', language: 'en-CA', name: 'English', file: 'en.json' },
      { code: 'fr', language: 'fr-CA', name: 'Français', file: 'fr.json' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'en'
    }
  },
  // Canonical identity for @nuxtjs/seo (sitemap, robots, canonicals, OG tags,
  // schema.org). `url` must match the deployed origin.
  site: {
    url: 'https://thomaslasalmonie.me',
    name: 'Thomas La Salmonie',
    description:
      'Full-stack web engineer based in Montréal — Vue / Nuxt front-ends, Node services and the infrastructure under them.',
    defaultLocale: 'en'
  },
  // Fully static output — every route prerendered to HTML (see RENOVATION.md, decision #8).
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/fr']
    }
  },
  // Demo pages moved from /projects/* to /lab/* in Phase 1.
  routeRules: {
    '/projects/pong': { redirect: '/lab/pong' },
    '/projects/solar-system': { redirect: '/lab/solar-system' },
    '/projects/driverjs': { redirect: '/lab/driverjs' }
  },
  // color-mode toggles a bare `.dark` / `.light` class on <html> — lines up with
  // the `@custom-variant dark` in app/assets/css/main.css.
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },
  // shadcn-vue primitives live in app/components/ui, unprefixed.
  shadcn: {
    prefix: '',
    componentDir: '~/components/ui'
  },
  // Self-hosted at build time — no third-party font request in production.
  fonts: {
    families: [
      { name: 'Schibsted Grotesk', provider: 'google', weights: [500, 700, 900] },
      { name: 'IBM Plex Sans', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'IBM Plex Mono', provider: 'google', weights: [400, 500] }
    ]
  },
  // Bundle the Lucide set at build so static output needs no runtime icon API.
  icon: {
    serverBundle: {
      collections: ['lucide']
    }
  },
  // Project banners still live on an external host (see RENOVATION.md — hosting
  // migration is deferred), so that domain is intentionally NOT in `domains`:
  // remote URLs pass through untouched instead of being baked through IPX at
  // build. `format`/`screens` apply once images are pulled in-repo.
  image: {
    format: ['avif', 'webp'],
    screens: { xs: 360, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 }
  },
  // Runtime OG-image generation (nuxt-og-image, bundled with @nuxtjs/seo) is off:
  // it needs a satori/takumi renderer + font resolution at prerender, which adds
  // real CI surface for little gain here. The site ships one static branded card
  // (public/og.png, built by scripts/gen-og.mjs) referenced from app.vue.
  // Per-project OG art is a documented owner follow-up (RENOVATION.md).
  ogImage: { enabled: false },
  // Person identity — @nuxtjs/seo injects Person + WebSite + WebPage JSON-LD on
  // every page from this.
  schemaOrg: {
    identity: {
      type: 'Person',
      name: 'Thomas La Salmonie',
      url: 'https://thomaslasalmonie.me',
      image: 'https://thomaslasalmonie.me/profile.jpeg',
      jobTitle: 'Full-stack web engineer',
      sameAs: [
        'https://github.com/ThomasLaSalmonie',
        'https://www.linkedin.com/in/lasalmoniethomas/',
        'https://twitter.com/tlasalmonie'
      ]
    }
  },
  // Cross-fade between routes via the View Transitions API (design system: ~360ms
  // route transition). Reduced-motion is honoured in app/assets/css/main.css.
  experimental: {
    viewTransition: true
  },
  typescript: {
    strict: true
    // typeCheck stays off — CI runs `nuxt typecheck` as a separate gate, and
    // enabling it here would pull vue-tsc into every dev/build run.
  },
  vite: {
    plugins: [tailwindcss()]
  },
  eslint: {
    config: {
      stylistic: false
    }
  }
});
