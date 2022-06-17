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
        <h3 class="title is-3">Temperature data for {{ results.place }}</h3>

        <MiniMap />

        <h4 class="title is-4">Temperature</h4>

        <UnitRadio type="temperature" />

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
              <td>{{ results.hist_min }}<UnitWidget /></td>
              <td>{{ results.hist_mean }}<UnitWidget /></td>
              <td>{{ results.hist_max }}<UnitWidget /></td>
              <td>{{ results.jan_hist_min }}<UnitWidget /></td>
              <td>{{ results.jan_hist_mean }}<UnitWidget /></td>
              <td>{{ results.jan_hist_max }}<UnitWidget /></td>
              <td>{{ results.july_hist_min }}<UnitWidget /></td>
              <td>{{ results.july_hist_mean }}<UnitWidget /></td>
              <td>{{ results.july_hist_max }}<UnitWidget /></td>
            </tr>
            <tr>
              <th scope="row">Early Century (2010-2039)</th>
              <td>{{ results.temp_2040_min }}<UnitWidget /></td>
              <td>{{ results.temp_2040_mean }}<UnitWidget /></td>
              <td>{{ results.temp_2040_max }}<UnitWidget /></td>
              <td>{{ results.jan_2040_min }}<UnitWidget /></td>
              <td>{{ results.jan_2040_mean }}<UnitWidget /></td>
              <td>{{ results.jan_2040_max }}<UnitWidget /></td>
              <td>{{ results.july_2040_min }}<UnitWidget /></td>
              <td>{{ results.july_2040_mean }}<UnitWidget /></td>
              <td>{{ results.july_2040_max }}<UnitWidget /></td>
            </tr>
            <tr>
              <th scope="row">Mid Century (2040-2069)</th>
              <td>{{ results.temp_2070_min }}<UnitWidget /></td>
              <td>{{ results.temp_2070_mean }}<UnitWidget /></td>
              <td>{{ results.temp_2070_max }}<UnitWidget /></td>
              <td>{{ results.jan_2070_min }}<UnitWidget /></td>
              <td>{{ results.jan_2070_mean }}<UnitWidget /></td>
              <td>{{ results.jan_2070_max }}<UnitWidget /></td>
              <td>{{ results.july_2070_min }}<UnitWidget /></td>
              <td>{{ results.july_2070_mean }}<UnitWidget /></td>
              <td>{{ results.july_2070_max }}<UnitWidget /></td>
            </tr>
            <tr>
              <th scope="row">Late Century (2070-2099)</th>
              <td>{{ results.temp_2100_min }}<UnitWidget /></td>
              <td>{{ results.temp_2100_mean }}<UnitWidget /></td>
              <td>{{ results.temp_2100_max }}<UnitWidget /></td>
              <td>{{ results.jan_2100_min }}<UnitWidget /></td>
              <td>{{ results.jan_2100_mean }}<UnitWidget /></td>
              <td>{{ results.jan_2100_max }}<UnitWidget /></td>
              <td>{{ results.july_2100_min }}<UnitWidget /></td>
              <td>{{ results.july_2100_mean }}<UnitWidget /></td>
              <td>{{ results.july_2100_max }}<UnitWidget /></td>
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MiniMap from '~/components/MiniMap'
import DownloadCsvButton from '~/components/DownloadCsvButton'
import LoadingStatus from '~/components/LoadingStatus'
import UnitWidget from '~/components/UnitWidget'
import UnitRadio from '~/components/UnitRadio'

export default {
  name: 'TemperatureReport',
  components: {
    DownloadCsvButton,
    MiniMap,
    LoadingStatus,
    UnitWidget,
    UnitRadio,
  },
  computed: {
    state: function () {
      return this.$fetchState
    },
    ...mapGetters({
      results: 'report/results',
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
        let url =
          process.env.apiUrl +
          '/eds/temperature/' +
          this.latLng.lat +
          '/' +
          this.latLng.lng

        await this.$store.dispatch('report/apiFetch', url)

        let place = this.latLng.lat + ', ' + this.latLng.lng
        if (this.placeName) {
          place = this.placeName
        }

        let plateResults = {
          place: place,
          hist_min: this.results['historical']['all']['tasmin'],
          hist_mean: this.results['historical']['all']['tasmean'],
          hist_max: this.results['historical']['all']['tasmax'],
          jan_hist_min: this.results['historical']['jan']['tasmin'],
          jan_hist_mean: this.results['historical']['jan']['tasmean'],
          jan_hist_max: this.results['historical']['jan']['tasmax'],
          july_hist_min: this.results['historical']['july']['tasmin'],
          july_hist_mean: this.results['historical']['july']['tasmean'],
          july_hist_max: this.results['historical']['july']['tasmax'],
          temp_2040_min: this.results['2010-2039']['all']['tasmin'],
          temp_2040_mean: this.results['2010-2039']['all']['tasmean'],
          temp_2040_max: this.results['2010-2039']['all']['tasmax'],
          jan_2040_min: this.results['2010-2039']['jan']['tasmin'],
          jan_2040_mean: this.results['2010-2039']['jan']['tasmean'],
          jan_2040_max: this.results['2010-2039']['jan']['tasmax'],
          july_2040_min: this.results['2010-2039']['july']['tasmin'],
          july_2040_mean: this.results['2010-2039']['july']['tasmean'],
          july_2040_max: this.results['2010-2039']['july']['tasmax'],
          temp_2070_min: this.results['2040-2069']['all']['tasmin'],
          temp_2070_mean: this.results['2040-2069']['all']['tasmean'],
          temp_2070_max: this.results['2040-2069']['all']['tasmax'],
          jan_2070_min: this.results['2040-2069']['jan']['tasmin'],
          jan_2070_mean: this.results['2040-2069']['jan']['tasmean'],
          jan_2070_max: this.results['2040-2069']['jan']['tasmax'],
          july_2070_min: this.results['2040-2069']['july']['tasmin'],
          july_2070_mean: this.results['2040-2069']['july']['tasmean'],
          july_2070_max: this.results['2040-2069']['july']['tasmax'],
          temp_2100_min: this.results['2070-2099']['all']['tasmin'],
          temp_2100_mean: this.results['2070-2099']['all']['tasmean'],
          temp_2100_max: this.results['2070-2099']['all']['tasmax'],
          jan_2100_min: this.results['2070-2099']['jan']['tasmin'],
          jan_2100_mean: this.results['2070-2099']['jan']['tasmean'],
          jan_2100_max: this.results['2070-2099']['jan']['tasmax'],
          july_2100_min: this.results['2070-2099']['july']['tasmin'],
          july_2100_mean: this.results['2070-2099']['july']['tasmean'],
          july_2100_max: this.results['2070-2099']['july']['tasmax'],
        }

        this.$store.commit('report/setResults', plateResults)
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>
