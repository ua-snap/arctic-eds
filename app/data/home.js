// Content for the home page.
//
// The example values are for Fairbanks (64.8378, -147.716), mid-century
// (2040–2069) against the modeled historical baseline, taken from the same
// /eds/all response that app/assets/mock.json captures. They are fixed so the
// home page never waits on the Data API. Re-check them when mock.json is
// re-captured.

// Places offered as one-click examples under the search box.
export const tryPlaces = [
  { name: 'Fort Wainwright', id: 'AK438' },
  { name: 'JBER', id: 'AK439' },
  { name: 'Eielson AFB', id: 'AK442' },
  { name: 'Bethel', id: 'AK36' },
]

// Common short names that don't appear in the community list's name or
// alt_name, mapped to the community id they stand for.
export const placeAliases = {
  jber: 'AK439',
  'eielson afb': 'AK442',
}

export const exampleSite = {
  name: 'Fairbanks',
  // The point report, so the full report shows the same grid cells.
  path: '/report/64.8378/-147.716',
  period: 'Mid-century (2040–2069) vs. modeled historical baseline',
}

// Range bars run from -60% to +60%. `low`/`high`/`mean` are percent change
// from the modeled baseline: low and high compare the lowest and highest
// model values with the baseline's, the same way the report's summary tables
// do. A row with `bar: false` has no baseline in the report to compare with.
export const exampleRows = [
  {
    name: 'Freezing index',
    definition:
      'Seasonal sum of degree-days below freezing. Sets frost penetration for pavement and foundation design.',
    use: 'roads, embankments, frost depth',
    shift: '−26%',
    values: '4,779 → 3,557 °F·days',
    tone: 'cold',
    bar: true,
    low: -53,
    high: 2,
    mean: -26,
    note: '−53% to +2%',
  },
  {
    name: 'Thawing index',
    definition:
      'Seasonal sum of degree-days above freezing. Drives thaw depth and settlement over permafrost.',
    use: 'permafrost, thaw settlement',
    shift: '+21%',
    values: '3,588 → 4,329 °F·days',
    tone: 'warm',
    bar: true,
    low: 7,
    high: 53,
    mean: 21,
    note: '+7% to +53%',
  },
  {
    name: 'Heating degree days',
    definition:
      'Annual sum of degrees the daily mean temperature falls below 65 °F. Tracks heating demand.',
    use: 'building energy, fuel',
    shift: '−14%',
    values: '13,286 → 11,395 °F·days',
    tone: 'warm',
    bar: true,
    low: -30,
    high: -2,
    mean: -14,
    note: '−30% to −2%',
  },
  {
    name: 'Annual precipitation',
    use: 'drainage, water supply',
    shift: '+26%',
    values: '11.4 → 14.4 in',
    tone: 'wet',
    bar: true,
    low: 15,
    high: 38,
    mean: 26,
    note: '+1.7 to +4.3 in',
  },
  {
    name: 'Wet days per year',
    use: 'construction season, trafficability',
    shift: '+21%',
    values: '106 → 128 days',
    tone: 'wet',
    bar: true,
    low: 5,
    high: 39,
    mean: 21,
    note: '+5% to +39%',
  },
  {
    name: 'Design storm',
    definition:
      'Rainfall depth for a given duration and return period. The 100-year storm has a 1% chance of being exceeded in any year.',
    use: '24-hour, 100-year · culverts',
    shift: '3.4–6.1 in',
    values: '3.4–6.1 in (2050–2079)',
    tone: 'wet',
    bar: false,
    note: 'Two models; compare with NOAA Atlas 14 in the report',
  },
]

export const calculators = {
  discharge: {
    name: 'Design discharge',
    url: 'https://ua-snap.github.io/ardac/lab?path=design_discharge%2Fdesign_discharge.ipynb',
  },
  frostDepth: {
    name: 'Frost depth (Modified Berggren)',
    url: 'https://ua-snap.github.io/ardac/lab?path=frost_depth%2FModified+Berggren+Frost+Depth.ipynb',
  },
  freezingIndex: {
    name: 'Design freezing index',
    url: 'https://ua-snap.github.io/ardac/lab/?path=design_freezing_index%2Fdesign_freezing_index_module.ipynb',
  },
  thawingIndex: {
    name: 'Design thawing index',
    url: 'https://ua-snap.github.io/ardac/lab?path=design_thawing_index%2Fdesign_thawing_index_module.ipynb',
  },
}

// The kinds of work the tool supports, as examples rather than a required
// step: every report covers every dataset. `icon` names a Material Design
// Icons glyph (loaded site-wide in nuxt.config.ts).
export const projectTypes = [
  {
    name: 'Culverts & drainage',
    icon: 'mdi-waves',
    question: 'Will it still pass the design storm?',
    data: 'Design storms from 1 hour to 60 days, up to the 1,000-year event; runoff and snowmelt.',
    calculators: ['discharge'],
  },
  {
    name: 'Roads & airfields',
    icon: 'mdi-road-variant',
    question: 'How deep will frost reach?',
    data: 'Freezing and thawing index; depth to permafrost.',
    calculators: ['frostDepth', 'freezingIndex', 'thawingIndex'],
  },
  {
    name: 'Foundations',
    icon: 'mdi-home-floor-0',
    question: 'Will the ground stay frozen?',
    data: 'Ground temperature at 1 m and 5 m; top and base of permafrost.',
    calculators: ['thawingIndex'],
  },
  {
    name: 'Buildings & utilities',
    icon: 'mdi-office-building-outline',
    question: 'How much will heating demand drop?',
    data: 'Heating degree days; monthly air temperature; snowfall.',
    calculators: [],
  },
  {
    name: 'Training lands',
    icon: 'mdi-terrain',
    question: 'When can vehicles cross?',
    data: 'Thaw season, wet days, snowfall, soil moisture.',
    calculators: [],
  },
  {
    name: 'Water & wastewater',
    icon: 'mdi-water-pump',
    question: 'Will supply or freeze risk change?',
    data: 'Runoff, annual precipitation, freezing index.',
    calculators: ['freezingIndex'],
  },
]
