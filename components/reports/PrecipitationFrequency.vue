<template>
  <div class="pf" v-if="isPrecipitationFrequencyPresent">
    <div class="data-intro content is-size-5">
      <p>
        Below are projected precipitation frequencies by duration and exceedence
        probability. Projections were derived from GFDL-CM3 and NCAR-CCSM4 model
        outputs under the CMIP5 RCP 8.5 emissions scenario, summarized by three
        future eras. Spatial resolution: 481&#8239;m.
      </p>
      <ul class="module-link">
        <li>
          Use this dataset in an
          <a
            href="https://ua-snap.github.io/ardac-notebooks/lab?path=design_discharge%2Fdesign_discharge.ipynb"
            target="_blank"
            >interactive computational module for
            <strong>design discharge</strong>.</a
          >
        </li>
      </ul>
      <p>
        Each table entry below shows the maximum expected precipitation at your
        chosen location over the duration specified for that row (60 minutes to
        60 days), at an exceedence probability specified for that column. A 95%
        confidence interval appears below this value. See the report and
        academic paper, linked below, for more information.
      </p>
    </div>
    <div class="radio-units no-print">
      <div>
        <b-field label="Era">
          <b-radio v-model="radioEra" name="radioEra" native-value="2020-2049">
            2020-2049
          </b-radio>
          <b-radio v-model="radioEra" name="radioEra" native-value="2050-2079">
            2050-2079
          </b-radio>
          <b-radio v-model="radioEra" name="radioEra" native-value="2080-2099">
            2080-2099
          </b-radio>
        </b-field>
      </div>
    </div>
    <div class="radio-units no-print">
      <div>
        <b-field label="Model">
          <b-radio
            v-model="radioPrecipFreqModel"
            name="radioPrecipFreqModel"
            native-value="NCAR-CCSM4"
          >
            NCAR-CCSM4
          </b-radio>
          <b-radio
            v-model="radioPrecipFreqModel"
            name="radioPrecipFreqModel"
            native-value="GFDL-CM3"
          >
            GFDL-CM3
          </b-radio>
        </b-field>
      </div>
    </div>
    <h4 class="title is-4 mt-6">
      Projected precipitation frequency, {{ radioPrecipFreqModel }},
      {{ radioEra }}
    </h4>
    <table class="table">
      <thead>
        <tr>
          <th class="no-border">Duration</th>
          <th class="no-border" colspan="9">Annual exceedance probability</th>
        </tr>
        <tr>
          <th></th>
          <th
            v-for="(interval, intIndex) in [
              2, 5, 10, 25, 50, 100, 200, 500, 1000,
            ]"
            :key="intIndex"
            width="10%"
          >
            {{ (1 / interval) * 100 }}%
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(duration, durIndex) in [
            '60m',
            '2h',
            '3h',
            '6h',
            '12h',
            '24h',
            '2d',
            '3d',
            '4d',
            '7d',
            '10d',
            '20d',
            '30d',
            '45d',
            '60d',
          ]"
          :key="durIndex"
        >
          <td>{{ duration }}</td>
          <td
            v-for="(interval, intIndex) in [
              2, 5, 10, 25, 50, 100, 200, 500, 1000,
            ]"
            :key="intIndex"
          >
            {{
              results.precip_frequency[
                `pr_${interval}_${duration}_${radioPrecipFreqModel}_${radioEra}_mean`
              ]
            }}<UnitWidget unitType="mm_in" /><br />
            <span class="small-text">
              {{
                results.precip_frequency[
                  `pr_${interval}_${duration}_${radioPrecipFreqModel}_${radioEra}_min`
                ]
              }}&mdash;{{
                results.precip_frequency[
                  `pr_${interval}_${duration}_${radioPrecipFreqModel}_${radioEra}_max`
                ]
              }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="block data-outro content is-size-5 no-print">
      <h4 class="title is-5 no-print">
        Data access &amp; additional information
      </h4>

      <ul>
        <li>
          <DownloadCsvButton
            text="Download this data as CSV"
            endpoint="precipitation/frequency/point"
          />
        </li>
        <li>
          Read a
          <a
            href="https://uaf-snap.org/wp-content/uploads/2021/05/dot-precip_FINAL-REPORT_20210526.pdf"
            >detailed report and overview of the data preparation and research
            methodology</a
          >
          used to prepare this dataset
        </li>
        <li>
          Source dataset and metadata:
          <a
            href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/304b6d89-961e-417d-b6ba-4139c7fe5ff6"
            >Annual maximum precipitation projections for Alaska</a
          >
        </li>
        <li>
          Academic reference:
          <blockquote>
            Bieniek P, Walsh J, Fresco N, Tauxe C, Redilla K. Anticipated
            changes in Alaska extreme precipitation. Journal of Applied
            Meteorology and Climatology. 2022; 61(2):97-108.
            <a href="https://doi.org/10.1175/JAMC-D-21-0106.1"
              >https://doi.org/10.1175/JAMC-D-21-0106.1</a
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

export default {
  name: 'PrecipitationFrequencyReport',
  components: {
    DownloadCsvButton,
    UnitWidget,
  },
  data() {
    return {
      radioEra: '2020-2049',
      radioPrecipFreqModel: 'NCAR-CCSM4',
    }
  },
  computed: {
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
      isPlaceDefined: 'report/isPlaceDefined',
      units: 'report/units',
      isPrecipitationFrequencyPresent: 'report/isPrecipitationFrequencyPresent',
    }),
    getUnits() {
      return this.units === 'imperial' ? 'inches' : 'mm'
    },
  },
  watch: {
    isPlaceDefined: function () {
      this.$fetch()
    },
  },
  fetch() {
    let plateResults = {}
    for (const return_interval in this.results.precip_frequency) {
      // If the results have already been converted, such as when
      // clicking on an anchor link in the TOC, do not try to convert
      // the results again.
      if (return_interval.includes('pr')) {
        plateResults = this.results.precip_frequency
        break
      }
      const durations = this.results.precip_frequency[return_interval]
      for (const duration in durations) {
        const models = durations[duration]
        for (const model in models) {
          const eras = models[model]
          for (const era in eras) {
            const precips = eras[era]
            plateResults[
              `pr_${return_interval}_${duration}_${model}_${era}_min`
            ] = precips.pf_lower

            plateResults[
              `pr_${return_interval}_${duration}_${model}_${era}_mean`
            ] = precips.pf

            plateResults[
              `pr_${return_interval}_${duration}_${model}_${era}_max`
            ] = precips.pf_upper
          }
        }
      }
    }

    this.$store.commit('report/setPlateResults', {
      plateResults: plateResults,
      variable: 'precip_frequency',
    })
  },
}
</script>

<style lang="scss" scoped>
table.table {
  width: 100%;
  table-layout: fixed;
  .small-text {
    font-size: 85%;
  }
  .no-border {
    border: none;
  }
}
</style>
