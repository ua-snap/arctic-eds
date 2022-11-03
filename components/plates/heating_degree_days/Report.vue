<template>
  <div>
    <CloseReportButton />
    <hr />

    <div id="report">
      <div
        v-if="
          !$fetchState.pending &&
            !$fetchState.error &&
            Object.keys(results).length > 0
        "
      >
        <h3 class="title is-3">
          Heating degree days data for {{ results.place }}
        </h3>

        <HeatingDegreeDaysExplanation />
        <DataExplanation context="wrf" />

        <h4 class="title is-4">Heating Degree Days</h4>

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
              <td>
                {{ results['historical']['ddmin'] }}<UnitWidget unitType="dd" />
              </td>
              <td>
                {{ results['historical']['ddmean']
                }}<UnitWidget unitType="dd" />
              </td>
              <td>
                {{ results['historical']['ddmax'] }}<UnitWidget unitType="dd" />
              </td>
            </tr>
            <tr>
              <th scope="row">Early Century (2010-2039)</th>
              <td>
                {{ results['2010-2039']['ddmin'] }}<UnitWidget unitType="dd" />
              </td>
              <td>
                {{ results['2010-2039']['ddmean'] }}<UnitWidget unitType="dd" />
              </td>
              <td>
                {{ results['2010-2039']['ddmax'] }}<UnitWidget unitType="dd" />
              </td>
            </tr>
            <tr>
              <th scope="row">Mid Century (2040-2069)</th>
              <td>
                {{ results['2040-2069']['ddmin'] }}<UnitWidget unitType="dd" />
              </td>
              <td>
                {{ results['2040-2069']['ddmean'] }}<UnitWidget unitType="dd" />
              </td>
              <td>
                {{ results['2040-2069']['ddmax'] }}<UnitWidget unitType="dd" />
              </td>
            </tr>
            <tr>
              <th scope="row">Late Century (2070-2099)</th>
              <td>
                {{ results['2070-2099']['ddmin'] }}<UnitWidget unitType="dd" />
              </td>
              <td>
                {{ results['2070-2099']['ddmean'] }}<UnitWidget unitType="dd" />
              </td>
              <td>
                {{ results['2070-2099']['ddmax'] }}<UnitWidget unitType="dd" />
              </td>
            </tr>
          </tbody>
        </table>
        <h4 class="title is-6">Access to Data</h4>
        <div class="content">
          <p>Heating degrees days data was calculated from the following:</p>
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
          text="Download heating degree days data as CSV"
          endpoint="mmm/degree_days/heating/all"
          class="mt-3 mb-5"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DownloadCsvButton from '~/components/DownloadCsvButton'
import HeatingDegreeDaysExplanation from '~/components/plates/heating_degree_days/Explanation'
import DataExplanation from '~/components/DataExplanation'
import UnitWidget from '~/components/UnitWidget'

export default {
  name: 'HeatingDegreeDaysReport',
  components: {
    DownloadCsvButton,
    HeatingDegreeDaysExplanation,
    DataExplanation,
    UnitWidget,
  },
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
          '/eds/degree_days/heating/' +
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
