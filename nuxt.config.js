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
  plugins: ["~/plugins/plotly.client", "~/plugins/leaflet.client.js", '~/plugins/vuex-router-sync',],

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
        name: 'physiography-geology-community'
      })
      routes.push({
        path: '/physiography/geology/report/:lat/:lng',
        component: resolve(__dirname, 'pages/physiography/geology'),
        name: 'physiography-geology-lat-lng'
      })
      routes.push({
        path: '/physiography/permafrost/report/community/:communityId',
        component: resolve(__dirname, 'pages/physiography/permafrost'),
        name: 'physiography-permafrost-community'
      })
      routes.push({
        path: '/physiography/permafrost/report/:lat/:lng',
        component: resolve(__dirname, 'pages/physiography/permafrost'),
        name: 'physiography-permafrost-lat-lng'
      })
      routes.push({
        path: '/physiography/physiography/report/community/:communityId',
        component: resolve(__dirname, 'pages/physiography/physiography'),
        name: 'physiography-physiography-community'
      })
      routes.push({
        path: '/physiography/physiography/report/:lat/:lng',
        component: resolve(__dirname, 'pages/physiography/physiography'),
        name: 'physiography-physiography-lat-lng'
      })
      routes.push({
        path: '/climate/precipitation/report/community/:communityId',
        component: resolve(__dirname, 'pages/climate/precipitation'),
        name: 'climate-precipitation-community'
      })
      routes.push({
        path: '/climate/precipitation/report/:lat/:lng',
        component: resolve(__dirname, 'pages/climate/precipitation'),
        name: 'climate-precipitation-lat-lng'
      })
      routes.push({
        path: '/climate/snowfall/report/community/:communityId',
        component: resolve(__dirname, 'pages/climate/snowfall'),
        name: 'climate-snowfall-community'
      })
      routes.push({
        path: '/climate/snowfall/report/:lat/:lng',
        component: resolve(__dirname, 'pages/climate/snowfall'),
        name: 'climate-snowfall-lat-lng'
      })
      routes.push({
        path: '/climate/temperature/report/community/:communityId',
        component: resolve(__dirname, 'pages/climate/temperature'),
        name: 'climate-temperature-community'
      })
      routes.push({
        path: '/climate/temperature/report/:lat/:lng',
        component: resolve(__dirname, 'pages/climate/temperature'),
        name: 'climate-temperature-lat-lng'
      })
      routes.push({
        path: '/engineering/freezing-index/report/community/:communityId',
        component: resolve(__dirname, 'pages/engineering/freezing-index'),
        name: 'engineering-freezing-community'
      })
      routes.push({
        path: '/engineering/freezing-index/report/:lat/:lng',
        component: resolve(__dirname, 'pages/engineering/freezing-index'),
        name: 'engineering-freezing-lat-lng'
      })
      routes.push({
        path: '/engineering/design-freezing-index/report/community/:communityId',
        component: resolve(__dirname, 'pages/engineering/design-freezing-index'),
        name: 'engineering-design-freezing-community'
      })
      routes.push({
        path: '/engineering/design-freezing-index/report/:lat/:lng',
        component: resolve(__dirname, 'pages/engineering/design-freezing-index'),
        name: 'engineering-design-freezing-lat-lng'
      })
      routes.push({
        path: '/engineering/thawing-index/report/community/:communityId',
        component: resolve(__dirname, 'pages/engineering/thawing-index'),
        name: 'engineering-thawing-community'
      })
      routes.push({
        path: '/engineering/thawing-index/report/:lat/:lng',
        component: resolve(__dirname, 'pages/engineering/thawing-index'),
        name: 'engineering-thawing-lat-lng'
      })
      routes.push({
        path: '/engineering/design-thawing-index/report/community/:communityId',
        component: resolve(__dirname, 'pages/engineering/design-thawing-index'),
        name: 'engineering-design-thawing-community'
      })
      routes.push({
        path: '/engineering/design-thawing-index/report/:lat/:lng',
        component: resolve(__dirname, 'pages/engineering/design-thawing-index'),
        name: 'engineering-design-thawing-lat-lng'
      })
      routes.push({
        path: '/engineering/heating-degree-days/report/community/:communityId',
        component: resolve(__dirname, 'pages/engineering/heating-degree-days'),
        name: 'engineering-heating-degree-days-community'
      })
      routes.push({
        path: '/engineering/heating-degree-days/report/:lat/:lng',
        component: resolve(__dirname, 'pages/engineering/heating-degree-days'),
        name: 'engineering-heating-degree-days-lat-lng'
      })
    }
  }
};
