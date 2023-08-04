<template>
  <div v-if="Object.keys(results.dot_precip).length != 0">
    <div v-for="model in ['GFDL-CM3', 'NCAR-CCSM4']" class="pb-5">
      <h3 class="title is-5 has-text-centered">
        Modeled cumulative rainfall, {{ model }}, 2020-2049 (inches)
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
                  `pr_${interval}_${duration}_GFDL-CM3_2020-2049_mean`
                ]
              }}<br />
              <span class="small-text">
                ({{
                  results.dot_precip[
                    `pr_${interval}_${duration}_GFDL-CM3_2020-2049_min`
                  ]
                }}
                &ndash;
                {{
                  results.dot_precip[
                    `pr_${interval}_${duration}_GFDL-CM3_2020-2049_max`
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
  computed: {
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
      isPlaceDefined: 'report/isPlaceDefined',
    }),
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
            plateResults[`pr_${key1}_${key2}_${key3}_${key4}_min`] =
              data4.pf_lower
            plateResults[`pr_${key1}_${key2}_${key3}_${key4}_mean`] = data4.pf
            plateResults[`pr_${key1}_${key2}_${key3}_${key4}_max`] =
              data4.pf_upper
          }
        }
      }
    }
    console.log(plateResults)

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
