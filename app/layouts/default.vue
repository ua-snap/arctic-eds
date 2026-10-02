<template>
  <div>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <header>
      <HeaderBanner />
      <!-- Every page, the home page included, supplies its own h1. -->
      <Navbar />
    </header>
    <!--
      Pages made of full-width bands (route meta "bands") supply their own
      Bulma sections; everything else sits in one.
    -->
    <main
      id="main-content"
      :class="{ section: !route.meta.bands }"
      tabindex="-1"
    >
      <slot />
    </main>
    <Footer />
  </div>
</template>
<script setup>
import HeaderBanner from '~/components/HeaderBanner'
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'

const route = useRoute()
</script>
