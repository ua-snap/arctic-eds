// Topic landing pages: the kinds of work Arctic-EDS supports, as ways in
// rather than a required step. Every report covers every dataset; a topic
// only changes which report sections are suggested first.

// The datasets behind the report, keyed for reuse by topics. `section` is
// the id of the report heading the dataset appears under.
export const datasets = {
  designStorms: {
    name: 'Design storms',
    what: 'Rainfall depth for durations from 60 minutes to 60 days at 2- to 1,000-year return periods, with 95% confidence intervals.',
    detail:
      '2 models, RCP 8.5 · adjusted to NOAA Atlas 14 · 481 m grid · 2020–2049, 2050–2079, 2080–2099',
    section: 'precipitation-frequency',
  },
  precipitation: {
    name: 'Annual precipitation',
    what: 'Total precipitation per year, with the minimum, mean and maximum across models.',
    detail: '5 models, RCP 4.5, 6.0 and 8.5 · baseline 1901–2015 · 2 km grid',
    section: 'annual-precipitation',
  },
  snowfall: {
    name: 'Snowfall',
    what: 'Annual snowfall, as water equivalent, averaged by decade.',
    detail: '5 models, RCP 4.5, 6.0 and 8.5 · baseline 1910–2009 · 771 m grid',
    section: 'snowfall',
  },
  hydrology: {
    name: 'Runoff, snowmelt & soil moisture',
    what: 'Monthly runoff, snowmelt, snowpack, evapotranspiration and soil moisture in three layers down to 3 m, by decade.',
    detail: 'Hydrologic model driven by 9 models, RCP 4.5 and 8.5 · 12 km grid',
    section: 'hydrology',
  },
  temperature: {
    name: 'Air temperature',
    what: 'Monthly and annual minimum, mean and maximum air temperature.',
    detail: '5 models, RCP 4.5, 6.0 and 8.5 · baseline 1901–2015 · 2 km grid',
    section: 'temperature',
  },
  freezingIndex: {
    name: 'Freezing index',
    what: 'Seasonal degree-days below freezing, per year and model. Sets frost penetration.',
    detail: '9 models, RCP 4.5 and 8.5 · baseline 1980–2009 · 12 km grid',
    section: 'freezing-index',
  },
  thawingIndex: {
    name: 'Thawing index',
    what: 'Seasonal degree-days above freezing, per year and model. Drives thaw depth.',
    detail: '9 models, RCP 4.5 and 8.5 · baseline 1980–2009 · 12 km grid',
    section: 'thawing-index',
  },
  heatingDegreeDays: {
    name: 'Heating degree days',
    what: 'Annual heating demand, per year and model.',
    detail: '9 models, RCP 4.5 and 8.5 · baseline 1980–2009 · 12 km grid',
    section: 'heating-degree-days',
  },
  permafrost: {
    name: 'Permafrost & ground temperature',
    what: 'Mean annual ground temperature from the surface to 5 m; depth to the top and base of permafrost; talik thickness.',
    detail:
      'Permafrost model driven by 2 models and a 5-model average, RCP 4.5 and 8.5 · 1 km grid · 2021–2120',
    section: 'permafrost',
  },
}

