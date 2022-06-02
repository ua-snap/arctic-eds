export default [
  {
    id: "historical_thawing_index",
    title: "Historical (1979)",
    source: "rasdaman",
    wmsLayerName: "thawing_index",
    rasdamanConfiguration: {
      dim_model: 0,
      time: "1979-01-01T00:00:00.000Z"
    },
    style: "arctic_eds",
    default: true
  },
  {
    id: "ncarccsm4_thawing_index",
    title: "Projected (2100, NCAR CCSM4, RCP 8.5)",
    source: "rasdaman",
    wmsLayerName: "thawing_index",
    rasdamanConfiguration: {
      dim_model: 2,
      time: "2100-01-01T00:00:00.000Z"
    },
    style: "arctic_eds"
  }
];
