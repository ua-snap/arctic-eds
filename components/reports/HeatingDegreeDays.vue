<template>
  <div>
    <div class="block">
      <h4 class="title is-5 mb-1">Summary</h4>
      <div class="content is-size-5">
        The summary table below shows the minimum, mean and maximum values
        across one scenario (RCP 8.5) and both models (NCAR CCSM4 and GFDL CM3)
        for the specified era, which can be helpful to assess broad trends and
        variation.
      </div>
    </div>
    <div class="block">
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
            <th scope="row">Historical (1980&ndash;2009)</th>
            <td>
              {{ results.heating_degree_days['summary']['historical']['ddmin']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ results.heating_degree_days['summary']['historical']['ddmean']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ results.heating_degree_days['summary']['historical']['ddmax']
              }}<UnitWidget unitType="dd" />
            </td>
          </tr>
          <tr>
            <th scope="row">Early Century (2010&ndash;2039)</th>
            <td>
              {{ results.heating_degree_days['summary']['2010-2039']['ddmin']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ results.heating_degree_days['summary']['2010-2039']['ddmean']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ results.heating_degree_days['summary']['2010-2039']['ddmax']
              }}<UnitWidget unitType="dd" />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040&ndash;2069)</th>
            <td>
              {{ results.heating_degree_days['summary']['2040-2069']['ddmin']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ results.heating_degree_days['summary']['2040-2069']['ddmean']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ results.heating_degree_days['summary']['2040-2069']['ddmax']
              }}<UnitWidget unitType="dd" />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070&ndash;2099)</th>
            <td>
              {{ results.heating_degree_days['summary']['2070-2099']['ddmin']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ results.heating_degree_days['summary']['2070-2099']['ddmean']
              }}<UnitWidget unitType="dd" />
            </td>
            <td>
              {{ results.heating_degree_days['summary']['2070-2099']['ddmax']
              }}<UnitWidget unitType="dd" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="block">
      <h4 class="title is-5 mb-1">Data preview</h4>

      <p class="content is-size-5 mb-1">
        CSV download includes annual values for both historical ERA-Interim
        (1980&ndash;2009) and modeled projected (2006&ndash;2100) datasets. Data
        are provided in metric units.
      </p>
      <PreviewTable
        :csvString="results.heating_degree_days.preview"
        sizeBlurb="~219 rows, 3 columns, ~5kb"
      />
    </div>
    <div class="block content is-size-5 no-print">
      <h4 class="title is-5 mb-1">Data download</h4>
      <ul>
        <li>
          <DownloadCsvButton
            :text="downloadCsvText"
            endpoint="degree_days/heating"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DownloadCsvButton from '~/components/DownloadCsvButton'
import UnitWidget from '~/components/UnitWidget'
import PreviewTable from '~/components/PreviewTable'

export default {
  name: 'HeatingDegreeDaysReport',
  components: {
    DownloadCsvButton,
    UnitWidget,
    PreviewTable,
  },
  computed: {
    downloadCsvText() {
      return 'Download CSV of heating degree days for ' + this.placeName
    },
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
