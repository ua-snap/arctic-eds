<template>
  <!--
    One row per period: a bar from the lowest to the highest value, a dot at
    the mean, and the mean written out. A dashed line marks the first row's
    mean (the baseline) through every row.
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
      <line
        v-for="tick in x.ticks"
        :key="tick"
        :x1="xScale(tick)"
        :x2="xScale(tick)"
        :y1="top"
        :y2="axisY - 4"
        :stroke="palette.grid"
      />
      <line
        :x1="xScale(rows[0].mean)"
        :x2="xScale(rows[0].mean)"
        :y1="top"
        :y2="axisY - 4"
        :stroke="palette.muted"
        stroke-dasharray="3 3"
      />

      <g v-for="(row, i) in rows" :key="row.label">
        <text
          :x="labelWidth - 12"
          :y="rowY(i)"
          text-anchor="end"
          dominant-baseline="middle"
          :fill="i === 0 ? palette.muted : palette.ink"
        >
          {{ row.label }}
        </text>
        <line
          :x1="xScale(row.min)"
          :x2="xScale(row.max)"
          :y1="rowY(i)"
          :y2="rowY(i)"
          :stroke="colors(i).bar"
          stroke-width="6"
          stroke-linecap="round"
        />
        <circle
          :cx="xScale(row.mean)"
          :cy="rowY(i)"
          r="5"
          :fill="colors(i).dot"
          stroke="#fff"
          stroke-width="1.5"
        />
        <text
          :x="xScale(row.max) + 10"
          :y="rowY(i)"
          dominant-baseline="middle"
          :fill="palette.ink"
        >
          {{ row.valueLabel }}
        </text>
      </g>

      <text
        v-for="tick in x.ticks"
        :key="`label-${tick}`"
        :x="xScale(tick)"
        :y="axisY + 10"
        text-anchor="middle"
        :fill="palette.muted"
      >
        {{ formatNumber(tick, tickDigits(x.ticks)) }}
      </text>
    </svg>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  formatNumber,
  niceTicks,
  palette,
  scaleLinear,
  tickDigits,
} from '~/utils/chart'

const props = defineProps({
  // Accessible name for the chart.
  title: String,
  // [{ label, min, mean, max, valueLabel }]; the first row is the baseline.
  rows: Array,
  // Optional shared x domain [min, max], e.g. to line up several plots.
  domain: Array,
})

const box = ref(null)
const width = useElementWidth(box)

const rowHeight = 26
const top = 4
const labelWidth = computed(() => (width.value < 480 ? 104 : 136))
// Room for the longest value label to the right of the highest bar.
const rightMargin = computed(() => (width.value < 480 ? 96 : 120))
const axisY = computed(() => top + props.rows.length * rowHeight + 4)
const height = computed(() => axisY.value + 18)

const x = computed(() => {
  const [lo, hi] = props.domain ?? [
    Math.min(0, ...props.rows.map(r => r.min)),
    Math.max(...props.rows.map(r => r.max)),
  ]
  return niceTicks(lo, hi, width.value < 480 ? 3 : 4)
})
const xScale = computed(() =>
  scaleLinear(
    [x.value.min, x.value.max],
    [labelWidth.value, width.value - rightMargin.value]
  )
)

function rowY(i) {
  return top + rowHeight * i + rowHeight / 2
}

function colors(i) {
  return palette.eras[Math.min(i, palette.eras.length - 1)]
}
</script>
