<template>
  <div
    v-if="!state.pending && !state.error && Object.keys(results).length > 0"
    class="report-layout"
  >
    <ReportHeader class="report-head" />
    <ReportToc
      class="report-nav"
      :entries="entries"
      :downloads="downloads"
      :place-label="placeLabel"
    />
    <div id="results" class="report-body">
      <ReportLens />
      <TemperatureReport v-if="isTemperaturePresent" />
      <DegreeDaysReport v-if="isDegreeDaysPresent" />
      <PrecipitationFrequency v-if="isPrecipitationFrequencyPresent" />
      <PermafrostReport v-if="isPermafrostPresent" />
      <PrecipitationReport v-if="isPrecipitationPresent" />
      <SnowfallReport v-if="isSnowfallPresent" />
      <HydrologyReport v-if="isHydrologyPresent" />

      <aside class="report-about" aria-labelledby="about-these-data">
        <h2 id="about-these-data" class="eyebrow">About these data</h2>
        <p>
          Every value is for the grid cell containing this point, and grid cells
          range from 481&nbsp;m to 12&nbsp;km across, so they summarize an area
          that can vary in elevation, slope, aspect and nearness to water.
          Modeled baselines won&rsquo;t match a nearby weather station exactly.
          All projections are
          <Term target="bias_correction">bias corrected</Term>; see each
          dataset&rsquo;s references for its method. Read more on
          <NuxtLink to="/guidance">interpreting and using these data</NuxtLink>.
        </p>
      </aside>
    </div>
  </div>
  <section v-else class="section">
    <div class="container">
      <LoadingStatus :state="state" />
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import ReportHeader from '~/components/report/ReportHeader'
import ReportToc from '~/components/report/ReportToc'
import ReportLens from '~/components/ReportLens'
import TemperatureReport from '~/components/reports/Temperature'
import DegreeDaysReport from '~/components/reports/DegreeDays'
import PrecipitationFrequency from '~/components/reports/PrecipitationFrequency'
import PermafrostReport from '~/components/reports/Permafrost'
import PrecipitationReport from '~/components/reports/Precipitation'
import SnowfallReport from '~/components/reports/Snowfall'
import HydrologyReport from '~/components/reports/Hydrology'

const config = useRuntimeConfig()

const store = useReportStore()
const {
  results,
  latLng,
  isPlaceDefined,
  getPlaceById,
  placeIsLatLng,
  isHydrologyPresent,
  isPrecipitationPresent,
  isPrecipitationFrequencyPresent,
  isSnowfallPresent,
  isTemperaturePresent,
  isHeatingDegreeDaysPresent,
  isFreezingIndexPresent,
  isThawingIndexPresent,
  isPermafrostPresent,
} = storeToRefs(store)

const isDegreeDaysPresent = computed(
  () =>
    isHeatingDegreeDaysPresent.value ||
    isFreezingIndexPresent.value ||
    isThawingIndexPresent.value
)

// The report's sections in page order, with the CSVs each one offers (for
// the "All data" ZIP).
const sections = computed(() => [
  {
    id: 'temperature',
    label: 'Air temperature',
    present: isTemperaturePresent.value,
    downloads: [{ endpoint: 'tas2km/point', name: 'Temperature' }],
  },
  {
    id: 'temperature-indices',
    label: 'Freezing & thawing index, heating degree days',
    present: isDegreeDaysPresent.value,
    downloads: [
      isFreezingIndexPresent.value && {
        endpoint: 'degree_days/freezing_index',
        name: 'Freezing index',
      },
      isThawingIndexPresent.value && {
        endpoint: 'degree_days/thawing_index',
        name: 'Thawing index',
      },
      isHeatingDegreeDaysPresent.value && {
        endpoint: 'degree_days/heating',
        name: 'Heating degree days',
      },
    ].filter(Boolean),
  },
  {
    id: 'precipitation-frequency',
    label: 'Design storms (precipitation frequency)',
    present: isPrecipitationFrequencyPresent.value,
    downloads: [
      { endpoint: 'precipitation/frequency/point', name: 'Design storms' },
    ],
  },
  {
    id: 'permafrost',
    label: 'Permafrost & ground temperature',
    present: isPermafrostPresent.value,
    downloads: [{ endpoint: 'permafrost/point', name: 'Permafrost' }],
  },
  {
    id: 'annual-precipitation',
    label: 'Precipitation',
    present: isPrecipitationPresent.value,
    downloads: [{ endpoint: 'precipitation', name: 'Precipitation' }],
  },
  {
    id: 'snowfall',
    label: 'Snowfall',
    present: isSnowfallPresent.value,
    downloads: [{ endpoint: 'snow/snowfallequivalent', name: 'Snowfall' }],
  },
  {
    id: 'hydrology',
    label: 'Hydrology',
    present: isHydrologyPresent.value,
    downloads: [{ endpoint: 'hydrology/point', name: 'Hydrology' }],
  },
])
const entries = computed(() => sections.value.filter(s => s.present))
const downloads = computed(() => entries.value.flatMap(s => s.downloads))

