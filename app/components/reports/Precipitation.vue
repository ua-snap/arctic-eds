<template>
  <ReportSection id="annual-precipitation" title="Precipitation">
    <template #lede>{{ lede }}</template>

    <h3 class="chart-heading">Total annual precipitation</h3>
    <RangeDotPlot
      :title="`Total annual precipitation, ${unit.depth}: baseline 1901–2015 and three future periods`"
      :rows="rows"
    />
    <p class="chart-note">
      {{ unit.depth == 'in' ? 'Inches' : 'Millimeters' }}. Dot: mean across 5
      models and 3 scenarios (RCP 4.5, 6.0, 8.5). Bar: range across models,
      scenarios and years. Dashed line: baseline mean.
    </p>

    <details class="chart-table">
      <summary>Show the numbers</summary>
      <div class="table-container">
        <table class="table is-narrow is-fullwidth">
          <caption>
            Total annual precipitation,
            {{
              unit.depth
            }}
          </caption>
          <thead>
            <tr>
              <th scope="col">Period</th>
              <th scope="col">Min</th>
              <th scope="col">Mean</th>
              <th scope="col">Max</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.label">
              <th scope="row">{{ row.label }}</th>
              <td>{{ fmt(row.min) }}</td>
              <td>{{ fmt(row.mean) }}</td>
              <td>{{ fmt(row.max) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>

    <template #panel>
      <DataPanel
        topic="precipitation"
        :downloads="[{ endpoint: 'precipitation' }]"
        note="Annual totals for 1901–2015 and 2010–2099, every model and scenario · CSV, ~42 kB, metric units"
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
            label: 'Historical Monthly and Derived Precipitation Products',
            href: 'https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/9eeef879-42ee-4bbe-a54e-435716ad0c90',
          },
          {
            label: 'Projected Monthly and Derived Precipitation Products',
            href: 'https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/f44595c8-5384-4c02-9ab4-f7a9c43e92eb',
          },
        ]"
        :references="[walsh2018]"
      />
    </template>
  </ReportSection>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import ReportSection from '~/components/report/ReportSection'
import DataPanel from '~/components/report/DataPanel'
import RangeDotPlot from '~/components/charts/RangeDotPlot'
import { formatNumber, formatPercentChange } from '~/utils/chart'
import { walsh2018 } from '~/data/references'

const { results } = storeToRefs(useReportStore())
const unit = useUnitLabels()

const periods = [
  ['historical', 'Baseline 1901–2015'],
  ['2010-2039', '2010–2039'],
  ['2040-2069', '2040–2069'],
  ['2070-2099', '2070–2099'],
]

const summary = computed(() => results.value.precipitation.summary)

function fmt(value) {
  return formatNumber(value, unit.value.metric ? 0 : 1)
}

const rows = computed(() => {
  const base = summary.value.historical.prmean
  return periods.map(([key, label], i) => {
    const { prmin, prmean, prmax } = summary.value[key]
    return {
      label,
      min: prmin,
      mean: prmean,
      max: prmax,
      valueLabel:
        fmt(prmean) + (i ? ` (${formatPercentChange(base, prmean)})` : ''),
    }
  })
})

const lede = computed(() => {
  const base = summary.value.historical.prmean
  const mid = summary.value['2040-2069'].prmean
  const change = Math.round(((mid - base) / base) * 100)
  const verb = change > 0 ? 'rises' : change < 0 ? 'falls' : 'holds steady'
  const amount = change ? ` ${Math.abs(change)}%` : ''
  return (
    `Annual precipitation ${verb}${amount} by mid-century, from ` +
    `${fmt(base)} ${unit.value.depth} to ${fmt(mid)} ${unit.value.depth} ` +
    '(mean of 5 models and 3 scenarios).'
  )
})
</script>
