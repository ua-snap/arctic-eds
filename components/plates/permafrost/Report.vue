<template>
  <div>
    <CloseReportButton />
    <hr />
    <LoadingStatus :state="state" />

    <div id="report">
      <div
        v-if="
          !$fetchState.pending &&
          !$fetchState.error &&
          Object.keys(results).length > 0
        "
      >
        <h3 class="title is-3">Permafrost data for {{ results.place }}</h3>

        <MiniMap />

        <UnitRadio
          class="my-5"
          :patterns="[
            { type: 'temperature', substring: 'magt_' },
            { type: 'm_in', substring: 'alt_' },
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
              <td>{{ results.gipl_magt_1995 }}<UnitWidget type="light" /></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">2011 - 2040</th>
              <td>{{ results.gipl_magt_2025 }}<UnitWidget type="light" /></td>
              <td>
                {{
                  signedDiff(
                    results.gipl_magt_1995,
                    results.gipl_magt_2025,
                    'magt'
                  )
                }}<UnitWidget type="light" />
              </td>
            </tr>
            <tr>
              <th scope="row">2036 - 2065</th>
              <td>{{ results.gipl_magt_2050 }}<UnitWidget type="light" /></td>
              <td>
                {{
                  signedDiff(
                    results.gipl_magt_1995,
                    results.gipl_magt_2050,
                    'magt'
                  )
                }}<UnitWidget type="light" />
              </td>
            </tr>
            <tr>
              <th scope="row">2061 – 2090</th>
              <td>{{ results.gipl_magt_2075 }}<UnitWidget type="light" /></td>
              <td>
                {{
                  signedDiff(
                    results.gipl_magt_1995,
                    results.gipl_magt_2075,
                    'magt'
                  )
                }}<UnitWidget type="light" />
              </td>
            </tr>
            <tr>
              <th scope="row">2086 – 2100</th>
              <td>{{ results.gipl_magt_2095 }}<UnitWidget type="light" /></td>
              <td>
                {{
                  signedDiff(
                    results.gipl_magt_1995,
                    results.gipl_magt_2095,
                    'magt'
                  )
                }}<UnitWidget type="light" />
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="results.gipl_alt_1995">
          <h4 class="title is-4">GIPL Active Layer Thickness</h4>
          <table class="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">ALT</th>
                <th scope="col">Change from Historical</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Historical (1995)</th>
                <td>
                  {{ results.gipl_alt_1995
                  }}<UnitWidget unitType="m_in" type="light" />
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">2011 - 2040</th>
                <td>
                  {{ results.gipl_alt_2025
                  }}<UnitWidget unitType="m_in" type="light" />
                </td>
                <td>
                  {{
                    signedDiff(
                      results.gipl_alt_1995,
                      results.gipl_alt_2025,
                      'alt'
                    )
                  }}<UnitWidget unitType="m_in" type="light" />
                </td>
              </tr>
              <tr>
                <th scope="row">2036 - 2065</th>
                <td>
                  {{ results.gipl_alt_2050
                  }}<UnitWidget unitType="m_in" type="light" />
                </td>
                <td>
                  {{
                    signedDiff(
                      results.gipl_alt_1995,
                      results.gipl_alt_2050,
                      'alt'
                    )
                  }}<UnitWidget unitType="m_in" type="light" />
                </td>
              </tr>
              <tr>
                <th scope="row">2061 – 2090</th>
                <td>
                  {{ results.gipl_alt_2075
                  }}<UnitWidget unitType="m_in" type="light" />
                </td>
                <td>
                  {{
                    signedDiff(
                      results.gipl_alt_1995,
                      results.gipl_alt_2075,
                      'alt'
                    )
                  }}<UnitWidget unitType="m_in" type="light" />
                </td>
              </tr>
              <tr>
                <th scope="row">2086 – 2100</th>
                <td>
                  {{ results.gipl_alt_2095
                  }}<UnitWidget unitType="m_in" type="light" />
                </td>
                <td>
                  {{
                    signedDiff(
                      results.gipl_alt_1995,
                      results.gipl_alt_2095,
                      'alt'
                    )
                  }}<UnitWidget unitType="m_in" type="light" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="title is-6 mt-5">Additional data</h4>
        <div class="content">
          <ul>
            <li v-if="results.magt_2018">
              Obu et al. (2018) Mean Annual Ground Temperature at Top of
              Permafrost:
              <strong
                >{{ results.magt_2018
                }}<UnitWidget unitType="temp" type="light"
              /></strong>
            </li>
            <li v-if="results.giv_2008">
              Jorgenson et al. (2008) Ground Ice Volume:
              <strong>{{ results.giv_2008 }}</strong>
            </li>
            <li v-if="results.pe_2008">
              Jorgenson et al. (2008) Permafrost Extent:
              <strong>{{ results.pe_2008 }}</strong>
            </li>
            <li v-if="results.pe_2018">
              Obu et al. (2018) Permafrost Extent:
              <strong>{{ results.pe_2018 }}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MiniMap from '~/components/MiniMap'
