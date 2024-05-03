<template>
  <div v-if="isSnowfallPresent">
    <div class="block content is-size-5">
      <p>
        The following results are decadal means of total annual snowfall water
        equivalent (SFE) values derived from the product of snow-day fraction
        (the fraction of precipitation days in which precipitation falls as
        snow) and precipitation values from downscaled climate simulations
        representing five different models (NCAR CCSM4, GFDL CM3, GISS E2-R, MRI
        CGCM3, and IPSL CM5A-LR) and three emissions scenarios (RCP 4.5, 6.0 and
        8.5). Model selection was based on the models&rsquo; superior historical
        performance for the Alaska region for three variables: surface air
        temperature, precipitation, and sea level pressure.
      </p>

      <p>
        Climate simulations were statistically downscaled and bias corrected via
        the delta method in which a model&rsquo;s future change at a particular
        location and time is added to the respective baseline mean value. This
        delta value is then added to a higher-resolution observationally-based
        climatology.
      </p>

      <p>
        The modeled baseline for these data is the 1910–2009 Climatic Research
        Unit Time Series (CRU TS) dataset (version 3.1). CRU TS is a continuous,
        gridded dataset created through interpolation of point measurements
        based on assumptions about the spatial correlation of climate variables.
        CRU TS is a widely used climate dataset and product of the Climate
        Research Unit at the University of East Anglia. CRU-TS data were
        downscaled to a 1971–2000 climatology produced by the PRISM
        (Parameter-elevation Regressions on Independent Slopes Model) Climate
        Group with the Northwest Alliance for Computational Science &
        Engineering at Oregon State University.
      </p>

      <p>
        The available data extent is the terrestrial area of Alaska. The spatial
        resolution (grid cell size) of all data is 771 m by 771 m.
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
        <li v-if="!safeMode">
          <DownloadCsvButton
            text="Download snowfall water equivalent data as CSV"
            endpoint="snow/snowfallequivalent"
          />
        </li>
        <li v-if="!safeMode">
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
import { safe } from '~/mixins/safe.js'

export default {
  name: 'SnowfallReport',
  mixins: [safe],
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
