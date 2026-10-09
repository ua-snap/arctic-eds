// Downloads a report chart as SVG or JPEG. The file carries the chart's title
// above it, its legend when the page draws one outside the SVG, and a source
// line below, so it still makes sense once it's pasted into another document.

import { palette } from '~/utils/chart'

const FONT = "'IBM Plex Sans', Helvetica, Arial, sans-serif"
const SVG_NS = 'http://www.w3.org/2000/svg'
const PAD = 24
const TITLE_SIZE = 15
const TITLE_LINE = 20

function el(name, attrs = {}, text) {
  const node = document.createElementNS(SVG_NS, name)
  for (const [key, value] of Object.entries(attrs)) {
    node.setAttribute(key, value)
  }
  if (text != null) node.textContent = text
  return node
}

// Breaks text into lines no wider than `width` in the given CSS font.
function wrap(text, width, font) {
  const context = document.createElement('canvas').getContext('2d')
  context.font = font
  const lines = []
  let line = ''
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word
    if (line && context.measureText(next).width > width) {
      lines.push(line)
      line = word
    } else {
      line = next
    }
  }
  if (line) lines.push(line)
  return lines
}

// Places legend items left to right, starting a new row when one would run
// past `width`. Returns [{ label, color, x, row }].
function layoutLegend(legend, width) {
  const context = document.createElement('canvas').getContext('2d')
  context.font = `12px ${FONT}`
  let x = 0
  let row = 0
  return legend.map(item => {
    const itemWidth = 18 + context.measureText(item.label).width
    if (x > 0 && x + itemWidth > width) {
      x = 0
      row += 1
    }
    const placed = { ...item, x, row }
    x += itemWidth + 20
    return placed
  })
}

// Builds a standalone SVG: white background, title, optional legend, the
// chart, and a source line. `legend` is [{ label, color }].
function compose(svg, { title, source, legend = [] }) {
  const width = Number(svg.getAttribute('width'))
  const height = Number(svg.getAttribute('height'))
  // Some labels sit outside the viewBox (the page lets them overflow), so
  // frame the chart by what it actually draws.
  const box = svg.getBBox()
  const x0 = Math.min(0, Math.floor(box.x))
  const y0 = Math.min(0, Math.floor(box.y))
  const chartWidth = Math.max(width, Math.ceil(box.x + box.width)) - x0
  const chartHeight = Math.max(height, Math.ceil(box.y + box.height)) - y0

  const fullWidth = chartWidth + 2 * PAD
  const lines = wrap(title, chartWidth, `600 ${TITLE_SIZE}px ${FONT}`)
  const legendTop = PAD + lines.length * TITLE_LINE + 6
  const legendItems = layoutLegend(legend, chartWidth)
  const legendRows = legendItems.length
    ? legendItems[legendItems.length - 1].row + 1
    : 0
  const chartTop = legendTop + (legendRows ? legendRows * 22 + 6 : 6)
  const sourceLines = wrap(source, chartWidth, `11px ${FONT}`)
  const sourceTop = chartTop + chartHeight + 20
  const fullHeight = sourceTop + (sourceLines.length - 1) * 15 + PAD

  const out = el('svg', {
    xmlns: SVG_NS,
    width: fullWidth,
    height: fullHeight,
    viewBox: `0 0 ${fullWidth} ${fullHeight}`,
    'font-family': FONT,
    'font-size': 12,
  })
  out.append(el('rect', { width: '100%', height: '100%', fill: '#fff' }))

  const heading = el('text', {
    x: PAD,
    y: PAD + TITLE_SIZE - 3,
    'font-size': TITLE_SIZE,
    'font-weight': 600,
    fill: palette.ink,
  })
  lines.forEach((text, i) => {
    heading.append(el('tspan', { x: PAD, dy: i ? TITLE_LINE : 0 }, text))
  })
  out.append(heading)

  for (const item of legendItems) {
    const y = legendTop + item.row * 22
    out.append(
      el('rect', {
        x: PAD + item.x,
        y: y + 4,
        width: 12,
        height: 12,
        rx: 2,
        fill: item.color,
      })
    )
    out.append(
      el(
        'text',
        { x: PAD + item.x + 18, y: y + 14, fill: palette.ink },
        item.label
      )
    )
  }

  const chart = el('g', {
    transform: `translate(${PAD - x0} ${chartTop - y0})`,
  })
  for (const child of svg.childNodes) {
    // Skip Vue's comment placeholders.
    if (child.nodeType === Node.ELEMENT_NODE) {
      chart.append(child.cloneNode(true))
    }
  }
  out.append(chart)

  const footer = el('text', {
    x: PAD,
    y: sourceTop,
    'font-size': 11,
    fill: palette.muted,
  })
  sourceLines.forEach((text, i) => {
    footer.append(el('tspan', { x: PAD, dy: i ? 15 : 0 }, text))
  })
  out.append(footer)
  return { node: out, width: fullWidth, height: fullHeight }
}

function save(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.append(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function downloadSvg(svg, filename, options) {
  const { node } = compose(svg, options)
  const text =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    new XMLSerializer().serializeToString(node)
  save(new Blob([text], { type: 'image/svg+xml' }), `${filename}.svg`)
}

// html-to-image renders the composed SVG to a canvas with the page's web
// fonts embedded, so the JPEG uses the same type as the page.
export async function downloadJpeg(svg, filename, options) {
  const { toJpeg } = await import('html-to-image')
  const { node, width, height } = compose(svg, options)
  // It needs the node in the document to read its styles.
  const holder = document.createElement('div')
  holder.style.cssText = 'position: fixed; left: -100000px; top: 0;'
  holder.append(node)
  document.body.append(holder)
  try {
    const url = await toJpeg(node, {
      width,
      height,
      pixelRatio: 2,
      quality: 0.92,
      backgroundColor: '#fff',
    })
    save(await (await fetch(url)).blob(), `${filename}.jpg`)
  } finally {
    holder.remove()
  }
}

// "Fairbanks, Alaska" + "Monthly mean air temperature…" →
// "fairbanks-alaska-monthly-mean-air-temperature…", kept short.
export function chartFilename(...parts) {
  return parts
    .join(' ')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
    .replace(/-$/, '')
}
