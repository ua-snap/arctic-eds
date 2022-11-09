<template>
  <div v-if="Object.keys(results.precipitation).length != 0">
    <hr />

    <div id="report">
      <h3 class="title is-3">Precipitation data for {{ placeName }}</h3>

      <PrecipitationExplanation />
      <DataExplanation context="snap" />

      <h4 class="title is-4">Annual Precipitation Totals</h4>

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
            <th scope="row">Historical (1901-2015)</th>
            <td>
              {{ results.precipitation.pr_hist_min
              }}<UnitWidget unitType="mm_in" type="light" />
            </td>
            <td>
              {{ results.precipitation.pr_hist_mean
              }}<UnitWidget unitType="mm_in" type="light" />
            </td>
            <td>
              {{ results.precipitation.pr_hist_max
              }}<UnitWidget unitType="mm_in" type="light" />
            </td>
          </tr>
          <tr>
            <th scope="row">Early Century (2010-2039)</th>
            <td>
              {{ results.precipitation.pr_2040_min
              }}<UnitWidget unitType="mm_in" type="light" />
            </td>
            <td>
              {{ results.precipitation.pr_2040_mean
              }}<UnitWidget unitType="mm_in" type="light" />
            </td>
            <td>
              {{ results.precipitation.pr_2040_max
              }}<UnitWidget unitType="mm_in" type="light" />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040-2069)</th>
            <td>
              {{ results.precipitation.pr_2070_min
              }}<UnitWidget unitType="mm_in" type="light" />
            </td>
            <td>
              {{ results.precipitation.pr_2070_mean
              }}<UnitWidget unitType="mm_in" type="light" />
            </td>
            <td>
              {{ results.precipitation.pr_2070_max
              }}<UnitWidget unitType="mm_in" type="light" />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070-2099)</th>
            <td>
              {{ results.precipitation.pr_2100_min
              }}<UnitWidget unitType="mm_in" type="light" />
            </td>
            <td>
              {{ results.precipitation.pr_2100_mean
              }}<UnitWidget unitType="mm_in" type="light" />
            </td>
            <td>
              {{ results.precipitation.pr_2100_max
              }}<UnitWidget unitType="mm_in" type="light" />
            </td>
          </tr>
        </tbody>
      </table>
      <h4 class="title is-6">Access to Data</h4>
      <div class="content">
        <ul>
          <li>
            <a
              href="http://ckan.snap.uaf.edu/dataset/historical-monthly-and-derived-precipitation-products-downscaled-from-cru-ts-data-via-the-delta"
              target="_blank"
              >Historical Monthly and Derived Precipitation Products</a
            >
          </li>
          <li>
            <a
              href="http://ckan.snap.uaf.edu/dataset/projected-monthly-and-derived-precipitation-products-2km-cmip5-ar5"
              target="_blank"
              >Projected Monthly and Derived Precipitation Products</a
            >
          </li>
        </ul>
      </div>
      <DownloadCsvButton
        text="Download precipitation data as CSV"
        endpoint="mmm/precipitation/all"
        class="mt-3 mb-5"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DownloadCsvButton from '~/components/DownloadCsvButton'
import UnitWidget from '~/components/UnitWidget'
import UnitRadio from '~/components/UnitRadio'
import PrecipitationExplanation from '~/components/plates/precipitation/Explanation'
import DataExplanation from '~/components/DataExplanation'

export default {
  name: 'PrecipitationReport',
  components: {
    DownloadCsvButton,
    UnitWidget,
    UnitRadio,
    PrecipitationExplanation,
    DataExplanation,
  },
  computed: {
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
      isPlaceDefined: 'report/isPlaceDefined',
    }),
  },
  watch: {
    isPlaceDefined: function () {
      this.$fetch()
    },
  },
  fetch() {
    let plateResults = {
      pr_hist_min: this.results['precipitation']['historical']['prmin'],
      pr_hist_mean: this.results['precipitation']['historical']['prmean'],
      pr_hist_max: this.results['precipitation']['historical']['prmax'],
      pr_2040_min: this.results['precipitation']['2010-2039']['prmin'],
      pr_2040_mean: this.results['precipitation']['2010-2039']['prmean'],
      pr_2040_max: this.results['precipitation']['2010-2039']['prmax'],
      pr_2070_min: this.results['precipitation']['2040-2069']['prmin'],
      pr_2070_mean: this.results['precipitation']['2040-2069']['prmean'],
      pr_2070_max: this.results['precipitation']['2040-2069']['prmax'],
      pr_2100_min: this.results['precipitation']['2070-2099']['prmin'],
      pr_2100_mean: this.results['precipitation']['2070-2099']['prmean'],
      pr_2100_max: this.results['precipitation']['2070-2099']['prmax'],
    }
    this.$store.commit('report/setPlateResults', {
      plateResults: plateResults,
      variable: 'precipitation',
    })
  },
}
</script>

<style lang="scss" scoped></style>
