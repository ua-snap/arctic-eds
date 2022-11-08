<template>
  <div>
    <CloseReportButton />
    <hr />

    <div id="report">
      <h3 class="title is-3">
        Freezing index data for {{ plateResults.place }}
      </h3>

      <FreezingIndexExplanation />
      <DataExplanation context="wrf" />

      <h4 class="title is-4">Freezing Index</h4>

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
              {{ plateResults['historical']['ddmin']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ plateResults['historical']['ddmean']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ plateResults['historical']['ddmax']
              }}<UnitWidget unitType="dd" />
            </td>
          </tr>
          <tr>
            <th scope="row">Early Century (2010-2039)</th>
            <td>
              {{ plateResults['2010-2039']['ddmin']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ plateResults['2010-2039']['ddmean']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ plateResults['2010-2039']['ddmax']
              }}<UnitWidget unitType="dd" />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040-2069)</th>
            <td>
              {{ plateResults['2040-2069']['ddmin']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ plateResults['2040-2069']['ddmean']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ plateResults['2040-2069']['ddmax']
              }}<UnitWidget unitType="dd" />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070-2099)</th>
            <td>
              {{ plateResults['2070-2099']['ddmin']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ plateResults['2070-2099']['ddmean']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ plateResults['2070-2099']['ddmax']
              }}<UnitWidget unitType="dd" />
            </td>
          </tr>
        </tbody>
      </table>
      <h4 class="title is-6">Access to Data</h4>
      <div class="content">
        <p>Freezing index data was calculated from the following:</p>
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
        text="Download freezing index data as CSV"
        endpoint="mmm/degree_days/freezing_index/all"
        class="mt-3 mb-5"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DownloadCsvButton from '~/components/DownloadCsvButton'
import FreezingIndexExplanation from '~/components/plates/freezing_index/Explanation'
import DataExplanation from '~/components/DataExplanation'
import UnitWidget from '~/components/UnitWidget'

export default {
  name: 'FreezingIndexReport',
  components: {
    DownloadCsvButton,
    FreezingIndexExplanation,
    DataExplanation,
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

  watch: {
    latLng: function () {
      this.$fetch()
    },
  },
  async fetch() {
    if (this.isPlaceDefined) {
      this.plateResults = this.results['freezing_index']

      this.plateResults.place = this.placeName
    }
  },
}
</script>

<style lang="scss" scoped></style>
