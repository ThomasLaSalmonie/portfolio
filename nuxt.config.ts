import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-09-08',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error recommended by vuetify
        config.plugins.push(vuetify({ autoImport: true }));
      });
    }
  ],
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
  typescript: {
    strict: true
    // typeCheck stays off — CI runs `nuxt typecheck` as a separate gate, and
    // enabling it here would pull vue-tsc into every dev/build run.
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },
  build: {
    transpile: [/vuetify/]
  },
  eslint: {
    config: {
      stylistic: false
    }
  }
});
