<template>
  <div v-if="Object.keys(results.temperature).length != 0">
    <div class="block content is-size-5">
      <p>
        These data come from two types of data sources: historical modeled data
        (CRU TS), and projected downscaled GCM data from across five different
        climate models (NCAR CCSM4, GFDL CM3, GISS E2-R, MRI CGCM3, and IPSL
        CM5A-LR) and three climate scenarios (RCP 4.5, 6.0 and 8.5).
      </p>
      <p>
        Projected data (2010&ndash;2039) can show more variability than the
        historical data in the tables below because it is showing the extreme
        values across all models and scenarios.
      </p>
      <p>
        Both historical and projected data for temperature are at a 2&#x202F;km
        spatial resolution. Data are available as annual means, and monthly
        means for January and July.
      </p>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">Data Summary</h4>
      <div class="content is-size-5">
        The summary table below shows the minimum, mean and maximum values
        across three scenarios (RCP 4.5, RCP 6.0 and RCP 8.5) and five models
        (NCAR CCSM4, GFDL CM3, GISS E2-R, MRI CGCM3, and IPSL CM5A-LR) for the
        specified era, which can be helpful to assess broad trends and
        variation.
      </div>
    </div>

    <div class="block">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th scope="col" colspan="3">Annual</th>
            <th scope="col" colspan="3">January</th>
            <th scope="col" colspan="3">July</th>
          </tr>
          <tr>
            <th scope="col"></th>
            <th scope="col">Min</th>
            <th scope="col">Mean</th>
            <th scope="col">Max</th>
            <th scope="col">Min</th>
            <th scope="col">Mean</th>
            <th scope="col">Max</th>
            <th scope="col">Min</th>
            <th scope="col">Mean</th>
            <th scope="col">Max</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Historical (1901&ndash;2015)</th>
            <td>
              {{ results.temperature.summary.historical.all.tasmin
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary.historical.all.tasmean
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary.historical.all.tasmax
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary.historical.jan.tasmin
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary.historical.jan.tasmean
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary.historical.jan.tasmax
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary.historical.july.tasmin
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary.historical.july.tasmean
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary.historical.july.tasmax
              }}<UnitWidget />
            </td>
          </tr>
          <tr>
            <th scope="row">Early Century (2010-2039)</th>
            <td>
              {{ results.temperature.summary['2010-2039'].all.tasmin
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2010-2039'].all.tasmean
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2010-2039'].all.tasmax
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2010-2039'].jan.tasmin
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2010-2039'].jan.tasmean
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2010-2039'].jan.tasmax
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2010-2039'].july.tasmin
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2010-2039'].july.tasmean
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2010-2039'].july.tasmax
              }}<UnitWidget />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040-2069)</th>
            <td>
              {{ results.temperature.summary['2040-2069'].all.tasmin
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2040-2069'].all.tasmean
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2040-2069'].all.tasmax
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2040-2069'].jan.tasmin
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2040-2069'].jan.tasmean
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2040-2069'].jan.tasmax
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2040-2069'].july.tasmin
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2040-2069'].july.tasmean
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2040-2069'].july.tasmax
              }}<UnitWidget />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070-2099)</th>
            <td>
              {{ results.temperature.summary['2070-2099'].all.tasmin
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2070-2099'].all.tasmean
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2070-2099'].all.tasmax
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2070-2099'].jan.tasmin
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2070-2099'].jan.tasmean
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2070-2099'].jan.tasmax
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2070-2099'].july.tasmin
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2070-2099'].july.tasmean
              }}<UnitWidget />
            </td>
            <td>
              {{ results.temperature.summary['2070-2099'].july.tasmax
              }}<UnitWidget />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">Data preview</h4>

      <p class="content is-size-5 mb-1">
        CSV download includes annual values for both historical CRU TS
        (1901&ndash;2015) and modeled projected (2010&ndash;2099) datasets.
        January and July data also include minimums and maximums for each year.
        Data are provided in metric units.
      </p>
      <PreviewTable
        :csvString="results.temperature.preview"
        sizeBlurb="~1525 rows, 4 columns, ~42kb"
      />
    </div>

    <div class="block data-outro content is-size-5 no-print">
      <h4 class="title is-5 no-print">
        Data access &amp; additional information
      </h4>

      <ul>
        <li>
          CSV downloads for {{ placeName }}:
          <ul>
            <li>
              <DownloadCsvButton
                text="Download annual temperature mean data as CSV"
                endpoint="temperature"
              />
            </li>
            <li>
              <DownloadCsvButton
                text="Download annual January temperature min-mean-max as CSV"
                endpoint="temperature/jan"
              />
            </li>
            <li>
              <DownloadCsvButton
                text="Download annual July temperature min-mean-max as CSV"
                endpoint="temperature/july"
              />
            </li>
          </ul>
        </li>
        <li>
          Source datasets and metadata:
          <ul>
            <li>
              <a
                href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/3b2b24ff-4916-4d92-95b7-c6b2fcefd381"
                >Historical Monthly and Derived Temperature Products</a
              >
            </li>
            <li>
              <a
                href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/ba834996-ad15-4785-9b43-ef2af86a5ad9"
                >Projected Monthly and Derived Temperature Products</a
              >
            </li>
          </ul>
        </li>
        <li>
          Academic reference:
          <blockquote>
            Walsh J.E., Bhatt U.S., Littell J. S., Leonawicz M., Lindgren M.,
            Kurkowski T. A., Bieniek P. A., Gray S., &amp; Rupp T. S. (2018).
            Downscaling of climate model output for Alaskan stakeholders,
            <i>Environmental Modelling &amp; Software, 110</i>, 38–51. DOI
            <a href="https://doi.org/10.1016/j.envsoft.2018.03.021"
              >10.1016/j.envsoft.2018.03.021</a
            >
          </blockquote>
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
  name: 'TemperatureReport',
  components: {
    DownloadCsvButton,
    UnitWidget,
    PreviewTable,
  },
  computed: {
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
      isPlaceDefined: 'report/isPlaceDefined',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
