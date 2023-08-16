<template>
  <div v-if="Object.keys(results.proj_precip).length != 0">
    <div class="radio-units no-print">
      <p>You can choose the era to show in the tables below.</p>
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
    <div v-for="model in ['GFDL-CM3', 'NCAR-CCSM4']" class="pb-5">
      <h3 class="title is-5 pt-5">
        Modeled cumulative rainfall, {{ model }}, {{ radioEra }} ({{
          getUnits
        }})
      </h3>
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
                  `pr_${interval}_${duration}_${model}_${radioEra}_mean`
                ]
              }}<UnitWidget unitType="mm_in" /><br />
              <span class="small-text">
                ({{
                  results.proj_precip[
                    `pr_${interval}_${duration}_${model}_${radioEra}_min`
                  ]
                }}
                &ndash;
                {{
                  results.proj_precip[
                    `pr_${interval}_${duration}_${model}_${radioEra}_max`
                  ]
                }})
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4 class="title is-6 no-print">Access to Data</h4>
    <div class="content no-print">
      <ul>
        <li>
          <a
            href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/304b6d89-961e-417d-b6ba-4139c7fe5ff6"
            target="_blank"
            >Annual maximum precipitation projections for Alaska</a
          >
        </li>
      </ul>
    </div>
    <DownloadCsvButton
      text="Download projected precipitation data as CSV"
      endpoint="proj_precip/point"
      class="mt-3 mb-5"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DownloadCsvButton from '~/components/DownloadCsvButton'
import UnitWidget from '~/components/UnitWidget'

export default {
  name: 'ProjectedPrecipitationReport',
  components: {
    DownloadCsvButton,
    UnitWidget,
  },
  data() {
    return {
      radioEra: '2020-2049',
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
.small-text {
  font-size: 10px;
  font-style: italic;
}
.no-border {
  border: none;
}
</style>
