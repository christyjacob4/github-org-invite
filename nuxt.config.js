export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: `Invitation to ${process.env.ORG_NAME}`,
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss"
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://http.nuxtjs.org
    "@nuxt/http"
  ],

  http: {
    browserBaseURL : process.env.NODE_ENV === "production" ? process.env.BASE_URL : `http://localhost:3000`,
  },

  /*
   ** Server Middleware
   */
  serverMiddleware: [
    { path: '/api', handler: '~/api/index.js' },
  ],

  publicRuntimeConfig: {
    orgName: process.env.ORG_NAME,
    enableDiscord: process.env.DISCORD_TOKEN ? "true" : "false"
  }
};
