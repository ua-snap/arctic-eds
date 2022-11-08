<template>
  <div>
    <CloseReportButton />
    <hr />

    <div id="report">
      <h3 class="title is-3">Temperature data for {{ plateResults.place }}</h3>

      <TemperatureExplanation context="report" />
      <DataExplanation context="snap" />

      <h4 class="title is-4">Temperature</h4>

      <UnitRadio type="temperature" variable="temperature" />

      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th scope="col" colspan="3">Annual</th>
            <th scope="col" colspan="3">January</th>
            <th scope="col" colspan="3">July</th>
          </tr>
          <tr>
            <th scope="col"></th>
            <th scope="col">Min</th>
            <th scope="col">Mean</th>
            <th scope="col">Max</th>
            <th scope="col">Min</th>
            <th scope="col">Mean</th>
            <th scope="col">Max</th>
            <th scope="col">Min</th>
            <th scope="col">Mean</th>
            <th scope="col">Max</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Historical (1901-2015)</th>
            <td>{{ plateResults.hist_min }}<UnitWidget /></td>
            <td>{{ plateResults.hist_mean }}<UnitWidget /></td>
            <td>{{ plateResults.hist_max }}<UnitWidget /></td>
            <td>{{ plateResults.jan_hist_min }}<UnitWidget /></td>
            <td>{{ plateResults.jan_hist_mean }}<UnitWidget /></td>
            <td>{{ plateResults.jan_hist_max }}<UnitWidget /></td>
            <td>{{ plateResults.july_hist_min }}<UnitWidget /></td>
            <td>{{ plateResults.july_hist_mean }}<UnitWidget /></td>
            <td>{{ plateResults.july_hist_max }}<UnitWidget /></td>
          </tr>
          <tr>
            <th scope="row">Early Century (2010-2039)</th>
            <td>{{ plateResults.temp_2040_min }}<UnitWidget /></td>
            <td>{{ plateResults.temp_2040_mean }}<UnitWidget /></td>
            <td>{{ plateResults.temp_2040_max }}<UnitWidget /></td>
            <td>{{ plateResults.jan_2040_min }}<UnitWidget /></td>
            <td>{{ plateResults.jan_2040_mean }}<UnitWidget /></td>
            <td>{{ plateResults.jan_2040_max }}<UnitWidget /></td>
            <td>{{ plateResults.july_2040_min }}<UnitWidget /></td>
            <td>{{ plateResults.july_2040_mean }}<UnitWidget /></td>
            <td>{{ plateResults.july_2040_max }}<UnitWidget /></td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040-2069)</th>
            <td>{{ plateResults.temp_2070_min }}<UnitWidget /></td>
            <td>{{ plateResults.temp_2070_mean }}<UnitWidget /></td>
            <td>{{ plateResults.temp_2070_max }}<UnitWidget /></td>
            <td>{{ plateResults.jan_2070_min }}<UnitWidget /></td>
            <td>{{ plateResults.jan_2070_mean }}<UnitWidget /></td>
            <td>{{ plateResults.jan_2070_max }}<UnitWidget /></td>
            <td>{{ plateResults.july_2070_min }}<UnitWidget /></td>
            <td>{{ plateResults.july_2070_mean }}<UnitWidget /></td>
            <td>{{ plateResults.july_2070_max }}<UnitWidget /></td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070-2099)</th>
            <td>{{ plateResults.temp_2100_min }}<UnitWidget /></td>
            <td>{{ plateResults.temp_2100_mean }}<UnitWidget /></td>
            <td>{{ plateResults.temp_2100_max }}<UnitWidget /></td>
            <td>{{ plateResults.jan_2100_min }}<UnitWidget /></td>
            <td>{{ plateResults.jan_2100_mean }}<UnitWidget /></td>
            <td>{{ plateResults.jan_2100_max }}<UnitWidget /></td>
            <td>{{ plateResults.july_2100_min }}<UnitWidget /></td>
            <td>{{ plateResults.july_2100_mean }}<UnitWidget /></td>
            <td>{{ plateResults.july_2100_max }}<UnitWidget /></td>
          </tr>
        </tbody>
      </table>
      <h4 class="title is-6">Access to Data</h4>
      <div class="content">
        <ul>
          <li>
            <a
              href="http://ckan.snap.uaf.edu/dataset/historical-monthly-and-derived-temperature-products-downscaled-from-cru-ts-data-via-the-delta-m"
              target="_blank"
              >Historical Monthly and Derived Temperature Products</a
            >
          </li>
          <li>
            <a
              href="http://ckan.snap.uaf.edu/dataset/projected-monthly-and-derived-temperature-products-2km-cmip5-ar5"
              target="_blank"
              >Projected Monthly and Derived Temperature Products</a
            >
          </li>
        </ul>
      </div>
      <DownloadCsvButton
        text="Download annual temperature mean data as CSV"
        endpoint="mmm/temperature/all"
        class="mt-3 mb-5"
      />
      <DownloadCsvButton
        text="Download annual January temperature min-mean-max as CSV"
        endpoint="mmm/temperature/jan/all"
        class="mt-3 mb-5"
      />
      <DownloadCsvButton
        text="Download annual July temperature min-mean-max as CSV"
        endpoint="mmm/temperature/july/all"
        class="mt-3 mb-5"
      />
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DownloadCsvButton from '~/components/DownloadCsvButton'
import UnitWidget from '~/components/UnitWidget'
import UnitRadio from '~/components/UnitRadio'
import TemperatureExplanation from '~/components/plates/temperature/Explanation'
import DataExplanation from '~/components/DataExplanation'

