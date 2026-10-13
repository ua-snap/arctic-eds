// Topic landing pages: the kinds of work Arctic-EDS supports, as ways in
// rather than a required step. Every report covers every dataset; a topic
// only changes which report sections are suggested first.

// The datasets behind the report, keyed for reuse by topics. `section` is
// the id of the report heading the dataset appears under.
export const datasets = {
  exceedanceProbability: {
    name: 'Annual exceedance probability',
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
    name: 'Culverts & Drainage',
    question: 'Is the culvert big enough?',
    intro:
      'Sizing culverts, ditches and storm drains starts with the precipitation exceedance and the spring runoff. See how both are projected to change at your site.',
    questions: [
      {
        text: 'Will existing culverts be inadequate during the design life of this road?',
        datasets: ['exceedanceProbability'],
      },
      {
        text: 'How much are maximum daily flows likely to change in the next thirty years?',
        datasets: ['hydrology'],
      },
      {
        text: 'Will peak snowmelt shift from April to March?',
        datasets: ['hydrology'],
      },
      {
        text: 'What one-hour rainfall (in inches) has an annual exceedance probability of 1%?',
        datasets: ['exceedanceProbability'],
      },
    ],
    datasets: ['exceedanceProbability', 'hydrology', 'precipitation'],
  },
  {
    slug: 'roads',
    name: 'Roads, Rail, Airfields, Trails',
    question: 'Is the runway safe?',
    intro:
      'The challenge of designing and maintaining transportation corridors in Alaska requires long-term projections of permafrost thaw and seasonal frost cycles.',
    questions: [
      {
        text: 'Is there permafrost underlying this rail corridor?',
        datasets: ['permafrost'],
      },
      {
        text: 'Can I predict the design thawing index for this site for the next two decades?',
        datasets: ['thawingIndex'],
      },
      {
        text: 'What is the average depth of the permafrost under this section of roadway?',
        datasets: ['permafrost'],
      },
      {
        text: 'Can this airfield be re-sited to more stable ground?',
        datasets: ['permafrost'],
      },
      {
        text: 'In what seasons is this trail likely to be usable by 2060?',
        datasets: ['freezingIndex', 'thawingIndex'],
      },
    ],
    datasets: ['permafrost', 'freezingIndex', 'thawingIndex'],
  },
  {
    slug: 'foundations',
    name: 'Foundations',
    question: 'Are the pilings stable?',
    intro:
      'Construction choices depend not only on current ground stability and drainage, but also on how that is likely to change during the life of a building or installation. Mistakes can be costly.',
    questions: [
      {
        text: 'Do basements in this area need to be designed to protect frozen soil?',
        datasets: ['permafrost'],
      },
      {
        text: 'What is likely to be the maximum depth of ground-frost penetration in another forty or fifty years?',
        datasets: ['freezingIndex'],
      },
      {
        text: 'Can I calculate the maximum likely design thawing index for the life of this building?',
        datasets: ['thawingIndex'],
      },
      {
        text: 'Will I need to use Frost Protected Shallow Foundations (FPSF) to prevent frost heave?',
        datasets: ['freezingIndex'],
      },
    ],
    datasets: ['permafrost', 'freezingIndex', 'thawingIndex'],
  },
  {
    slug: 'buildings',
    name: 'Building Design',
    question: 'Will the roof collapse?',
    intro:
      'Key challenges of ensuring structural safety and comfort depend on anticipating change over the life of residential, public, and commercial properties.',
    questions: [
      {
        text: 'Do we need to install air conditioning?',
        datasets: ['temperature'],
      },
      {
        text: 'Will the anticipated snow load cause safety issues in another thirty years?',
        datasets: ['snowfall'],
      },
      {
        text: 'Can we plan for fewer heating degree days at this location?',
        datasets: ['heatingDegreeDays'],
      },
      {
        text: 'In what months will we need to operate a cooling system?',
        datasets: ['temperature'],
      },
      {
        text: 'Will the extra insulation pay for itself over the life of the building?',
        datasets: ['heatingDegreeDays'],
      },
    ],
    datasets: [
      'snowfall',
      'exceedanceProbability',
      'heatingDegreeDays',
      'temperature',
    ],
  },
  {
    slug: 'training-lands',
    name: 'Training Lands',
    question: 'When can vehicles cross?',
    intro:
      'Effective cold-weather training and year-round readiness are priorities on military training lands. Both require planning for shifting seasonality and changes to frozen ground.',
    questions: [
      {
        text: 'When in the fall will the ground surface be solidly frozen enough to support maneuvers?',
        datasets: ['freezingIndex'],
      },
      {
        text: 'Is seasonal snowfall of a foot or more likely to occur before or after adequate ground freezing?',
        datasets: ['snowfall', 'freezingIndex'],
      },
      {
        text: 'What will be the likely frequency of extreme cold days for cold weather testing?',
        datasets: ['temperature'],
      },
      {
        text: 'Is the timing of snowmelt changing?',
        datasets: ['hydrology'],
      },
    ],
    datasets: [
      'freezingIndex',
      'thawingIndex',
      'snowfall',
      'hydrology',
      'permafrost',
    ],
  },
  {
    slug: 'water',
    name: 'Water Supply & Wastewater',
    question: 'Will the sewage lagoon overflow?',
    intro:
      'For communities and remote installations, safe drinking water and effective sanitation require planning for shifts in drainage and soil stability.',
    questions: [
      {
        text: 'Is peak runoff likely to become greater?',
        datasets: ['hydrology'],
      },
      {
        text: 'Will storm events that have caused wastewater problems in the past become more common?',
        datasets: ['exceedanceProbability'],
      },
      {
        text: 'Will the season of peak runoff shift?',
        datasets: ['hydrology'],
      },
      {
        text: 'Is local permafrost thaw likely to change long-term drainage patterns?',
        datasets: ['permafrost'],
      },
      {
        text: 'Is ground thawing near freshwater sources?',
        datasets: ['permafrost'],
      },
    ],
    datasets: [
      'exceedanceProbability',
      'precipitation',
      'freezingIndex',
      'hydrology',
    ],
  },
]

export function findTopic(slug) {
  return topics.find(topic => topic.slug === slug)
}
