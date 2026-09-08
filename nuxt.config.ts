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
