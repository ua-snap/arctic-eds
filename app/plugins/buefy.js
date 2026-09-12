// Registers Buefy (Vue 3 line, built on Bulma 1). Replaces the Nuxt 2
// nuxt-buefy module, which was configured with `css: false` because the
// styles are compiled from SCSS in assets/scss/main.scss.
import Buefy from 'buefy'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Buefy)
})
