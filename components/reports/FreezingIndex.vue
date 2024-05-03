<template>
  <div>
    <div class="block">
      <div v-if="!safeMode" class="content is-size-5">
        <p>Use this dataset in interactive computational modules:</p>
        <ul class="module-link">
          <li>
            &nbsp;
            <a
              href="https://ua-snap.github.io/ardac-notebooks/lab/?path=design_freezing_index%2Fdesign_freezing_index_module.ipynb"
              target="_blank"
            >
              <strong>design freezing index</strong></a
            >
          </li>
          <li>
            &nbsp;
            <a
              href="https://ua-snap.github.io/ardac-notebooks/lab?path=frost_depth%2FModified+Berggren+Frost+Depth.ipynb"
              target="_blank"
            >
              <strong>Modified Berggren frost depth</strong> calculator</a
            >
          </li>
        </ul>
      </div>
      <h4 class="title is-5 mb-1">Summary</h4>
      <div class="content is-size-5">
        The summary table below shows the minimum, mean and maximum values
        across two scenarios (RCP 4.5, RCP 8.5) and all nine models listed in
        the introduction to this section, rounded to three significant digits.
        The percent change from the modeled baseline (1980-2009) is shown below.
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
            <th scope="row">Early Century (2010&ndash;2039)</th>
            <td>
              {{
                round(
                  results.freezing_index['summary']['2010-2039']['ddmin'],
                  2
                )
              }}<UnitWidget unitType="dd" /><br /><Diff
                kind="pct"
                :past="
                  results.freezing_index['summary']['modeled_baseline']['ddmin']
                "
                :future="
                  results.freezing_index['summary']['2010-2039']['ddmin']
                "
              />
            </td>
            <td>
              {{
                round(
                  results.freezing_index['summary']['2010-2039']['ddmean'],
                  2
                )
              }}<UnitWidget unitType="dd" /><br /><Diff
                kind="pct"
                :past="
                  results.freezing_index['summary']['modeled_baseline'][
                    'ddmean'
                  ]
                "
                :future="
                  results.freezing_index['summary']['2010-2039']['ddmean']
                "
              />
            </td>
            <td>
              {{
                round(
                  results.freezing_index['summary']['2010-2039']['ddmax'],
                  2
                )
              }}<UnitWidget unitType="dd" /><br /><Diff
                kind="pct"
                :past="
                  results.freezing_index['summary']['modeled_baseline']['ddmax']
                "
                :future="
                  results.freezing_index['summary']['2010-2039']['ddmax']
                "
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040&ndash;2069)</th>
            <td>
              {{
                round(
                  results.freezing_index['summary']['2040-2069']['ddmin'],
                  2
                )
              }}<UnitWidget unitType="dd" /><br /><Diff
                kind="pct"
                :past="
                  results.freezing_index['summary']['modeled_baseline']['ddmin']
                "
                :future="
                  results.freezing_index['summary']['2040-2069']['ddmin']
                "
              />
            </td>
            <td>
              {{
                round(
                  results.freezing_index['summary']['2040-2069']['ddmean'],
                  2
                )
              }}<UnitWidget unitType="dd" /><br /><Diff
                kind="pct"
                :past="
                  results.freezing_index['summary']['modeled_baseline'][
                    'ddmean'
                  ]
                "
                :future="
                  results.freezing_index['summary']['2040-2069']['ddmean']
                "
              />
            </td>
            <td>
              {{
                round(
                  results.freezing_index['summary']['2040-2069']['ddmax'],
                  2
                )
              }}<UnitWidget unitType="dd" /><br /><Diff
                kind="pct"
                :past="
                  results.freezing_index['summary']['modeled_baseline']['ddmax']
                "
                :future="
                  results.freezing_index['summary']['2040-2069']['ddmax']
                "
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070&ndash;2099)</th>
            <td>
              {{
                round(
                  results.freezing_index['summary']['2070-2099']['ddmin'],
                  2
                )
              }}<UnitWidget unitType="dd" /><br /><Diff
                kind="pct"
                :past="
                  results.freezing_index['summary']['modeled_baseline']['ddmin']
                "
                :future="
                  results.freezing_index['summary']['2070-2099']['ddmin']
                "
              />
            </td>
            <td>
              {{
                round(
                  results.freezing_index['summary']['2070-2099']['ddmean'],
                  2
                )
              }}<UnitWidget unitType="dd" /><Diff
                kind="pct"
                :past="
                  results.freezing_index['summary']['modeled_baseline'][
                    'ddmean'
                  ]
                "
                :future="
                  results.freezing_index['summary']['2070-2099']['ddmean']
                "
              />
            </td>
            <td>
              {{
                round(
                  results.freezing_index['summary']['2070-2099']['ddmax'],
                  2
                )
              }}<UnitWidget unitType="dd" /><Diff
                kind="pct"
                :past="
                  results.freezing_index['summary']['modeled_baseline']['ddmax']
                "
                :future="
                  results.freezing_index['summary']['2070-2099']['ddmax']
                "
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">Data preview</h4>

      <p class="content is-size-5 mb-1">
        CSV download includes annual values for the entire time series.
      </p>
      <PreviewTable
        :csvString="results.freezing_index.preview"
        sizeBlurb="~2742 rows, 4 columns, ~73.4kb"
      />
    </div>

    <div v-if="!safeMode" class="block content is-size-5 no-print">
      <h4 class="title is-5 mb-1">Data download</h4>
      <ul>
        <li>
          <DownloadCsvButton
            :text="downloadCsvText"
            endpoint="degree_days/freezing_index"
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
import { numeric } from '~/mixins/numeric.js'
import { safe } from '~/mixins/safe.js'

export default {
  name: 'FreezingIndexReport',
  mixins: [numeric, safe],
  components: {
    DownloadCsvButton,
    UnitWidget,
  },

  computed: {
    downloadCsvText() {
      return 'Download CSV of freezing index for ' + this.placeName
    },
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
