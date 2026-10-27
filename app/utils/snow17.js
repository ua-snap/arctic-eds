// Helpers for the experimental Snow-17 section: the API's scenarios, eras and
// model parameters, statistics across models, and the daily output reduced to
// a typical water year.

export const scenarios = [
  { value: 'ssp126', label: 'SSP1-2.6' },
  { value: 'ssp245', label: 'SSP2-4.5' },
  { value: 'ssp370', label: 'SSP3-7.0' },
  { value: 'ssp585', label: 'SSP5-8.5' },
]

export function scenarioLabel(value) {
  return scenarios.find(s => s.value == value)?.label ?? value
}

// Design load eras, as the API names them: the historical run's, then the
// two future eras of every scenario run. Inclusive ranges of water years.
export const baselineEra = { key: '1966-2014', start: 1966, end: 2014 }
export const futureEras = [
  { key: '2040-2069', start: 2040, end: 2069 },
  { key: '2070-2099', start: 2070, end: 2099 },
]

// Snow-17 forced by the averaged forcing of seven models. It isn't one more
// model, so it's left out of the medians and ranges across models.
export const averageModel = '7ModelAvg'

export function modelLabel(model) {
  return model == averageModel ? '7-model average forcing' : model
}

// The API's Snow-17 parameters and defaults, with the limits it enforces.
export const parameters = [
  {
    name: 'scf',
    default: 1.0,
    step: 0.05,
    min: 0,
    label: 'Snow correction factor',
    note: 'Gauge under-catch correction for snowfall',
  },
  {
    name: 'mfmax',
    default: 1.05,
    step: 0.05,
    min: 0.01,
    label: 'Max melt factor',
    note: 'June 21, mm/°C/6 hr',
  },
  {
    name: 'mfmin',
    default: 0.6,
    step: 0.05,
    min: 0.01,
    label: 'Min melt factor',
    note: 'December 21, mm/°C/6 hr',
  },
  {
    name: 'mbase',
    default: 1.0,
    step: 0.1,
    min: 0,
    label: 'Melt base temperature',
    note: '°C',
  },
  {
    name: 'pxtemp1',
    default: -1.0,
    step: 0.5,
    label: 'All snow at or below',
    note: '°C, linear rain/snow transition',
  },
  {
    name: 'pxtemp2',
    default: 3.0,
    step: 0.5,
    label: 'All rain at or above',
    note: '°C, linear rain/snow transition',
  },
  {
    name: 'uadj',
    default: 0.04,
    step: 0.01,
    min: 0,
    label: 'Rain-on-snow wind function',
    note: 'mm/mb',
  },
  {
    name: 'tipm',
    default: 0.1,
    step: 0.05,
    min: 0.01,
    max: 0.99,
    label: 'Antecedent temperature index',
    note: 'Between 0 and 1',
  },
  {
    name: 'nmf',
    default: 0.15,
    step: 0.05,
    min: 0,
    label: 'Max negative melt factor',
    note: 'mm/°C/6 hr',
  },
  {
    name: 'plwhc',
    default: 0.04,
    step: 0.01,
    min: 0,
    max: 0.4,
    label: 'Liquid water holding capacity',
    note: 'Fraction, up to 0.4',
  },
]

// The query string for a run: the summary, plus only the settings that
// differ from the API's defaults, so a default run's URL stays short.
export function runQuery(settings, extra = {}) {
  const query = new URLSearchParams(extra)
  for (const p of parameters) {
    const value = settings[p.name]
    if (Number.isFinite(value) && value !== p.default) {
      query.set(p.name, value)
    }
  }
  if (Number.isFinite(settings.elevation)) {
    query.set('elevation', settings.elevation)
  }
  return query.toString()
}

export function defaultSettings() {
  return {
    ...Object.fromEntries(parameters.map(p => [p.name, p.default])),
    elevation: undefined,
  }
}

// Quantile of a sorted array, interpolating between ranks.
export function quantile(sorted, p) {
  if (!sorted.length) return undefined
  const i = (sorted.length - 1) * p
  const lo = Math.floor(i)
  const hi = Math.ceil(i)
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (i - lo)
}

// Min, median and max of the finite values, or undefined if there are none.
export function spread(values) {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b)
  if (!sorted.length) return undefined
  return {
    min: sorted[0],
    median: quantile(sorted, 0.5),
    max: sorted[sorted.length - 1],
    n: sorted.length,
  }
}

