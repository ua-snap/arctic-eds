<template>
  <div>
    <div class="block">
      <div class="content is-size-5">
        <ul class="module-link">
          <li>
            Use this dataset in an
            <a
              href="https://ua-snap.github.io/ardac-notebooks/lab?path=design_thawing_index%2Fdesign_thawing_index_module.ipynb"
              target="_blank"
              >interactive computational module for
              <strong>design thawing index</strong>.</a
            >
          </li>
        </ul>
      </div>
      <h4 class="title is-5 mb-1">Summary</h4>
      <div class="content is-size-5">
        The summary table below shows the minimum, mean and maximum values
        across one scenario (RCP 8.5) and both models (NCAR CCSM4 and GFDL CM3).
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
              {{ round(results.thawing_index['summary']['2010-2039']['ddmin'],2)
              }}<UnitWidget unitType="dd" /><br><Diff
                kind="pct"
                :past="
                  results.thawing_index['summary']['historical']['ddmin']
                "
                :future="
                  results.thawing_index['summary']['2010-2039']['ddmin']
                "
              />
            </td>
            <td>
              {{ round(results.thawing_index['summary']['2010-2039']['ddmean'],2)
              }}<UnitWidget unitType="dd" /><br><Diff
                kind="pct"
                :past="
                  results.thawing_index['summary']['historical']['ddmean']
                "
                :future="
                  results.thawing_index['summary']['2010-2039']['ddmean']
                "
              />
            </td>
            <td>
              {{ round(results.thawing_index['summary']['2010-2039']['ddmax'],2)
              }}<UnitWidget unitType="dd" /><br><Diff
                kind="pct"
                :past="
                  results.thawing_index['summary']['historical']['ddmax']
                "
                :future="
                  results.thawing_index['summary']['2010-2039']['ddmax']
                "
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040&ndash;2069)</th>
            <td>
              {{ round(results.thawing_index['summary']['2040-2069']['ddmin'],2)
              }}<UnitWidget unitType="dd" /><br><Diff
                kind="pct"
                :past="
                  results.thawing_index['summary']['historical']['ddmin']
                "
                :future="
                  results.thawing_index['summary']['2040-2069']['ddmin']
                "
              />
            </td>
            <td>
              {{ round(results.thawing_index['summary']['2040-2069']['ddmean'],2)
              }}<UnitWidget unitType="dd" /><br><Diff
                kind="pct"
                :past="
                  results.thawing_index['summary']['historical']['ddmean']
                "
                :future="
                  results.thawing_index['summary']['2040-2069']['ddmean']
                "
              />
            </td>
            <td>
              {{ round(results.thawing_index['summary']['2040-2069']['ddmax'],2)
              }}<UnitWidget unitType="dd" /><br><Diff
                kind="pct"
                :past="
                  results.thawing_index['summary']['historical']['ddmax']
                "
                :future="
                  results.thawing_index['summary']['2040-2069']['ddmax']
                "
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070&ndash;2099)</th>
            <td>
              {{ round(results.thawing_index['summary']['2070-2099']['ddmin'],2)
              }}<UnitWidget unitType="dd" /><br><Diff
                kind="pct"
                :past="
                  results.thawing_index['summary']['historical']['ddmin']
                "
                :future="
                  results.thawing_index['summary']['2070-2099']['ddmin']
                "
              />
            </td>
            <td>
              {{ round(results.thawing_index['summary']['2070-2099']['ddmean'],2)
              }}<UnitWidget unitType="dd" /><br><Diff
                kind="pct"
                :past="
                  results.thawing_index['summary']['historical']['ddmean']
                "
                :future="
                  results.thawing_index['summary']['2070-2099']['ddmean']
                "
              />
            </td>
            <td>
              {{ round(results.thawing_index['summary']['2070-2099']['ddmax'],2)
              }}<UnitWidget unitType="dd" /><br><Diff
                kind="pct"
                :past="
                  results.thawing_index['summary']['historical']['ddmax']
                "
                :future="
                  results.thawing_index['summary']['2070-2099']['ddmax']
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
        :csvString="results.thawing_index.preview"
        sizeBlurb="~219 rows, 3 columns, ~5kb"
      />
    </div>

    <div class="block content is-size-5 no-print">
      <h4 class="title is-5 mb-1">Data download</h4>
      <ul>
        <li>
          <DownloadCsvButton
            :text="downloadCsvText"
            endpoint="degree_days/thawing_index"
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

export default {
  name: 'ThawingIndexReport',
  mixins: [numeric],
  components: {
    DownloadCsvButton,
    UnitWidget,
  },

  computed: {
    downloadCsvText() {
      return 'Download CSV of thawing index for ' + this.placeName
    },
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
