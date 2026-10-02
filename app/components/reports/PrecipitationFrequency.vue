<template>
  <ReportSection
    id="precipitation-frequency"
    title="Design storms (precipitation frequency)"
  >
    <template #lede>{{ lede }}</template>

    <div class="chart-controls">
      <SegmentedControl
        v-model="era"
        label="Era"
        hide-label
        :options="eraOptions"
      />
      <label class="chart-select">
        <span>Duration</span>
        <select v-model="duration">
          <option v-for="d in durations" :key="d.key" :value="d.key">
            {{ d.name }}
          </option>
        </select>
      </label>
    </div>
    <ReturnPeriodChart
      :title="`${durationName} precipitation depth by return period, ${eraLabel}, RCP 8.5, for each model with its 95% confidence interval`"
      :periods="periods"
      :series="series"
      :unit="unit.depth"
    />
    <p class="chart-note">
      {{ durationName }} depth, RCP 8.5, {{ eraLabel }}. Shading is each
      model&rsquo;s 95% confidence interval.
    </p>

    <details class="chart-table">
      <summary>Show the numbers</summary>
      <p class="is-size-7 mb-3">
        Depth in {{ unit.depth }} by duration and annual exceedance probability,
        {{ eraLabel }}, with the 95% confidence interval below each value.
      </p>
      <div v-for="model in models" :key="model.key" class="table-container">
        <table class="table is-narrow is-fullwidth">
          <caption>
            {{
              model.label
            }},
            {{
              eraLabel
            }}
          </caption>
          <thead>
            <tr>
              <th scope="col">Duration</th>
              <th v-for="period in periods" :key="period" scope="col">
                {{ period }}-yr<br /><span class="range"
                  >{{ formatNumber(100 / period, period > 100 ? 1 : 0) }}%</span
                >
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="d in durations" :key="d.key">
              <th scope="row">{{ d.short }}</th>
              <td v-for="period in periods" :key="period">
                {{ fmt(value(period, d.key, model.key).pf) }}
                <span class="range"
                  >{{ fmt(value(period, d.key, model.key).pf_lower) }} to
                  {{ fmt(value(period, d.key, model.key).pf_upper) }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>

    <template #panel>
      <DataPanel
        topic="design storm"
        :downloads="[{ endpoint: 'precipitation/frequency/point' }]"
        note="Depth by duration × return period, per model and era, with 95% confidence intervals · CSV"
        :calculations="[
          {
            label: 'Design discharge',
            href: 'https://ua-snap.github.io/ardac/lab?path=design_discharge%2Fdesign_discharge.ipynb',
          },
        ]"
        :made="[
          ['Models', 'GFDL CM3, NCAR CCSM4'],
          ['Scenario', 'RCP 8.5'],
          ['Baseline', 'NOAA Atlas 14, Vol. 7 (Alaska)'],
          ['Grid', '481 m'],
          [
            'Method',
            'WRF dynamical downscaling, then delta method to Atlas 14',
          ],
          ['Coverage', '60 min–60 days; 2- to 1,000-year return periods'],
        ]"
        :sources="[
          {
            label: 'Annual maximum precipitation projections for Alaska',
            href: 'https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/304b6d89-961e-417d-b6ba-4139c7fe5ff6',
          },
          {
            label: 'Methods report (PDF)',
            href: 'https://uaf-snap.org/wp-content/uploads/2021/05/dot-precip_FINAL-REPORT_20210526.pdf',
          },
        ]"
        :references="[bieniek2022]"
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
import ReturnPeriodChart from '~/components/charts/ReturnPeriodChart'
import { formatNumber, palette } from '~/utils/chart'
import { bieniek2022 } from '~/data/references'

const { results } = storeToRefs(useReportStore())
const unit = useUnitLabels()

const periods = [2, 5, 10, 25, 50, 100, 200, 500, 1000]
const durations = [
  ['60m', '60-minute', '60 min'],
  ['2h', '2-hour', '2 hr'],
  ['3h', '3-hour', '3 hr'],
  ['6h', '6-hour', '6 hr'],
  ['12h', '12-hour', '12 hr'],
  ['24h', '24-hour', '24 hr'],
  ['2d', '2-day', '2 days'],
  ['3d', '3-day', '3 days'],
  ['4d', '4-day', '4 days'],
  ['7d', '7-day', '7 days'],
  ['10d', '10-day', '10 days'],
  ['20d', '20-day', '20 days'],
  ['30d', '30-day', '30 days'],
  ['45d', '45-day', '45 days'],
  ['60d', '60-day', '60 days'],
].map(([key, name, short]) => ({ key, name, short }))
const models = [
  {
    key: 'GFDL-CM3',
    label: 'GFDL CM3',
    color: palette.warm,
    band: palette.warmBand,
  },
  {
    key: 'NCAR-CCSM4',
    label: 'NCAR CCSM4',
    color: palette.cool,
    band: palette.coolBand,
  },
]
const eraOptions = [
  { value: '2020-2049', label: '2020–2049' },
  { value: '2050-2079', label: '2050–2079' },
  { value: '2080-2099', label: '2080–2099' },
]

const era = ref('2050-2079')
const duration = ref('24h')
const eraLabel = computed(() => era.value.replace('-', '–'))
const durationName = computed(
  () => durations.find(d => d.key == duration.value).name
)

function value(period, durationKey, model) {
  return results.value.precip_frequency[period][durationKey][model][era.value]
}

const series = computed(() =>
  models.map(model => {
    const at = periods.map(p => value(p, duration.value, model.key))
    return {
      label: model.label,
      color: model.color,
      band: model.band,
      values: at.map(v => v.pf),
      lower: at.map(v => v.pf_lower),
      upper: at.map(v => v.pf_upper),
    }
  })
)

function fmt(v) {
  return formatNumber(v, unit.value.metric ? 0 : 2)
}

// "The 24-hour, 100-year storm is 3.4 in (NCAR CCSM4) to 6.1 in (GFDL CM3)
// in 2050–2079; the two models disagree widely."
const lede = computed(() => {
  const [low, high] = models
    .map(model => ({
      label: model.label,
      depth: value(100, duration.value, model.key).pf,
    }))
    .sort((a, b) => a.depth - b.depth)
  const digits = unit.value.metric ? 0 : 1
  const depth = d => `${formatNumber(d, digits)} ${unit.value.depth}`
  const ratio = high.depth / low.depth
  let agreement
  if (ratio >= 1.4) {
    agreement = 'the two models disagree widely'
  } else if (ratio >= 1.15) {
    agreement = `the higher is ${Math.round(
      (ratio - 1) * 100
    )}% above the lower`
  } else {
    agreement = 'the two models agree closely'
  }
  return (
    `The ${durationName.value}, 100-year storm is ${depth(low.depth)} ` +
    `(${low.label}) to ${depth(high.depth)} (${high.label}) in ` +
    `${eraLabel.value}; ${agreement}.`
  )
})
</script>
