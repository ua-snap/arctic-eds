<template>
  <div>
    <HeaderBanner />
    <div class="outer">
      <div class="brand">
        <div class="left">
          <span>Arctic<br />engineering<br />data&nbsp;support.</span>
        </div>
        <div class="logo">
          <img src="~/assets/images/arctic-eds-logo.svg" alt="Arctic EDS" />
        </div>
        <div class="right">
          <span
            >Environmental<br />information<br />you&nbsp;can&nbsp;trust.</span
          >
        </div>
      </div>
    </div>
    <Navbar />
    <nuxt />
    <Footer />
  </div>
</template>
<style lang="scss" scoped>
.outer {
  background-color: #f2c716;
  border-bottom: 0.5rem solid #312e30;
}
.brand {
  display: flex;
  flex-flow: row;

  width: 1000px;
  margin: 0 auto;

  height: 180px;

  color: #fff;
  font-family: 'Barlow', sans-serif;
  font-size: 34px;
  font-weight: 900;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px #312e30;
  line-height: 1;
  letter-spacing: 1px;

  .column {
    border: 3px dashed blue;
  }

  .left,
  .right {
    display: flex;
    align-items: center;
    width: 220px;
  }

  .logo {
    display: flex;
    justify-content: center;
    width: 540px;
    img {
      position: relative;
      top: 5px;
    }
  }

  .left {
    justify-content: right;
    text-align: right;
  }
  .right {
    text-align: left;
  }

  @media (max-width: 1075px) {

    .left,
    .right {
      display: none;
    }
    .logo {
      margin: 0 auto;
      padding: 0 10px;
      width: 100%;
    }
    & {
      width: 100%;
    }
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
