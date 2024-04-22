<template>
  <div>
    <div class="main">
      <div class="container">
        <div class="content is-size-4">
          <p>
            Improving infrastructure resilience requires considering future
            climate conditions that may differ from the past. Historical
            observations are insufficient&mdash;the Arctic is warming four times
            faster than the rest of the world.
          </p>
        </div>
        <div class="content is-size-5">
          <p>
            High-resolution downscaled climate models provide valuable insights
            into localized climate futures of temperature, precipitation, and
            other environmental conditions such as permafrost, but their output
            introduces uncertainties to engineering applications. A systematic
            approach is needed to integrate future climate trends into
            engineering, including selecting appropriate models, understanding
            uncertainties, and addressing variable spatial and temporal scales.
          </p>
          <p>
            The Arctic Environmental and Engineering Data and Design Support
            System (Arctic-EDS) streamlines the process of using downscaled
            climate models for engineering. The Arctic-EDS simplifies and
            centralizes the process of finding, selecting, extracting, and
            formatting downscaled climate model output: it pre-selects relevant
            models, simplifies data extraction, and provides reports with future
            projections of climate variables and indices. Data is available for
            download in a tabular format, with links to source datasets and
            academic references. Example computational notebooks demonstrate how
            to apply the data to engineering applications.
          </p>
          <p>
            All downscaled climate model outputs are vulnerable to various
            sources of uncertainty, including:
          </p>
          <ul>
            <li>Natural climate variability</li>
            <li>Model assumptions and parameterizations</li>
            <li>
              Uncertainty regarding future societal and economic behaviors
            </li>
            <li>Spatial and temporal resolutions of downscaled climate data</li>
          </ul>
          <p>The Arctic-EDS regulates these uncertainties by:</p>
          <ul>
            <li>
              Presenting data from multiple climate models and emissions
              scenarios
            </li>
            <li>Stating spatial and temporal scales of each dataset</li>
            <li>Presenting bias-corrected data</li>
          </ul>
          <p>
            No climate model or data processing technique can entirely eliminate
            uncertainty, but the Arctic-EDS exposes how and why downscaled
            climate model output departs from historical data, and what the
            ramifications of that departure are for infrastructure climate
            resiliency. Each engineering application may require additional
            steps to interpret results and apply them to a specific
            design&mdash;see the
            <strong><NuxtLink to="/guidance">Guidance</NuxtLink></strong> page
            for more information.
          </p>
          <p>
            To get started, enter your Alaska community or location of interest
            in the search boxes below.
          </p>
        </div>

        <SearchControls />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main {
  padding-bottom: 6rem;
}
.content {
  max-width: 50rem;
  margin: 3rem auto;
  font-weight: 400;
};
</style>
<script>
import SearchControls from '~/components/SearchControls'

export default {
  name: 'HomePage',
  components: {
    SearchControls,
  },
  created() {
    // Switch back to clean URL after S3 redirect. Adapted from here:
    // https://via.studio/journal/hosting-a-reactjs-app-with-routing-on-aws-s3
    const path = (/#!(\/.*)$/.exec(this.$route.fullPath) || [])[1]
    if (path) {
      this.$router.push({ path: path })
    }
  },
}
</script>
