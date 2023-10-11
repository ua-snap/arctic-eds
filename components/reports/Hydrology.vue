<template>
  <div v-if="isHydrologyPresent">
    <div class="block content is-size-5">
      <p>
        This section provides access to historical and projected modeled decadal
        summaries of hydrologic data for Alaska at a resolution of 12km. These
        data were derived by applying the Variable Infiltration Capacity (VIC)
        model to downscaled CMIP5 historical and projected climate data, using
        RCP 4.5 and RCP 8.5 emissions scenarios.
      </p>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">Data Summary</h4>
      <div class="content is-size-5">
        The blocks below show the minimum, mean and maximum values for the
        annual means across 3 models: CanESM2, GFDL-ESM2M, and NCAR-CCSM4 and 2
        scenarios: RCP 4.5 and RCP 8.5 for each of the given eras.
      </div>
    </div>

    <div class="radio-units no-print">
      <div>
        <b-field label="Model">
          <b-radio
            v-model="radioHydroModel"
            name="radioHydroModel"
            native-value="CanESM2"
          >
            CanESM2
          </b-radio>
          <b-radio
            v-model="radioHydroModel"
            name="radioHydroModel"
            native-value="GFDL-ESM2M"
          >
            GFDL-ESM2M
          </b-radio>
          <b-radio
            v-model="radioHydroModel"
            name="radioHydroModel"
            native-value="CCSM4"
          >
            NCAR-CCSM4
          </b-radio>
        </b-field>
      </div>
    </div>
    <div class="radio-units no-print">
      <div>
        <b-field label="Scenario">
          <b-radio
            v-model="radioHydroScenario"
            name="radioHydroScenario"
            native-value="rcp45"
          >
            RCP 4.5
          </b-radio>
          <b-radio
            v-model="radioHydroScenario"
            name="radioHydroScenario"
            native-value="rcp85"
          >
            RCP 8.5
          </b-radio>
        </b-field>
      </div>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1 mt-5">Runoff</h4>
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
            <th scope="row">Historical (1950&ndash;2009)</th>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.runoff.historical.min
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.runoff.historical.mean
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.runoff.historical.max
              }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
          <tr>
            <th scope="row">Early Century (2010&ndash;2039)</th>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.runoff.early_century.min
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.runoff.early_century.mean
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.runoff.early_century.max
              }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040&ndash;2069)</th>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.runoff.mid_century.min
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.runoff.mid_century.mean
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.runoff.mid_century.max
              }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070&ndash;2099)</th>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.runoff.late_century.min
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.runoff.late_century.mean
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.runoff.late_century.max
              }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">Evapotranspiration</h4>
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
            <th scope="row">Historical (1950&ndash;2009)</th>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.evap.historical.min
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.evap.historical.mean
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.evap.historical.max
              }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
          <tr>
            <th scope="row">Early Century (2010&ndash;2039)</th>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.evap.early_century.min
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.evap.early_century.mean
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.evap.early_century.max
              }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040&ndash;2069)</th>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.evap.mid_century.min
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.evap.mid_century.mean
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.evap.mid_century.max
              }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070&ndash;2099)</th>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.evap.late_century.min
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.evap.late_century.mean
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.evap.late_century.max
              }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">Soil Moisture</h4>
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
            <th scope="row">Historical (1950&ndash;2009)</th>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.sm1.historical.min
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.sm1.historical.mean
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.sm1.historical.max
              }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
          <tr>
            <th scope="row">Early Century (2010&ndash;2039)</th>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.sm1.early_century.min
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.sm1.early_century.mean
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.sm1.early_century.max
              }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040&ndash;2069)</th>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.sm1.mid_century.min
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.sm1.mid_century.mean
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.sm1.mid_century.max
              }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070&ndash;2099)</th>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.sm1.late_century.min
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.sm1.late_century.mean
              }}<UnitWidget unitType="mm_in" />
            </td>
            <td>
              {{
                results.hydrology.summary[`${radioHydroModel}`][
                  `${radioHydroScenario}`
                ].Annual.sm1.late_century.max
              }}<UnitWidget unitType="mm_in" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">Data preview</h4>

      <p class="content is-size-5 mb-1">
        CSV download includes era-separted monthly values for both historical
        (1950&ndash;2009) and modeled projected (2010&ndash;2100) datasets. Data
        are provided in metric units.
      </p>
      <PreviewTable
        :csvString="results.hydrology.preview"
        sizeBlurb="~3621 rows, 16 columns, ~235kb"
      />
    </div>

    <div class="block data-outro content is-size-5 no-print">
      <h4 class="title is-5 no-print">
        Data access &amp; additional information
      </h4>

      <ul>
        <li>
          <DownloadCsvButton
            text="Download hydrology data as CSV"
            endpoint="hydrology/point"
          />
        </li>
        <li>
          Source datasets and metadata:
          <ul>
            <li>
              <a
                href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/557db5d5-dbeb-470a-a9c4-b80d78aa8668"
                >Historical & Projected Data for Hydrology</a
              >
            </li>
          </ul>
        </li>
        <li>
          Academic references:
          <blockquote>
            Near-Surface Met + VIC Hydrologic Model Outputs: NCAR 12 km Edition
            <a
              href="https://github.com/ua-snap/ardac-curation/tree/ncar12km_decadal_summaries/ncar12km_decadal_summaries"
              >GitHub Repository</a
            >
          </blockquote>
          <blockquote>
            Mizukami, N., Newman, A. J., Wood, A. W., Gutmann, E. D., and
            Hamman, J. J. (2022). Boulder, CO: UCAR/NCAR/RAL. 21st Century
            Hydrologic Projections for Alaska and Hawaii;
            <a href="https://doi.org/10.5065/c3kn-2y77"
              >https://doi.org/10.5065/c3kn-2y77</a
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
  name: 'HydrologyReport',
  components: {
    DownloadCsvButton,
    UnitWidget,
    PreviewTable,
  },
  data() {
    return {
      radioHydroModel: 'CanESM2',
      radioHydroScenario: 'rcp45',
    }
  },
  computed: {
    ...mapGetters({
      results: 'report/results',
      isHydrologyPresent: 'report/isHydrologyPresent',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
