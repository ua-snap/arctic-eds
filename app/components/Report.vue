<template>
  <div>
    <div
      v-if="!state.pending && !state.error && Object.keys(results).length > 0"
    >
      <section class="section intro">
        <div id="results" class="container">
          <h1 class="title is-2">Downscaled Climate Model Output</h1>
          <h2 class="subtitle is-2" v-html="placeName"></h2>

          <p class="subtitle is-3 pt-4">
            This report contains data from different downscaled climate models
            and geophysical models driven with downscaled climate model output.
          </p>
          <div class="content is-size-4">
            <p>
              <strong>Consult the references</strong> to the data sources and
              academic papers found adjacent to the data when considering the
              applicability of specific data to an engineering context.
            </p>
            <p>
              This report presents
              <strong
                ><Term target="gridded_dataset">gridded</Term> data from both
                downscaled climate model futures and modeled baselines</strong
              >. Grid cells represent climate processes summarized over a large
              area which may have significant variability in elevation, slope,
              aspect, and proximity to bodies of water. Modeled baseline data is
              unlikely to precisely align with seemingly colocated and
              concurrent historical weather station data because of such
              intra-grid cell variability. All downscaled climate model output
              used in this report is
              <Term target="bias_correction">bias corrected</Term>&mdash;see
              academic papers for details on methodology for each dataset.
              Historical observed data can be used to further bias correct
              downscaled climate model output when more precise alignment
              between these two different types of data is required.
            </p>
            <p>
              We present baseline modeled data to indicate trends over time and
              to compute deltas/changes from the modeled baseline where
              appropriate. Minimum and maximum value summaries of multiple
              climate futures establish outliers and a range of uncertainty for
              various plausible futures. Mean value summaries of multiple
              futures are useful signals of variable trends over time.
            </p>
            <p>
              <strong>Data have various spatial resolutions</strong>. Grid cell
              size may vary by a factor of up to 250x. Please keep this in mind
              when interpreting a variable for a given location.
              <span v-if="isElevationPresent"
                >For example, the elevation within 1&#8239;km of
                {{ placeName }}, centered at {{ latLng.lat }}, {{ latLng.lng }},
                ranges between
                <strong>
                  {{ results.elevation.min }}&ndash;{{ results.elevation.max }}
                </strong>
                meters, with an average elevation of
                <strong>{{ results.elevation.mean }}</strong> meters. This
                variation should be kept in mind when interpreting the variables
                below.
              </span>
            </p>
            <p>
              Read more about how to interpret and use this data on our
              <NuxtLink to="/guidance">guidance page</NuxtLink>.
            </p>
          </div>
          <h3 class="title is-3 pt-4">Report contents</h3>
          <div class="content is-size-4">
            <ul>
              <li>
                Summarized minimum, mean, and maximum values for different time
                periods
              </li>
              <li>Preview of data in tabular (CSV/spreadsheet) format</li>
              <li>Data download links</li>
              <li>Data sources, references & academic citations</li>
            </ul>
          </div>
          <div class="content is-size-4">
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
            <h3 id="snowfall" class="title is-3 mt-6">Snowfall</h3>
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
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import UnitRadio from '~/components/UnitRadio'
import MiniMap from '~/components/MiniMap'
import TemperatureReport from '~/components/reports/Temperature'
import PrecipitationReport from '~/components/reports/Precipitation'
import SnowfallReport from '~/components/reports/Snowfall'
import PermafrostReport from '~/components/reports/Permafrost'
import PrecipitationFrequency from '~/components/reports/PrecipitationFrequency'
import TemperatureIndices from '~/components/reports/TemperatureIndices'
import HydrologyReport from '~/components/reports/Hydrology'

const config = useRuntimeConfig()

const store = useReportStore()
const {
  results,
  placeName,
  isPlaceDefined,
  placeIsLatLng,
  latLng,
  isElevationPresent,
  isHydrologyPresent,
  isPrecipitationPresent,
  isPrecipitationFrequencyPresent,
  isSnowfallPresent,
  isTemperaturePresent,
  isHeatingDegreeDaysPresent,
  isFreezingIndexPresent,
  isThawingIndexPresent,
  isPermafrostPresent,
  isWetDaysPerYearPresent,
} = storeToRefs(store)

const currentURL = ref('')
// Replaces Nuxt 2's state. Starts pending so the report
// sections don't render against empty results before fetchReport() runs.
const state = reactive({ pending: true, error: null })

// Was the Nuxt 2 fetch() hook, always re-run from onMounted so the
// report data is fetched client-side.
async function fetchReport() {
  state.pending = true
  state.error = null
  try {
    // Needed here to ensure hydration works properly for
    // direct links to specific places (mapping place names
    // to lat/lngs).
    await store.fetchPlaces()

    if (isPlaceDefined.value) {
      let url =
        config.public.apiUrl +
        '/eds/all/' +
        latLng.value.lat +
        '/' +
        latLng.value.lng

      await store.apiFetch(url)
    }
  } catch (error) {
    state.error = error
  } finally {
    state.pending = false
  }
}

onMounted(() => {
  currentURL.value = window.location.href
  fetchReport()
})
</script>
