// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'musicify',
      meta: [
        { name: 'description', content: 'An application for generating song recommendations from genres and artists.' }
      ],
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    clientId: '',
    clientSecret: '',
  },
  modules: ['nuxt-icon']
})
