<template>
  <div v-if="Object.keys(results.dot_precip).length != 0">
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
                results.dot_precip[
                  `pr_${interval}_${duration}_${model}_${radioEra}_mean`
                ]
              }}<UnitWidget unitType="mm_in" /><br />
              <span class="small-text">
                ({{
                  results.dot_precip[
                    `pr_${interval}_${duration}_${model}_${radioEra}_min`
                  ]
                }}
                &ndash;
                {{
                  results.dot_precip[
                    `pr_${interval}_${duration}_${model}_${radioEra}_max`
                  ]
                }})
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <DownloadCsvButton
      text="Download projected precipitation data as CSV"
      endpoint="dot_precip/point"
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
    for (const key1 in this.results.dot_precip) {
      const data1 = this.results.dot_precip[key1]
      for (const key2 in data1) {
        const data2 = data1[key2]
        for (const key3 in data2) {
          const data3 = data2[key3]
          for (const key4 in data3) {
            const data4 = data3[key4]
            plateResults[`pr_${key1}_${key2}_${key3}_${key4}_min`] = (
              data4.pf_lower * 25.4
            ).toFixed(0)
            plateResults[`pr_${key1}_${key2}_${key3}_${key4}_mean`] = (
              data4.pf * 25.4
            ).toFixed(0)
            plateResults[`pr_${key1}_${key2}_${key3}_${key4}_max`] = (
              data4.pf_upper * 25.4
            ).toFixed(0)
          }
        }
      }
    }

    this.$store.commit('report/setPlateResults', {
      plateResults: plateResults,
      variable: 'dot_precip',
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
