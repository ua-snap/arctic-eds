<template>
  <div v-if="isSnowfallPresent">
    <div class="block content is-size-5">
      <p>
        These data show downscaled projections of decadal mean of total annual
        snowfall equivalent. Output is available for the NCAR CCSM4, GFDL CM3,
        GISS E2-R, IPSL CM5A-LR, and MRI CGCM3 models and three emissions
        scenarios (RCP 4.5, RCP 6.0 and RCP 8.5). Spatial resolution:
        771&#8239;m.
      </p>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">Data preview</h4>

      <p class="content is-size-5 mb-1">
        CSV download includes decadal mean of total annual snowfall equivalent
        for both historical CRU TS 3.1 (1910&ndash;2009) and modeled projected
        (2010&ndash;2099) datasets. Data are provided in metric units.
      </p>
      <PreviewTable
        :csvString="results.snowfall.preview"
        sizeBlurb="~145 rows, 4 columns, ~5kb"
      />
    </div>

    <div class="block data-outro content is-size-5 no-print">
      <h4 class="title is-5 no-print">
        Data access &amp; additional information
      </h4>

      <ul>
        <li>
          <DownloadCsvButton
            text="Download snowfall water equivalent data as CSV"
            endpoint="snow/snowfallequivalent"
          />
        </li>
        <li>
          Source datasets and metadata:
          <ul>
            <li>
              <a
                href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/557db5d5-dbeb-470a-a9c4-b80d78aa8668"
                >Historical Decadal Averages of Monthly Snowfall Equivalent 771m
                CRU TS3.0/TS3.1</a
              >
            </li>
            <li>
              <a
                href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/7c0c1a65-794e-4770-aa72-4628d357808e"
                >Projected Decadal Averages of Monthly Snowfall Equivalent 771m
                CMIP5/AR5</a
              >
            </li>
          </ul>
        </li>
        <li>
          Academic references:
          <blockquote>
            McAfee, S. A., Walsh, J. E., &amp; Rupp, T. S. (2013). Statistically
            downscaled projections of snow/rain partitioning for Alaska.
            <i>Hydrological Processes, 28</i>(12), 3930&ndash;3946.
            <a href="https://doi.org/10.1002/hyp.9934"
              >https://doi.org/10.1002/hyp.9934</a
            >
          </blockquote>
          <blockquote>
            Littell J. S., McAfee S. A., &amp; Hayward G. D. (2018). Alaska
            Snowpack Response to Climate Change: Statewide Snowfall Equivalent
            and Snowpack Water Scenarios, <i>Water 10</i>(5) 668;
            <a href="https://doi.org/10.3390/w10050668"
              >https://doi.org/10.3390/w10050668</a
            >
          </blockquote>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DownloadCsvButton from '~/components/DownloadCsvButton'
import UnitWidget from '~/components/UnitWidget'
import PreviewTable from '~/components/PreviewTable'

export default {
  name: 'SnowfallReport',
  components: {
    DownloadCsvButton,
    UnitWidget,
    PreviewTable,
  },
  computed: {
    ...mapGetters({
      results: 'report/results',
      isSnowfallPresent: 'report/isSnowfallPresent',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
