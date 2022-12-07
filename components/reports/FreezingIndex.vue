<template>
  <div v-if="Object.keys(results.freezing_index).length != 0">
    
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
              {{ results.freezing_index['historical']['ddmin']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ results.freezing_index['historical']['ddmean']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ results.freezing_index['historical']['ddmax']
              }}<UnitWidget unitType="dd" />
            </td>
          </tr>
          <tr>
            <th scope="row">Early Century (2010-2039)</th>
            <td>
              {{ results.freezing_index['2010-2039']['ddmin']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ results.freezing_index['2010-2039']['ddmean']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ results.freezing_index['2010-2039']['ddmax']
              }}<UnitWidget unitType="dd" />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040-2069)</th>
            <td>
              {{ results.freezing_index['2040-2069']['ddmin']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ results.freezing_index['2040-2069']['ddmean']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ results.freezing_index['2040-2069']['ddmax']
              }}<UnitWidget unitType="dd" />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070-2099)</th>
            <td>
              {{ results.freezing_index['2070-2099']['ddmin']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ results.freezing_index['2070-2099']['ddmean']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ results.freezing_index['2070-2099']['ddmax']
              }}<UnitWidget unitType="dd" />
            </td>
          </tr>
        </tbody>
      </table>
      <h4 class="title is-6 no-print">Access to Data</h4>
      <div class="content no-print">
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
</template>

<script>
import { mapGetters } from 'vuex'
import DownloadCsvButton from '~/components/DownloadCsvButton'
import UnitWidget from '~/components/UnitWidget'

export default {
  name: 'FreezingIndexReport',
  components: {
    DownloadCsvButton,

    UnitWidget,
  },

  computed: {
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
