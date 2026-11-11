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

export const limitsNote =
  'Each verdict compares a design limit with 30 years of hourly data (1991–2020) for this grid cell. It covers snow and wind loads on structures and vehicles in snow; equipment, clothing and fuel limits are not included.'

export const designColdNote =
  'Design cold is the temperature that the coldest 1% of a month’s hours fall below, the usual design value for cold-weather equipment. The design type comes from the coldest month’s 1% value: C1 if it is −25°F or warmer, C2 down to −50°F, C3 down to −60°F, C4 down to −70°F. Cold zones place the coldest-month mean (typical), the 1% value (design) and the 30-year record low (record) on a scale from 1 (mildest) to 5C.'

export const designColdReferences =
  'MIL-HDBK-310; AR 70-38; ATP 3-90.96; ERDC/CRREL TR-26-5.'

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
  'How quickly exposed, dry skin on the face would freeze, worked out for every hour from air temperature and wind speed, then grouped by danger level.'

export const windChillNote = dailyVariables.find(
  v => v.value == 'wind_chill'
).note

export const snowLoadNote =
  'Snow load is the weight of the accumulated snowpack on a flat surface. Single-storm and 24-hour snowfall loads are checked under Climate limits.'

export const caveats = [
  'Every value describes a ~28 km ERA5 grid cell, not your exact site. Valleys and ridges inside the cell can differ a lot, especially under winter temperature inversions.',
  'Wind chill was computed from ground-surface temperature rather than air temperature, so it runs colder than standard wind chill.',
  'Storm totals depend on how storms are told apart: here, a dry spell longer than 12 hours ends a storm.',
  'Wind is the hourly mean 10 m above the ground; gusts are not included.',
]
