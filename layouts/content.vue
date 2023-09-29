<template>
  <div>
    <HeaderBanner />
    <div class="lead">
      <span class="logo">Arctic-EDS</span>
      <span class="name">Arctic Engineering Design Support System</span>
    </div>
    <Navbar />
    <section class="section">
      <nuxt />
    </section>
    <Footer />
  </div>
</template>
<style lang="scss" scoped>
.lead {
  text-transform: uppercase;
  text-align: center;
  border-bottom: 12px solid #f2c716;
  padding-top: 6px;
  padding-bottom: 0;
  margin-bottom: 0;
  line-height: 1;
  .logo {
    font-family: 'Acknowledgement', sans-serif;
    font-size: 32px;
  }
  .name {
    font-family: 'Barlow', sans-serif;
    font-weight: 900;
    font-size: 28px;
    display: inline-block;
    padding-left: 1rem;
  }
}
</style>
<script>
import HeaderBanner from '~/components/HeaderBanner'
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'

export default {
  components: { HeaderBanner, Navbar, Footer },
}
</script>