const placeLabel = computed(() => {
  const place = getPlaceById.value
  if (placeIsLatLng.value || !place) {
    return `${latLng.value.lat}, ${latLng.value.lng}`
  }
  return place.name
})

// Starts pending so the report sections don't render against empty results
// before fetchReport() runs.
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
  fetchReport()
})
</script>

<style lang="scss">
// The report page. Kept here rather than in the global stylesheet so it only
// loads with the report.
$line: #e3dfd8;
$ink: #312e30;
$muted: #6b6866;
$primary: #3f625b;
$selected: #2b2f36;
$control-border: #cfcac2;
$hover: #f4f2ee;

.report-layout {
  display: grid;
  grid-template-columns: 13rem minmax(0, 1fr);
  grid-template-areas:
    '. head'
    'nav body';
  column-gap: 2.5rem;
  max-width: 90rem;
  margin: 0 auto;
  padding: 1.5rem 2rem 4rem;
}
.report-head {
  grid-area: head;
}
.report-nav {
  grid-area: nav;
  position: sticky;
  top: 1.5rem;
  align-self: start;
  padding-top: 2.5rem;
}
.report-body {
  grid-area: body;
  min-width: 0;
}

.eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: $muted;
  margin-bottom: 0.5rem;
}

// Header

.report-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  padding: 0.5rem 0 1.5rem;
  border-bottom: 1px solid $line;

  .title {
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  .eyebrow {
    color: $ink;
    margin-bottom: 0.25rem;
  }
}
.report-locator {
  flex: none;
  width: 5rem;
  height: auto;
}
.report-title {
  flex: 1 1 18rem;
  min-width: 0;
}
.report-meta {
  color: $muted;
  font-size: 1.05rem;
}
.report-tools {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  align-self: flex-start;
  margin-top: 1.5rem;
}
.copy-link {
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  font-size: 0.8rem;
  color: $primary;
  text-decoration: underline;
  text-underline-offset: 0.15em;
  cursor: pointer;
}

// Segmented controls (units, eras, variables)