// Day of the water year (0 = October 1) for a no-leap calendar date, which
// is what the CMIP6 downscaled data use. February 29 has no slot.
const monthStarts = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
function waterDay(month, day) {
  return (monthStarts[month - 1] + day - 1 - 273 + 365) % 365
}

// First day of each month in the water year, for the seasonal chart's axis.
export const waterYearMonths = [
  'Oct',
  'Nov',
  'Dec',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
].map((label, i) => ({ value: waterDay(((i + 9) % 12) + 1, 1), label }))

export function formatWaterDay(index) {
  const month = [...waterYearMonths].reverse().find(m => m.value <= index)
  return `${month.label} ${index - month.value + 1}`
}

// Reduces daily output ({ "YYYY-MM-DD": { swe } }) to the median and middle
// half of SWE on each day of the water year, across the complete water years
// of each era. Returns { [era.key]: { median, lower, upper, years } }, each a
// 365-day array, for the eras the output fully covers.
export function seasonalSwe(daily, eras) {
  const years = {}
  for (const [date, values] of Object.entries(daily)) {
    const year = +date.slice(0, 4)
    const month = +date.slice(5, 7)
    const day = +date.slice(8, 10)
    if (month == 2 && day == 29) continue
    const waterYear = year + (month >= 10 ? 1 : 0)
    years[waterYear] ??= new Array(365)
    years[waterYear][waterDay(month, day)] = values.swe
  }
  const complete = year => years[year]?.filter(Number.isFinite).length === 365

  const out = {}
  for (const era of eras) {
    const eraYears = []
    for (let y = era.start; y <= era.end; y++) eraYears.push(y)
    if (!eraYears.every(complete)) continue
    const median = []
    const lower = []
    const upper = []
    for (let d = 0; d < 365; d++) {
      const sorted = eraYears.map(y => years[y][d]).sort((a, b) => a - b)
      median.push(quantile(sorted, 0.5))
      lower.push(quantile(sorted, 0.25))
      upper.push(quantile(sorted, 0.75))
    }
    out[era.key] = { median, lower, upper, years: eraYears.length }
  }
  return out
}

function csv(rows) {
  return rows
    .map(row =>
      row
        .map(cell => {
          const text = cell ?? ''
          return /[",\n]/.test(text)
            ? `"${String(text).replace(/"/g, '""')}"`
            : text
        })
        .join(',')
    )
    .join('\n')
}

// Every water year summary in the annual output, one row per model,
// scenario and year.
export function annualCsv(data, comments) {
  const rows = [
    [
      'model',
      'scenario',
      'water_year',
      'peak_swe_mm',
      'peak_swe_date',
      'snow_days',
      'total_outflow_mm',
    ],
  ]
  for (const [model, byScenario] of Object.entries(data)) {
    for (const [scenario, byYear] of Object.entries(byScenario)) {
      for (const [year, v] of Object.entries(byYear)) {
        rows.push([
          model,
          scenario,
          year,
          v.peak_swe,
          v.peak_swe_date,
          v.snow_days,
          v.total_outflow,
        ])
      }
    }
  }
  return comments.map(c => `# ${c}`).join('\n') + '\n' + csv(rows) + '\n'
}

// Every design load in the design output, one row per model, scenario and era.
export function designCsv(data, comments) {
  const rows = [
    [
      'model',
      'scenario',
      'era',
      'n_years',
      'n_snow_free_years',
      'mean_peak_swe_mm',
      'swe_50yr_mm',
      'load_50yr_kpa',
      'load_50yr_psf',
      'gev_location',
      'gev_scale',
      'gev_shape',
    ],
  ]
  for (const [model, byScenario] of Object.entries(data)) {
    for (const [scenario, byEra] of Object.entries(byScenario)) {
      for (const [era, v] of Object.entries(byEra)) {
        rows.push([
          model,
          scenario,
          era,
          v.n_years,
          v.n_snow_free_years,
          v.mean_peak_swe_mm,
          v.swe_mm,
          v.load_kpa,
          v.load_psf,
          v.gev?.location,
          v.gev?.scale,
          v.gev?.shape,
        ])
      }
    }
  }
  return comments.map(c => `# ${c}`).join('\n') + '\n' + csv(rows) + '\n'
}
