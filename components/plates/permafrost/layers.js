export default [
  {
    id: 'pfextent_jorgenson',
    title: 'Permafrost extent (Jorgenson et al., 2008)',
    wmsLayerName: 'permafrost_beta:jorgenson_2008_pf_extent_ground_ice_volume',
    default: true,
  },

  {
    id: 'pfextent_obu',
    title: 'Permafrost extent (Obu et al., 2018)',
    wmsLayerName: 'permafrost_beta:obu_pf_extent',
  },
  {
    id: 'iem_gipl_magt_alt_4km_historical',
    title:
      'Mean annual ground temperature at active layer, 1986&ndash;2005, GIPL model',
    source: 'rasdaman',
    wmsLayerName: 'iem_gipl_magt_alt_4km',
    rasdamanConfiguration: {
      dim_model: 0,
      dim_scenario: 0,
      dim_era: 0,
    },
    style: 'arctic_eds_MAGT',
  },
  {
    id: 'iem_gipl_magt_alt_4km_2036_2065',
    title:
      'Mean annual ground temperature at active layer, 2036&ndash;2065 (NCAR&ndash;CCSM4, RCP 8.5), GIPL model',
    source: 'rasdaman',
    wmsLayerName: 'iem_gipl_magt_alt_4km',
    rasdamanConfiguration: {
      dim_model: 5,
      dim_scenario: 2,
      dim_era: 2,
    },
    style: 'arctic_eds_MAGT',
  },
  {
    id: 'iem_gipl_ALT_4km_historical',
    title: 'Active layer thickness, 1986&ndash;2005, GIPL model',
    source: 'rasdaman',
    wmsLayerName: 'iem_gipl_magt_alt_4km',
    rasdamanConfiguration: {
      dim_model: 0,
      dim_scenario: 0,
      dim_era: 0,
    },
    style: 'arctic_eds_ALT',
  },
  {
    id: 'iem_gipl_ALT_4km_2036_2065',
    title:
      'Active layer thickness, 2036&ndash;2065 (NCAR&ndash;CCSM4, RCP 8.5), GIPL model',
    source: 'rasdaman',
    wmsLayerName: 'iem_gipl_magt_alt_4km',
    rasdamanConfiguration: {
      dim_model: 5,
      dim_scenario: 2,
      dim_era: 2,
    },
    style: 'arctic_eds_ALT',
  },
  {
    id: 'obumagt',
    title:
      'Mean annual ground temperature at top of permafrost, 2000&ndash;2016 (modeled)',
    wmsLayerName: 'obu_2018_magt',
  },
  {
    id: 'icevol_jorgenson',
    title: 'Ground ice volume (Jorgenson et al., 2008)',
    wmsLayerName: 'permafrost_beta:jorgenson_2008_pf_extent_ground_ice_volume',
    style: 'permafrost_beta:ground_ice_volume',
  },
]
