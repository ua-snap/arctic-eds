<template>
  <!--
    Mean annual ground temperature by depth, one line per era, with the
    below-freezing side shaded.
  -->
  <div ref="box">
    <ul class="chart-legend">
      <li v-for="s in series" :key="s.label">
        <span class="swatch" :style="{ background: s.color }"></span>
        {{ s.label }}
      </li>
    </ul>
    <svg
      :width="width"
      :height="height"
      :viewBox="`0 0 ${width} ${height}`"
      role="img"
      :aria-label="title"
      class="chart"
    >
      <rect
        :x="m.left"
        :y="m.top"
        :width="Math.max(0, xScale(freezing) - m.left)"
        :height="plotBottom - m.top"
        :fill="palette.frozen"
      />
      <text
        :x="m.left + 8"
        :y="plotBottom - 10"
        :fill="palette.cool"
        font-weight="600"
      >
        Frozen
      </text>

      <g v-for="tick in x.ticks" :key="tick">
        <line
          :x1="xScale(tick)"
          :x2="xScale(tick)"
          :y1="m.top"
          :y2="plotBottom"
          :stroke="palette.grid"
        />
        <text
          :x="xScale(tick)"
          :y="m.top - 10"
          text-anchor="middle"
          :fill="palette.muted"
        >
          {{ formatNumber(tick, tickDigits(x.ticks)) }}{{ unit }}
        </text>
      </g>
      <g v-for="d in depths" :key="d.key">
        <line
          v-if="d.label"
          :x1="m.left"
          :x2="right"
          :y1="yScale(d.depth)"
          :y2="yScale(d.depth)"
          :stroke="palette.grid"
        />
        <text
          v-if="d.label"
          :x="m.left - 10"
          :y="yScale(d.depth)"
          text-anchor="end"
          dominant-baseline="middle"
          :fill="palette.muted"
        >
          {{ d.label }}
        </text>
      </g>
      <rect
        :x="m.left"
        :y="m.top"
        :width="right - m.left"
        :height="plotBottom - m.top"
        fill="none"
        :stroke="palette.axis"
      />

      <line
        :x1="xScale(freezing)"
        :x2="xScale(freezing)"
        :y1="m.top"
        :y2="plotBottom"
        :stroke="palette.ink"
        stroke-dasharray="3 3"
      />

      <g v-for="s in series" :key="s.label">
        <path
          :d="linePath(points(s.values))"
          fill="none"
          :stroke="s.color"
          stroke-width="2"
          stroke-linejoin="round"
        />
        <circle
          v-for="(point, i) in points(s.values)"
          :key="depths[i].key"
          :cx="point[0]"
          :cy="point[1]"
          r="3.5"
          :fill="s.color"
          stroke="#fff"
          stroke-width="1.5"
        />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  formatNumber,
  linePath,
  niceTicks,
  palette,
  scaleLinear,
  tickDigits,
} from '~/utils/chart'

const props = defineProps({
  title: String,
  // [{ key, depth (m), label }]; rows without a label get no gridline.
  depths: Array,
  // [{ label, color, values }], one value per depth.
  series: Array,
  // The freezing point in the current units.
  freezing: Number,
  // e.g. "°F"
  unit: String,
  height: { type: Number, default: 380 },
})

const box = ref(null)
const width = useElementWidth(box)

const m = { top: 30, right: 16, bottom: 8, left: 64 }
const right = computed(() => width.value - m.right)
const plotBottom = computed(() => props.height - m.bottom)

const x = computed(() => {
  const values = props.series.flatMap(s => s.values).filter(Number.isFinite)
  const lo = Math.min(...values, props.freezing)
  const hi = Math.max(...values, props.freezing)
  // Leave a little room so the points don't sit on the frame.
  const pad = (hi - lo) * 0.08
  return niceTicks(lo - pad, hi + pad, width.value < 480 ? 3 : 4)
})
const maxDepth = computed(() => Math.max(...props.depths.map(d => d.depth)))

const xScale = computed(() =>
  scaleLinear([x.value.min, x.value.max], [m.left, right.value])
)
const yScale = computed(() =>
  scaleLinear([0, maxDepth.value], [m.top, plotBottom.value])
)

function points(values) {
  return values.map((v, i) => [
    Number.isFinite(v) ? xScale.value(v) : null,
    yScale.value(props.depths[i].depth),
  ])
}
</script>
