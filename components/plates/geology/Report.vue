<template>
  <div>
    <CloseReportButton />
    <hr />

    <div id="report">
      <div v-if="!$fetchState.pending && !$fetchState.error">
        <h3 class="title is-3">Geological unit for {{ results.place }}</h3>

        <table class="table">
          <tbody>
            <tr>
              <th scope="row">Age</th>
              <td>{{ results.age }}</td>
            </tr>
            <tr>
              <th scope="row">Classification</th>
              <td>{{ results.name }}</td>
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
      results: {},
    }
  },
  computed: {
    state: function() {
      return this.$fetchState
    },
    ...mapGetters({
      placeName: 'report/placeName',
      isPlaceDefined: 'report/isPlaceDefined',
      latLng: 'report/latLng',
    }),
  },

  watch: {
    latLng: function() {
      this.$fetch()
    },
  },
  async fetch() {
    if (this.isPlaceDefined) {
      this.results = await this.$axios.$get(
        process.env.apiUrl +
          '/geology/point/' +
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
