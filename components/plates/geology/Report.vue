<template>
  <div>
    <CloseReportButton />
    <hr />

    <div id="report">
      <div v-if="!$fetchState.pending && !$fetchState.error">
        <h3 class="title is-3">Geological unit for {{ plateResults.place }}</h3>

        <table class="table">
          <tbody>
            <tr>
              <th scope="row">Age</th>
              <td>{{ plateResults.age }}</td>
            </tr>
            <tr>
              <th scope="row">Classification</th>
              <td>{{ plateResults.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GeologyReport',
  data() {
    return {
      // Will have the results of the data fetch.
      plateResults: {},
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

  watch: {
    latLng: function () {
      this.$fetch()
    },
  },
  async fetch() {
    if (this.isPlaceDefined) {
      this.plateResults = this.results['geology']
      this.plateResults.place = this.placeName
    }
  },
}
</script>

<style lang="scss" scoped></style>
