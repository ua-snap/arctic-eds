<template>
  <div>
    <CloseReportButton />
    <hr />
    <LoadingStatus :state="state" />

    <div id="report">
      <div v-if="!$fetchState.pending & !$fetchState.error">
        <h3 class="title is-3">Ecoregion for {{ results.place }}</h3>
        <h4 class="subtitle is-3">{{ results.name }}</h4>
        <MiniMap />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MiniMap from '~/components/MiniMap'
import LoadingStatus from '~/components/LoadingStatus'

export default {
  name: 'EcoregionsReport',
  components: {
    MiniMap,
    LoadingStatus,
  },
  data() {
    return {
      // Will have the results of the data fetch.
      results: {},
    }
  },

  computed: {
    state: function () {
      return this.$fetchState
    },
    ...mapGetters({
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
    if (this.isPlaceDefined) {
      this.results = await this.$axios.$get(
        process.env.apiUrl +
          '/physiography/point/' +
          this.latLng.lat +
          '/' +
          this.latLng.lng
      )

      this.results.place = this.placeName
    }
  },
}
</script>

<style lang="scss" scoped></style>
