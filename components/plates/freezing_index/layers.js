export default [
  {
    id: 'ncarccsm4_freezing_index_condensed_historical',
    title: 'Modeled Historical (1980&ndash;2009, ERA Interim)',
    source: 'rasdaman',
    wmsLayerName: 'freezing_index',
    style: 'arctic_eds_freezing_index_historical_condensed',
    default: true,
  },
  {
    id: 'ncarccsm4_freezing_index_midcentury',
    title: 'Projected Mid&ndash;Century (2040&ndash;2069, NCAR CCSM4, RCP 8.5)',
    source: 'rasdaman',
    wmsLayerName: 'freezing_index',
    style: 'arctic_eds_freezing_index_future_condensed',
  },
]
