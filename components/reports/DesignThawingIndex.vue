<template>
  <div v-if="Object.keys(results.design_thawing).length != 0">
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
          <td>
            {{ results.design_thawing['historical']['di']
            }}<UnitWidget unitType="dd" />
          </td>
        </tr>
        <tr>
          <th scope="row">Mid Century (2040-2069)</th>
          <td>
            {{ results.design_thawing['2040-2069']['di']
            }}<UnitWidget unitType="dd" />
          </td>
        </tr>
        <tr>
          <th scope="row">Late Century (2070-2099)</th>
          <td>
            {{ results.design_thawing['2070-2099']['di']
            }}<UnitWidget unitType="dd" />
          </td>
        </tr>
      </tbody>
    </table>
    <h4 class="title is-6 no-print">Access to Data</h4>
    <div class="content no-print">
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
</template>

<script>
import { mapGetters } from 'vuex'
import DownloadCsvButton from '~/components/DownloadCsvButton'
import UnitWidget from '~/components/UnitWidget'

export default {
  name: 'DesignThawingIndexReport',
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
