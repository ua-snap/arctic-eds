<template>
  <div>
    <CloseReportButton />
    <hr />

    <div id="report">
      <h3 class="title is-3">
        Thawing index data for {{ plateResults.place }}
      </h3>

      <ThawingIndexExplanation :isFooter="false" />

      <h4 class="title is-4">Thawing Index</h4>

      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Min</th>
            <th scope="col">Mean</th>
            <th scope="col">Max</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Historical (1979-2015)</th>
            <td>{{ plateResults['historical']['ddmin'] }}<UnitWidget /></td>
            <td>{{ plateResults['historical']['ddmean'] }}<UnitWidget /></td>
            <td>{{ plateResults['historical']['ddmax'] }}<UnitWidget /></td>
          </tr>
          <tr>
            <th scope="row">Early Century (2010-2039)</th>
            <td>{{ plateResults['2010-2039']['ddmin'] }}<UnitWidget /></td>
            <td>{{ plateResults['2010-2039']['ddmean'] }}<UnitWidget /></td>
            <td>{{ plateResults['2010-2039']['ddmax'] }}<UnitWidget /></td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040-2069)</th>
            <td>{{ plateResults['2040-2069']['ddmin'] }}<UnitWidget /></td>
            <td>{{ plateResults['2040-2069']['ddmean'] }}<UnitWidget /></td>
            <td>{{ plateResults['2040-2069']['ddmax'] }}<UnitWidget /></td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070-2099)</th>
            <td>{{ plateResults['2070-2099']['ddmin'] }}<UnitWidget /></td>
            <td>{{ plateResults['2070-2099']['ddmean'] }}<UnitWidget /></td>
            <td>{{ plateResults['2070-2099']['ddmax'] }}<UnitWidget /></td>
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
        text="Download thawing index data as CSV"
        endpoint="mmm/degree_days/thawing_index/all"
        class="mt-3 mb-5"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DownloadCsvButton from '~/components/DownloadCsvButton'
import ThawingIndexExplanation from '~/components/plates/thawing_index/Explanation'
import UnitWidget from '~/components/UnitWidget'

export default {
  name: 'ThawingIndexReport',
  components: {
    DownloadCsvButton,
    ThawingIndexExplanation,
    UnitWidget,
  },
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
      this.plateResults = this.results['thawing_index']

      this.plateResults.place = this.placeName
    }
  },
}
</script>

<style lang="scss" scoped></style>
