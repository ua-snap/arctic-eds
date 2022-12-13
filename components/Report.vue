<template>
  <div>
    <div
      v-if="
        !$fetchState.pending &&
        !$fetchState.error &&
        Object.keys(results).length > 0
      "
    >
      <section class="section intro">
        <div class="container">
          <h2 class="title is-2">
            Environmental &amp; engineering data for {{ placeName }}
          </h2>
          <h3 class="title is-3">Introduction</h3>
          <div class="content is-size-5">
            <p>
              This report contains information from many different datasets and
              types of data. References to data sources and academic papers are
              included and should be consulted to interpret the purpose and
              applicability of specific data in an engineering context.
            </p>
            <p>
              Data presented here are at various spatial resolutions, which
              should be considered in the context of interpreting the variable
              for a given location.
            </p>
            <p>
              Sections below show summaries and subsets of full data sources to
              allow for streamlined access to general trends. Complete data can
              be downloaded within each section. Some sections show minimum,
              mean and maximum values for different time periods; use the mean
              column to assess general trends over time.
            </p>
            <p>
              <strong>Elevation:</strong> {{ results.elevation.mean }}
              {{ results.elevation.units }}
            </p>
            <p><strong>Geology:</strong> {{ results.geology.name }}</p>
            <p>
              <strong>Physiography:</strong> {{ results.physiography.name }}
            </p>
          </div>

          <MiniMap />
          <UnitRadio />
          <CloseReportButton />
        </div>
      </section>
      <section class="section precipitation">
        <div class="container">
          <h2 class="title is-2">Precipitation</h2>
          <div class="content is-size-5">
            <p>
              These data come from two types of data sources: historical modeled
              data (CRU TS), and projected downscaled GCM data from across five
              different climate models (NCAR CCSM4, GFDL CM3, GISS E2-R, MRI
              CGCM3, and IPSL CM5A-LR) and three climate scenarios (RCP 4.5, 6.0
              and 8.5).
            </p>
            <p>
              Projected data can show more variability than the historical data
              in the tables below because it is showing the extreme values
              across all models and scenarios.
            </p>
          </div>

          <h3 class="title is-3 mt-6">Total annual precipitation</h3>
          <div class="content is-size-5">
            <p>
              Both historical and projected data for total precipitation are at
              a 2&#x202F;km spatial resolution.
            </p>
          </div>
          <PrecipitationReport />

          <h3 class="title is-3 mt-6">Snowfall</h3>
          <div class="content is-size-5">
            <p>Snowfall equivalent totals includes both rain and snow.</p>
            <p>
              Both historical and projected data for snowfall equivalent are at
              a 771&#x202f;m spatial resolution.
            </p>
          </div>

          <SnowfallReport />
        </div>
      </section>
      <section class="section temperature">
        <div class="container">
          <h2 class="title is-2">Temperature</h2>
          <div class="content is-size-5">
            <p>
              These data come from two types of data sources: historical modeled
              data (CRU TS), and projected downscaled GCM data from across five
              different climate models (NCAR CCSM4, GFDL CM3, GISS E2-R, MRI
              CGCM3, and IPSL CM5A-LR) and three climate scenarios (RCP 4.5, 6.0
              and 8.5). Projected data can show more variability than the
              historical data in the table below because it is showing the
              extreme values across all models and scenarios.
            </p>
            <p>
              Use the mean column to assess general trends over time. Both
              historical and projected data are at a 2&#x202f;km spatial
              resolution.
            </p>
          </div>
          <TemperatureReport />
        </div>
      </section>
      <section class="section temperature-index">
        <div class="container">
          <h2 class="title is-2">Temperature Indices</h2>
          <div class="content is-size-5">
            <p>
              The results in the sections below come from two types of data
              sources: historical modeled data (ERA Interim) and projected
              climate conditions using two climate models (NCAR CCSM4 and GFDL
              CM3) and one emissions scenario (RCP 8.5).
            </p>
            <p>
              Both historical and projected data are downscaled from their
              native resolutions using the WRF model. Data are at 20&#x202f;km
              resolution.
            </p>
          </div>

          <h3 class="title is-3 mt-6">Heating Degree Days</h3>
          <HeatingDegreeDaysReport />

          <h3 class="title is-3 mt-6">Freezing Index</h3>
          <FreezingIndexReport />

          <h3 class="title is-3 mt-6">Design Freezing Index</h3>
          <div class="content is-size-5">
            <p>
              For both models, every annual freezing index value for this
              location in the 30&ndash;year time era indicated was calculated
              and the three coldest years (greatest freezing index values) were
              identified. The design freezing index value for each model was
              computed by finding the mean of those three values, then taking
              the average across both models.
            </p>
          </div>
          <DesignFreezingIndexReport />

          <h3 class="title is-3 mt-6">Thawing Index</h3>
          <ThawingIndexReport />

          <h3 class="title is-3 mt-6">Design Thawing Index</h3>
          <div class="content is-size-5">
            <p>
              For both models, every annual thawing index value for this
              location in the 30&ndash;year time era indicated was calculated
              and the three warmest years (greatest thawing index values) were
              identified. The design thawing index value for each model was
              computed by finding the mean of those three values, then taking
              the average across both models.
            </p>
          </div>
          <DesignThawingIndexReport />
        </div>
      </section>
      <section class="section permafrost">
        <div class="container">
          <h2 class="title is-2">Permafrost</h2>
          <PermafrostReport />
        </div>
      </section>
    </div>
    <div v-else>
      <section class="section">
        <div class="container">
          <LoadingStatus :state="state" />
        </div>
      </section>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content {
  max-width: 50rem;
}
</style>
<script>
import { mapGetters } from 'vuex'
import UnitRadio from '~/components/UnitRadio'
import MiniMap from '~/components/MiniMap'
import TemperatureReport from '~/components/reports/Temperature'
import PrecipitationReport from '~/components/reports/Precipitation'
import SnowfallReport from '~/components/reports/Snowfall'
import PermafrostReport from '~/components/reports/Permafrost'
import HeatingDegreeDaysReport from '~/components/reports/HeatingDegreeDays'
import DesignFreezingIndexReport from '~/components/reports/DesignFreezingIndex'
import DesignThawingIndexReport from '~/components/reports/DesignThawingIndex'
import FreezingIndexReport from '~/components/reports/FreezingIndex'
import ThawingIndexReport from '~/components/reports/ThawingIndex'
export default {
  name: 'FullReport',
  components: {
    UnitRadio,
    MiniMap,
    TemperatureReport,
    PrecipitationReport,
    SnowfallReport,
    PermafrostReport,
    HeatingDegreeDaysReport,
    DesignFreezingIndexReport,
    DesignThawingIndexReport,
    FreezingIndexReport,
    ThawingIndexReport,
  },
  computed: {
    state: function () {
      return this.$fetchState
    },
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
      isPlaceDefined: 'report/isPlaceDefined',
      latLng: 'report/latLng',
    }),
  },
  mounted() {
    this.$fetch()
  },

  async fetch() {
    // await this.$store.dispatch('report/fetchPlaces')

    if (this.isPlaceDefined) {
      let url =
        process.env.apiUrl +
        '/eds/all/' +
        this.latLng.lat +
        '/' +
        this.latLng.lng

      await this.$store.dispatch('report/apiFetch', url)
    }
  },
}
</script>
