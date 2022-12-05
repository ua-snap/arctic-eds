<template>
  <section class="section">
    <hr />
    <LoadingStatus :state="state" />
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
        <hr class="section-header" />
        <h3 class="title is-2">Precipitation Products</h3>
        <PrecipitationReport />
        <SnowfallReport />
        <hr class="section-header" />
        <h3 class="title is-2">Temperature Products</h3>
        <TemperatureReport />
        <hr class="section-header" />
        <h3 class="title is-2">Temperature Indices</h3>
        <HeatingDegreeDaysReport />
        <FreezingIndexReport />
        <ThawingIndexReport />
        <DesignFreezingIndexReport />
        <DesignThawingIndexReport />
        <hr class="section-header" />
        <h3 class="title is-2">Permafrost Products</h3>
        <PermafrostReport />
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-header {
  background-color: #999;
}
</style>
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
import FreezingIndexReport from '~/components/plates/freezing_index/Report'
import ThawingIndexReport from '~/components/plates/thawing_index/Report'
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
