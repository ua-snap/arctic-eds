<template>
  <div v-if="isTemperaturePresent">
    <div class="block content is-size-5">
      <p>
        These data come from two types of data sources: historical modeled data
        (CRU TS), and projected downscaled GCM data from across five different
        climate models averaged together (NCAR CCSM4, GFDL CM3, GISS E2-R, MRI
        CGCM3, and IPSL CM5A-LR) and two climate scenarios (RCP 4.5 and 8.5).
      </p>
      <p>
        Projected data (2010&ndash;2039) can show more variability than the
        historical data in the tables below because it is showing the extreme
        values across all models and scenarios.
      </p>
      <p>
        Both historical and projected data for temperature are at a 2&#x202F;km
        spatial resolution. Data are available as monthly min-mean-max values.
      </p>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">Data Summary</h4>
      <div class="content is-size-5">
        The summary table below presents the minimum, mean, and maximum values
        for two scenarios (RCP 4.5 and RCP 8.5), utilizing three distinct
        models: the 5-model average (an average derived from the NCAR CCSM4,
        GFDL CM3, GISS E2-R, MRI CGCM3, and IPSL CM5A-LR models), the NCAR CCSM4
        model, and the GFDL CM3 model. This information is provided for the
        specified era and can be valuable for evaluating overall trends and
        variability.
      </div>
    </div>

    <h4 class="title is-5 mb-1">Mean Annual Temperature, 5 Model Average</h4>
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
            <th scope="row">Historical (1901&ndash;2015)</th>
            <td>
              {{
                results.temperature.summary.historical['CRU-TS'].historical
                  .Annual.tasmin
              }}<UnitWidget />
            </td>
            <td>
              {{
                results.temperature.summary.historical['CRU-TS'].historical
                  .Annual.tasmean
              }}<UnitWidget />
            </td>
            <td>
              {{
                results.temperature.summary.historical['CRU-TS'].historical
                  .Annual.tasmax
              }}<UnitWidget />
            </td>
          </tr>
          <tr>
            <th scope="row">Early Century (2010&ndash;2039)</th>
            <td>
              {{
                results.temperature.summary.projected['5ModelAvg'].rcp85.Annual[
                  '2010-2039'
                ].tasmin
              }}<UnitWidget />
            </td>
            <td>
              {{
                results.temperature.summary.projected['5ModelAvg'].rcp85.Annual[
                  '2010-2039'
                ].tasmean
              }}<UnitWidget />
            </td>
            <td>
              {{
                results.temperature.summary.projected['5ModelAvg'].rcp85.Annual[
                  '2010-2039'
                ].tasmax
              }}<UnitWidget />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040&ndash;2069)</th>
            <td>
              {{
                results.temperature.summary.projected['5ModelAvg'].rcp85.Annual[
                  '2040-2069'
                ].tasmin
              }}<UnitWidget />
            </td>
            <td>
              {{
                results.temperature.summary.projected['5ModelAvg'].rcp85.Annual[
                  '2040-2069'
                ].tasmean
              }}<UnitWidget />
            </td>
            <td>
              {{
                results.temperature.summary.projected['5ModelAvg'].rcp85.Annual[
                  '2040-2069'
                ].tasmax
              }}<UnitWidget />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070&ndash;2099)</th>
            <td>
              {{
                results.temperature.summary.projected['5ModelAvg'].rcp85.Annual[
                  '2070-2099'
                ].tasmin
              }}<UnitWidget />
            </td>
            <td>
              {{
                results.temperature.summary.projected['5ModelAvg'].rcp85.Annual[
                  '2070-2099'
                ].tasmean
              }}<UnitWidget />
            </td>
            <td>
              {{
                results.temperature.summary.projected['5ModelAvg'].rcp85.Annual[
                  '2070-2099'
                ].tasmax
              }}<UnitWidget />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4 class="title is-5 mb-1">Monthly Temperatures</h4>
    <div class="content is-size-5">
      The table below shows the mean monthly temperature, as well as the
      minimum/maximum monthly temperatures, for the specified era and selected
      model/scenario.
    </div>
    <div class="radio-units no-print">
      <div>
        <b-field label="Model">
          <b-radio
            v-model="radioModel"
            name="radioModel"
            native-value="5ModelAvg"
          >
            5 Model Average
          </b-radio>
          <b-radio
            v-model="radioModel"
            name="radioModel"
            native-value="GFDL-CM3"
          >
            GFDL CM3
          </b-radio>
          <b-radio
            v-model="radioModel"
            name="radioModel"
            native-value="NCAR-CCSM4"
          >
            NCAR CCSM4
          </b-radio>
        </b-field>
      </div>
    </div>
    <div class="radio-units no-print">
      <div>
        <b-field label="Scenario">
          <b-radio
            v-model="radioScenario"
            name="radioScenario"
            native-value="rcp45"
          >
            RCP 4.5
          </b-radio>
          <b-radio
            v-model="radioScenario"
            name="radioScenario"
            native-value="rcp85"
          >
            RCP 8.5
          </b-radio>
        </b-field>
      </div>
    </div>
    <div class="block">
      <table class="table months mt-3">
        <thead>
          <tr>
            <th scope="col" class="eraCol"></th>
            <th scope="col">January</th>
            <th scope="col">February</th>
            <th scope="col">March</th>
            <th scope="col">April</th>
            <th scope="col">May</th>
            <th scope="col">June</th>
            <th scope="col">July</th>
            <th scope="col">August</th>
            <th scope="col">September</th>
            <th scope="col">October</th>
            <th scope="col">November</th>
            <th scope="col">December</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Historical <br />(1901&ndash;2015)</th>
            <td
              v-for="(month, index) in [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ]"
              :key="index"
            >
              {{
                results.temperature.summary.historical['CRU-TS'].historical[
                  `${month}`
                ].tasmean
              }}<UnitWidget /><br />
              <span class="small-text">
                {{
                  results.temperature.summary.historical['CRU-TS'].historical[
                    `${month}`
                  ].tasmin
                }}&ndash;{{
                  results.temperature.summary.historical['CRU-TS'].historical[
                    `${month}`
                  ].tasmax
                }}
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row">Early Century <br />(2010&ndash;2039)</th>
            <td
              v-for="(month, index) in [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ]"
              :key="index"
            >
              {{
                results.temperature.summary.projected[`${radioModel}`][
                  `${radioScenario}`
                ][`${month}`]['2010-2039'].tasmean
              }}<UnitWidget /><br />
              <span class="small-text">
                {{
                  results.temperature.summary.projected[`${radioModel}`][
                    `${radioScenario}`
                  ][`${month}`]['2010-2039'].tasmin
                }}&ndash;{{
                  results.temperature.summary.projected[`${radioModel}`][
                    `${radioScenario}`
                  ][`${month}`]['2010-2039'].tasmax
                }}
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century <br />(2040&ndash;2069)</th>
            <td
              v-for="(month, index) in [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ]"
              :key="index"
            >
              {{
                results.temperature.summary.projected[`${radioModel}`][
                  `${radioScenario}`
                ][`${month}`]['2040-2069'].tasmean
              }}<UnitWidget /><br />
              <span class="small-text">
                {{
                  results.temperature.summary.projected[`${radioModel}`][
                    `${radioScenario}`
                  ][`${month}`]['2040-2069'].tasmin
                }}&ndash;{{
                  results.temperature.summary.projected[`${radioModel}`][
                    `${radioScenario}`
                  ][`${month}`]['2040-2069'].tasmax
                }}
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century <br />(2070&ndash;2099)</th>
            <td
              v-for="(month, index) in [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ]"
              :key="index"
            >
              {{
                results.temperature.summary.projected[`${radioModel}`][
                  `${radioScenario}`
                ][`${month}`]['2070-2099'].tasmean
              }}<UnitWidget /><br />
              <span class="small-text">
                {{
                  results.temperature.summary.projected[`${radioModel}`][
                    `${radioScenario}`
                  ][`${month}`]['2070-2099'].tasmin
                }}&ndash;{{
                  results.temperature.summary.projected[`${radioModel}`][
                    `${radioScenario}`
                  ][`${month}`]['2070-2099'].tasmax
                }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">Data preview</h4>

      <p class="content is-size-5 mb-1">
        CSV download includes annual values for both historical CRU TS
        (1901&ndash;2015) and modeled projected (2006&ndash;2100) datasets.
      </p>
      <PreviewTable
        :csvString="results.temperature.preview"
        sizeBlurb="~8227 rows, 7 columns, ~363kb"
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
                text="Download monthly temperature min-mean-max data as CSV"
                endpoint="tas2km/point"
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
  data() {
    return {
      radioModel: '5ModelAvg',
      radioScenario: 'rcp45',
    }
  },
  computed: {
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
      isPlaceDefined: 'report/isPlaceDefined',
      isTemperaturePresent: 'report/isTemperaturePresent',
    }),
  },
}
</script>

<style lang="scss" scoped>
.small-text {
  font-size: 80%;
}
table.months {
  width: 100%;
  table-layout: fixed;
  td,
  th {
    padding: 0.5em 0.4em;

    &.eraCol {
      width: 10%;
    }
  }
}
</style>
