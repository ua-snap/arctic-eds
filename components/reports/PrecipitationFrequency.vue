<template>
  <div class="pf" v-if="Object.keys(results.proj_precip).length != 0">
    <div class="data-intro content is-size-5">
      <p>
        Below are projected precipitation frequencies by duration and return
        interval. Projections were derived from GFDL-CM3 and NCAR-CCSM4 model
        outputs under the CMIP5 RCP 8.5 emissions scenario, summarized by three
        future eras. Spatial resolution: 20km.
      </p>
      <p>
        Each table entry below shows the maximum expected precipitation at your
        chosen location over the duration specified for that row (60 minutes to
        60 days), at a frequency specified for that column (per 2 year to per
        1,000 years). A 95% confidence interval appears below this value. See
        the report and academic paper, linked below, for more information.
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
            v-model="radioModel"
            name="radioModel"
            native-value="NCAR-CCSM4"
          >
            NCAR-CCSM4
          </b-radio>
          <b-radio
            v-model="radioModel"
            name="radioModel"
            native-value="GFDL-CM3"
          >
            GFDL-CM3
          </b-radio>
        </b-field>
      </div>
    </div>
    <h4 class="title is-4 mt-6">
      Projected precipitation frequency, {{ radioModel }}, {{ radioEra }}
    </h4>
    <table class="table">
      <thead>
        <tr>
          <th class="no-border">Duration</th>
          <th class="no-border" colspan="9">
            Annual exceedance probability (1/years)
          </th>
        </tr>
        <tr>
          <th></th>
          <th v-for="interval in [2, 5, 10, 25, 50, 100, 200, 500, 1000]">
            1 / {{ interval }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="duration in [
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
        >
          <td>{{ duration }}</td>
          <td v-for="interval in [2, 5, 10, 25, 50, 100, 200, 500, 1000]">
            {{
              results.proj_precip[
                `pr_${interval}_${duration}_${radioModel}_${radioEra}_mean`
              ]
            }}<UnitWidget unitType="mm_in" /><br />
            <span class="small-text">
              {{
                results.proj_precip[
                  `pr_${interval}_${duration}_${radioModel}_${radioEra}_min`
                ]
              }}&mdash;{{
                results.proj_precip[
                  `pr_${interval}_${duration}_${radioModel}_${radioEra}_max`
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
            endpoint="proj_precip/point"
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
          Academic reference: Bieniek P, Walsh J, Fresco N, Tauxe C, Redilla K.
          Anticipated changes in Alaska extreme precipitation. Journal of
          Applied Meteorology and Climatology. 2022; 61(2):97-108.
          <a href="https://doi.org/10.1175/JAMC-D-21-0106.1"
            >https://doi.org/10.1175/JAMC-D-21-0106.1</a
          >
        </li>
        <li>
          Source dataset and metadata:
          <a
            href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/304b6d89-961e-417d-b6ba-4139c7fe5ff6"
            >Annual maximum precipitation projections for Alaska</a
          >
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
      radioModel: 'NCAR-CCSM4',
    }
  },
  computed: {
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
      isPlaceDefined: 'report/isPlaceDefined',
      units: 'report/units',
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
    const plateResults = {}
    for (const return_interval in this.results.proj_precip) {
      // If the results have already been converted, such as when
      // clicking on an anchor link in the TOC, do not try to convert
      // the results again.
      if (return_interval.includes('pr')) {
        plateResults = this.results.proj_precip
        break
      }
      const durations = this.results.proj_precip[return_interval]
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
      variable: 'proj_precip',
    })
  },
}
</script>

<style lang="scss" scoped>
.pf table {
  font-family: 'IBM Plex Mono', monospace;
  line-height: 1;
}

.small-text {
  font-size: 80%;
}
.no-border {
  border: none;
}
</style>
