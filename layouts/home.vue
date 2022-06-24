<template>
  <div>
    <HeaderBanner />
    <div class="brand--wrapper">
      <div class="brand--logo is-flex is-flex-direction-row">
        <img src="~/assets/images/logo.svg" />
      </div>
      <div class="brand--titles">
        <h1>
          Arctic Environmental and Engineering Data + Design Support System
        </h1>
        <h2>
          Historical, current, and projected environmental data for Alaska
        </h2>
      </div>
    </div>
    <nuxt />
    <Footer />
  </div>
</template>
<style lang="scss" scoped>
.brand--wrapper {
  justify-content: center;
  max-width: 98vw;
  margin: 2.5rem auto;
  @media (min-width: 769px) {
    display: flex;
  }
  .brand--logo {
    max-width: 300px;
    @media (min-width: 769px) and (max-width: 950px) {
      width: 50vw;
    }
    @media (max-width: 768px) {
      margin: 0 auto;
    }
    @media (min-width: 769px) {
      flex: 0 0 15em;
    }
    @media (min-width: 769px) and (max-width: 1425px) {
      margin-left: 2rem;
    }
  }
  .brand--titles {
    margin: 2.5rem 2rem 0 2rem;
    color: #000;
    h1 {
      font-size: 2rem;
      font-weight: 900;
      border-bottom: 0.3rem solid #4b8cc5;
    }
    h2 {
      margin-top: 0.2rem;
      font-size: 1.55rem;
      font-weight: 400;
    }
  }
}
</style>
<script>
import HeaderBanner from '~/components/HeaderBanner'
import BetaFeedback from '~/components/BetaFeedback'
import Footer from '~/components/Footer'

export default {
  components: { HeaderBanner, BetaFeedback, Footer },
}
</script>