export default {
  name: 'TemperatureReport',
  components: {
    DownloadCsvButton,
    UnitWidget,
    UnitRadio,
    TemperatureExplanation,
    DataExplanation,
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
      // Will have the results of the data fetch.
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
      this.plateResults = {
        place: this.placeName,
        hist_min: this.results['temperature']['historical']['all']['tasmin'],
        hist_mean: this.results['temperature']['historical']['all']['tasmean'],
        hist_max: this.results['temperature']['historical']['all']['tasmax'],
        jan_hist_min:
          this.results['temperature']['historical']['jan']['tasmin'],
        jan_hist_mean:
          this.results['temperature']['historical']['jan']['tasmean'],
        jan_hist_max:
          this.results['temperature']['historical']['jan']['tasmax'],
        july_hist_min:
          this.results['temperature']['historical']['july']['tasmin'],
        july_hist_mean:
          this.results['temperature']['historical']['july']['tasmean'],
        july_hist_max:
          this.results['temperature']['historical']['july']['tasmax'],
        temp_2040_min:
          this.results['temperature']['2010-2039']['all']['tasmin'],
        temp_2040_mean:
          this.results['temperature']['2010-2039']['all']['tasmean'],
        temp_2040_max:
          this.results['temperature']['2010-2039']['all']['tasmax'],
        jan_2040_min: this.results['temperature']['2010-2039']['jan']['tasmin'],
        jan_2040_mean:
          this.results['temperature']['2010-2039']['jan']['tasmean'],
        jan_2040_max: this.results['temperature']['2010-2039']['jan']['tasmax'],
        july_2040_min:
          this.results['temperature']['2010-2039']['july']['tasmin'],
        july_2040_mean:
          this.results['temperature']['2010-2039']['july']['tasmean'],
        july_2040_max:
          this.results['temperature']['2010-2039']['july']['tasmax'],
        temp_2070_min:
          this.results['temperature']['2040-2069']['all']['tasmin'],
        temp_2070_mean:
          this.results['temperature']['2040-2069']['all']['tasmean'],
        temp_2070_max:
          this.results['temperature']['2040-2069']['all']['tasmax'],
        jan_2070_min: this.results['temperature']['2040-2069']['jan']['tasmin'],
        jan_2070_mean:
          this.results['temperature']['2040-2069']['jan']['tasmean'],
        jan_2070_max: this.results['temperature']['2040-2069']['jan']['tasmax'],
        july_2070_min:
          this.results['temperature']['2040-2069']['july']['tasmin'],
        july_2070_mean:
          this.results['temperature']['2040-2069']['july']['tasmean'],
        july_2070_max:
          this.results['temperature']['2040-2069']['july']['tasmax'],
        temp_2100_min:
          this.results['temperature']['2070-2099']['all']['tasmin'],
        temp_2100_mean:
          this.results['temperature']['2070-2099']['all']['tasmean'],
        temp_2100_max:
          this.results['temperature']['2070-2099']['all']['tasmax'],
        jan_2100_min: this.results['temperature']['2070-2099']['jan']['tasmin'],
        jan_2100_mean:
          this.results['temperature']['2070-2099']['jan']['tasmean'],
        jan_2100_max: this.results['temperature']['2070-2099']['jan']['tasmax'],
        july_2100_min:
          this.results['temperature']['2070-2099']['july']['tasmin'],
        july_2100_mean:
          this.results['temperature']['2070-2099']['july']['tasmean'],
        july_2100_max:
          this.results['temperature']['2070-2099']['july']['tasmax'],
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>
