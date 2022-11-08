<template>
  <div>
    <CloseReportButton />
    <hr />

    <div id="report">
      <div v-if="!$fetchState.pending & !$fetchState.error">
        <h3 class="title is-3">Ecoregion for {{ plateResults.place }}</h3>
        <h4 class="subtitle is-3">{{ plateResults.name }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EcoregionsReport',
  data() {
    return {
      // Will have the results of the data fetch.
      plateResults: null,
    }
  },

  computed: {
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
      isPlaceDefined: 'report/isPlaceDefined',
      latLng: 'report/latLng',
    }),
  },
  data() {
    return {
      plateResults: null,
    }
  },
  watch: {
    latLng: function () {
      this.$fetch()
    },
  },
  async fetch() {
    if (this.isPlaceDefined) {
      this.plateResults = this.results['physiography']
      this.plateResults.place = this.placeName
    }
  },
}
</script>

<style lang="scss" scoped></style>
