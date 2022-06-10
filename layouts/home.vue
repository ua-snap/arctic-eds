<template>
  <div>
    <HeaderBanner />
    <div class="brand--wrapper">
      <div class="brand--logo">
        <img src="~/assets/images/logo.svg" />
      </div>
      <div class="brand--titles">
        <h1>
          Arctic Environmental and Engineering Data + Design Support System
        </h1>
        <h2>
          Query + view historical, current and projected environmental data for
          Alaska
        </h2>
      </div>
    </div>
    <nuxt />
    <Footer />
  </div>
</template>
<style lang="scss" scoped>
.brand--wrapper {
  display: flex;
  justify-content: center;
  max-width: 98vw;
  margin: 2.5rem auto;
  .brand--logo {
    width: 20vw;
    img {
      max-width: 20vw;
    }
  }
  .brand--titles {
    margin-top: 4.5rem;
    margin-left: 2rem;
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
import HeaderBanner from "~/components/HeaderBanner";
import BetaFeedback from "~/components/BetaFeedback";
import Footer from "~/components/Footer";

export default {
  components: { HeaderBanner, BetaFeedback, Footer }
};
</script>
