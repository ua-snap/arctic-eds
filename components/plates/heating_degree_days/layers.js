export default [
  {
    id: 'historical_heating_degree_days',
    title: 'Historical (1979)',
    source: 'rasdaman',
    wmsLayerName: 'heating_degree_days',
    rasdamanConfiguration: {
      dim_model: 0,
      time: '1979-01-01T00:00:00.000Z',
    },
    style: 'arctic_eds',
    default: true,
  },
  {
    id: 'ncarccsm4_heating_degree_days',
    title: 'Projected (2100, NCAR CCSM4, RCP 8.5)',
    source: 'rasdaman',
    wmsLayerName: 'heating_degree_days',
    rasdamanConfiguration: {
      dim_model: 2,
      time: '2100-01-01T00:00:00.000Z',
    },
    style: 'arctic_eds',
  },
]
