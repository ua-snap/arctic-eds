<template>
  <div v-if="isTemperaturePresent">
    <div class="block content is-size-5">
      <p>
        The following results are minimum, mean, and maximum temperature values
        from downscaled climate simulations representing five different models
        (NCAR CCSM4, GFDL CM3, GISS E2-R, MRI CGCM3, and IPSL CM5A-LR) and three
        emissions scenarios (RCP 4.5, 6.0 and 8.5). Model selection was based on
        the models' superior historical performance for the Alaska region for
        three variables: surface air temperature, precipitation, and sea level
        pressure.
      </p>

      <p>
        These data are statistically downscaled and bias corrected via the delta
        method in which a model's future change at a particular location and
        time is added to the respective baseline mean value. This “delta” value
        is then added to a higher-resolution observationally-based climatology.
      </p>

      <p>
        The modeled baseline for these data is the 1901–2015 Climatic Research
        Unit Time Series (CRU TS) dataset (version 4.0). CRU TS is a continuous,
        gridded dataset created through interpolation of point measurements
        based on assumptions about the spatial correlation of climate variables.
        CRU TS is a widely used climate dataset and product of the Climate
        Research Unit at the University of East Anglia. CRU-TS data were
        downscaled to a 1961-1990 climatology produced by the PRISM
        (Parameter-elevation Regressions on Independent Slopes Model) Climate
        Group with the Northwest Alliance for Computational Science &
        Engineering at Oregon State University.
      </p>
      <p>
        The available data extent is the terrestrial area of Alaska. The spatial
        resolution (grid cell size) of all data is 2 by 2 km.
      </p>
      <ul v-if="!safeMode" class="module-link">
        <li>
          Use this dataset in a
          <a
            href="https://ua-snap.github.io/ardac-notebooks/lab?path=frost_depth%2FModified+Berggren+Frost+Depth.ipynb"
            target="_blank"
          >
            <strong>Modified Berggren frost depth</strong> calculator.</a
          >
        </li>
      </ul>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">Data Summary</h4>
      <div class="content is-size-5">
        The summary table below presents the minimum, mean, and maximum values
        for a single scenario (RCP 8.5) and a 5-model average (an average derived from
        the NCAR CCSM4, GFDL CM3, GISS E2-R, MRI CGCM3, and IPSL CM5A-LR
        models).  Data are rounded to two (imperial units) or three (metric) significant digits, and the relative change compared to the modeled baseline (1901-2015) is shown below the value.
      </div>
    </div>

    <h4 class="title is-5 mb-1">
      Mean Annual Temperature, 5 Model Average, RCP 8.5
    </h4>
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
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2010-2039'].tasmin,
                  precision
                )
              }}<UnitWidget /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="
                  results.temperature.summary.historical['CRU-TS'].historical
                    .Annual.tasmin
                "
                :future="
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2010-2039'].tasmin
                "
              />
            </td>
            <td>
              {{
                round(
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2010-2039'].tasmean,
                  precision
                )
              }}<UnitWidget /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="
                  results.temperature.summary.historical['CRU-TS'].historical
                    .Annual.tasmean
                "
                :future="
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2010-2039'].tasmean
                "
              />
            </td>
            <td>
              {{
                round(
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2010-2039'].tasmax,
                  precision
                )
              }}<UnitWidget /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="
                  results.temperature.summary.historical['CRU-TS'].historical
                    .Annual.tasmax
                "
                :future="
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2010-2039'].tasmax
                "
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040&ndash;2069)</th>
            <td>
              {{
                round(
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2040-2069'].tasmin,
                  precision
                )
              }}<UnitWidget /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="
                  results.temperature.summary.historical['CRU-TS'].historical
                    .Annual.tasmin
                "
                :future="
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2040-2069'].tasmin
                "
              />
            </td>
            <td>
              {{
                round(
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2040-2069'].tasmean,
                  precision
                )
              }}<UnitWidget /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="
                  results.temperature.summary.historical['CRU-TS'].historical
                    .Annual.tasmean
                "
                :future="
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2040-2069'].tasmean
                "
              />
            </td>
            <td>
              {{
                round(
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2040-2069'].tasmax,
                  precision
                )
              }}<UnitWidget /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="
                  results.temperature.summary.historical['CRU-TS'].historical
                    .Annual.tasmax
                "
                :future="
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2040-2069'].tasmax
                "
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070&ndash;2099)</th>
            <td>
              {{
                round(
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2070-2099'].tasmin,
                  precision
                )
              }}<UnitWidget /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="
                  results.temperature.summary.historical['CRU-TS'].historical
                    .Annual.tasmin
                "
                :future="
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2070-2099'].tasmin
                "
              />
            </td>
            <td>
              {{
                round(
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2070-2099'].tasmean,
                  precision
                )
              }}<UnitWidget /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="
                  results.temperature.summary.historical['CRU-TS'].historical
                    .Annual.tasmean
                "
                :future="
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2070-2099'].tasmean
                "
              />
            </td>
            <td>
              {{
                round(
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2070-2099'].tasmax,
                  precision
                )
              }}<UnitWidget /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="
                  results.temperature.summary.historical['CRU-TS'].historical
                    .Annual.tasmax
                "
                :future="
                  results.temperature.summary.projected['5ModelAvg'].rcp85
                    .Annual['2070-2099'].tasmax
                "
              />
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
            v-model="radioTempModel"
            name="radioTempModel"
            native-value="5ModelAvg"
          >
            5 Model Average
          </b-radio>
          <b-radio
            v-model="radioTempModel"
            name="radioTempModel"
            native-value="GFDL-CM3"
          >
            GFDL CM3
          </b-radio>
          <b-radio
            v-model="radioTempModel"
            name="radioTempModel"
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
            v-model="radioTempScenario"
            name="radioTempScenario"
            native-value="rcp45"
          >
            RCP 4.5
          </b-radio>
          <b-radio
            v-model="radioTempScenario"
            name="radioTempScenario"
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
          <tr class="historical">
            <th scope="row">Modeled Baseline<br />(1901&ndash;2015)</th>
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
                results.temperature.summary.projected[`${radioTempModel}`][
                  `${radioTempScenario}`
                ][`${month}`]['2010-2039'].tasmean
              }}<UnitWidget /><br />
              <span class="small-text">
                {{
                  results.temperature.summary.projected[`${radioTempModel}`][
                    `${radioTempScenario}`
                  ][`${month}`]['2010-2039'].tasmin
                }}&ndash;{{
                  results.temperature.summary.projected[`${radioTempModel}`][
                    `${radioTempScenario}`
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
                results.temperature.summary.projected[`${radioTempModel}`][
                  `${radioTempScenario}`
                ][`${month}`]['2040-2069'].tasmean
              }}<UnitWidget /><br />
              <span class="small-text">
                {{
                  results.temperature.summary.projected[`${radioTempModel}`][
                    `${radioTempScenario}`
                  ][`${month}`]['2040-2069'].tasmin
                }}&ndash;{{
                  results.temperature.summary.projected[`${radioTempModel}`][
                    `${radioTempScenario}`
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
                results.temperature.summary.projected[`${radioTempModel}`][
                  `${radioTempScenario}`
                ][`${month}`]['2070-2099'].tasmean
              }}<UnitWidget /><br />
              <span class="small-text">
                {{
                  results.temperature.summary.projected[`${radioTempModel}`][
                    `${radioTempScenario}`
                  ][`${month}`]['2070-2099'].tasmin
                }}&ndash;{{
                  results.temperature.summary.projected[`${radioTempModel}`][
                    `${radioTempScenario}`
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
        CSV download includes monthly values for both modeled baseline CRU TS 4.0
        (1901&ndash;2015) and modeled projected (2006&ndash;2100) datasets. Data
        are provided in metric units.
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
        <li v-if="!safeMode">
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
        <li v-if="!safeMode">
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
import { numeric } from '~/mixins/numeric.js'
import { safe } from '~/mixins/safe.js'

export default {
  name: 'TemperatureReport',
  mixins: [numeric, safe],
  components: {
    DownloadCsvButton,
    UnitWidget,
    PreviewTable,
  },
  data() {
    return {
      radioTempModel: '5ModelAvg',
      radioTempScenario: 'rcp45',
    }
  },
  computed: {
    precision() {
      if (this.units == 'metric') {
        return 3
      }
      return 2
    },
    deltaPrecision() {
      if (this.units == 'metric') {
        return 2
      }
      return 1
    },
    ...mapGetters({
      units: 'report/units',
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
  th[scope='row'] {
    line-height: 1.2;
    font-size: 1em;
  }
}
</style>