import LoadingStatus from '~/components/LoadingStatus'
import UnitWidget from '~/components/UnitWidget'

export default {
  name: 'PermafrostReport',
  components: {
    MiniMap,
    LoadingStatus,
    UnitWidget,
  },
  computed: {
    state: function () {
      return this.$fetchState
    },
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
      latLng: 'report/latLng',
      units: 'report/units',
    }),
  },
  methods: {
    signedDiff(historical, projected, variable) {
      let decimals
      if (variable == 'alt') {
        decimals = this.units == 'metric' ? 2 : 1
      } else if (variable == 'magt') {
        decimals = this.units == 'metric' ? 1 : 1
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
  async fetch() {
    if (this.latLng != undefined) {
      if (this.latLng.lat && this.latLng.lng) {
        let url =
          process.env.apiUrl +
          '/permafrost/point/' +
          this.latLng.lat +
          '/' +
          this.latLng.lng

        await this.$store.dispatch('report/apiFetch', url)

        let place = this.latLng.lat + ', ' + this.latLng.lng
        if (this.placeName) {
          place = this.placeName
        }

        let plateResults = {
          place: place,

          // "alt_" substrings are converted between meters and inches
          gipl_alt_1995:
            this.results['gipl']['1995']['cruts31']['historical']['alt'],
          gipl_alt_2025:
            this.results['gipl']['2025']['ncarccsm4']['rcp85']['alt'],
          gipl_alt_2050:
            this.results['gipl']['2050']['ncarccsm4']['rcp85']['alt'],
          gipl_alt_2075:
            this.results['gipl']['2075']['ncarccsm4']['rcp85']['alt'],
          gipl_alt_2095:
            this.results['gipl']['2095']['ncarccsm4']['rcp85']['alt'],

          // "magt_" substrings are converted between °C and °F
          gipl_magt_1995:
            this.results['gipl']['1995']['cruts31']['historical']['magt'],
          gipl_magt_2025:
            this.results['gipl']['2025']['ncarccsm4']['rcp85']['magt'],
          gipl_magt_2050:
            this.results['gipl']['2050']['ncarccsm4']['rcp85']['magt'],
          gipl_magt_2075:
            this.results['gipl']['2075']['ncarccsm4']['rcp85']['magt'],
          gipl_magt_2095:
            this.results['gipl']['2095']['ncarccsm4']['rcp85']['magt'],
        }

        if (this.results['jorg'] != null) {
          plateResults['giv_2008'] = this.results['jorg']['ice']
          plateResults['pe_2008'] = this.results['jorg']['pfx']
        }

        if (this.results['obu_magt'] != null) {
          // "magt_" substrings are converted between °C and °F
          plateResults['magt_2018'] = this.results['obu_magt']['temp']
        }

        if (this.results['obupfx'] != null) {
          plateResults['pe_2018'] = this.results['obupfx']['pfx']
        }

        this.$store.commit('report/setResults', plateResults)
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>
