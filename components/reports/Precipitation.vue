<template>
  <div v-if="Object.keys(results.precipitation.summary).length != 0">
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
        Both historical and projected data for total precipitation are at a
        2&#x202F;km spatial resolution. Data have been summarized to annual
        totals, from monthly temporal resolution.
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
            <th scope="col"></th>
            <th scope="col">Min</th>
            <th scope="col">Mean</th>
            <th scope="col">Max</th>
          </tr>
        </thead>
        <tbody>
          <tr class="historical">
            <th scope="row">Historical (1901-2015)</th>
            <td>
              {{ results.precipitation['summary']['historical']['prmin']
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{ results.precipitation['summary']['historical']['prmean']
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{ results.precipitation['summary']['historical']['prmax']
              }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
          <tr>
            <th scope="row">Early Century (2010-2039)</th>
            <td>
              {{ results.precipitation['summary']['2010-2039']['prmin']
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{ results.precipitation['summary']['2010-2039']['prmean']
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{ results.precipitation['summary']['2010-2039']['prmax']
              }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040-2069)</th>
            <td>
              {{ results.precipitation['summary']['2040-2069']['prmin']
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{ results.precipitation['summary']['2040-2069']['prmean']
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{ results.precipitation['summary']['2040-2069']['prmax']
              }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070-2099)</th>
            <td>
              {{ results.precipitation.summary['2070-2099'].prmin
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{ results.precipitation.summary['2070-2099'].prmean
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{ results.precipitation.summary['2070-2099'].prmax
              }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">Data preview</h4>

      <p class="content is-size-5 mb-1">
        CSV download includes annual values for both historical CRU TS
        (1901&ndash;2015) and modeled projected (2010&ndash;2099) datasets. Data
        are provided in metric units.
      </p>
      <PreviewTable
        :csvString="results.precipitation.preview"
        sizeBlurb="~1525 rows, 4 columns, ~42kb"
      />
    </div>

    <div class="block data-outro content is-size-5 no-print">
      <h4 class="title is-5 no-print">
        Data access &amp; additional information
      </h4>

      <ul>
        <li>
          <DownloadCsvButton
            text="Download this data as CSV"
            endpoint="precipitation"
          />
        </li>
        <li>
          Source datasets and metadata:
          <ul>
            <li>
              <a
                href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/9eeef879-42ee-4bbe-a54e-435716ad0c90"
                >Historical Monthly and Derived Precipitation Products</a
              >
            </li>
            <li>
              <a
                href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/f44595c8-5384-4c02-9ab4-f7a9c43e92eb"
                >Projected Monthly and Derived Precipitation Products</a
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
  name: 'PrecipitationReport',
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
