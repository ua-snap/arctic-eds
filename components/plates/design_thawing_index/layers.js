export default [
  {
    id: 'historical_design_thawing_index',
    title: 'Historical (1980-2009)',
    source: 'rasdaman',
    wmsLayerName: 'design_thawing_index',
    rasdamanConfiguration: {
      dim_model: 0,
      dim_era: 0,
    },
    style: 'arctic_eds',
    default: true,
  },
  {
    id: 'ncarccsm4_design_thawing_index',
    title: 'Projected (2070-2099, NCAR CCSM4, RCP 8.5)',
    source: 'rasdaman',
    wmsLayerName: 'design_thawing_index',
    rasdamanConfiguration: {
      dim_model: 2,
      dim_era: 2,
    },
    style: 'arctic_eds',
  },
]
