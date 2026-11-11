// Wording for the report's cold-weather section. The AZCOT API supplies the
// numbers, ids and units; the text people read lives here so it can be
// written for this audience (and, later, for others) without API changes.

// What each verdict means. Any verdict not listed falls back to the API's
// legend text.
export const verdictDefinitions = {
  OK: 'The 30-year record never reaches the limit in that month.',
  CAUTION:
    'The limit is reached, but in no more than 1% of the month’s hours (no more than 10% of years for single-storm snowfall loads).',
  NO: 'The limit is reached in more than 1% of the month’s hours (more than 10% of years for single-storm snowfall loads).',
}

// The design checks, renamed for general engineering. The API's item names
// and categories come from Army field guidance; these are keyed by item id
// and category, and any not listed fall back to the API's wording.
export const limitCategories = {
  'Vehicles in snow': 'Site access in snow',
  Shelter: 'Temporary structures',
}

export const limitItems = {
  T3a: 'Two-wheel-drive vehicle',
  T3b: 'Four-wheel-drive vehicle',
  T3c: 'Four-wheel-drive vehicle with chains',
  T3d: 'Tracked vehicle',
  T3e: 'Snow machine or other over-snow vehicle',
  SLa: 'Tents and light portable structures',
  SLb: 'Temporary rigid structures',
  SLc: 'Occupied temporary structures',
  SLd: 'Relocatable (demountable) buildings',
  WNa: 'Occupied temporary structures',
}

export const limitsNote =
  'Each check compares a rated limit with 30 years of hourly data (1991–2020) for this grid cell: the snow depth a vehicle can drive through, and the snow and wind loads that temporary structures are rated for. These are field ratings, not building-code loads; use them to judge how demanding the site is for access and temporary works.'

export const designColdNote =
  'The 1% design temperature is the temperature that the coldest 1% of a month’s hours fall below, about 7 hours in a typical January. It is a monthly value, so it is usually colder than the annual heating design temperatures published by ASHRAE (99.6% and 99% of the year’s hours); use those for sizing heating systems where a nearby station is listed, and this value for equipment and materials that must work through the coldest month.'

export const freezeThawNote =
  'A freeze–thaw day has hours both below and above 32°F. Freeze–thaw cycling drives frost damage in pavements, concrete and masonry, and is most frequent in the shoulder months.'

// The daily-climate variables: a short name for the menu, a title for the
// chart and table, and a note under the chart.
export const dailyVariables = [
  {
    value: 'air_temperature',
    label: 'Air temperature',
    title: 'Air temperature',
    note: 'Air temperature 2 m above the ground.',
  },
  {
    value: 'wind_chill',
    label: 'Wind chill',
    title: 'Wind chill',
    note: 'Wind chill here was computed from ground-surface temperature rather than air temperature, so it runs colder than standard wind chill: about 3.5°F colder over land in January.',
  },
  {
    value: 'wind_speed',
    label: 'Wind speed',
    title: 'Wind speed, hourly mean at 10 m',
    note: 'Hourly mean wind 10 m above the ground; gusts are not included.',
  },
  {
    value: 'snow_depth',
    label: 'Snow depth',
    title: 'Snow depth',
    note: 'The source data are missing most hours on the last day of each month, so those days rest on 30 values instead of 720.',
  },
  {
    value: 'snow_load',
    label: 'Snow load',
    title: 'Snow load on a flat surface',
    note: 'The weight of the snowpack on a flat surface, from its water content.',
  },
]

export const frostbiteTitle = 'Frostbite danger'

// Time to frostbite for each danger level, keyed by the API's class ids.
export const frostbiteTimes = {
  red: '5 minutes or less',
  amber: '5 to 45 minutes',
  green: '45 minutes to 2 hours',
  none: 'more than 2 hours, or warmer than about 23°F',
}

export const frostbiteNote =
  'How quickly exposed, dry skin on the face would freeze, worked out for every hour from air temperature and wind speed, then grouped by danger level. Use it to plan outdoor work: crew rotations, warm-up breaks and protective clothing.'

export const windChillNote = dailyVariables.find(
  v => v.value == 'wind_chill'
).note

export const snowLoadNote =
  'The snowpack load is the weight of snow on flat, open ground, the quantity building codes call the ground snow load. Codes design for a rarer value than a 30-year record (ASCE 7 uses a 50-year return period, or risk-targeted values in ASCE 7-22), and local building officials set the design value. Use these numbers to gauge the scale of snow loading, not as a design load.'

// Shown beside the grid-cell map at the top of the section, so nobody reads
// these values as a forecast for the exact site. `cell` and `snowCell` are
// the sizes from cellSize(), already formatted: { ns, ew, area }.
export function gridNote(cell, snowCell) {
  return [
    `Every value here describes the whole grid cell outlined on the map, about ${cell.ns} × ${cell.ew} km (${cell.area} km²), not the exact point. The data come from ERA5, a global dataset that averages the valleys, ridges, lakes and towns inside each cell together.`,
    `Local conditions can differ a lot: winter temperature inversions can leave a valley floor much colder than the cell, and wind varies with terrain and shelter. Use these values to plan and compare places, and check them against local observations before designing for a specific site.`,
    `Snow depth comes from a finer ERA5-Land cell, about ${snowCell.ns} × ${snowCell.ew} km (dashed outline).`,
  ]
}

export const caveats = [
  'Every value describes an ERA5 grid cell about 28 km north to south, not your exact site. Valleys and ridges inside the cell can differ a lot, especially under winter temperature inversions.',
  'Wind chill was computed from ground-surface temperature rather than air temperature, so it runs colder than standard wind chill.',
  'Storm totals depend on how storms are told apart: here, a dry spell longer than 12 hours ends a storm.',
  'Wind is the hourly mean 10 m above the ground; gusts are not included. Building codes use 3-second gusts, which are considerably higher.',
]
