// Helpers for the AZCOT cold-season data, which covers October to March.

// The season's months in order, with their API keys. February has 28 days
// because the climatology leaves out February 29.
export const seasonMonths = [
  { key: 'oct', label: 'Oct', name: 'October', days: 31 },
  { key: 'nov', label: 'Nov', name: 'November', days: 30 },
  { key: 'dec', label: 'Dec', name: 'December', days: 31 },
  { key: 'jan', label: 'Jan', name: 'January', days: 31 },
  { key: 'feb', label: 'Feb', name: 'February', days: 28 },
  { key: 'mar', label: 'Mar', name: 'March', days: 31 },
]

// The daily keys, oct_01 to mar_31 (182 days).
export const seasonDays = seasonMonths.flatMap(month =>
  Array.from(
    { length: month.days },
    (_, i) => `${month.key}_${String(i + 1).padStart(2, '0')}`
  )
)

// A daily object ({ oct_01: value, ... }) as an array in season order.
export function dailyValues(daily) {
  return seasonDays.map(day => daily?.[day] ?? null)
}

// Unit symbols for the API's unit names.
const unitSymbols = {
  degF: '°F',
  knots: 'kn',
  kn: 'kn',
  inches: 'in',
  in: 'in',
  'lbf/ft2': 'lb/ft²',
  '% of hours': '%',
  '% of years': '% of years',
  minutes: 'min',
  days: 'days',
}

export function unitSymbol(units) {
  return unitSymbols[units] ?? units
}
