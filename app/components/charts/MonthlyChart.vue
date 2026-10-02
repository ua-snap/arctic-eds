<template>
  <!-- Twelve months of one or more series, labeled at their December end. -->
  <div ref="box">
    <svg
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

      <g v-if="reference">
        <line
          :x1="m.left"
          :x2="right"
          :y1="yScale(reference.value)"
          :y2="yScale(reference.value)"
          :stroke="palette.muted"
          stroke-dasharray="3 3"
        />
        <text
          :x="m.left + 4"
          :y="yScale(reference.value) - 5"
          :fill="palette.muted"
        >
          {{ reference.label }}
        </text>
      </g>

      <path
        v-if="band"
        :d="bandPath(points(band.lower), points(band.upper))"
        :fill="band.color"
        :fill-opacity="band.opacity ?? 1"
      />

      <path
        v-for="s in series"
        :key="s.label"
        :d="linePath(points(s.values))"
        fill="none"
        :stroke="s.color"
        :stroke-width="s.strong ? 2 : 1.5"
        :stroke-dasharray="s.dashed ? '5 3' : null"
        stroke-linejoin="round"
      />

      <text
        v-for="label in endLabels"
        :key="label.text"
        :x="right + 8"
        :y="label.y"
        dominant-baseline="middle"
        :fill="palette.ink"
        :font-weight="label.strong ? 600 : 400"
      >
        {{ label.text }}
      </text>

      <text
        v-for="(month, i) in months"
        :key="month"
        :x="xScale(i)"
        :y="height - 6"
        text-anchor="middle"
        :fill="palette.muted"
      >
        {{ narrow ? month[0] : month }}
      </text>
    </svg>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  bandPath,
  formatNumber,
  linePath,
  niceTicks,
  palette,
  scaleLinear,
  spreadLabels,
  tickDigits,
} from '~/utils/chart'

const props = defineProps({
  // Accessible name, e.g. "Monthly mean air temperature…".
  title: String,
  // [{ label, values: [12 numbers], color, dashed, strong }]
  series: Array,
  // Optional shading: { lower: [12], upper: [12], color, opacity }
  band: Object,
  // Optional dashed line: { value, label }
  reference: Object,
  // Shown after the top tick, e.g. "°F".
  unit: { type: String, default: '' },
  height: { type: Number, default: 300 },
})

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const box = ref(null)
const width = useElementWidth(box)

// Room on the right for the series labels.
const m = computed(() => ({
  top: 12,
  right: width.value < 480 ? 72 : 96,
  bottom: 26,
  left: 44,
}))
const right = computed(() => width.value - m.value.right)
// Single-letter months when three letters wouldn't fit.
const narrow = computed(() => (right.value - m.value.left) / 11 < 32)

const y = computed(() => {
  const values = props.series.flatMap(s => s.values)
  if (props.band) values.push(...props.band.lower, ...props.band.upper)
  if (props.reference) values.push(props.reference.value)
  const finite = values.filter(Number.isFinite)
  return niceTicks(Math.min(...finite), Math.max(...finite), 6)
})

const xScale = computed(() => scaleLinear([0, 11], [m.value.left, right.value]))
const yScale = computed(() =>
  scaleLinear(
    [y.value.min, y.value.max],
    [props.height - m.value.bottom, m.value.top]
  )
)

function points(values) {
  return values.map((v, i) => [
    xScale.value(i),
    Number.isFinite(v) ? yScale.value(v) : null,
  ])
}

const endLabels = computed(() =>
  spreadLabels(
    props.series.map(s => ({
      text: s.label,
      strong: s.strong,
      y: yScale.value(s.values[11]),
    })),
    16,
    m.value.top,
    props.height - m.value.bottom
  )
)
</script>
