<template>
  <!--
    Lines and shaded ranges over a numeric x axis (years, days of the year),
    with optional shaded spans of x. Hovering reads out every value at the
    nearest x.
  -->
  <div ref="box">
    <svg
      ref="svgEl"
      :width="width"
      :height="height"
      :viewBox="`0 0 ${width} ${height}`"
      role="img"
      :aria-label="title"
      class="chart series-chart"
      @pointermove="onPointerMove"
      @pointerleave="hoverX = null"
    >
      <g v-for="span in spans" :key="span.label">
        <rect
          :x="xScale(span.from)"
          :y="m.top"
          :width="xScale(span.to) - xScale(span.from)"
          :height="height - m.top - m.bottom"
          :fill="palette.frozen"
        />
        <text
          v-if="fitsLabel(span)"
          :x="(xScale(span.from) + xScale(span.to)) / 2"
          :y="m.top + 12"
          text-anchor="middle"
          :fill="palette.muted"
          font-size="11"
        >
          {{ span.label }}
        </text>
      </g>

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
        v-for="(band, i) in bands"
        :key="`band-${i}`"
        :d="bandPath(points(band.lower), points(band.upper))"
        :fill="band.color"
        :fill-opacity="band.opacity ?? 1"
      />

      <path
        v-for="(s, i) in series"
        :key="`series-${i}`"
        :d="linePath(points(s.values))"
        fill="none"
        :stroke="s.color"
        :stroke-width="s.strong ? 2 : s.thin ? 1 : 1.5"
        :stroke-dasharray="s.dashed ? '5 3' : null"
        stroke-linejoin="round"
      />

      <text
        v-for="tick in xTickList"
        :key="`x-${tick.value}`"
        :x="xScale(tick.value)"
        :y="height - 6"
        text-anchor="middle"
        :fill="palette.muted"
      >
        {{ narrow ? tick.label[0] : tick.label }}
      </text>

      <g v-if="readout" pointer-events="none">
        <line
          :x1="xScale(readout.x)"
          :x2="xScale(readout.x)"
          :y1="m.top"
          :y2="height - m.bottom"
          :stroke="palette.axis"
        />
        <circle
          v-for="(dot, i) in readout.dots"
          :key="i"
          :cx="xScale(readout.x)"
          :cy="yScale(dot.value)"
          r="3.5"
          :fill="dot.color"
          stroke="#fff"
          stroke-width="1.5"
        />
        <rect
          :x="readout.boxX"
          :y="m.top"
          :width="readout.boxWidth"
          :height="readout.lines.length * 16 + 10"
          rx="4"
          fill="#fff"
          :stroke="palette.axis"
        />
        <text
          v-for="(line, i) in readout.lines"
          :key="i"
          :x="readout.boxX + 8"
          :y="m.top + 17 + i * 16"
          :fill="palette.ink"
          :font-weight="i === 0 ? 600 : 400"
        >
          {{ line }}
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

const props = defineProps({
  // Accessible name, also written above a downloaded chart.
  title: String,
  // [{ label, values: [y per x, from xDomain[0]], color, strong, thin,
  // dashed }]. Missing values (null, undefined, NaN) break the line.
  series: Array,
  // Shaded ranges: [{ label, lower: [y per x], upper: [y per x], color,
  // opacity }].
  bands: { type: Array, default: () => [] },
  // Shaded spans of x, e.g. eras: [{ from, to, label }].
  spans: { type: Array, default: () => [] },
  // First and last x; values[i] is at x = xDomain[0] + i.
  xDomain: Array,
  // Labeled x positions: [{ value, label }]. Defaults to round numbers.
  xTicks: Array,
  // Formats an x for the hover readout, e.g. "Water year 2050".
  xFormat: { type: Function, default: x => String(x) },
  // Decimals in the hover readout.
  digits: { type: Number, default: 0 },
  // Shown after the top tick and in the readout, e.g. "in".
  unit: { type: String, default: '' },
  // Optional fixed y domain [min, max], so the axis holds still while
  // controls swap the data.
  domain: Array,
  // [{ label, color }] for the downloaded chart, matching the page legend.
  legend: { type: Array, default: () => [] },
  height: { type: Number, default: 300 },
})

const box = ref(null)
const svgEl = ref(null)
const width = useElementWidth(box)

const m = computed(() => ({ top: 12, right: 16, bottom: 26, left: 48 }))
const right = computed(() => width.value - m.value.right)

const y = computed(() => {
  if (props.domain) return niceTicks(...props.domain, 6)
  const values = props.series.flatMap(s => s.values)
  props.bands.forEach(b => values.push(...b.lower, ...b.upper))
  const finite = values.filter(Number.isFinite)
  return niceTicks(Math.min(...finite), Math.max(...finite), 6)
})

const xScale = computed(() =>
  scaleLinear().domain(props.xDomain).range([m.value.left, right.value])
)
const yScale = computed(() =>
  scaleLinear()
    .domain([y.value.min, y.value.max])
    .range([props.height - m.value.bottom, m.value.top])
)

const xTickList = computed(() => {
  if (props.xTicks) return props.xTicks
  const count = Math.max(2, Math.floor((right.value - m.value.left) / 70))
  return xScale.value
    .ticks(count)
    .map(value => ({ value, label: String(value) }))
})

// A span's label is left off when it's wider than the span. Labels are about
// 6 px a character at 11 px.
function fitsLabel(span) {
  return (
    xScale.value(span.to) - xScale.value(span.from) > span.label.length * 6 + 4
  )
}

// First letters only when given labels (e.g. months) would crowd.
const narrow = computed(
  () => props.xTicks && (right.value - m.value.left) / props.xTicks.length < 32
)

function points(values) {
  const x0 = props.xDomain[0]
  return values.map((v, i) => [
    xScale.value(x0 + i),
    Number.isFinite(v) ? yScale.value(v) : null,
  ])
}

// The x under the pointer, snapped to a whole step.
const hoverX = ref(null)
function onPointerMove(event) {
  const rect = svgEl.value.getBoundingClientRect()
  const x = Math.round(xScale.value.invert(event.clientX - rect.left))
  const [lo, hi] = props.xDomain
  hoverX.value = x < lo || x > hi ? null : x
}

const readout = computed(() => {
  if (hoverX.value == null) return null
  const i = hoverX.value - props.xDomain[0]
  const fmt = v =>
    formatNumber(v, props.digits) + (props.unit ? ` ${props.unit}` : '')
  const dots = []
  const lines = [props.xFormat(hoverX.value)]
  for (const s of props.series) {
    const value = s.values[i]
    if (!Number.isFinite(value)) continue
    dots.push({ label: s.label, value, color: s.color })
    lines.push(`${s.label}: ${fmt(value)}`)
  }
  for (const b of props.bands) {
    const [lo, hi] = [b.lower[i], b.upper[i]]
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) continue
    lines.push(`${b.label}: ${fmt(lo)} to ${fmt(hi)}`)
  }
  if (lines.length == 1) return null
  // Readout text is about 6.5 px a character at the chart's 12 px.
  const boxWidth = Math.max(...lines.map(l => l.length)) * 6.5 + 16
  const px = xScale.value(hoverX.value)
  const boxX =
    px + 12 + boxWidth < right.value
      ? px + 12
      : Math.max(m.value.left, px - 12 - boxWidth)
  return { x: hoverX.value, dots, lines, boxX, boxWidth }
})
</script>

<style lang="scss" scoped>
.series-chart {
  touch-action: pan-y;
}
</style>
