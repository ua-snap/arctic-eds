// Small helpers for the report's hand-drawn SVG charts.

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

// Maps a value in [d0, d1] onto [r0, r1].
export function scaleLinear([d0, d1], [r0, r1]) {
  return v => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0)
}

// Same, on a log scale.
export function scaleLog([d0, d1], [r0, r1]) {
  const l0 = Math.log(d0)
  const l1 = Math.log(d1)
  return v => r0 + ((Math.log(v) - l0) / (l1 - l0)) * (r1 - r0)
}

// Round tick steps (1, 2, 2.5 or 5 × a power of ten) covering [min, max] in
// about `count` steps. Returns the widened domain and its ticks.
export function niceTicks(min, max, count = 5) {
  if (min === max) {
    min -= 1
    max += 1
  }
  const raw = (max - min) / count
  const power = 10 ** Math.floor(Math.log10(raw))
  const step =
    [1, 2, 2.5, 5, 10].map(m => m * power).find(s => s >= raw) ?? 10 * power
  const lo = Math.floor(min / step) * step
  const hi = Math.ceil(max / step) * step
  const ticks = []
  for (let t = lo; t <= hi + step / 2; t += step) {
    // Avoid 0.30000000000000004 and -0.
    ticks.push(Number(t.toFixed(10)) + 0)
  }
  return { min: lo, max: hi, ticks }
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

// Draws an SVG path through points, skipping missing values.
export function linePath(points) {
  let d = ''
  let pen = false
  for (const [x, y] of points) {
    if (x == null || y == null || Number.isNaN(y)) {
      pen = false
      continue
    }
    d += (pen ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1)
    pen = true
  }
  return d
}

// A filled band between a lower and an upper line.
export function bandPath(lower, upper) {
  return (
    linePath(upper) +
    'L' +
    [...lower]
      .reverse()
      .map(([x, y]) => x.toFixed(1) + ' ' + y.toFixed(1))
      .join('L') +
    'Z'
  )
}
