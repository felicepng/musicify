// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'musicify',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        {
          name: 'description',
          content:
            'An application that generates and previews song recommendations from genres, using Nuxt.js and Spotify API.',
        },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
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
  modules: ['nuxt-icon'],
});
