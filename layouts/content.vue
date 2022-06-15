<template>
  <div>
    <HeaderBanner />
    <Navbar />
    <Breadcrumbs />
    <nuxt />
    <Footer />
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import HeaderBanner from '~/components/HeaderBanner'
import Navbar from '~/components/Navbar'
import Breadcrumbs from '~/components/Breadcrumbs'
import Footer from '~/components/Footer'

export default {
  components: { HeaderBanner, Navbar, Breadcrumbs, Footer },
}
</script>
