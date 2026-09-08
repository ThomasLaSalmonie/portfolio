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
    'shadcn-nuxt'
  ],
  css: ['~/assets/css/main.css'],
  // Fully static output — every route prerendered to HTML (see RENOVATION.md, decision #8).
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
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
