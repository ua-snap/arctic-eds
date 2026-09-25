<template>
  <div>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <header>
      <HeaderBanner />
      <!-- Every page, the home page included, supplies its own h1. -->
      <Navbar />
    </header>
    <main id="main-content" class="section" tabindex="-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>
<style lang="scss" scoped>
#main-content:focus {
  outline: none !important;
}
</style>
<script setup>
import HeaderBanner from '~/components/HeaderBanner'
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
</script>
