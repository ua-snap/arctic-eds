<template>
  <div v-if="Object.keys(results.snowfall).length != 0">

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
            <th scope="row">Historical (1910-2009)</th>
            <td>
              {{ results.snowfall.sfe_hist_min }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{ results.snowfall.sfe_hist_mean
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{ results.snowfall.sfe_hist_max }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
          <tr>
            <th scope="row">Future Projections (2010-2099)</th>
            <td>
              {{ results.snowfall.sfe_proj_min }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{ results.snowfall.sfe_proj_mean
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{ results.snowfall.sfe_proj_max }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
        </tbody>
      </table>

      <h4 class="title is-6 no-print">Access to Data</h4>
      <div class="content no-print">
        <ul>
          <li>
            <a
              href="http://ckan.snap.uaf.edu/dataset/historical-decadal-averages-of-monthly-snowfall-equivalent-771m-cru-ts3-0-ts3-1"
              target="_blank"
              >Historical Decadal Averages of Monthly Snowfall Equivalent 771m
              CRU TS3.0/TS3.1</a
            >
          </li>
          <li>
            <a
              href="http://ckan.snap.uaf.edu/dataset/projected-decadal-averages-of-monthly-snowfall-equivalent-771m-cmip5-ar5"
              target="_blank"
              >Projected Decadal Averages of Monthly Snowfall Equivalent 771m
              CMIP5/AR5</a
            >
          </li>
        </ul>
      </div>
      <DownloadCsvButton
        text="Download snowfall equivalent data as CSV"
        endpoint="mmm/snow/snowfallequivalent/all"
        class="mt-3 mb-5"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DownloadCsvButton from '~/components/DownloadCsvButton'
import UnitWidget from '~/components/UnitWidget'

export default {
  name: 'SnowfallReport',
  components: {
    DownloadCsvButton,
    UnitWidget,
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
      sfe_hist_min: this.results['snowfall']['historical']['sfemin'],
      sfe_hist_mean: this.results['snowfall']['historical']['sfemean'],
      sfe_hist_max: this.results['snowfall']['historical']['sfemax'],
      sfe_proj_min: this.results['snowfall']['projected']['sfemin'],
      sfe_proj_mean: this.results['snowfall']['projected']['sfemean'],
      sfe_proj_max: this.results['snowfall']['projected']['sfemax'],
    }
    this.$store.commit('report/setPlateResults', {
      plateResults: plateResults,
      variable: 'snowfall',
    })
  },
}
</script>

<style lang="scss" scoped></style>