.segmented-field {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.segmented-label {
  font-size: 0.85rem;
  font-weight: 600;
}
.segmented {
  display: inline-flex;
  flex-wrap: wrap;
  border: 1px solid $control-border;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
}
.segmented-option {
  padding: 0.35rem 0.8rem;
  border: 0;
  background: none;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 500;
  color: $ink;
  cursor: pointer;

  & + & {
    border-left: 1px solid $control-border;
  }
  &:hover {
    background: $hover;
  }
  &[data-state='checked'] {
    background: $selected;
    color: #fff;
  }
}

// Contents list

.report-nav .toc-list {
  margin-bottom: 2rem;

  li + li {
    margin-top: 2px;
  }
  a,
  button {
    display: block;
    width: 100%;
    padding: 0.45rem 0.75rem;
    border: 0;
    border-radius: 3px;
    background: #fff;
    font: inherit;
    font-size: 0.95rem;
    line-height: 1.35;
    text-align: left;
    color: $ink;
    text-decoration: none;
    cursor: pointer;
  }
  a:hover,
  button:hover {
    background: $hover;
  }
  a.is-active {
    background: $primary;
    color: #fff;
  }
  button:disabled {
    color: $muted;
    cursor: progress;
  }
}
.toc-status {
  font-size: 0.8rem;
  color: $muted;
}

// Sections

.report-section {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 19rem;
  gap: 2.5rem;
  padding: 2.5rem 0;
  scroll-margin-top: 1rem;

  & + & {
    border-top: 1px solid $line;
  }
  .title {
    font-weight: 700;
  }
}
.lede {
  max-width: 40em;
  margin-bottom: 1.25rem;
  font-size: 1.2rem;
  line-height: 1.5;
}
.chart-card {
  padding: 1.25rem 1.5rem 1rem;
  border: 1px solid $line;
  border-radius: 10px;
  background: #fff;
}
.chart-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.25rem;
  margin-bottom: 1rem;
}
.chart-select {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;

  select {
    padding: 0.3rem 0.5rem;
    border: 1px solid $control-border;
    border-radius: 6px;
    background: #fff;
    font: inherit;
    font-weight: 400;
    color: $ink;
  }
}
.chart-heading {
  margin: 0.25rem 0;
  font-size: 0.95rem;
  font-weight: 600;
}
.chart-group + .chart-group {
  margin-top: 1rem;
}
svg.chart {
  display: block;
  overflow: visible;
  font-size: 12px;
}
.chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.25rem;
  margin-bottom: 0.75rem;
  font-size: 0.8rem;

  .swatch {
    display: inline-block;
    width: 1rem;
    height: 3px;
    margin-right: 0.35rem;
    border-radius: 2px;
    vertical-align: middle;
  }
}
.chart-note {
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: $muted;
}
.chart-table {
  margin-top: 0.75rem;
  padding-top: 0.6rem;
  border-top: 1px solid $line;

  summary {
    font-size: 0.85rem;
    font-weight: 600;
    color: $primary;
    cursor: pointer;
  }
  .table-container {
    margin-top: 1rem;
  }
  table {
    font-size: 0.85rem;
  }
  caption {
    text-align: left;
    font-size: 0.9rem !important;
  }
  .range {
    display: block;
    margin-top: 0.2rem;
    font-size: 0.75rem;
    color: $muted;
  }
}

// Data panel

.data-panel {
  align-self: start;
  padding: 1.5rem 1.25rem;
  border: 1px solid $line;
  border-radius: 10px;
  background: #fff;
  font-size: 0.85rem;

  hr {
    height: 1px;
    margin: 1.5rem 0;
    background: $line;
  }
}
.panel-heading {
  margin: 1.25rem 0 0.6rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: $ink;

  &:first-child,
  hr + & {
    margin-top: 0;
  }
}
.download-button {
  justify-content: space-between;
  font-weight: 500;
  text-decoration: none;

  & + & {
    margin-top: 0.5rem;
  }
}
.panel-note {
  margin-top: 0.5rem;
  font-size: 0.78rem;
  color: $muted;
}
.calc-links {
  li + li {
    margin-top: 0.4rem;
  }
  a {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    background: #f2f3f3;
    font-weight: 500;
    color: $ink;
    text-decoration: none;

    &:hover {
      background: #e8eaea;
    }
  }
}
.made {
  display: grid;
  grid-template-columns: 5.5rem minmax(0, 1fr);
  gap: 0.45rem 0.75rem;

  dt {
    font-weight: 500;
    color: $muted;
  }
}
.sources {
  li + li {
    margin-top: 0.4rem;
  }
  a {
    color: $primary;
  }
}
.citation {
  margin-top: 0.75rem;

  a {
    color: $primary;
  }
}

.report-about {
  max-width: 44rem;
  padding: 2.5rem 0 0;
  border-top: 1px solid $line;
  color: $muted;
}

// Narrower screens: the data panel goes under its chart, then the contents
// list moves above the report as a row of links.
@media screen and (max-width: 1215px) {
  .report-section {
    grid-template-columns: minmax(0, 1fr) 16rem;
    gap: 1.75rem;
  }
}
@media screen and (max-width: 1023px) {
  .report-layout {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'head' 'nav' 'body';
    padding: 1rem 1rem 3rem;
  }
  .report-nav {
    position: static;
    padding-top: 1.5rem;

    .toc-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1rem;

      li + li {
        margin-top: 0;
      }
      a,
      button {
        width: auto;
      }
    }
  }
  .report-section {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media screen and (max-width: 768px) {
  .report-tools {
    align-items: flex-start;
    margin-top: 0;
  }
  .chart-card {
    padding: 1rem;
  }
  .lede {
    font-size: 1.1rem;
  }
}

@media print {
  .report-layout {
    display: block;
    padding: 0;
  }
  .report-section {
    grid-template-columns: minmax(0, 1fr) 14rem;
    break-inside: avoid;
  }
  .chart-table {
    display: none;
  }
}
</style>
