// Some properties reused in the OpenGraph tags.
var metas = {
  title: 'Arctic Engineering Data Support System (Arctic-EDS)',
  description:
    'Access projected climate model and environmental data for Alaska.',
  preview: '/preview.jpg',
  url: 'https://arcticeds.org',
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Arctic-EDS',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { itemprop: 'name', content: metas.title },
      { itemprop: 'description', content: metas.description },
      { itemprop: 'image', content: metas.preview },
      { property: 'og:title', content: metas.title },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: metas.url },
      { property: 'og:image', content: metas.preview },
      { property: 'og:description', content: metas.description },
      { property: 'og:site_name', content: metas.title },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        async: true,
        defer: true,
        'data-website-id': '1f4a98e7-d5cb-4295-82fc-5a4d41328038',
        src: 'https://umami.snap.uaf.edu/script.js',
        'data-domains': 'arcticeds.org',
        'data-do-not-track': true,
      },
      {
        type: 'text/javascript',
        src: '//script.crazyegg.com/pages/scripts/0126/7664.js',
        async: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss'],

  env: {
    geoserverUrl:
      process.env.GEOSERVER_URL || 'https://gs.earthmaps.io/geoserver/wms',
    apiUrl: process.env.SNAP_API_URL || 'https://earthmaps.io',
    rasdamanUrl:
      process.env.RASDAMAN_URL || 'https://maps.earthmaps.io/rasdaman/ows',
    mockApi: process.env.MOCK_API || false,
    safeMode: process.env.EDS_SAFE_MODE || false,
    siteSlow: process.env.SITE_SLOW || false,
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/leaflet.client.js', '~/plugins/vuex-router-sync'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    // We're doing a custom build, so don't include
    // the pre-generated CSS.
    ['nuxt-buefy', { css: false }],
    // https://www.npmjs.com/package/nuxt-leaflet
    'nuxt-leaflet',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxt/http',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Router customizations
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/report/community/:communityId',
        component: resolve(__dirname, 'pages/report'),
      })
      routes.push({
        path: '/report/:lat/:lng',
        component: resolve(__dirname, 'pages/report'),
      })
      routes.push({
        name: 'default',
        path: '*',
        redirect: '/',
      })
    },
  },
}
