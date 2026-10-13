<template>
  <ReportSection id="permafrost" title="Permafrost & ground temperature">
    <template #lede>{{ lede }}</template>

    <GroundProfile
      :title="`Mean annual ground temperature from the surface to 5 m deep, in ${unit.temp}, for 2021–2039, 2040–2069 and 2070–2099`"
      :depths="depths"
      :series="series"
      :freezing="unit.freezing"
      :unit="unit.temp"
    />
    <p class="chart-note">
      Mean annual ground temperature, averaged across the driving models and
      both scenarios. The dashed line is freezing ({{ unit.freezing
      }}{{ unit.temp }}).
    </p>

    <details class="chart-table">
      <summary>Show the numbers</summary>
      <div class="table-container">
        <table class="table is-narrow is-fullwidth">
          <caption>
            Mean across models and scenarios, with the minimum to maximum below
          </caption>
          <thead>
            <tr>
              <th scope="col"></th>
              <th v-for="era in eras" :key="era.key" scope="col">
                {{ era.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in tableRows" :key="row.label">
              <th scope="row">{{ row.label }}</th>
              <td v-for="(cell, i) in row.cells" :key="i">
                {{ cell.mean }}
                <span class="range">{{ cell.min }} to {{ cell.max }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>

    <template #panel>
      <DataPanel
        topic="permafrost"
        :downloads="[{ endpoint: 'permafrost/point' }]"
        note="Annual ground temperature at 7 depths, permafrost top and base, talik thickness, per model and scenario · CSV, ~48 kB, metric units"
        :made="[
          ['Model', 'GIPL 2.0 permafrost model (UAF Geophysical Institute)'],
          ['Driven by', 'GFDL CM3, NCAR CCSM4, 5-model average'],
          ['Scenarios', 'RCP 4.5, 8.5'],
          ['Years', '2021–2100'],
          ['Grid', '1 km'],
        ]"
        :sources="[
          {
            label: 'GIPL Permafrost Model Output',
            href: 'https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/c24a957b-8a56-40bf-bc09-43a567182d36',
          },
        ]"
        :references="[marchenko2008]"
      />
    </template>
  </ReportSection>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import ReportSection from '~/components/report/ReportSection'
import DataPanel from '~/components/report/DataPanel'
import GroundProfile from '~/components/charts/GroundProfile'
import { formatNumber, palette } from '~/utils/chart'
import { marchenko2008 } from '~/data/references'

const { results } = storeToRefs(useReportStore())
const unit = useUnitLabels()

const depths = [
  { key: 'magtsurface', depth: 0, label: 'Surface' },
  { key: 'magt0.5m', depth: 0.5, label: '' },
  { key: 'magt1m', depth: 1, label: '1 m' },
  { key: 'magt2m', depth: 2, label: '2 m' },
  { key: 'magt3m', depth: 3, label: '3 m' },
  { key: 'magt4m', depth: 4, label: '4 m' },
  { key: 'magt5m', depth: 5, label: '5 m' },
]
const eras = [
  { key: '2021-2039', label: '2021–2039', when: 'in 2021–2039' },
  { key: '2040-2069', label: '2040–2069', when: 'by mid-century' },
  { key: '2070-2099', label: '2070–2099', when: 'by late century' },
]

const summary = computed(() => results.value.permafrost.summary)
const stat = (era, kind) => summary.value[era][`gipl1km${kind}`]

const series = computed(() =>
  eras.map((era, i) => ({
    label: `${era.label} mean`,
    color: palette.eras[i + 1].dot,
    values: depths.map(d => stat(era.key, 'mean')[d.key]),
  }))
)

// Lengths: the store converts the depth to permafrost to inches for imperial
// units and leaves the base and talik in meters. Show feet or meters.
const lengthUnit = computed(() => (unit.value.metric ? 'm' : 'ft'))
function length(key, value) {
  if (!Number.isFinite(value)) return undefined
  if (unit.value.metric) return value
  return key == 'permafrosttop' ? value / 12 : value * 3.28084
}
function fmtLength(key, value) {
  const v = length(key, value)
  return v === undefined ? '—' : formatNumber(v, 1)
}

// "Mean top of permafrost deepens from 2.4 m to 6.0 m; ground at 1 m warms
// past 32°F by mid-century."
const lede = computed(() => {
  const clauses = []
  const first = length('permafrosttop', stat(eras[0].key, 'mean').permafrosttop)
  const last = length('permafrosttop', stat(eras[2].key, 'mean').permafrosttop)
  if (first !== undefined && last !== undefined && first > 0) {
    const verb = last > first ? 'deepens' : last < first ? 'rises' : 'stays'
    const to = verb == 'stays' ? 'at' : 'from'
    clauses.push(
      `Mean top of permafrost ${verb} ${to} ${formatNumber(first, 1)} ` +
        `${lengthUnit.value}` +
        (verb == 'stays'
          ? ''
          : ` to ${formatNumber(last, 1)} ${lengthUnit.value}`)
    )
  }

  const freezing = `${unit.value.freezing}${unit.value.temp}`
  const thawed = eras.findIndex(
    era => stat(era.key, 'mean').magt1m > unit.value.freezing
  )
  if (thawed == 0) {
    clauses.push(`ground at 1 m is above ${freezing} in every period`)
  } else if (thawed > 0) {
    clauses.push(`ground at 1 m warms past ${freezing} ${eras[thawed].when}`)
  } else {
    clauses.push(`ground at 1 m stays below ${freezing} through 2099`)
  }

  const sentence = clauses.join('; ') + '.'
  return sentence.charAt(0).toUpperCase() + sentence.slice(1)
})

const tableRows = computed(() => {
  const temp = (label, key) => ({
    label: `${label} (${unit.value.temp})`,
    cells: eras.map(era => {
      const at = kind => formatNumber(stat(era.key, kind)[key], 1)
      return { min: at('min'), mean: at('mean'), max: at('max') }
    }),
  })
  const len = (label, key) => ({
    label: `${label} (${lengthUnit.value})`,
    cells: eras.map(era => {
      const at = kind => fmtLength(key, stat(era.key, kind)[key])
      return { min: at('min'), mean: at('mean'), max: at('max') }
    }),
  })
  return [
    ...depths.map(d =>
      temp(
        d.depth ? `Ground temperature, ${d.depth} m` : 'Surface temperature',
        d.key
      )
    ),
    len('Depth to top of permafrost', 'permafrosttop'),
    len('Depth to base of permafrost', 'permafrostbase'),
    len('Talik thickness', 'talikthickness'),
  ]
})
</script>
