<template>
  <div>
    <div
      v-if="
        !$fetchState.pending &&
        !$fetchState.error &&
        Object.keys(results).length > 0
      "
    >
      <section class="section intro">
        <div id="results" class="container">
          <h2 class="title is-2">
            Environmental &amp; engineering data for {{ placeName }}
          </h2>

          <h3 class="subtitle is-3 pt-4">
            This report contains information from a wide variety of data.
          </h3>
          <div class="content is-size-4">
            <p>
              <strong>References to data sources and academic papers</strong>
              should be consulted to interpret the purpose and applicability of
              specific data in an engineering context.
            </p>
            <p>
              <strong
                >Data are presented at various spatial resolutions.</strong
              >
              Please keep this in mind when interpreting a variable for a given
              location.
            </p>
          </div>
          <h3 class="subtitle is-3">Report contents</h3>
          <div class="content is-size-4">
            <ul>
              <li>Summaries and subsets of full data sources</li>
              <li>Data download links</li>
              <li>
                Minimum, mean, and maximum values for different time periods.
                Use the &ldquo;mean&rdquo; column to assess general trends over
                time.
              </li>
            </ul>
          </div>
          <h3 class="subtitle is-3">Point-specific notes</h3>

          <div class="content is-size-4">
            <p v-if="Object.keys(results.elevation).length != 0">
              <strong>Elevation -</strong> The elevation within 1&#8239;km of
              this point ranges between
              <strong>
                {{ results.elevation.min }}&ndash;{{ results.elevation.max }}
              </strong>
              meters, with an average elevation of
              <strong>{{ results.elevation.mean }}</strong> meters. This
              variation should be kept in mind when interpreting the variables
              below.
            </p>
            <p
              v-if="
                Object.keys(results.geology).length != 0 &&
                Object.keys(results.physiography).length != 0
              "
            >
              <strong>Geology &amp; ecology -</strong> The geology type of this
              point is <em>{{ results.geology.name }}</em
              >, and this place lies within the
              {{ results.physiography.name }} ecological unit within Alaska.
              Read more about
              <a
                href="https://alaska.usgs.gov/science/geology/state_map/interactive_map/AKgeologic_map.html"
                >Alaska geology</a
              >
              and
              <a
                href="https://www.epa.gov/eco-research/ecoregion-download-files-state-region-10#pane-01"
                >ecological units</a
              >.
            </p>

            <p>
              <strong>Link to this report:</strong>
              <a :href="currentURL">{{ currentURL }}</a>
            </p>

            <MiniMap />
            <UnitRadio />
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container toc">
          <h2 class="title is-3">Table of Contents</h2>
          <div class="content is-size-4">
            <ul>
              <li>
                <a href="#precipitation">Precipitation</a>
                <ul>
                  <li>
                    <a href="#annual-precipitation"
                      >Annual Total Precipitation</a
                    >
                  </li>
                  <li>
                    <a href="#precipitation-frequency"
                      >Precipitation Frequency</a
                    >
                  </li>
                  <li>
                    <a href="#snowfall">Snowfall</a>
                  </li>
                </ul>
              </li>

              <li><a href="#temperature">Temperature</a></li>
              <li>
                <a href="#temperature-indices">Temperature Indices</a>
                <ul>
                  <li>
                    <a href="#heating-degree-days">Heating Degree Days</a>
                  </li>
                  <li><a href="#freezing-index">Freezing Index</a></li>
                  <li><a href="#thawing-index">Thawing Index</a></li>
                </ul>
              </li>

              <li><a href="#permafrost">Permafrost</a></li>
            </ul>
          </div>
        </div>
      </section>
      <section class="section precipitation">
        <div class="container">
          <h2 id="precipitation" class="title is-2">Precipitation</h2>

          <h3 id="annual-precipitation" class="title is-3 mt-6">
            Total annual precipitation
          </h3>

          <PrecipitationReport />

          <h3 id="precipitation-frequency" class="title is-3 mt-6">
            Precipitation Frequency
          </h3>
          <PrecipitationFrequency />

          <h3 id="snowfall" class="title is-3 mt-6">
            Snowfall (Water) Equivalent
          </h3>
          <SnowfallReport />
        </div>
      </section>

      <section class="section temperature">
        <div class="container">
          <h2 id="temperature" class="title is-2">Temperature</h2>
          <TemperatureReport />
        </div>
      </section>

      <section class="section temperature-index">
        <div class="container">
          <h2 id="temperature-indices" class="title is-2">
            Temperature Indices
          </h2>
          <TemperatureIndices />
        </div>
      </section>
      <section class="section permafrost">
        <div class="container">
          <PermafrostReport />
        </div>
      </section>
    </div>
    <div v-else>
      <section class="section">
        <div class="container">
          <LoadingStatus :state="state" />
        </div>
      </section>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import { mapGetters } from 'vuex'
import UnitRadio from '~/components/UnitRadio'
import MiniMap from '~/components/MiniMap'
import TemperatureReport from '~/components/reports/Temperature'
import PrecipitationReport from '~/components/reports/Precipitation'
import SnowfallReport from '~/components/reports/Snowfall'
import PermafrostReport from '~/components/reports/Permafrost'
import PrecipitationFrequency from '~/components/reports/PrecipitationFrequency'
import TemperatureIndices from '~/components/reports/TemperatureIndices'

export default {
  name: 'FullReport',
  components: {
    UnitRadio,
    MiniMap,
    TemperatureReport,
    TemperatureIndices,
    PrecipitationReport,
    SnowfallReport,
    PermafrostReport,
    PrecipitationFrequency,
  },
  computed: {
    state: function () {
      return this.$fetchState
    },
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
      isPlaceDefined: 'report/isPlaceDefined',
      latLng: 'report/latLng',
    }),
  },
  data: function () {
    return {
      currentURL: '',
    }
  },
  mounted() {
    this.currentURL = window.location.href
    this.$fetch()
  },

  async fetch() {
    // Needed here to ensure hydration works properly for
    // direct links to specific places (mapping place names
    // to lat/lngs).
    await this.$store.dispatch('report/fetchPlaces')

    if (this.isPlaceDefined) {
      let url =
        process.env.apiUrl +
        '/eds/all/' +
        this.latLng.lat +
        '/' +
        this.latLng.lng

      await this.$store.dispatch('report/apiFetch', url)
    }
  },
}
</script>
