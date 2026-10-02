<template>
  <!--
    Depth against return period (log scale) for each model, with its 95%
    confidence interval shaded, and the 100-year event marked.
  -->
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
          }}{{ i === y.ticks.length - 1 ? ` ${unit}` : '' }}
        </text>
      </g>

      <line
        :x1="xScale(marker)"
        :x2="xScale(marker)"
        :y1="m.top"
        :y2="height - m.bottom"
        :stroke="palette.muted"
        stroke-dasharray="3 3"
      />
      <text :x="xScale(marker) + 5" :y="m.top + 10" :fill="palette.muted">
        {{ marker }}-yr ({{ formatNumber(100 / marker) }}% AEP)
      </text>

      <path
        v-for="s in series"
        :key="`band-${s.label}`"
        :d="bandPath(points(s.lower), points(s.upper))"
        :fill="s.band"
        fill-opacity="0.7"
      />
      <g v-for="s in series" :key="s.label">
        <path
          :d="linePath(points(s.values))"
          fill="none"
          :stroke="s.color"
          stroke-width="2"
        />
        <circle
          v-for="(point, i) in points(s.values)"
          :key="periods[i]"
          :cx="point[0]"
          :cy="point[1]"
          r="3.5"
          :fill="s.color"
          stroke="#fff"
          stroke-width="1.5"
        />
      </g>

      <text
        v-for="label in endLabels"
        :key="label.text"
        :x="right + 10"
        :y="label.y"
        dominant-baseline="middle"
        :fill="palette.ink"
        font-weight="600"
      >
        {{ label.text }}
      </text>

      <text
        v-for="period in periods"
        :key="`x-${period}`"
        :x="xScale(period)"
        :y="height - m.bottom + 16"
        text-anchor="middle"
        :fill="palette.muted"
      >
        {{ period }}
      </text>
      <text
        :x="(m.left + right) / 2"
        :y="height - 4"
        text-anchor="middle"
        :fill="palette.muted"
      >
        Return period, years (log scale)
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
  scaleLog,
  spreadLabels,
  tickDigits,
} from '~/utils/chart'

const props = defineProps({
  title: String,
  // Return periods in years, ascending.
  periods: Array,
  // [{ label, values, lower, upper, color, band }], one value per period.
  series: Array,
  // Depth unit, e.g. "in".
  unit: String,
  // Return period to mark with a dashed line.
  marker: { type: Number, default: 100 },
  height: { type: Number, default: 340 },
})

const box = ref(null)
const width = useElementWidth(box)

const m = computed(() => ({
  top: 8,
  right: width.value < 480 ? 104 : 150,
  bottom: 40,
  left: 52,
}))
const right = computed(() => width.value - m.value.right)

const y = computed(() => {
  const values = props.series.flatMap(s => [...s.upper, ...s.values])
  return niceTicks(0, Math.max(...values), 6)
})

const xScale = computed(() =>
  scaleLog(
    [props.periods[0], props.periods[props.periods.length - 1]],
    [m.value.left, right.value]
  )
)
const yScale = computed(() =>
  scaleLinear(
    [y.value.min, y.value.max],
    [props.height - m.value.bottom, m.value.top]
  )
)

function points(values) {
  return values.map((v, i) => [xScale.value(props.periods[i]), yScale.value(v)])
}

const endLabels = computed(() =>
  spreadLabels(
    props.series.map(s => {
      const last = s.values[s.values.length - 1]
      return {
        text: `${s.label} ${formatNumber(last, 1)} ${props.unit}`,
        y: yScale.value(last),
      }
    }),
    16,
    m.value.top,
    props.height - m.value.bottom
  )
)
</script>
