import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error recommend by vuetify
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    'nuxt-gtag',
    //...
  ],
  gtag: {
    id: 'G-6T9WZ2WRBZ'
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  build: {
    transpile: [/vuetify/]
  }
})
