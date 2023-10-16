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
              are found adjacent to the data and should be consulted to
              interpret the purpose and applicability of specific data in an
              engineering context.
            </p>
            <p>
              <strong
                >Data are presented at various spatial resolutions.</strong
              >
              Please keep this in mind when interpreting a variable for a given
              location.
            </p>
          </div>
          <h3 class="subtitle is-3 pt-4">Report contents</h3>
          <div class="content is-size-4">
            <ul>
              <li>Summaries and subsets of full data sources</li>
              <li>Data download links</li>
              <li>
                Minimum, mean, and maximum values for different time periods.
                Use the &ldquo;mean&rdquo; column to assess general trends over
                time.
              </li>
              <li>Data sources, references &amp; academic citations</li>
            </ul>
          </div>
          <h3 class="subtitle is-3 pt-4">Point-specific notes</h3>
          <div class="content is-size-4">
            <p v-if="isElevationPresent">
              <strong>Elevation -</strong> The elevation within 1&#8239;km of
              <span v-if="placeIsLatLng">this point</span>
              <span v-else
                >{{ placeName }}, centered at {{ latLng.lat }},
                {{ latLng.lng }}</span
              >
              ranges between
              <strong>
                {{ results.elevation.min }}&ndash;{{ results.elevation.max }}
              </strong>
              meters, with an average elevation of
              <strong>{{ results.elevation.mean }}</strong> meters. This
              variation should be kept in mind when interpreting the variables
              below.
            </p>

            <p v-if="isGeologyPresent && isPhysiographyPresent">
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
              <li
                v-if="
                  isPrecipitationPresent ||
                  isPrecipitationFrequencyPresent ||
                  isSnowfallPresent
                "
              >
                <a href="#precipitation">Precipitation</a>
                <ul>
                  <li v-if="isPrecipitationPresent">
                    <a href="#annual-precipitation"
                      >Annual Total Precipitation</a
                    >
                  </li>
                  <li v-if="isPrecipitationFrequencyPresent">
                    <a href="#precipitation-frequency"
                      >Precipitation Frequency</a
                    >
                  </li>
                  <li v-if="isSnowfallPresent">
                    <a href="#snowfall">Snowfall</a>
                  </li>
                  <li v-if="isHydrologyPresent">
                    <a href="#hydrology">Hydrology</a>
                  </li>
                </ul>
              </li>

              <li v-if="isTemperaturePresent">
                <a href="#temperature">Temperature</a>
              </li>
              <li
                v-if="
                  isHeatingDegreeDaysPresent ||
                  isFreezingIndexPresent ||
                  isThawingIndexPresent
                "
              >
                <a href="#temperature-indices">Temperature Indices</a>
                <ul>
                  <li v-if="isHeatingDegreeDaysPresent">
                    <a href="#heating-degree-days">Heating Degree Days</a>
                  </li>
                  <li v-if="isFreezingIndexPresent">
                    <a href="#freezing-index">Freezing Index</a>
                  </li>
                  <li v-if="isThawingIndexPresent">
                    <a href="#thawing-index">Thawing Index</a>
                  </li>
                </ul>
              </li>

              <li v-if="isPermafrostPresent">
                <a href="#permafrost">Permafrost</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section
        class="section precipitation"
        v-if="
          isPrecipitationPresent ||
          isPrecipitationFrequencyPresent ||
          isSnowfallPresent
        "
      >
        <div class="container">
          <h2 id="precipitation" class="title is-2">Precipitation</h2>

          <div v-if="isPrecipitationPresent">
            <h3 id="annual-precipitation" class="title is-3 mt-6">
              Total annual precipitation
            </h3>
            <PrecipitationReport />
          </div>

          <div v-if="isPrecipitationFrequencyPresent">
            <h3 id="precipitation-frequency" class="title is-3 mt-6">
              Precipitation Frequency
            </h3>
            <PrecipitationFrequency />
          </div>

          <div v-if="isSnowfallPresent">
            <h3 id="snowfall" class="title is-3 mt-6">
              Snowfall
            </h3>
            <SnowfallReport />
          </div>

          <div v-if="isHydrologyPresent">
            <h3 id="hydrology" class="title is-3 mt-6">Hydrology</h3>
            <HydrologyReport />
          </div>
        </div>
      </section>

      <section class="section temperature" v-if="isTemperaturePresent">
        <div class="container">
          <h2 id="temperature" class="title is-2">Temperature</h2>
          <TemperatureReport />
        </div>
      </section>

      <section
        class="section temperature-index"
        v-if="
          isHeatingDegreeDaysPresent ||
          isFreezingIndexPresent ||
          isThawingIndexPresent
        "
      >
        <div class="container">
          <h2 id="temperature-indices" class="title is-2">
            Temperature Indices
          </h2>
          <TemperatureIndices />
        </div>
      </section>
      <section class="section permafrost" v-if="isPermafrostPresent">
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
import HydrologyReport from '~/components/reports/Hydrology'

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
    HydrologyReport,
  },
  computed: {
    state: function () {
      return this.$fetchState
    },
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
      isPlaceDefined: 'report/isPlaceDefined',
      placeIsLatLng: 'report/placeIsLatLng',
      latLng: 'report/latLng',
      isElevationPresent: 'report/isElevationPresent',
      isGeologyPresent: 'report/isGeologyPresent',
      isHydrologyPresent: 'report/isHydrologyPresent',
      isPhysiographyPresent: 'report/isPhysiographyPresent',
      isPrecipitationPresent: 'report/isPrecipitationPresent',
      isPrecipitationFrequencyPresent: 'report/isPrecipitationFrequencyPresent',
      isSnowfallPresent: 'report/isSnowfallPresent',
      isTemperaturePresent: 'report/isTemperaturePresent',
      isHeatingDegreeDaysPresent: 'report/isHeatingDegreeDaysPresent',
      isFreezingIndexPresent: 'report/isFreezingIndexPresent',
      isThawingIndexPresent: 'report/isThawingIndexPresent',
      isPermafrostPresent: 'report/isPermafrostPresent',
      isWetDaysPerYearPresent: 'report/isWetDaysPerYearPresent',
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
