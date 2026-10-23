// Helpers for the report's SVG charts: D3 for scales, ticks and paths, plus
// formatting and label layout.

import { scaleLinear } from 'd3-scale'
import { area, line } from 'd3-shape'

// Chart colors. Text uses the site's text greys. Lines and dots that carry
// data are at least 3:1 against white; bars and bands behind them are
// lighter, and every value is also labeled or tabled.
export const palette = {
  ink: '#312e30',
  muted: '#6b6866',
  grid: '#ebe8e3',
  axis: '#cfcac2',
  historical: '#7b7773',
  warm: '#c0502a',
  warmBand: '#f6e1d6',
  cool: '#2f6aa6',
  coolBand: '#dce7f3',
  frozen: '#edf2f7',
  // Baseline, then three future eras, light to dark.
  eras: [
    { bar: '#d6d3cf', dot: '#858180' },
    { bar: '#c8daec', dot: '#5b97cc' },
    { bar: '#a9c0da', dot: '#2f6aa6' },
    { bar: '#9aabc1', dot: '#1b3f6b' },
  ],
}

// Round ticks covering [min, max] in about `count` steps, from D3's nice
// scale. Returns the widened domain and its ticks.
export function niceTicks(min, max, count = 5) {
  if (min === max) {
    min -= 1
    max += 1
  }
  const scale = scaleLinear().domain([min, max]).nice(count)
  const [lo, hi] = scale.domain()
  return { min: lo, max: hi, ticks: scale.ticks(count) }
}

// How many decimals tick labels need, e.g. 1 for 0, 0.2, 0.4….
export function tickDigits(ticks) {
  return Math.min(
    2,
    Math.max(...ticks.map(t => (String(t).split('.')[1] || '').length))
  )
}

// Spreads labels placed at `y` so none sit closer than `gap`, keeping them
// inside [top, bottom]. Takes and returns [{ y, ... }], in the given order.
export function spreadLabels(labels, gap, top, bottom) {
  const order = labels
    .map((l, i) => i)
    .sort((a, b) => labels[a].y - labels[b].y)
  const ys = order.map(i => labels[i].y)
  for (let i = 1; i < ys.length; i++) {
    ys[i] = Math.max(ys[i], ys[i - 1] + gap)
  }
  const overflow = ys.length ? ys[ys.length - 1] - bottom : 0
  if (overflow > 0) {
    for (let i = ys.length - 1; i >= 0; i--) {
      ys[i] -= overflow
      if (i > 0) ys[i - 1] = Math.min(ys[i - 1], ys[i] - gap)
    }
  }
  const out = labels.map(l => ({ ...l }))
  order.forEach((labelIndex, i) => {
    out[labelIndex].y = Math.max(ys[i], top)
  })
  return out
}

// Numbers for display: thousands separators, a real minus sign.
export function formatNumber(value, digits = 0) {
  return value
    .toLocaleString('en-US', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    })
    .replace('-', '−')
}

// A change with its sign, e.g. +6 or −13.
export function formatSigned(value, digits = 0) {
  const rounded = Number(value.toFixed(digits))
  const text = formatNumber(Math.abs(rounded), digits)
  if (rounded > 0) return '+' + text
  if (rounded < 0) return '−' + text
  return text
}

// Percent change from `past` to `future`, e.g. −13%.
export function formatPercentChange(past, future) {
  return formatSigned(((future - past) / past) * 100) + '%'
}

const defined = ([x, y]) => x != null && y != null && !Number.isNaN(y)

// Draws an SVG path through [x, y] points, skipping missing values.
export function linePath(points) {
  return line().defined(defined).digits(1)(points) ?? ''
}

// A filled band between a lower and an upper line, point for point.
export function bandPath(lower, upper) {
  return (
    area()
      .defined((p, i) => defined(p) && defined(upper[i]))
      .x(p => p[0])
      .y0(p => p[1])
      .y1((p, i) => upper[i][1])
      .digits(1)(lower) ?? ''
  )
}
