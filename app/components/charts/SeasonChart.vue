<template>
  <!--
    One value per calendar day of the cold season, October 1 to March 31:
    a mean line over the band between the lowest and highest values.
  -->
  <div ref="box">
    <svg
      ref="svgEl"
      :width="width"
      :height="height"
      :viewBox="`0 0 ${width} ${height}`"
      role="img"
      :aria-label="title"
      class="chart"
    >
      <g v-for="(tick, i) in y.ticks" :key="tick">
        <line
          :x1="m.left"
          :x2="right"
          :y1="yScale(tick)"
          :y2="yScale(tick)"
          :stroke="palette.grid"
        />
        <text
          :x="m.left - 8"
          :y="yScale(tick)"
          text-anchor="end"
          dominant-baseline="middle"
          :fill="palette.muted"
        >
          {{ formatNumber(tick, tickDigits(y.ticks))
          }}{{ i === y.ticks.length - 1 ? unit : '' }}
        </text>
      </g>

      <path
        :d="bandPath(points(band.lower), points(band.upper))"
        :fill="band.color"
      />

      <g v-for="reference in references" :key="reference.value">
        <line
          :x1="m.left"
          :x2="right"
          :y1="yScale(reference.value)"
          :y2="yScale(reference.value)"
          :stroke="palette.muted"
          stroke-dasharray="3 3"
        />
        <text
          :x="right - 4"
          :y="yScale(reference.value) - 5"
          text-anchor="end"
          :fill="palette.muted"
        >
          {{ reference.label }}
        </text>
      </g>

      <path
        :d="linePath(points(line.values))"
        fill="none"
        :stroke="line.color"
        stroke-width="2"
        stroke-linejoin="round"
      />

      <g v-for="month in monthStarts" :key="month.label">
        <line
          :x1="xScale(month.index)"
          :x2="xScale(month.index)"
          :y1="height - m.bottom"
          :y2="height - m.bottom + 4"
          :stroke="palette.axis"
        />
        <text
          :x="xScale(month.index + month.days / 2)"
          :y="height - 6"
          text-anchor="middle"
          :fill="palette.muted"
        >
          {{ month.label }}
        </text>
      </g>
    </svg>
    <ChartDownload :svg="svgEl" :title="title" :legend="legend" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import ChartDownload from '~/components/charts/ChartDownload'
import { scaleLinear } from 'd3-scale'
import {
  bandPath,
  formatNumber,
  linePath,
  niceTicks,
  palette,
  tickDigits,
} from '~/utils/chart'
import { seasonMonths } from '~/utils/azcot'

const props = defineProps({
  // Accessible name, e.g. "Daily air temperature…".
  title: String,
  // { label, values: [182 numbers], color }
  line: Object,
  // { label, lower: [182], upper: [182], color }
  band: Object,
  // Optional dashed lines: [{ value, label }]
  references: { type: Array, default: () => [] },
  // Shown after the top tick, e.g. "°F".
  unit: { type: String, default: '' },
  height: { type: Number, default: 300 },
})

const box = ref(null)
const svgEl = ref(null)
const width = useElementWidth(box)

const m = { top: 12, right: 8, bottom: 26, left: 48 }
const right = computed(() => width.value - m.right)

// Where each month starts along the 182 days.
const monthStarts = seasonMonths.reduce((starts, month) => {
  const previous = starts[starts.length - 1]
  const index = previous ? previous.index + previous.days : 0
  starts.push({ label: month.label, days: month.days, index })
  return starts
}, [])
const dayCount = seasonMonths.reduce((sum, month) => sum + month.days, 0)

const y = computed(() => {
  const values = [...props.band.lower, ...props.band.upper]
  props.references.forEach(r => values.push(r.value))
  const finite = values.filter(Number.isFinite)
  return niceTicks(Math.min(...finite), Math.max(...finite), 6)
})

const xScale = computed(() =>
  scaleLinear().domain([0, dayCount]).range([m.left, right.value])
)
const yScale = computed(() =>
  scaleLinear()
    .domain([y.value.min, y.value.max])
    .range([props.height - m.bottom, m.top])
)

// Each day is drawn at its middle.
function points(values) {
  return values.map((v, i) => [
    xScale.value(i + 0.5),
    Number.isFinite(v) ? yScale.value(v) : null,
  ])
}

const legend = computed(() => [
  { label: props.line.label, color: props.line.color },
  { label: props.band.label, color: props.band.color },
])
</script>
