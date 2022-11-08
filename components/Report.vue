<template>
  <div>
    <hr />

    <div id="report">
      <div
        v-if="
          !$fetchState.pending &&
          !$fetchState.error &&
          Object.keys(results).length > 0
        "
      >
        <h3 class="title is-2">Full Report for {{ placeName }}</h3>
        <MiniMap />
        <UnitRadio />
        <CloseReportButton />
        <TemperatureReport />
        <PrecipitationReport />
        <SnowfallReport />
        <PermafrostReport />
        <HeatingDegreeDaysReport />
        <DesignFreezingIndexReport />
        <DesignThawingIndexReport />
        <EcoregionsReport />
        <FreezingIndexReport />
        <GeologyReport />
        <ThawingIndexReport />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UnitRadio from '~/components/UnitRadio'
import MiniMap from '~/components/MiniMap'
import TemperatureReport from '~/components/plates/temperature/Report'
import PrecipitationReport from '~/components/plates/precipitation/Report'
import SnowfallReport from '~/components/plates/snowfall/Report'
import PermafrostReport from '~/components/plates/permafrost/Report'
import HeatingDegreeDaysReport from '~/components/plates/heating_degree_days/Report'
import DesignFreezingIndexReport from '~/components/plates/design_freezing_index/Report'
import DesignThawingIndexReport from '~/components/plates/design_thawing_index/Report'
import EcoregionsReport from '~/components/plates/ecoregions/Report'
import FreezingIndexReport from '~/components/plates/freezing_index/Report'
import GeologyReport from '~/components/plates/geology/Report'
import ThawingIndexReport from '~/components/plates/thawing_index/Report'
export default {
  name: 'FullReport',
  components: {
    UnitRadio,
    TemperatureReport,
    PrecipitationReport,
    SnowfallReport,
    PermafrostReport,
    HeatingDegreeDaysReport,
    DesignFreezingIndexReport,
    DesignThawingIndexReport,
    EcoregionsReport,
    FreezingIndexReport,
    GeologyReport,
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

  watch: {
    latLng: function () {
      this.$fetch()
    },
  },
  async fetch() {
    await this.$store.dispatch('report/fetchPlaces')

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

<style lang="scss" scoped></style>
