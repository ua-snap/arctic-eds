<template>
  <ReportSection
    id="temperature-indices"
    title="Freezing & thawing index, heating degree days"
  >
    <template #lede>{{ lede }}</template>

    <div v-for="index in indices" :key="index.id" class="chart-group">
      <h3 :id="index.id" class="chart-heading">{{ index.name }}</h3>
      <RangeDotPlot
        :title="`${index.name}, ${unit.dd}: baseline 1980–2009 and three future periods`"
        :rows="index.rows"
      />
    </div>
    <p class="chart-note">
      {{ unit.dd }}. Dot: mean across 9 models and 2 scenarios (RCP 4.5, 8.5).
      Bar: range across models, scenarios and years. Dashed line: baseline mean.
      Percentages compare each mean to the baseline mean.
    </p>

    <details class="chart-table">
      <summary>Show the numbers</summary>
      <div v-for="index in indices" :key="index.id" class="table-container">
        <table class="table is-narrow is-fullwidth">
          <caption>
            {{
              index.name
            }},
            {{
              unit.dd
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
            <tr v-for="row in index.rows" :key="row.label">
              <th scope="row">{{ row.label }}</th>
              <td>{{ formatNumber(row.min) }}</td>
              <td>{{ formatNumber(row.mean) }}</td>
              <td>{{ formatNumber(row.max) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>

    <template #panel>
      <DataPanel
        topic="degree day"
        :downloads="downloads"
        note="Annual values per model, 1980–2099 · one CSV per index, ~73 kB each, °F·days"
        :calculations="[
          {
            label: 'Design freezing index',
            href: 'https://ua-snap.github.io/ardac/lab/?path=design_freezing_index%2Fdesign_freezing_index_module.ipynb',
          },
          {
            label: 'Design thawing index',
            href: 'https://ua-snap.github.io/ardac/lab?path=design_thawing_index%2Fdesign_thawing_index_module.ipynb',
          },
          {
            label: 'Frost depth (Modified Berggren)',
            href: 'https://ua-snap.github.io/ardac/lab?path=frost_depth%2FModified+Berggren+Frost+Depth.ipynb',
          },
        ]"
        :made="[
          [
            'Models',
            '9 GCMs chosen to bracket cooler/hotter and drier/wetter futures',
          ],
          ['Scenarios', 'RCP 4.5, 8.5'],
          ['Baseline', 'Daymet, 1980–2009'],
          ['Grid', '12 km'],
          ['Method', 'Bias-corrected spatial disaggregation (BCSD)'],
        ]"
        :sources="[
          {
            label:
              'Degree Days: Freezing Index, Thawing Index, Heating Degree Days',
            href: 'https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/f9831074-cd3f-4c06-8601-687bd2911b7e',
          },
        ]"
        :references="[mizukami2022, mizukami2022Data]"
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
import { mizukami2022, mizukami2022Data } from '~/data/references'

const {
  results,
  isFreezingIndexPresent,
  isThawingIndexPresent,
  isHeatingDegreeDaysPresent,
} = storeToRefs(useReportStore())
const unit = useUnitLabels()

const periods = [
  ['modeled_baseline', 'Baseline 1980–2009'],
  ['2010-2039', '2010–2039'],
  ['2040-2069', '2040–2069'],
  ['2070-2099', '2070–2099'],
]

const all = [
  {
    id: 'freezing-index',
    name: 'Freezing index',
    key: 'freezing_index',
    endpoint: 'degree_days/freezing_index',
    present: isFreezingIndexPresent,
  },
  {
    id: 'thawing-index',
    name: 'Thawing index',
    key: 'thawing_index',
    endpoint: 'degree_days/thawing_index',
    present: isThawingIndexPresent,
  },
  {
    id: 'heating-degree-days',
    name: 'Heating degree days',
    key: 'heating_degree_days',
    endpoint: 'degree_days/heating',
    present: isHeatingDegreeDaysPresent,
  },
]

const indices = computed(() =>
  all
    .filter(index => index.present.value)
    .map(index => {
      const summary = results.value[index.key].summary
      const base = summary.modeled_baseline.ddmean
      return {
        ...index,
        rows: periods.map(([key, label], i) => {
          const { ddmin, ddmean, ddmax } = summary[key]
          const mean = Math.round(ddmean)
          return {
            label,
            min: Math.round(ddmin),
            mean,
            max: Math.round(ddmax),
            valueLabel:
              formatNumber(mean) +
              (i ? ` (${formatPercentChange(base, ddmean)})` : ''),
          }
        }),
      }
    })
)

const downloads = computed(() =>
  indices.value.map(index => ({
    endpoint: index.endpoint,
    label: `${index.name} CSV`,
  }))
)

// "Freezing index falls 26% and thawing index rises 21% by mid-century; …"
const lede = computed(() => {
  const clauses = indices.value.map(index => {
    const summary = results.value[index.key].summary
    const base = summary.modeled_baseline.ddmean
    const change = (summary['2040-2069'].ddmean - base) / base
    const verb = change < 0 ? 'falls' : 'rises'
    const name = index.name.toLowerCase()
    return `${name} ${
      index.key == 'heating_degree_days' ? verb.slice(0, -1) : verb
    } ${Math.abs(Math.round(change * 100))}%`
  })
  if (!clauses.length) return ''
  const sentence =
    clauses.length > 1
      ? clauses.slice(0, -1).join(', ') + ' and ' + clauses[clauses.length - 1]
      : clauses[0]
  return (
    sentence.charAt(0).toUpperCase() +
    sentence.slice(1) +
    ' by mid-century (mean of 9 models and 2 scenarios).'
  )
})
</script>
