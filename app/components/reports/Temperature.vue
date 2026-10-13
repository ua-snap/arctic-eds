<template>
  <ReportSection id="temperature" title="Air temperature">
    <template #lede>{{ lede }}</template>

    <div class="chart-controls">
      <SegmentedControl
        v-model="era"
        label="Era"
        hide-label
        :options="eraOptions"
      />
    </div>
    <MonthlyChart
      :title="`Monthly mean air temperature, 5-model average, ${eraLabel} under RCP 4.5 and RCP 8.5, against the 1901–2015 baseline`"
      :series="series"
      :band="band"
      :reference="{
        value: unit.freezing,
        label: `${unit.freezing}${unit.temp}`,
      }"
      :unit="unit.temp"
    />
    <p class="chart-note">
      Monthly mean, 5-model average, {{ eraLabel }}. Shading shows the warming
      under RCP 8.5 against the modeled 1901–2015 baseline.
    </p>

    <details class="chart-table">
      <summary>Show the numbers</summary>
      <div class="table-container">
        <table class="table is-narrow is-fullwidth">
          <caption>
            Monthly mean air temperature, with the minimum to maximum below,
            {{
              unit.temp
            }}, 5-model average,
            {{
              eraLabel
            }}
          </caption>
          <thead>
            <tr>
              <th scope="col">Month</th>
              <th scope="col">Baseline 1901&ndash;2015</th>
              <th scope="col">RCP 4.5</th>
              <th scope="col">RCP 8.5</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in tableRows" :key="row.month">
              <th scope="row">{{ row.month }}</th>
              <td v-for="(cell, i) in row.cells" :key="i">
                <template v-if="cell">
                  {{ fmt(cell.tasmean) }}
                  <span class="range"
                    >{{ fmt(cell.tasmin) }} to {{ fmt(cell.tasmax) }}</span
                  >
                </template>
                <template v-else>&mdash;</template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>

    <template #panel>
      <DataPanel
        topic="air temperature"
        :downloads="[{ endpoint: 'tas2km/point' }]"
        note="Monthly min / mean / max for 1901–2015 and 2006–2100, every model and scenario · CSV, ~363 kB, metric units"
        :calculations="[
          {
            label: 'Frost depth (Modified Berggren)',
            href: 'https://ua-snap.github.io/ardac/lab?path=frost_depth%2FModified+Berggren+Frost+Depth.ipynb',
          },
        ]"
        :made="[
          [
            'Models',
            '5 GCMs: NCAR CCSM4, GFDL CM3, GISS E2-R, MRI CGCM3, IPSL CM5A-LR',
          ],
          ['Scenarios', 'RCP 4.5, 6.0, 8.5'],
          ['Baseline', 'CRU TS 4.0, 1901–2015'],
          ['Grid', '2 km'],
          [
            'Method',
            'Statistical downscaling, delta method to a PRISM 1961–1990 climatology',
          ],
        ]"
        :sources="[
          {
            label: 'Historical Monthly and Derived Temperature Products',
            href: 'https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/3b2b24ff-4916-4d92-95b7-c6b2fcefd381',
          },
          {
            label: 'Projected Monthly and Derived Temperature Products',
            href: 'https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/ba834996-ad15-4785-9b43-ef2af86a5ad9',
          },
        ]"
        :references="[walsh2018]"
      />
    </template>
  </ReportSection>
</template>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import ReportSection from '~/components/report/ReportSection'
import DataPanel from '~/components/report/DataPanel'
import SegmentedControl from '~/components/report/SegmentedControl'
import MonthlyChart from '~/components/charts/MonthlyChart'
import { formatNumber, formatSigned, palette } from '~/utils/chart'
import { walsh2018 } from '~/data/references'

const { results } = storeToRefs(useReportStore())
const unit = useUnitLabels()

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const winter = ['November', 'December', 'January', 'February', 'March']

const eraOptions = [
  { value: '2010-2039', label: '2010–2039' },
  { value: '2040-2069', label: '2040–2069' },
  { value: '2070-2099', label: '2070–2099' },
]
const era = ref('2040-2069')
const eraLabel = computed(() => era.value.replace('-', '–'))

const summary = computed(() => results.value.temperature.summary)
const historical = computed(() => summary.value.historical['CRU-TS'].historical)
const projected = scenario => summary.value.projected['5ModelAvg'][scenario]

function monthly(get) {
  return months.map(month => get(month))
}

const baseline = computed(() => monthly(m => historical.value[m].tasmean))
const rcp45 = computed(() =>
  monthly(m => projected('rcp45')[m][era.value].tasmean)
)
const rcp85 = computed(() =>
  monthly(m => projected('rcp85')[m][era.value].tasmean)
)

const series = computed(() => [
  { label: 'RCP 8.5', values: rcp85.value, color: palette.warm, strong: true },
  { label: 'RCP 4.5', values: rcp45.value, color: palette.warm, dashed: true },
  { label: 'Historical', values: baseline.value, color: palette.historical },
])
const band = computed(() => ({
  lower: baseline.value,
  upper: rcp85.value,
  color: palette.warmBand,
  opacity: 0.8,
}))

// Which month warms most by mid-century under RCP 8.5, and how a month in
// the opposite season compares.
const lede = computed(() => {
  const change = month =>
    projected('rcp85')[month]['2040-2069'].tasmean -
    historical.value[month].tasmean
  const most = months.reduce((a, b) => (change(b) > change(a) ? b : a))
  const isWinter = winter.includes(most)
  const other = isWinter ? 'July' : 'January'
  const digits = unit.value.metric ? 1 : 0
  const delta = month => formatSigned(change(month), digits) + unit.value.temp
  return (
    `${isWinter ? 'Winters' : 'Summers'} warm most: ${most} ${delta(most)}, ` +
    `${other} ${delta(other)} by mid-century (RCP 8.5, 5-model average).`
  )
})

function fmt(value) {
  return formatNumber(value, 1)
}

const tableRows = computed(() =>
  months.map(month => ({
    month,
    cells: [
      historical.value[month],
      projected('rcp45')[month][era.value],
      projected('rcp85')[month][era.value],
    ],
  }))
)
</script>
