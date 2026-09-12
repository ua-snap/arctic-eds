import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Some properties reused in the OpenGraph tags.
const metas = {
  title: 'Arctic Engineering Data Support System (Arctic-EDS)',
  description:
    'Access projected climate model and environmental data for Alaska.',
  preview: '/preview.jpg',
  url: 'https://arcticeds.org',
}

// Content shown when JavaScript is disabled. This was the <noscript> block
// in the Nuxt 2 app.html template; Nuxt 4 has no HTML template, so it is
// injected at the top of <body> through the head config instead.
const noscriptHtml = readFileSync(
  fileURLToPath(new URL('./app/assets/noscript.html', import.meta.url)),
  'utf8'
)

export default defineNuxtConfig({
  compatibilityDate: '2026-09-12',

  // Nuxt 2 used `target: 'static'`. In Nuxt 4 the equivalent is
  // `nuxt generate`, which prerenders every route it can find.
  ssr: true,

  app: {
    // Was `<div class="hide-if-noscript">{{ APP }}</div>` in app.html.
    rootAttrs: { class: 'hide-if-noscript' },

    // Global page headers
    head: {
      title: 'Arctic-EDS',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { key: 'description', name: 'description', content: '' },
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
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Material Design Icons for Buefy. The nuxt-buefy module used to
        // inject this: an async preload that promotes itself to a stylesheet.
        {
          type: 'text/css',
          href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css',
          rel: 'preload',
          as: 'style',
          onload: "this.rel='stylesheet'",
        },
      ],
      script: [
        {
          async: true,
          defer: true,
          'data-website-id': '1f4a98e7-d5cb-4295-82fc-5a4d41328038',
          src: 'https://umami.snap.uaf.edu/script.js',
          'data-domains': 'arcticeds.org',
          'data-do-not-track': 'true',
        },
      ],
      noscript: [{ innerHTML: noscriptHtml, tagPosition: 'bodyOpen' }],
    },
  },

  // Global CSS
  css: ['~/assets/scss/main.scss'],

  // Build-time configuration. Same environment variable names as before.
  // Read as `this.$config.public.*` in components or
  // `useRuntimeConfig().public.*` in stores and mixins.
  runtimeConfig: {
    public: {
      geoserverUrl:
        process.env.GEOSERVER_URL || 'https://gs.earthmaps.io/geoserver/wms',
      apiUrl: process.env.SNAP_API_URL || 'https://earthmaps.io',
      rasdamanUrl:
        process.env.RASDAMAN_URL || 'https://maps.earthmaps.io/rasdaman/ows',
      mockApi: !!process.env.MOCK_API,
      safeMode: !!process.env.EDS_SAFE_MODE,
      siteSlow: !!process.env.SITE_SLOW,
    },
  },

  modules: ['@pinia/nuxt'],

  build: {
    // Buefy ships CommonJS and ESM builds but no package "exports" map, so
    // Node's resolver (used by the prerender/server bundle) picks the CJS
    // build, whose default import is not the plugin. Bundling it with the
    // server code makes the ESM build win on both sides.
    transpile: ['buefy'],
  },

  hooks: {
    // Router customizations, previously `router.extendRoutes` in Nuxt 2:
    // two extra paths render the report page, and unknown paths go home.
    'pages:extend'(pages) {
      const report = pages.find(page => page.path === '/report')
      if (!report) {
        throw new Error('pages/report.vue not found; cannot add report routes')
      }
      pages.push(
        {
          name: 'report-community',
          path: '/report/community/:communityId',
          file: report.file,
        },
        {
          name: 'report-latlng',
          path: '/report/:lat/:lng',
          file: report.file,
        },
        { name: 'default', path: '/:pathMatch(.*)*', redirect: '/' }
      )
    },
  },
})
