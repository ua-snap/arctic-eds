<template>
  <div>
    <HeaderBanner />
    <div class="brand columns">
      <div class="column is-one-third left">
        Arctic<br />engineering<br />data support.
      </div>
      <div class="column is-one-third logo">
        <img src="~/assets/images/arctic-eds-logo.svg" alt="Arctic EDS" />
      </div>
      <div class="column is-one-third right">
        Environmental<br />information<br />you can trust.
      </div>
    </div>
    <Navbar />
    <nuxt />
    <Footer />
  </div>
</template>
<style lang="scss" scoped>
.brand {
  text-align: center;
  background-color: #f2c716;
  height: 25.5vh;
  border-bottom: 0.5rem solid #312e30;
  color: #fff;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px #312e30;
  font-size: 2.5rem;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1;
  font-family: 'Barlow', sans-serif;
  .logo img {
    height: 26vh;
    margin-top: -2vh;
    padding: 0;
  }
  .left {
    text-align: right;
    padding-right: 2rem;
    padding-top: 1.8rem;
  }
  .right {
    text-align: left;
    padding-left: 2rem;
    padding-top: 1.8rem;
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