export const topics = [
  {
    slug: 'drainage',
    name: 'Culverts & drainage',
    question: 'Will it still pass the design storm?',
    summary:
      'Design storms from 1 hour to 60 days, up to the 1,000-year event; runoff and snowmelt.',
    intro:
      'Sizing culverts, ditches and storm drains starts with the design storm and the spring runoff. See how both are projected to move at your site.',
    questions: [
      {
        text: 'Will this culvert still pass the design storm?',
        datasets: ['designStorms'],
      },
      {
        text: 'How much deeper is the 25-, 50- or 100-year storm by mid-century?',
        datasets: ['designStorms'],
      },
      {
        text: 'Is spring breakup runoff arriving earlier, or getting larger?',
        datasets: ['hydrology', 'snowfall'],
      },
      {
        text: 'Will more of the year’s precipitation fall as rain?',
        datasets: ['precipitation', 'snowfall'],
      },
      {
        text: 'Will total runoff through the year go up or down?',
        datasets: ['hydrology', 'precipitation'],
      },
    ],
    datasets: ['designStorms', 'hydrology', 'precipitation', 'snowfall'],
  },
  {
    slug: 'roads',
    name: 'Roads & airfields',
    question: 'How deep will frost reach?',
    summary: 'Freezing and thawing index; depth to permafrost.',
    intro:
      'Pavement sections, embankments and runways are designed around frost depth and the thaw season. See how both are projected to shift under your alignment.',
    questions: [
      {
        text: 'How deep will seasonal frost reach under the pavement?',
        datasets: ['freezingIndex'],
      },
      {
        text: 'Will the thaw season get longer and warmer?',
        datasets: ['thawingIndex'],
      },
      {
        text: 'Is there permafrost under the alignment, and how will it change?',
        datasets: ['permafrost'],
      },
      {
        text: 'Will heavier rain overwhelm roadside ditches and culverts?',
        datasets: ['designStorms'],
      },
      {
        text: 'How warm will construction seasons get?',
        datasets: ['temperature'],
      },
    ],
    datasets: [
      'freezingIndex',
      'thawingIndex',
      'permafrost',
      'temperature',
      'designStorms',
    ],
  },
  {
    slug: 'foundations',
    name: 'Foundations',
    question: 'Will the ground stay frozen?',
    summary: 'Ground temperature at 1 m and 5 m; top and base of permafrost.',
    intro:
      'Piles, slabs and thermosyphons depend on how cold the ground stays over the life of the structure. See how ground temperature and permafrost are projected to change.',
    questions: [
      {
        text: 'Will the ground under this foundation stay frozen?',
        datasets: ['permafrost'],
      },
      {
        text: 'How warm will the ground get at pile depth?',
        datasets: ['permafrost'],
      },
      {
        text: 'How deep will the thawed layer above permafrost get?',
        datasets: ['permafrost', 'thawingIndex'],
      },
      {
        text: 'Could a talik form beneath the structure?',
        datasets: ['permafrost'],
      },
      {
        text: 'How will seasonal frost, and frost heave, change?',
        datasets: ['freezingIndex'],
      },
    ],
    datasets: ['permafrost', 'thawingIndex', 'freezingIndex', 'temperature'],
  },
  {
    slug: 'buildings',
    name: 'Buildings & utilities',
    question: 'How much will heating demand drop?',
    summary: 'Heating degree days; monthly air temperature; snowfall.',
    intro:
      'Heating plants, envelopes and buried utilities are sized for local winters and ground conditions. See how heating demand, temperature and the ground are projected to change.',
    questions: [
      {
        text: 'How much will heating demand drop?',
        datasets: ['heatingDegreeDays'],
      },
      {
        text: 'How cold will the coldest months still get?',
        datasets: ['temperature'],
      },
      {
        text: 'Will annual snowfall go up or down?',
        datasets: ['snowfall'],
      },
      {
        text: 'How much frost protection do water and sewer lines need?',
        datasets: ['freezingIndex'],
      },
      {
        text: 'Will the ground under utilidors and buried lines stay frozen?',
        datasets: ['permafrost'],
      },
    ],
    datasets: [
      'heatingDegreeDays',
      'temperature',
      'snowfall',
      'freezingIndex',
      'permafrost',
    ],
  },
  {
    slug: 'training-lands',
    name: 'Training lands',
    question: 'When can vehicles cross?',
    summary: 'Thaw season, snowfall, soil moisture, permafrost.',
    intro:
      'Maneuver areas, ranges and trails depend on frozen ground, snow cover and soil moisture. See how the seasons that allow training are projected to shift.',
    questions: [
      {
        text: 'When can vehicles cross, and for how long?',
        datasets: ['freezingIndex', 'thawingIndex'],
      },
      {
        text: 'Will soils be wetter during the training season?',
        datasets: ['hydrology'],
      },
      {
        text: 'Will snow cover for winter training shrink or grow?',
        datasets: ['snowfall', 'hydrology'],
      },
      {
        text: 'Will trails and ranges thaw deeper each summer?',
        datasets: ['permafrost', 'thawingIndex'],
      },
      {
        text: 'Will more rain fall across the year?',
        datasets: ['precipitation'],
      },
    ],
    datasets: [
      'thawingIndex',
      'freezingIndex',
      'hydrology',
      'snowfall',
      'permafrost',
      'precipitation',
    ],
  },
  {
    slug: 'water',
    name: 'Water & wastewater',
    question: 'Will supply or freeze risk change?',
    summary: 'Runoff, annual precipitation, freezing index.',
    intro:
      'Intakes, lagoons, tanks and lines depend on runoff timing and on keeping water from freezing. See how supply and freeze risk are projected to change.',
    questions: [
      {
        text: 'Will supply or freeze risk change?',
        datasets: ['hydrology', 'freezingIndex'],
      },
      {
        text: 'How will the timing of runoff and snowmelt shift through the year?',
        datasets: ['hydrology'],
      },
      {
        text: 'Will lagoons and treatment ponds take on more rain?',
        datasets: ['precipitation', 'designStorms'],
      },
      {
        text: 'How much frost protection do lines and tanks need?',
        datasets: ['freezingIndex'],
      },
      {
        text: 'Will permafrost under tanks and lines stay stable?',
        datasets: ['permafrost'],
      },
    ],
    datasets: [
      'hydrology',
      'precipitation',
      'freezingIndex',
      'designStorms',
      'permafrost',
    ],
  },
]

export function findTopic(slug) {
  return topics.find(topic => topic.slug === slug)
}
