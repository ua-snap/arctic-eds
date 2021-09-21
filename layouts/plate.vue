<template>
  <div>
    <HeaderBanner />
    <div>Logosomething</div>
    <Breadcrumbs />
    <nuxt />
    <Footer />
  </div>
</template>
<style lang="scss" scoped>

</style>
<script>
import HeaderBanner from "~/components/HeaderBanner";
import Footer from "~/components/Footer";
import Breadcrumbs from "~/components/Breadcrumbs";

export default {
  components: { HeaderBanner, Footer },
};
</script>
