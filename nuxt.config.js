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
    "@nuxt/http"
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Router customizations
  router: {
    extendRoutes(routes, resolve) {
      // Order matters here; lat/lng needs to go last because it's "globby"
      routes.push({
        path: '/physiography/geology/report/community/:communityId',
        component: resolve(__dirname, 'pages/physiography/geology'),
      })
      routes.push({
        path: '/physiography/geology/report/:lat/:lng',
        component: resolve(__dirname, 'pages/physiography/geology'),
      })
      routes.push({
        path: '/physiography/permafrost/report/community/:communityId',
        component: resolve(__dirname, 'pages/physiography/permafrost'),
      })
      routes.push({
        path: '/physiography/permafrost/report/:lat/:lng',
        component: resolve(__dirname, 'pages/physiography/permafrost'),
      })
      routes.push({
        path: '/physiography/physiography/report/community/:communityId',
        component: resolve(__dirname, 'pages/physiography/physiography'),
      })
      routes.push({
        path: '/physiography/physiography/report/:lat/:lng',
        component: resolve(__dirname, 'pages/physiography/physiography'),
      })
      routes.push({
        path: '/climate/precipitation/report/community/:communityId',
        component: resolve(__dirname, 'pages/climate/precipitation'),
      })
      routes.push({
        path: '/climate/precipitation/report/:lat/:lng',
        component: resolve(__dirname, 'pages/climate/precipitation'),
      })
      routes.push({
        path: '/climate/snowfall/report/community/:communityId',
        component: resolve(__dirname, 'pages/climate/snowfall'),
      })
      routes.push({
        path: '/climate/snowfall/report/:lat/:lng',
        component: resolve(__dirname, 'pages/climate/snowfall'),
      })
      routes.push({
        path: '/climate/temperature/report/community/:communityId',
        component: resolve(__dirname, 'pages/climate/temperature'),
      })
      routes.push({
        path: '/climate/temperature/report/:lat/:lng',
        component: resolve(__dirname, 'pages/climate/temperature'),
      })
      routes.push({
        path: '/engineering/freezing-index/report/community/:communityId',
        component: resolve(__dirname, 'pages/engineering/freezing-index'),
      })
      routes.push({
        path: '/engineering/freezing-index/report/:lat/:lng',
        component: resolve(__dirname, 'pages/engineering/freezing-index'),
      })
      routes.push({
        path: '/engineering/design-freezing-index/report/community/:communityId',
        component: resolve(__dirname, 'pages/engineering/design-freezing-index'),
      })
      routes.push({
        path: '/engineering/design-freezing-index/report/:lat/:lng',
        component: resolve(__dirname, 'pages/engineering/design-freezing-index'),
      })
      routes.push({
        path: '/engineering/thawing-index/report/community/:communityId',
        component: resolve(__dirname, 'pages/engineering/thawing-index'),
      })
      routes.push({
        path: '/engineering/thawing-index/report/:lat/:lng',
        component: resolve(__dirname, 'pages/engineering/thawing-index'),
      })
      routes.push({
        path: '/engineering/design-thawing-index/report/community/:communityId',
        component: resolve(__dirname, 'pages/engineering/design-thawing-index'),
      })
      routes.push({
        path: '/engineering/design-thawing-index/report/:lat/:lng',
        component: resolve(__dirname, 'pages/engineering/design-thawing-index'),
      })
      routes.push({
        path: '/engineering/heating-degree-days/report/community/:communityId',
        component: resolve(__dirname, 'pages/engineering/heating-degree-days'),
      })
      routes.push({
        path: '/engineering/heating-degree-days/report/:lat/:lng',
        component: resolve(__dirname, 'pages/engineering/heating-degree-days'),
      })
    }
  }
};
