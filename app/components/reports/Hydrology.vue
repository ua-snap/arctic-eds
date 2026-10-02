<template>
  <ReportSection id="hydrology" title="Hydrology">
    <template #lede>{{ lede }}</template>

    <div class="chart-controls">
      <SegmentedControl
        v-model="variable"
        label="Variable"
        hide-label
        :options="variableOptions"
      />
      <SegmentedControl
        v-model="scenario"
        label="Scenario"
        hide-label
        :options="scenarioOptions"
      />
      <SegmentedControl
        v-model="era"
        label="Era"
        hide-label
        :options="eraOptions"
      />
    </div>
    <MonthlyChart
      :title="`Monthly ${variableName.toLowerCase()}, ${
        unit.depth
      }, mean of 9 models, ${scenarioLabel}, ${eraLabel} against 1950–2009`"
      :series="series"
      :band="band"
      :unit="` ${unit.depth}`"
    />
    <p class="chart-note">
      Monthly total {{ variableName.toLowerCase() }}, mean of 9 models,
      {{ scenarioLabel }}. Shading spans the lowest to highest model for
      {{ eraLabel }}.
    </p>

    <details class="chart-table">
      <summary>Show the numbers</summary>
      <div class="table-container">
        <table class="table is-narrow is-fullwidth">
          <caption>
            Monthly
            {{
              variableName.toLowerCase()
            }},
            {{
              unit.depth
            }}, mean of 9 models with the lowest to highest model below,
            {{
              scenarioLabel
            }}
          </caption>
          <thead>
            <tr>
              <th scope="col">Month</th>
              <th scope="col">1950&ndash;2009</th>
              <th scope="col">{{ eraLabel }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(month, i) in monthNames" :key="month">
              <th scope="row">{{ month }}</th>
              <td v-for="key in ['historical', eraKey]" :key="key">
                {{ fmt(monthly(key)[i].mean) }}
                <span class="range"
                  >{{ fmt(monthly(key)[i].min) }} to
                  {{ fmt(monthly(key)[i].max) }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>

    <template #panel>
      <DataPanel
        topic="hydrology"
        :downloads="[{ endpoint: 'hydrology/point' }]"
        note="Decadal averages of monthly runoff, evapotranspiration, snowmelt, snow and ice water equivalent, soil moisture in 3 layers, precipitation and temperature, 1950–2099, per model and scenario · CSV, ~235 kB, metric units"
        :made="[
          ['Model', 'Variable Infiltration Capacity (VIC) hydrologic model'],
          [
            'Driven by',
            '9 GCMs chosen to bracket cooler/hotter and drier/wetter futures',
          ],
          ['Scenarios', 'RCP 4.5, 8.5'],
          ['Baseline', 'Daymet, 1950–2009 (modeled)'],
          ['Grid', '12 km'],
          ['Method', 'Bias-corrected spatial disaggregation (BCSD)'],
        ]"
        :sources="[
          {
            label:
              'Alaska VIC Hydrologic Model Output (1950–2099): Decadal Averages of Monthly Summaries',
            href: 'https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/2610188c-aa38-4f47-8987-b36ec72cdd0d',
          },
        ]"
        :references="[mizukami2022Data, mizukami2022]"
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
import { formatNumber, palette } from '~/utils/chart'
import { mizukami2022, mizukami2022Data } from '~/data/references'

const { results } = storeToRefs(useReportStore())
const unit = useUnitLabels()

const monthKeys = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
]
const monthNames = [
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

const variableOptions = [
  { value: 'runoff', label: 'Runoff' },
  { value: 'evap', label: 'Evapotranspiration' },
]
const scenarioOptions = [
  { value: 'rcp45', label: 'RCP 4.5' },
  { value: 'rcp85', label: 'RCP 8.5' },
]
// The API summarizes decades 2010–2039, 2040–2069 and 2070–2099 under these
// names, and 1950–2009 as "historical".
const eraOptions = [
  { value: 'early_century', label: '2010–2039' },
  { value: 'mid_century', label: '2040–2069' },
  { value: 'late_century', label: '2070–2099' },
]

const variable = ref('runoff')
const scenario = ref('rcp85')
const era = ref('mid_century')

const variableName = computed(
  () => variableOptions.find(o => o.value == variable.value).label
)
const scenarioLabel = computed(
  () => scenarioOptions.find(o => o.value == scenario.value).label
)
const eraLabel = computed(
  () => eraOptions.find(o => o.value == era.value).label
)
const eraKey = computed(() => era.value)

const summary = computed(() => results.value.hydrology.summary)
const models = computed(() => Object.keys(summary.value))

// Mean, lowest and highest of the models' means for a period and month key.
function acrossModels(eraName, period, v = variable.value, s = scenario.value) {
  const values = models.value.map(
    model => summary.value[model][s][period][v][eraName].mean
  )
  return {
    mean: values.reduce((a, b) => a + b, 0) / values.length,
    min: Math.min(...values),
    max: Math.max(...values),
  }
}

function monthly(eraName) {
  return monthKeys.map(month => acrossModels(eraName, month))
}

const series = computed(() => {
  const future = monthly(era.value)
  return [
    {
      label: eraLabel.value,
      values: future.map(v => v.mean),
      color: palette.cool,
      strong: true,
    },
    {
      label: '1950–2009',
      values: monthly('historical').map(v => v.mean),
      color: palette.historical,
    },
  ]
})
const band = computed(() => {
  const future = monthly(era.value)
  return {
    lower: future.map(v => v.min),
    upper: future.map(v => v.max),
    color: palette.coolBand,
    opacity: 0.8,
  }
})

function fmt(value) {
  return formatNumber(value, unit.value.metric ? 0 : 2)
}

// Runoff's peak month and the change in annual runoff by mid-century,
// RCP 8.5.
const lede = computed(() => {
  const at = (eraName, period) =>
    acrossModels(eraName, period, 'runoff', 'rcp85').mean
  const peak = monthKeys.reduce((a, b) =>
    at('mid_century', b) > at('mid_century', a) ? b : a
  )
  const peakName = monthNames[monthKeys.indexOf(peak)]
  const before = at('historical', 'Annual')
  const after = at('mid_century', 'Annual')
  const change = Math.round(((after - before) / before) * 100)
  const verb = change > 0 ? 'rises' : change < 0 ? 'falls' : 'holds steady'
  const amount = change ? ` ${Math.abs(change)}%` : ''
  return (
    `Runoff peaks in ${peakName}; annual runoff ${verb}${amount} by ` +
    'mid-century compared with 1950–2009 (mean of 9 models, RCP 8.5).'
  )
})
</script>
