<template>
  <ReportSection id="snowpack" title="Snowpack (Snow-17)" badge="Experimental">
    <template #lede>{{ lede }}</template>

    <div v-if="!run" role="status">
      <template v-if="state.pending">
        <p class="mb-3">
          Running Snow-17 for every CMIP6 model and scenario at this
          point&hellip; this takes about 15 seconds.
        </p>
        <progress class="progress is-small is-info"></progress>
      </template>
      <template v-else-if="state.error">
        <p class="mb-3">{{ errorMessage }}</p>
        <button type="button" class="button is-small" @click="runModel">
          Try again
        </button>
      </template>
    </div>

    <template v-else>
      <div role="status">
        <div v-if="state.pending" class="snow17-rerun">
          <p>Re-running Snow-17 with the new settings&hellip;</p>
          <progress class="progress is-small is-info"></progress>
        </div>
        <p
          v-else-if="state.error"
          class="notification is-danger is-light snow17-rerun"
        >
          {{ errorMessage }} The charts still show the last run.
        </p>
      </div>

      <div class="chart-controls">
        <SegmentedControl
          v-model="scenario"
          label="Scenario"
          hide-label
          :options="scenarioOptions"
        />
        <label class="chart-select">
          Model
          <select v-model="model">
            <option v-for="m in models" :key="m" :value="m">
              {{ modelLabel(m) }}
            </option>
          </select>
        </label>
      </div>

      <div class="chart-group">
        <h3 class="chart-heading">50-year ground snow load</h3>
        <RangeDotPlot
          v-if="loadRows.length"
          :title="`50-year ground snow load, ${loadUnit}, Snow-17 forced by CMIP6 downscaled data, 1966–2014 and ${scenarioName} 2040–2099`"
          :rows="loadRows"
          :domain="loadDomain"
        />
        <p class="chart-note">
          Dot: median across models; bar: range across models; dashed line:
          1966&ndash;2014 median. The ground load from snow with a 2% chance of
          being exceeded in any year, from a GEV fit to each era&rsquo;s annual
          peak SWE. Not a roof load.
        </p>
      </div>

      <div class="chart-group">
        <h3 class="chart-heading">Every water year, 1966&ndash;2100</h3>
        <div class="chart-controls">
          <SegmentedControl
            v-model="variable"
            label="Variable"
            hide-label
            :options="variableOptions"
          />
        </div>
        <div class="chart-legend" aria-hidden="true">
          <span v-for="item in annualLegend" :key="item.label">
            <span class="swatch" :style="{ background: item.color }"></span
            >{{ item.label }}
          </span>
        </div>
        <SeriesChart
          :title="`${variableName}, ${annualUnit}, each water year, Snow-17 forced by CMIP6 downscaled data, historical and ${scenarioName}`"
          :series="annualSeries"
          :bands="annualBands"
          :spans="eraSpans"
          :x-domain="[firstYear, lastYear]"
          :x-format="year => `Water year ${year}`"
          :digits="annualDigits"
          :unit="annualUnit"
          :domain="annualDomain"
          :legend="annualLegend"
        />
        <p class="chart-note">
          {{ variableNote }} Water years run October&ndash;September and are
          named for the year they end. Line: median across models; shading:
          range across models; dark line: {{ modelLabel(model) }}. Hover for
          values.
        </p>
      </div>

      <div class="chart-group">
        <h3 class="chart-heading">
          Snowpack through the water year, {{ modelLabel(model) }}
        </h3>
        <div class="chart-legend" aria-hidden="true">
          <span v-for="item in seasonLegend" :key="item.label">
            <span class="swatch" :style="{ background: item.color }"></span
            >{{ item.label }}
          </span>
        </div>
        <div v-if="season.pending" role="status" class="season-loading">
          <p class="mb-3">
            Loading daily output for {{ modelLabel(model) }}&hellip;
          </p>
          <progress class="progress is-small is-info"></progress>
        </div>
        <p v-else-if="season.error" role="status" class="season-loading">
          Daily output for {{ modelLabel(model) }} couldn&rsquo;t be loaded.
          <button type="button" class="button is-small" @click="loadDaily">
            Try again
          </button>
        </p>
        <SeriesChart
          v-else-if="season.data && seasonSeries.length"
          :title="`Daily snow water equivalent, ${
            unit.depth
          }, median and middle half of years in each era, ${modelLabel(
            model
          )}, ${scenarioName}`"
          :series="seasonSeries"
          :bands="seasonBands"
          :x-domain="[0, 364]"
          :x-ticks="waterYearMonths"
          :x-format="formatWaterDay"
          :digits="depthDigits"
          :unit="unit.depth"
          :legend="seasonLegend"
        />
        <p class="chart-note">
          Snow water equivalent on each day, October to September. Lines: the
          median of each era&rsquo;s water years; shading: the middle half of
          years for 1966&ndash;2014 and 2070&ndash;2099.
        </p>
      </div>

      <p v-if="runNotes.length" class="chart-note">
        {{ runNotes.join(' ') }}
      </p>

      <details class="chart-table">
        <summary>Show the numbers</summary>
        <div class="table-container">
          <table class="table is-narrow is-fullwidth">
            <caption>
              50-year ground snow load,
              {{
                loadUnit
              }}, with the 50-year peak SWE below,
              {{
                unit.depth
              }}, historical and
              {{
                scenarioName
              }}
            </caption>
            <thead>
              <tr>
                <th scope="col">Model</th>
                <th scope="col">1966&ndash;2014</th>
                <th v-for="era in futureEras" :key="era.key" scope="col">
                  {{ era.key.replace('-', '–') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in tableRows" :key="row.model">
                <th scope="row">{{ row.label }}</th>
                <td v-for="(cell, i) in row.cells" :key="i">
                  <template v-if="cell && cell.swe_mm != null">
                    {{ fmtLoad(load(cell)) }}
                    <span class="range"
                      >{{ fmtDepth(depth(cell.swe_mm)) }} {{ unit.depth }}</span
                    >
                  </template>
                  <template v-else>&mdash;</template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="chart-table">
        <summary>Model settings</summary>
        <!--
          The API checks the values; the browser's own checks would reject
          defaults that fall between the arrow-key steps.
        -->
        <form
          class="snow17-settings"
          novalidate
          @submit.prevent="applySettings"
        >
          <p class="chart-note">
            The defaults are the API&rsquo;s, calibrated for the American River
            basin in California, not for Alaska. Change any value and re-run to
            see how sensitive the results are.
          </p>
          <div class="settings-grid">
            <label class="setting">
              <span class="setting-label">Elevation, m</span>
              <input
                v-model.number="settings.elevation"
                class="input is-small"
                type="number"
                step="1"
                :placeholder="metadata.elevation_m"
              />
              <span class="setting-note"
                >Blank uses the 1 km mean ({{ metadata.elevation_m }} m)</span
              >
            </label>
            <label v-for="p in parameters" :key="p.name" class="setting">
              <span class="setting-label">{{ p.label }}</span>
              <input
                v-model.number="settings[p.name]"
                class="input is-small"
                type="number"
                :step="p.step"
                :min="p.min"
                :max="p.max"
              />
              <span class="setting-note"
                >{{ p.note }} &middot; <code>{{ p.name }}</code></span
              >
            </label>
          </div>
          <div class="buttons mt-4">
            <button
              type="submit"
              class="button is-primary is-small"
              :class="{ 'is-loading': state.pending }"
              :disabled="state.pending"
            >
              Re-run Snow-17
            </button>
            <button
              type="button"
              class="button is-small"
              :disabled="state.pending"
              @click="resetSettings"
            >
              Reset to defaults
            </button>
          </div>
        </form>
      </details>
    </template>

    <template #panel>
      <DataPanel
        topic="Snow-17 snowpack"
        :downloads="downloads"
        :note="
          run
            ? 'Water year summaries and design loads for every model and scenario, from the run shown here · CSV, metric units'
            : 'Downloads appear once the model has run.'
        "
        :made="made"
        :sources="sources"
        :references="[hosking1990]"
      />
    </template>
  </ReportSection>
</template>

<script setup>
import {
  computed,
  onMounted,
  reactive,
  ref,
  shallowRef,
  watch,
  watchEffect,
} from 'vue'
import { storeToRefs } from 'pinia'
import ReportSection from '~/components/report/ReportSection'
import DataPanel from '~/components/report/DataPanel'
import SegmentedControl from '~/components/report/SegmentedControl'
import RangeDotPlot from '~/components/charts/RangeDotPlot'
import SeriesChart from '~/components/charts/SeriesChart'
import { formatNumber, formatPercentChange, palette } from '~/utils/chart'
import {
  annualCsv,
  averageModel,
  baselineEra,
  defaultSettings,
  designCsv,
  formatWaterDay,
  futureEras,
  modelLabel,
  parameters,
  runQuery,
  scenarioLabel,
  scenarios,
  seasonalSwe,
  spread,
  waterYearMonths,
} from '~/utils/snow17'
import { hosking1990 } from '~/data/references'

const config = useRuntimeConfig()
const apiUrl = config.public.snow17ApiUrl
const { latLng } = storeToRefs(useReportStore())
const unit = useUnitLabels()

// Model runs

// The settings form, and the run the charts show. A run keeps the settings
// it was made with, so its daily output is fetched with the same ones.
const settings = reactive(defaultSettings())
const run = shallowRef(null)
const state = reactive({ pending: false, error: null })

const metadata = computed(() => run.value?.metadata ?? {})

function isRun(response) {
  return (
    response !== null &&
    typeof response === 'object' &&
    typeof response.data === 'object' &&
    typeof response.metadata === 'object'
  )
}

// Responses to anything but the latest request are dropped.
let runId = 0
async function runModel() {
  const id = ++runId
  state.pending = true
  state.error = null
  const base = `${apiUrl}/snow17/point/${latLng.value.lat}/${latLng.value.lng}`
  const runSettings = { ...settings }
  try {
    const url = summary =>
      `${base}?${runQuery(runSettings, summary ? { summary } : {})}`
    // The annual and design summaries each run every model and scenario.
    const [annual, design] = await Promise.all([
      $fetch(url('annual')),
      $fetch(url('design')),
    ])
    if (id != runId) return
    if (!isRun(annual) || !isRun(design)) {
      throw new Error('Snow-17 response is not the expected JSON')
    }
    run.value = {
      base,
      settings: runSettings,
      annual: annual.data,
      design: design.data,
      metadata: design.metadata,
      annualUrl: url('annual'),
      jsonUrl: url('design'),
    }
  } catch (error) {
    if (id != runId) return
    console.error('Snow-17 run failed', error)
    state.error = error
  } finally {
    if (id == runId) state.pending = false
  }
}

const errorMessage = computed(() => {
  const status = state.error?.statusCode ?? state.error?.status
  if (status == 404 || status == 422) {
    return 'Snow-17 can’t run here: the point is outside the CMIP6 downscaled data or over water.'
  }
  if (status == 400) {
    return 'The API didn’t accept these settings. Check that each is in range and that “All snow at or below” is less than “All rain at or above.”'
  }
  return 'Snow-17 couldn’t be run for this point. The experimental API may be down or busy.'
})

function applySettings() {
  runModel()
}
function resetSettings() {
  Object.assign(settings, defaultSettings())
  runModel()
}

onMounted(runModel)
watch(
  () => latLng.value && `${latLng.value.lat},${latLng.value.lng}`,
  (place, previous) => {
    if (place && previous && place != previous) runModel()
  }
)

// Controls

const scenarioOptions = computed(() =>
  scenarios.filter(s =>
    Object.values(run.value?.annual ?? {}).some(
      byScenario => byScenario[s.value]
    )
  )
)
const scenario = ref('ssp585')
const scenarioName = computed(() => scenarioLabel(scenario.value))
watch(scenarioOptions, options => {
  if (options.length && !options.some(o => o.value == scenario.value)) {
    scenario.value = options[options.length - 1].value
  }
})

// Models with a run for this scenario, the averaged forcing last.
const models = computed(() => {
  const all = Object.keys(run.value?.annual ?? {}).filter(
    m => run.value.annual[m][scenario.value]
  )
  return [
    ...all.filter(m => m != averageModel),
    ...all.filter(m => m == averageModel),
  ]
})
// Starts on a model with a historical run, so every chart has a baseline.
const model = ref(null)
watch(models, list => {
  if (list.includes(model.value)) return
  model.value =
    list.find(m => run.value.annual[m].historical) ?? list[0] ?? null
})

const realModels = computed(() =>
  Object.keys(run.value?.design ?? {}).filter(m => m != averageModel)
)

// Units: the API is metric.

const depth = mm => (unit.value.metric ? mm : mm / 25.4)
const depthDigits = computed(() => (unit.value.metric ? 0 : 1))
const fmtDepth = value => formatNumber(value, depthDigits.value)
const loadUnit = computed(() => (unit.value.metric ? 'kPa' : 'psf'))
const load = v => (unit.value.metric ? v.load_kpa : v.load_psf)
const fmtLoad = value => formatNumber(value, unit.value.metric ? 2 : 0)

// Design loads

function loadSpread(scenarioKey, eraKey) {
  return spread(
    realModels.value.map(m => {
      const v = run.value.design[m]?.[scenarioKey]?.[eraKey]
      return v ? load(v) : undefined
    })
  )
}
const baselineLoad = computed(() => loadSpread('historical', baselineEra.key))

const loadRows = computed(() => {
  if (!run.value) return []
  const base = baselineLoad.value
  const rows = []
  if (base) {
    rows.push({
      label: '1966–2014',
      min: base.min,
      mean: base.median,
      max: base.max,
      valueLabel: `${fmtLoad(base.median)} ${loadUnit.value}`,
    })
  }
  for (const era of futureEras) {
    const s = loadSpread(scenario.value, era.key)
    if (!s) continue
    const change = base?.median
      ? ` (${formatPercentChange(base.median, s.median)})`
      : ''
    rows.push({
      label: era.key.replace('-', '–'),
      min: s.min,
      mean: s.median,
      max: s.max,
      valueLabel: `${fmtLoad(s.median)} ${loadUnit.value}${change}`,
    })
  }
  return rows
})

// The axis spans every scenario, so it holds still as the scenario changes.
const loadDomain = computed(() => {
  const maxima = [baselineLoad.value?.max ?? 0]
  for (const s of scenarioOptions.value) {
    for (const era of futureEras)
      maxima.push(loadSpread(s.value, era.key)?.max ?? 0)
  }
  return [0, Math.max(...maxima)]
})

const tableRows = computed(() =>
  models.value.map(m => ({
    model: m,
    label: modelLabel(m),
    cells: [
      run.value.design[m]?.historical?.[baselineEra.key],
      ...futureEras.map(
        era => run.value.design[m]?.[scenario.value]?.[era.key]
      ),
    ],
  }))
)

const lede = computed(() => {
  const intro =
    'Snow-17 builds and melts a snowpack day by day from temperature and precipitation.'
  if (!run.value) {
    return `${intro} This experimental run uses every CMIP6 downscaled model and scenario at this point.`
  }
  const base = baselineLoad.value
  const late = loadSpread(scenario.value, '2070-2099')
  if (!base || !late)
    return `${intro} This run is experimental and uncalibrated.`
  return (
    `The 50-year ground snow load goes from ${fmtLoad(base.median)} ` +
    `${loadUnit.value} in 1966–2014 to ${fmtLoad(late.median)} ` +
    `${loadUnit.value} by 2070–2099 under ${scenarioName.value}, ` +
    `${formatPercentChange(base.median, late.median)} (median of ` +
    `${late.n} models; experimental, uncalibrated model).`
  )
})

// Each water year

const variableOptions = [
  { value: 'peak_swe', label: 'Peak SWE' },
  { value: 'snow_days', label: 'Snow days' },
  { value: 'total_outflow', label: 'Outflow' },
]
const variable = ref('peak_swe')
const variableName = computed(
  () =>
    ({
      peak_swe: 'Peak snow water equivalent',
      snow_days: 'Days with snow on the ground',
      total_outflow: 'Total outflow',
    }[variable.value])
)
const variableNote = computed(
  () =>
    ({
      peak_swe: 'The most water held in the snowpack during each water year.',
      snow_days: 'Days with at least 1 mm of snow water equivalent.',
      total_outflow:
        'Snowmelt plus rain leaving the snowpack, or rain on bare ground, over each water year.',
    }[variable.value])
)
const isDepth = computed(() => variable.value != 'snow_days')
const annualUnit = computed(() => (isDepth.value ? unit.value.depth : 'days'))
const annualDigits = computed(() => (isDepth.value ? depthDigits.value : 0))

const firstYear = 1966
const lastYear = 2100
const years = Array.from(
  { length: lastYear - firstYear + 1 },
  (_, i) => firstYear + i
)

// One model's values for each year, undefined where its run has none.
function yearValues(m, scenarioKey) {
  const byYear = run.value.annual[m]?.[scenarioKey] ?? {}
  return years.map(year => {
    const value = byYear[year]?.[variable.value]
    if (!Number.isFinite(value)) return undefined
    return isDepth.value ? depth(value) : value
  })
}

function acrossModels(scenarioKey) {
  const perModel = realModels.value.map(m => yearValues(m, scenarioKey))
  const stats = years.map((_, i) => spread(perModel.map(v => v[i])))
  return {
    median: stats.map(s => s?.median),
    min: stats.map(s => s?.min),
    max: stats.map(s => s?.max),
  }
}

const historicalStats = computed(() => run.value && acrossModels('historical'))
const futureStats = computed(() => run.value && acrossModels(scenario.value))

const historicalBand = '#e6e3df'
const annualSeries = computed(() => {
  if (!run.value) return []
  const historical = yearValues(model.value, 'historical')
  const future = yearValues(model.value, scenario.value)
  const selected = historical.map((h, i) => h ?? future[i])
  // The selected model goes under the medians, which carry the trend.
  return [
    {
      label: modelLabel(model.value),
      values: selected,
      color: palette.ink,
      thin: true,
    },
    {
      label: 'Median, historical',
      values: historicalStats.value.median,
      color: palette.historical,
      strong: true,
    },
    {
      label: `Median, ${scenarioName.value}`,
      values: futureStats.value.median,
      color: palette.cool,
      strong: true,
    },
  ]
})
const annualBands = computed(() => {
  if (!run.value) return []
  return [
    {
      label: 'Model range',
      lower: historicalStats.value.min,
      upper: historicalStats.value.max,
      color: historicalBand,
    },
    {
      label: 'Model range',
      lower: futureStats.value.min,
      upper: futureStats.value.max,
      color: palette.coolBand,
    },
  ]
})
const annualLegend = computed(() => [
  { label: 'Historical median', color: palette.historical },
  { label: `${scenarioName.value} median`, color: palette.cool },
  { label: 'Range across models', color: palette.coolBand },
  { label: modelLabel(model.value), color: palette.ink },
])
// The design load eras, shaded.
const eraSpans = futureEras.map(era => ({
  from: era.start - 0.4,
  to: era.end + 0.4,
  label: era.key.replace('-', '–'),
}))

// The y axis spans every scenario and model, so it holds still.
const annualDomain = computed(() => {
  if (!run.value) return [0, 1]
  let max = 0
  for (const m of Object.keys(run.value.annual)) {
    for (const scenarioKey of Object.keys(run.value.annual[m])) {
      for (const v of yearValues(m, scenarioKey)) {
        if (Number.isFinite(v) && v > max) max = v
      }
    }
  }
  return [0, max]
})

// Through the water year, from the selected model's daily output

const season = reactive({ pending: false, error: null, data: null })
// Daily output is large (about 4 MB a model), so it's reduced to each era's
// typical water year and only that is kept.
const seasonCache = new Map()
let dailyId = 0
async function loadDaily() {
  if (!run.value || !model.value) return
  const m = model.value
  const s = scenario.value
  const query = runQuery(run.value.settings, {
    models: m,
    scenarios: `historical,${s}`,
  })
  const url = `${run.value.base}?${query}`
  const id = ++dailyId
  season.error = null
  if (seasonCache.has(url)) {
    season.pending = false
    season.data = seasonCache.get(url)
    return
  }
  season.pending = true
  season.data = null
  try {
    const daily = await $fetch(url)
    const byScenario = daily?.data?.[m] ?? {}
    const data = {
      ...(byScenario.historical
        ? seasonalSwe(byScenario.historical, [baselineEra])
        : {}),
      ...(byScenario[s] ? seasonalSwe(byScenario[s], futureEras) : {}),
    }
    seasonCache.set(url, data)
    if (id == dailyId) season.data = data
  } catch (error) {
    if (id != dailyId) return
    console.error('Snow-17 daily output failed', error)
    season.error = error
  } finally {
    if (id == dailyId) season.pending = false
  }
}
watch([run, model, scenario], loadDaily)

const seasonEras = computed(() => [
  {
    ...baselineEra,
    label: 'Historical 1966–2014',
    color: palette.historical,
    band: historicalBand,
  },
  {
    ...futureEras[0],
    label: `${scenarioName.value} 2040–2069`,
    color: palette.eras[1].dot,
  },
  {
    ...futureEras[1],
    label: `${scenarioName.value} 2070–2099`,
    color: palette.eras[3].dot,
    band: palette.coolBand,
  },
])
const convert = values => values.map(depth)
const seasonSeries = computed(() =>
  seasonEras.value
    .filter(era => season.data?.[era.key])
    .map(era => ({
      label: era.label,
      values: convert(season.data[era.key].median),
      color: era.color,
      strong: true,
    }))
)
const seasonBands = computed(() =>
  seasonEras.value
    .filter(era => era.band && season.data?.[era.key])
    .map(era => ({
      label: `Middle half, ${era.key.replace('-', '–')}`,
      lower: convert(season.data[era.key].lower),
      upper: convert(season.data[era.key].upper),
      color: era.band,
      opacity: 0.6,
    }))
)
const seasonLegend = computed(() =>
  seasonEras.value.map(era => ({ label: era.label, color: era.color }))
)

// Run notes, downloads and the data panel

const runNotes = computed(() => {
  const notes = []
  const { skipped = [], cold_started = [] } = metadata.value
  if (skipped.length) {
    notes.push(`Not run, for gaps in the forcing data: ${skipped.join(', ')}.`)
  }
  if (cold_started.length) {
    notes.push(
      `Started without snow in 2015, with no historical run to continue: ${cold_started.join(
        ', '
      )}.`
    )
  }
  return notes
})

const parameterText = computed(() =>
  Object.entries(metadata.value.parameters ?? {})
    .map(([k, v]) => `${k}=${v}`)
    .join(' ')
)

const csvUrls = shallowRef({})
watchEffect(onCleanup => {
  if (!run.value) return
  const md = metadata.value
  const comments = [
    `Snow-17 (experimental, uncalibrated) at ${md.latitude}, ${md.longitude}`,
    `Forcing: ${md.forcing}`,
    `Elevation: ${md.elevation_m} m (${md.elevation_source})`,
    `Parameters: ${parameterText.value}`,
  ]
  const blob = text =>
    URL.createObjectURL(new Blob([text], { type: 'text/csv' }))
  const urls = {
    annual: blob(
      annualCsv(run.value.annual, [
        ...comments,
        `Source: ${run.value.annualUrl}`,
      ])
    ),
    design: blob(
      designCsv(run.value.design, [...comments, `Source: ${run.value.jsonUrl}`])
    ),
  }
  csvUrls.value = urls
  onCleanup(() => Object.values(urls).forEach(u => URL.revokeObjectURL(u)))
})

const downloads = computed(() => {
  if (!run.value) return []
  const place = `${metadata.value.latitude}_${metadata.value.longitude}`
  return [
    {
      label: 'Water year summaries (CSV)',
      href: csvUrls.value.annual,
      filename: `snow17_water_years_${place}.csv`,
    },
    {
      label: 'Design snow loads (CSV)',
      href: csvUrls.value.design,
      filename: `snow17_design_loads_${place}.csv`,
    },
  ]
})

const made = computed(() => [
  [
    'Model',
    'Snow-17 (Anderson, 1973 & 2006), uncalibrated, with American River basin parameters',
  ],
  [
    'Forcing',
    `CMIP6 downscaled daily precipitation and mean air temperature (mean of daily max and min), ${
      realModels.value.length || 'all'
    } models`,
  ],
  ['Scenarios', 'Historical 1965–2014; SSP1-2.6, 2-4.5, 3-7.0, 5-8.5 to 2100'],
  [
    'Elevation',
    metadata.value.elevation_m != null
      ? `${metadata.value.elevation_m} m (${metadata.value.elevation_source})`
      : 'ASTER GDEM 1 km mean',
  ],
  [
    'Design load',
    '50-year annual peak SWE from a GEV fit by L-moments, allowing for snow-free years, times gravity',
  ],
])

const sources = computed(() => [
  { label: 'Snow-17 API documentation', href: `${apiUrl}/snow17` },
  ...(run.value
    ? [{ label: 'This run, as JSON', href: run.value.jsonUrl }]
    : []),
])
</script>

<style lang="scss" scoped>
.snow17-rerun {
  margin-bottom: 1rem;
}
.season-loading {
  padding: 2rem 0;
}
.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  gap: 1rem 1.25rem;
  margin-top: 1rem;
}
.setting {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.setting-label {
  font-size: 0.85rem;
  font-weight: 600;
}
.setting-note {
  font-size: 0.75rem;
  color: #6b6866;
}
</style>
