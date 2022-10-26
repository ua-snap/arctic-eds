export default [
  {
    id: 'heating_degree_days_index_condensed_historical',
    title: 'Modeled Historical (1980&ndash;2009, ERA Interim)',
    source: 'rasdaman',
    wmsLayerName: 'heating_degree_days',
    style: 'arctic_eds_heating_degree_days_historical_condensed_compressed',
    default: true,
  },
  {
    id: 'ncarccsm4_heating_degree_days_midcentury',
    title: 'Projected Mid&ndash;Century (2040&ndash;2069, NCAR CCSM4, RCP 8.5)',
    source: 'rasdaman',
    wmsLayerName: 'heating_degree_days',
    style: 'arctic_eds_heating_degree_days_future_condensed_compressed',
  },
]
