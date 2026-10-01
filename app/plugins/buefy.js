// Registers the Buefy components the site uses (Vue 3 line of Buefy, built
// on Bulma 1). Replaces the Nuxt 2 nuxt-buefy module, which was configured
// with `css: false` because the styles are compiled from SCSS in
// assets/scss/main.scss; that file also includes only these components'
// styles.
//
// Each component is imported from its own file under dist/esm. Importing
// them by name from 'buefy' resolves to Buefy's single-file ESM build, which
// doesn't tree-shake, so every component (about 75 KB gzipped) would ship.
// To use another Buefy component, add it here and its styles in main.scss.
import Field from 'buefy/dist/esm/field'
import Progress from 'buefy/dist/esm/progress'
import Radio from 'buefy/dist/esm/radio'

export default defineNuxtPlugin(nuxtApp => {
  for (const component of [Field, Progress, Radio]) {
    nuxtApp.vueApp.use(component)
  }
})
