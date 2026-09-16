<template>
  <div>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <header>
      <HeaderBanner />
      <!-- The site title is the page's h1 on the home page only; every other
           page supplies its own h1. -->
      <component :is="isHome ? 'h1' : 'div'" class="lead">
        <span class="logo">Arctic-EDS</span><br />
        <span class="name"
          >Arctic Environmental and Engineering Data and Design Support
          System</span
        >
      </component>
      <Navbar />
    </header>
    <main id="main-content" class="section" tabindex="-1">
      <div v-if="siteSlow">
        <div class="container">
          <b-message
            title="Arctic-EDS is experiencing slow load times"
            type="is-warning"
            aria-close-label="Close message"
          >
            <p>
              We&rsquo;re sorry! Arctic-EDS is experiencing slower load times
              than usual. We&rsquo;re working to improve performance as soon as
              possible, but we don&rsquo;t have an estimated time for
              completion. Please check back soon, or reach out to us at
              <a href="mailto:uaf-snap-data-tools@alaska.edu"
                >uaf-snap-data-tools@alaska.edu</a
              >
              with questions.
            </p>
          </b-message>
        </div>
      </div>
      <slot />
    </main>
    <Footer />
  </div>
</template>
<style lang="scss" scoped>
.lead {
  text-transform: uppercase;
  text-align: center;
  border-bottom: 12px solid #8ba09a;
  padding-top: 12px;
  padding-bottom: 6px;
  margin-bottom: 0;
  line-height: 1;
  font-weight: normal;
  .logo {
    font-family: 'Acknowledgement', sans-serif;
    font-size: 38px;
  }
  .name {
    display: block;
    font-family: 'Barlow', sans-serif;
    font-weight: 900;
    font-size: 28px;
    display: inline-block;
    letter-spacing: 0.02em;
    padding-bottom: 0.75rem;
  }
}
#main-content:focus {
  outline: none !important;
}
</style>
<script setup>
import { computed } from 'vue'
import HeaderBanner from '~/components/HeaderBanner'
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'

const config = useRuntimeConfig()
const route = useRoute()
const isHome = computed(() => route.path === '/')
const siteSlow = computed(() => config.public.siteSlow)
</script>
