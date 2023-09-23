<template>
  <div v-if="Object.keys(results.heating_degree_days).length != 0">
    <h4 class="title is-5 mb-1">Summary</h4>
    <div class="content is-size-5">
      The summary table below shows the minimum, mean and maximum values across
      one scenario (RCP 8.5) and both models (NCAR CCSM4 and GFDL CM3) for the
      specified era, which can be helpful to assess broad trends and variation.
    </div>
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
          <th scope="row">Historical (1979&ndash;2015)</th>
          <td>
            {{ results.heating_degree_days['historical']['ddmin']
            }}<UnitWidget unitType="dd" />
          </td>
          <td>
            {{ results.heating_degree_days['historical']['ddmean']
            }}<UnitWidget unitType="dd" />
          </td>
          <td>
            {{ results.heating_degree_days['historical']['ddmax']
            }}<UnitWidget unitType="dd" />
          </td>
        </tr>
        <tr>
          <th scope="row">Early Century (2010&ndash;2039)</th>
          <td>
            {{ results.heating_degree_days['2010-2039']['ddmin']
            }}<UnitWidget unitType="dd" />
          </td>
          <td>
            {{ results.heating_degree_days['2010-2039']['ddmean']
            }}<UnitWidget unitType="dd" />
          </td>
          <td>
            {{ results.heating_degree_days['2010-2039']['ddmax']
            }}<UnitWidget unitType="dd" />
          </td>
        </tr>
        <tr>
          <th scope="row">Mid Century (2040&ndash;2069)</th>
          <td>
            {{ results.heating_degree_days['2040-2069']['ddmin']
            }}<UnitWidget unitType="dd" />
          </td>
          <td>
            {{ results.heating_degree_days['2040-2069']['ddmean']
            }}<UnitWidget unitType="dd" />
          </td>
          <td>
            {{ results.heating_degree_days['2040-2069']['ddmax']
            }}<UnitWidget unitType="dd" />
          </td>
        </tr>
        <tr>
          <th scope="row">Late Century (2070&ndash;2099)</th>
          <td>
            {{ results.heating_degree_days['2070-2099']['ddmin']
            }}<UnitWidget unitType="dd" />
          </td>
          <td>
            {{ results.heating_degree_days['2070-2099']['ddmean']
            }}<UnitWidget unitType="dd" />
          </td>
          <td>
            {{ results.heating_degree_days['2070-2099']['ddmax']
            }}<UnitWidget unitType="dd" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="block">
      <h4 class="title is-5 mb-1">Data preview</h4>

      <p class="content is-size-5 mb-1">
        CSV download includes annual values for both historical ERA-Interim
        (1980&ndash;2009) and modeled projected (2006&ndash;2100) datasets.
      </p>
      <table class="preview">
        <tbody>
          <tr>
            <th scope="col">model</th>
            <th scope="col">year</th>
            <th scope="col">dd</th>
          </tr>

          <tr>
            <td>ERA-Interim</td>
            <td>1980</td>
            <td>13933</td>
          </tr>
          <tr>
            <td>ERA-Interim</td>
            <td>1981</td>
            <td>12841</td>
          </tr>
          <tr>
            <td>ERA-Interim</td>
            <td>1982</td>
            <td>14840</td>
          </tr>
          <tr>
            <td>ERA-Interim</td>
            <td>1983</td>
            <td>14235</td>
          </tr>
          <tr>
            <td>ERA-Interim</td>
            <td>1984</td>
            <td>14389</td>
          </tr>
          <tr>
            <td colspan="3" class="vellip">&#8942;</td>
          </tr>
          <tr>
            <td>NCAR-CCSM4</td>
            <td>2096</td>
            <td>11481</td>
          </tr>
          <tr>
            <td>NCAR-CCSM4</td>
            <td>2097</td>
            <td>10526</td>
          </tr>
          <tr>
            <td>NCAR-CCSM4</td>
            <td>2098</td>
            <td>11773</td>
          </tr>
          <tr>
            <td>NCAR-CCSM4</td>
            <td>2099</td>
            <td>10609</td>
          </tr>
          <tr>
            <td>NCAR-CCSM4</td>
            <td>2100</td>
            <td>10472</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">~219 rows, 3 columns, ~5kb</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="content is-size-5 no-print">
      <DownloadCsvButton
        :text="downloadCsvText"
        endpoint="mmm/degree_days/heating/all"
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
  name: 'HeatingDegreeDaysReport',
  components: {
    DownloadCsvButton,
    UnitWidget,
  },

  computed: {
    downloadCsvText() {
      return "Download CSV of heading degree days for " + this.placeName
    },
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
