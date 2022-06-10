export default [
  {
    id: "ncarccsm4_freezing_index_condensed_historical",
    title: "Modeled Historical (1980&ndash;2009, ERA Interim)",
    source: "rasdaman",
    wmsLayerName: "freezing_index",
    style: "arctic_eds_freezing_index_historical_condensed",
    default: true,
  },
  {
    id: "ncarccsm4_freezing_index_midcentury",
    title: "Projected Mid&ndash;Century (2040&ndash;2069, NCAR CCSM4, RCP 8.5)",
    source: "rasdaman",
    wmsLayerName: "freezing_index",
    style: "arctic_eds_freezing_index_future_condensed",
  },
  {
    id: "ncarccsm4_freezing_index_2040",
    title: "Projected (2040, NCAR CCSM4, RCP 8.5)",
    source: "rasdaman",
    wmsLayerName: "freezing_index",
    rasdamanConfiguration: {
      dim_model: 2,
      time: "2040-01-01T00:00:00.000Z",
    },
    style: "arctic_eds",
  },
  {
    id: "ncarccsm4_freezing_index",
    title: "Projected (2100, NCAR CCSM4, RCP 8.5)",
    source: "rasdaman",
    wmsLayerName: "freezing_index",
    rasdamanConfiguration: {
      dim_model: 2,
      time: "2100-01-01T00:00:00.000Z",
    },
    style: "arctic_eds",
  },
  {
    id: "historical_freezing_index",
    title: "Historical (1979)",
    source: "rasdaman",
    wmsLayerName: "freezing_index",
    rasdamanConfiguration: {
      dim_model: 0,
      time: "1979-01-01T00:00:00.000Z",
    },
    style: "arctic_eds",
  },
];
