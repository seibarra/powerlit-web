import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  },
  devtools: { enabled: true },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@vee-validate/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/supabase'
  ],
  build: {
    transpile: ['vuetify'],
  },
  css: ['vuetify/styles'],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  colorMode: {
    preference: 'light',
    fallback: 'light', 
    classSuffix: 'light',
    storageKey: 'color-mode'
  },
  pinia: {
    storesDirs: ['./stores/**'],
  }
})