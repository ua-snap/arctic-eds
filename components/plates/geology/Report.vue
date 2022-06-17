<template>
  <div>
    <CloseReportButton />
    <hr />
    <LoadingStatus :state="state" />

    <div id="report">
      <div v-if="!$fetchState.pending && !$fetchState.error">
        <h3 class="title is-3">Geological unit for {{ results.place }}</h3>

        <MiniMap />

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
import MiniMap from '~/components/MiniMap'
import LoadingStatus from '~/components/LoadingStatus'

export default {
  name: 'GeologyReport',
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
      latLng: 'report/latLng',
    }),
  },

  watch: {
    latLng: function () {
      this.$fetch()
    },
  },
  async fetch() {
    if (this.latLng != undefined) {
      if (this.latLng.lat && this.latLng.lng) {
        this.results = await this.$axios.$get(
          process.env.apiUrl +
            '/geology/point/' +
            this.latLng.lat +
            '/' +
            this.latLng.lng
        )

        let place = this.latLng.lat + ', ' + this.latLng.lng
        if (this.placeName) {
          place = this.placeName
        }

        this.results.place = place
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>
