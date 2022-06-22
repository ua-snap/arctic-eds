export default [
  {
    id: 'ncarccsm4_thawing_index_condensed_historical',
    title: 'Modeled Historical (1980&ndash;2009, ERA Interim)',
    source: 'rasdaman',
    wmsLayerName: 'thawing_index',
    style: 'arctic_eds_thawing_index_historical_condensed_compressed',
    default: true,
  },
  {
    id: 'ncarccsm4_thawing_index_midcentury',
    title: 'Projected Mid&ndash;Century (2040&ndash;2069, NCAR CCSM4, RCP 8.5)',
    source: 'rasdaman',
    wmsLayerName: 'thawing_index',
    style: 'arctic_eds_thawing_index_future_condensed_compressed',
  },
]
