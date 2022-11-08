<template>
  <div>
    <CloseReportButton />
    <hr />

    <div id="report">
      <h3 class="title is-3">Permafrost data for {{ plateResults.place }}</h3>

      <UnitRadio
        class="my-5"
        :patterns="[
          { type: 'temperature', substring: 'magt_', variable: 'permafrost' },
        ]"
      />

      <h4 class="title is-4">GIPL Mean Annual Ground Temperature</h4>

      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">MAGT</th>
            <th scope="col">Change from Historical</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Historical (1995)</th>
            <td>
              {{ plateResults.gipl_magt_1995 }}<UnitWidget type="light" />
            </td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">2011 - 2040</th>
            <td>
              {{ plateResults.gipl_magt_2025 }}<UnitWidget type="light" />
            </td>
            <td>
              {{
                signedDiff(
                  plateResults.gipl_magt_1995,
                  plateResults.gipl_magt_2025,
                  'magt'
                )
              }}<UnitWidget type="light" />
            </td>
          </tr>
          <tr>
            <th scope="row">2036 - 2065</th>
            <td>
              {{ plateResults.gipl_magt_2050 }}<UnitWidget type="light" />
            </td>
            <td>
              {{
                signedDiff(
                  plateResults.gipl_magt_1995,
                  plateResults.gipl_magt_2050,
                  'magt'
                )
              }}<UnitWidget type="light" />
            </td>
          </tr>
          <tr>
            <th scope="row">2061 – 2090</th>
            <td>
              {{ plateResults.gipl_magt_2075 }}<UnitWidget type="light" />
            </td>
            <td>
              {{
                signedDiff(
                  plateResults.gipl_magt_1995,
                  plateResults.gipl_magt_2075,
                  'magt'
                )
              }}<UnitWidget type="light" />
            </td>
          </tr>
          <tr>
            <th scope="row">2086 – 2100</th>
            <td>
              {{ plateResults.gipl_magt_2095 }}<UnitWidget type="light" />
            </td>
            <td>
              {{
                signedDiff(
                  plateResults.gipl_magt_1995,
                  plateResults.gipl_magt_2095,
                  'magt'
                )
              }}<UnitWidget type="light" />
            </td>
          </tr>
        </tbody>
      </table>

      <h4 class="title is-6 mt-5">Additional data</h4>
      <div class="content">
        <ul>
          <li v-if="plateResults.magt_2018">
            Obu et al. (2018) Mean Annual Ground Temperature at Top of
            Permafrost:
            <strong
              >{{ plateResults.magt_2018
              }}<UnitWidget unitType="temp" type="light"
            /></strong>
          </li>
          <li v-if="plateResults.giv_2008">
            Jorgenson et al. (2008) Ground Ice Volume:
            <strong>{{ plateResults.giv_2008 }}</strong>
          </li>
          <li v-if="plateResults.pe_2008">
            Jorgenson et al. (2008) Permafrost Extent:
            <strong>{{ plateResults.pe_2008 }}</strong>
          </li>
          <li v-if="plateResults.pe_2018">
            Obu et al. (2018) Permafrost Extent:
            <strong>{{ plateResults.pe_2018 }}</strong>
          </li>
        </ul>
      </div>
      <DownloadCsvButton
        text="Download permafrost data as CSV"
        endpoint="permafrost/point"
        class="mt-3 mb-5"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DownloadCsvButton from '~/components/DownloadCsvButton'
import UnitWidget from '~/components/UnitWidget'

export default {
  name: 'PermafrostReport',
  components: {
    DownloadCsvButton,
    UnitWidget,
  },
  computed: {
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
      isPlaceDefined: 'report/isPlaceDefined',
      latLng: 'report/latLng',
      units: 'report/units',
    }),
  },
  methods: {
    signedDiff(historical, projected, variable) {
      let decimals
      if (variable == 'magt') {
        decimals = 1
      }
      let rawDiff = (projected - historical).toFixed(decimals)
      if (rawDiff > 0) {
        return '+' + rawDiff
      } else {
        return rawDiff
      }
    },
  },
  watch: {
    latLng: function () {
      this.$fetch()
    },
  },
  data() {
    return {
      plateResults: null,
    }
  },
  async fetch() {
    if (this.isPlaceDefined) {
      let place = this.placeName

      this.plateResults = {
        place: place,

        // "magt_" substrings are converted between °C and °F
        gipl_magt_1995:
          this.results['permafrost']['gipl']['1995']['cruts31']['historical'][
            'magt'
          ],
        gipl_magt_2025:
          this.results['permafrost']['gipl']['2025']['ncarccsm4']['rcp85'][
            'magt'
          ],
        gipl_magt_2050:
          this.results['permafrost']['gipl']['2050']['ncarccsm4']['rcp85'][
            'magt'
          ],
        gipl_magt_2075:
          this.results['permafrost']['gipl']['2075']['ncarccsm4']['rcp85'][
            'magt'
          ],
        gipl_magt_2095:
          this.results['permafrost']['gipl']['2095']['ncarccsm4']['rcp85'][
            'magt'
          ],
      }

      if (this.results['permafrost']['jorg'] != null) {
        this.plateResults['giv_2008'] =
          this.results['permafrost']['jorg']['ice']
        this.plateResults['pe_2008'] = this.results['permafrost']['jorg']['pfx']
      }

      if (this.results['permafrost']['obu_magt'] != null) {
        // "magt_" substrings are converted between °C and °F
        this.plateResults['magt_2018'] =
          this.results['permafrost']['obu_magt']['temp']
      }

      if (this.results['permafrost']['obupfx'] != null) {
        this.plateResults['pe_2018'] =
          this.results['permafrost']['obupfx']['pfx']
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>
