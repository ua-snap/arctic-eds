<template>
  <div>
    <CloseReportButton />
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
        <h3 class="title is-3">
          Design thawing index data for {{ results.place }}
        </h3>

        <MiniMap />

        <h4 class="title is-4">Design Thawing Index</h4>

        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Mean</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Historical (1980-2009)</th>
              <td>{{ results['historical']['di'] }}</td>
            </tr>
            <tr>
              <th scope="row">Mid Century (2040-2069)</th>
              <td>{{ results['2040-2069']['di'] }}</td>
            </tr>
            <tr>
              <th scope="row">Late Century (2070-2099)</th>
              <td>{{ results['2070-2099']['di'] }}</td>
            </tr>
          </tbody>
        </table>
        <h4 class="title is-6">Access to Data</h4>
        <div class="content">
          <p>Thawing index data was calculated from the following:</p>
          <ul>
            <li>
              <a
                href="http://ckan.snap.uaf.edu/dataset/historical-and-projected-dynamically-downscaled-climate-data-for-the-state-of-alaska-and-surrou"
                target="_blank"
                >Historical and Projected Climate Products</a
              >
            </li>
          </ul>
        </div>
        <DownloadCsvButton
          text="Download design thawing index data as CSV"
          endpoint="design_index/thawing/all/point"
          class="mt-3 mb-5"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DownloadCsvButton from '~/components/DownloadCsvButton'
import MiniMap from '~/components/MiniMap'
import LoadingStatus from '~/components/LoadingStatus'

export default {
  name: 'DesignThawingIndexReport',
  components: {
    DownloadCsvButton,
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
          '/design_index/thawing/hp/point/' +
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
  },
}
</script>

<style lang="scss" scoped></style>
