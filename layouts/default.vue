<template>
  <div>
    <HeaderBanner />
    <div class="lead">
      <span class="logo">Arctic-EDS</span><br>
      <span class="name">Arctic Environmental and Engineering Data and Design Support System</span>
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
  border-bottom: 12px solid #8ba09a;
  padding-top: 12px;
  padding-bottom: 6px;
  margin-bottom: 0;
  line-height: 1;
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
</style>
<script>
import HeaderBanner from '~/components/HeaderBanner'
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'

export default {
  components: { HeaderBanner, Navbar, Footer },
}
</script>
