<template>
  <div>
    <noscript>
      <div class="section">
        <div class="container-fluid">
          <div class="content">
            <h2>Arctic-EDS</h2>
            <h4>
              This site is a tool for exploring numerical outputs for
              high-resolution downscaled models that can provide valuable
              insights into possible future climate conditions in the Arctic.
            </h4>
            <p>
              <strong
                >We&rsquo;re sorry! This tool doesn&rsquo;t work properly
                without JavaScript enabled. Please enable it to
                continue.</strong
              >
            </p>
            <p>
              If you need help accessing this content, please email
              <a href="mailto:uaf-snap-data-tools@alaska.edu"
                >uaf-snap-data-tools@alaska.edu</a
              >.
            </p>
            <p>With JavaScript enabled, this site allows you to:</p>
            <ul>
              <li>
                Search by community or latitude and longitude pair for relavant
                data including temperature, precipitation, and more.
              </li>
              <li>
                Charts and graphs highlighting the difference between modeled
                historical and modeled future conditions.
              </li>
              <li>
                Online maps showing the spatial distribution of climate
                variables.
              </li>
            </ul>
            <div>
              <p>
                <strong>About the Arctic-EDS</strong>
              </p>
              <p>
                The Arctic Environmental and Engineering Data and Design Support
                System (Arctic-EDS) streamlines the process of using downscaled
                climate models for engineering. The Arctic-EDS simplifies and
                centralizes the process of finding, selecting, extracting, and
                formatting downscaled climate model output: it pre-selects
                relevant models, simplifies data extraction, and provides
                reports with future projections of climate variables and
                indices. Data is available for download in a tabular format,
                with links to source datasets and academic references. Example
                computational notebooks demonstrate how to apply the data to
                engineering applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </noscript>
    <div class="js-allowed">
      <HeaderBanner />
      <div class="lead">
        <span class="logo">Arctic-EDS</span><br />
        <span class="name"
          >Arctic Environmental and Engineering Data and Design Support
          System</span
        >
      </div>
      <Navbar />
      <section class="section">
        <nuxt />
      </section>
      <Footer />
    </div>
  </div>
</template>
<style lang="scss" scoped>
noscript + .js-allowed {
  display: none;
}
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
