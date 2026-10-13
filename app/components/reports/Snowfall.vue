<template>
  <ReportSection id="snowfall" title="Snowfall">
    <template #lede>{{ lede }}</template>

    <h3 class="chart-heading">Annual snowfall water equivalent</h3>
    <RangeDotPlot
      :title="`Annual snowfall water equivalent, ${unit.depth}: 1910–2009 and 2010–2099`"
      :rows="rows"
    />
    <p class="chart-note">
      {{ unit.depth == 'in' ? 'Inches' : 'Millimeters' }} of water. Dot: mean of
      decadal averages across 5 models and 3 scenarios (RCP 4.5, 6.0, 8.5). Bar:
      range of decadal averages. Dashed line: 1910&ndash;2009 mean.
    </p>

    <details class="chart-table">
      <summary>Show the numbers</summary>
      <div class="table-container">
        <table class="table is-narrow is-fullwidth">
          <caption>
            Annual snowfall water equivalent,
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
        topic="snowfall"
        :downloads="[{ endpoint: 'snow/snowfallequivalent' }]"
        note="Decadal means of annual snowfall water equivalent, 1910–2099, every model and scenario · CSV, ~5 kB, metric units"
        :made="[
          [
            'Models',
            '5 GCMs: NCAR CCSM4, GFDL CM3, GISS E2-R, MRI CGCM3, IPSL CM5A-LR',
          ],
          ['Scenarios', 'RCP 4.5, 6.0, 8.5'],
          ['Baseline', 'CRU TS 3.1, 1910–2009'],
          ['Grid', '771 m'],
          [
            'Method',
            'Snow-day fraction × precipitation, delta method to a PRISM 1971–2000 climatology',
          ],
        ]"
        :sources="[
          {
            label: 'Historical Decadal Averages of Monthly Snowfall Equivalent',
            href: 'https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/557db5d5-dbeb-470a-a9c4-b80d78aa8668',
          },
          {
            label: 'Projected Decadal Averages of Monthly Snowfall Equivalent',
            href: 'https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/7c0c1a65-794e-4770-aa72-4628d357808e',
          },
        ]"
        :references="[mcafee2013, littell2018]"
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
import { littell2018, mcafee2013 } from '~/data/references'

const { results } = storeToRefs(useReportStore())
const unit = useUnitLabels()

const summary = computed(() => results.value.snowfall.summary)

function fmt(value) {
  return formatNumber(value, unit.value.metric ? 0 : 1)
}

const rows = computed(() => {
  const { historical, projected } = summary.value
  return [
    {
      label: 'Baseline 1910–2009',
      min: historical.sfemin,
      mean: historical.sfemean,
      max: historical.sfemax,
      valueLabel: fmt(historical.sfemean),
    },
    {
      label: '2010–2099',
      min: projected.sfemin,
      mean: projected.sfemean,
      max: projected.sfemax,
      valueLabel: `${fmt(projected.sfemean)} (${formatPercentChange(
        historical.sfemean,
        projected.sfemean
      )})`,
    },
  ]
})

const lede = computed(() => {
  const { historical, projected } = summary.value
  const change = Math.round(
    ((projected.sfemean - historical.sfemean) / historical.sfemean) * 100
  )
  const verb = change > 0 ? 'more' : 'less'
  const amount = change
    ? `, ${Math.abs(change)}% ${verb} than in 1910–2009`
    : ', about the same as in 1910–2009'
  return (
    `Snowfall averages ${fmt(projected.sfemean)} ${unit.value.depth} of ` +
    `water a year through 2099${amount} (mean of 5 models and 3 scenarios).`
  )
})
</script>
