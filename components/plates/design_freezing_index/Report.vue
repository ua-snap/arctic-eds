<template>
  <div>
    <hr />

    <div id="report">
      <h3 class="title is-3">Design freezing index data for {{ placeName }}</h3>

      <DesignFreezingIndexExplanation />
      <DataExplanation context="wrf" />

      <h4 class="title is-4">Design Freezing Index</h4>

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
              {{ results.design_freezing['historical']['di']
              }}<UnitWidget unitType="dd" />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040-2069)</th>
            <td>
              {{ results.design_freezing['2040-2069']['di']
              }}<UnitWidget unitType="dd" />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070-2099)</th>
            <td>
              {{ results.design_freezing['2070-2099']['di']
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
        text="Download design freezing index data as CSV"
        endpoint="design_index/freezing/all/point"
        class="mt-3 mb-5"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DownloadCsvButton from '~/components/DownloadCsvButton'
import DesignFreezingIndexExplanation from '~/components/plates/design_freezing_index/Explanation'
import DataExplanation from '~/components/DataExplanation'
import UnitWidget from '~/components/UnitWidget'

export default {
  name: 'DesignFreezingIndexReport',
  components: {
    DownloadCsvButton,
    DesignFreezingIndexExplanation,
    DataExplanation,
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
