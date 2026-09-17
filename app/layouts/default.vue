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

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>
