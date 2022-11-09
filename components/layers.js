export default {
  variables: {
    precipitation: [
      {
        id: 'historical_era_precip',
        title: 'Historical (1980&ndash;2009)',
        source: 'rasdaman',
        wmsLayerName: 'annual_precip_totals_mm',
        style: 'precip_mm_historical_era',
        default: true,
      },
      {
        id: 'midcentury_era_precip',
        title:
          'Projected Mid&ndash;Century (2040&ndash;2069, NCAR CCSM4, RCP 8.5)',
        source: 'rasdaman',
        wmsLayerName: 'annual_precip_totals_mm',
        style: 'precip_mm_midcentury_era',
      },
    ],
    snowfall: [
      {
        id: 'historical_mean_annual_snowfall',
        title: 'Historical (1910-1919)',
        source: 'rasdaman',
        wmsLayerName: 'mean_annual_snowfall_mm',
        rasdamanConfiguration: {
          dim_model: 0,
          dim_scenario: 0,
          dim_decade: 0,
        },
        style: 'snowfall_mm',
        default: true,
      },
      {
        id: 'future_mean_annual_snowfall',
        title: 'Projected (2090-2099, MRI CGCM3, RCP 8.5)',
        source: 'rasdaman',
        wmsLayerName: 'mean_annual_snowfall_mm',
        rasdamanConfiguration: {
          dim_model: 4,
          dim_scenario: 3,
          dim_decade: 18,
        },
        style: 'snowfall_mm',
      },
    ],
    temperature: [
      {
        id: 'historical_era_annual_mean_temp',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'annual_mean_temp',
        style: 'temp_historical_era',
        default: true,
      },
      {
        id: 'midcentury_era_annual_mean_temp',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'annual_mean_temp',
        style: 'temp_midcentury_era',
      },

      {
        id: 'historical_era_january_min',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'jan_min_max_mean_temp',
        style: 'temp_historical_january_min',
      },
      {
        id: 'midcentury_era_january_min',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'jan_min_max_mean_temp',
        style: 'temp_midcentury_january_min',
      },
      {
        id: 'historical_era_january_max',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'jan_min_max_mean_temp',
        style: 'temp_historical_january_max',
      },
      {
        id: 'midcentury_era_january_max',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'jan_min_max_mean_temp',
        style: 'temp_midcentury_january_max',
      },

      {
        id: 'historical_era_july_min',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'july_min_max_mean_temp',
        style: 'temp_historical_july_min',
      },
      {
        id: 'midcentury_era_july_min',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'july_min_max_mean_temp',
        style: 'temp_midcentury_july_min',
      },
      {
        id: 'historical_era_july_max',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'july_min_max_mean_temp',
        style: 'temp_historical_july_max',
      },
      {
        id: 'midcentury_era_july_max',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'july_min_max_mean_temp',
        style: 'temp_midcentury_july_max',
      },
    ],
    design_freezing_index: [
      {
        id: 'historical_design_freezing_index',
        title: 'Historical (1980-2009)',
        source: 'rasdaman',
        wmsLayerName: 'design_freezing_index',
        rasdamanConfiguration: {
          dim_model: 0,
          dim_era: 0,
        },
        style: 'arctic_eds',
        default: true,
      },
      {
        id: 'ncarccsm4_design_freezing_index',
        title: 'Projected (2070-2099, NCAR CCSM4, RCP 8.5)',
        source: 'rasdaman',
        wmsLayerName: 'design_freezing_index',
        rasdamanConfiguration: {
          dim_model: 2,
          dim_era: 2,
        },
        style: 'arctic_eds',
      },
    ],
    design_thawing_index: [
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
    ],
    freezing_index: [
      {
        id: 'freezing_index_condensed_historical',
        title: 'Modeled Historical (1980&ndash;2009, ERA Interim)',
        source: 'rasdaman',
        wmsLayerName: 'freezing_index',
        style: 'arctic_eds_freezing_index_historical_condensed',
        default: true,
      },
      {
        id: 'ncarccsm4_freezing_index_midcentury',
        title:
          'Projected Mid&ndash;Century (2040&ndash;2069, NCAR CCSM4, RCP 8.5)',
        source: 'rasdaman',
        wmsLayerName: 'freezing_index',
        style: 'arctic_eds_freezing_index_future_condensed',
      },
    ],
    thawing_index: [
      {
        id: 'thawing_index_condensed_historical',
        title: 'Modeled Historical (1980&ndash;2009, ERA Interim)',
        source: 'rasdaman',
        wmsLayerName: 'thawing_index',
        style: 'arctic_eds_thawing_index_historical_condensed_compressed',
        default: true,
      },
      {
        id: 'ncarccsm4_thawing_index_midcentury',
        title:
          'Projected Mid&ndash;Century (2040&ndash;2069, NCAR CCSM4, RCP 8.5)',
        source: 'rasdaman',
        wmsLayerName: 'thawing_index',
        style: 'arctic_eds_thawing_index_future_condensed_compressed',
      },
    ],
    heating_degree_days: [
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
        title:
          'Projected Mid&ndash;Century (2040&ndash;2069, NCAR CCSM4, RCP 8.5)',
        source: 'rasdaman',
        wmsLayerName: 'heating_degree_days',
        style: 'arctic_eds_heating_degree_days_future_condensed_compressed',
      },
    ],
    ecoregions: [
      {
        id: 'ak_level3_ecoregions',
        title: 'Alaska Level 3 Ecoregions',
        wmsLayerName: 'physiography:ak_level3_ecoregions',
        default: true,
      },
    ],
    geology: [
      {
        id: 'geological_units',
        title: 'Detailed Geological Units',
        wmsLayerName: 'geology:detailed_geologic_units',
        default: true,
      },
    ],
    permafrost: [
      {
        id: 'pfextent_jorgenson',
        title: 'Permafrost extent (Jorgenson et al., 2008)',
        wmsLayerName:
          'permafrost_beta:jorgenson_2008_pf_extent_ground_ice_volume',
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
        id: 'obumagt',
        title:
          'Mean annual ground temperature at top of permafrost, 2000&ndash;2016 (modeled)',
        wmsLayerName: 'obu_2018_magt',
        style: 'ground_temperature_blue_to_red_arctic_eds',
      },
      {
        id: 'icevol_jorgenson',
        title: 'Ground ice volume (Jorgenson et al., 2008)',
        wmsLayerName:
          'permafrost_beta:jorgenson_2008_pf_extent_ground_ice_volume',
        style: 'permafrost_beta:ground_ice_volume',
      },
    ],
  },
}
