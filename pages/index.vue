<template>
  <div>
    <div class="main">
      <div class="container">
        <div class="content is-size-5">
          <p>
            Improving the resiliency of designs for long-lived infrastructure
            requires incorporating a range of future climate conditions that are
            likely to be different from the past. Design standards relying
            solely on historical observations may assume that the climate is
            stationary - but an Arctic climate warming four times faster than
            the rest of world[1] and numerous simulations of climate futures
            indicate that the past is no longer a reliable portrait of the
            conditions under which infrastructure will have to perform in the
            future. One tool available to engineers interested in improving
            infrastructure climate resilience are high-resolution (i.e.
            downscaled) climate models that provide insight into localized
            future projections of temperature, precipitation, and other
            environmental conditions such as permafrost. However, incorporating
            downscaled climate model output to engineering applications
            introduces uncertainties when compared with engineering processes
            that rely solely on historical observation data. A systematic
            approach to integrating climate trends into engineering applications
            including selecting appropriate climate model output, understanding
            climate model uncertainties, and identifying issues of spatial and
            temporal scales is required.
          </p>

          <h2>What is the Arctic-EDS?</h2>

          <p>
            The purpose of the Arctic Environmental and Engineering Data and
            Design Support System (Arctic-EDS) is to facilitate the application
            of downscaled climate model output to existing engineering methods.
            The Arctic-EDS simplifies and centralizes the process of finding,
            selecting, extracting, and formatting downscaled climate model
            output for engineering applications. The most highly skilled and
            relevant climate models for the Arctic are pre-selected for the
            user. Data extraction is simple: search by Alaska community name or
            by location (latitude, longitude) to fetch a report with data for
            the climate model spatial grid cells closest to your location of
            interest. Each report contains numerous climate variables like
            temperature and precipitation and indices derived thereof like
            heating degree days or extreme precipitation exceedance
            probabilities. All data are available for download in a tabular
            (spreadsheet) data format, and links to gridded source datasets and
            academic references are also provided. Data reports also contain
            links to example computational notebooks where users can immediately
            apply downscaled climate model output to engineering applications
            without downloading data or installing extra software.
          </p>

          <h2>Data Uncertainty + How To Use This Data</h2>

          <p>
            All downscaled climate model outputs are vulnerable to various
            sources of uncertainty including:
          </p>

          <ul>
            <li>
              Natural climate variability: even the most sophisticated climate
              models cannot perfectly replicate the totality of the Earth’s
              complex climate system.
            </li>
            <li>
              Each individual climate model includes choices regarding how to
              represent and compute the state of Earth’s climate system: these
              assumptions and parameterizations induce uncertainty and bias.
            </li>
            <li>
              Uncertainty regarding future societal and economic behaviors at a
              global scale including levels of greenhouse gas emissions.
              Emissions scenarios called “representative concentration pathways
              (RCPs)” are used to represent these various futures and are used
              to force climate model simulations.
            </li>
            <li>
              Spatial and temporal resolutions of downscaled climate data:
              Earth’s climate processes are continuous in time and space - but
              require finite representations of time and space to be modeled
              effectively.
            </li>
          </ul>

          <p>The Arctic-EDS regulates some of these uncertainties by:</p>
          <ul>
            <li>
              presenting data from multiple climate models and multiple
              emissions scenarios to provide ensemble ranges and bounds for each
              type of variable
            </li>
            <li>
              explicitly stating the spatial and temporal scales of each dataset
            </li>
            <li>
              presenting data that have been bias corrected via the comparison
              of hindcast climate model simulations to historical conditions
            </li>
          </ul>

          <p>
            No climate model or data processing technique can entirely eliminate
            uncertainty, but the Arctic-EDS can be used to understand how and
            why gridded downscaled climate model output departs from the
            historical observational data, and what the ramifications of that
            departure are for infrastructure climate resiliency. Note that each
            engineering application may require additional steps to interpret
            downscaled climate model results and apply them to a specific
            engineering design. For more guidance on using the Arctic-EDS see
            the
            <NuxtLink to="/guidance">Guidance</NuxtLink> page. To get started
            with a data report, enter your Alaska community or location of
            interest in the search boxes below.
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
