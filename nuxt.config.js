export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Arctic-EDS",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/scss/main.scss"],

  env: {
    geoserverUrl:
      process.env.GEOSERVER_URL || "https://gs.mapventure.org/geoserver/wms",
    apiUrl: process.env.SNAP_API_URL || "https://earthmaps.io",
    rasdamanUrl:
      process.env.RASDAMAN_URL || "https://zeus.snap.uaf.edu/rasdaman/ows",
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/plotly.client", "~/plugins/leaflet.client.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    // We're doing a custom build, so don't include
    // the pre-generated CSS.
    ["nuxt-buefy", { css: false }],
    // https://www.npmjs.com/package/nuxt-leaflet
    "nuxt-leaflet",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "nuxt-vuex-router-sync",
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
