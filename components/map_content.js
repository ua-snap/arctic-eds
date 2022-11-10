export default {
  layers: {
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
        title: 'Historical Annual Mean (1980–2009)',
        source: 'rasdaman',
        wmsLayerName: 'annual_mean_temp',
        style: 'temp_historical_era',
        default: true,
      },
      {
        id: 'midcentury_era_annual_mean_temp',
        title: 'Projected Annual Mean (2040–2069)',
        source: 'rasdaman',
        wmsLayerName: 'annual_mean_temp',
        style: 'temp_midcentury_era',
      },

      {
        id: 'historical_era_january_min',
        title: 'Historical January Minimum (1980–2009)',
        source: 'rasdaman',
        wmsLayerName: 'jan_min_max_mean_temp',
        style: 'temp_historical_january_min',
      },
      {
        id: 'midcentury_era_january_min',
        title: 'Projected January Minumum (2040–2069)',
        source: 'rasdaman',
        wmsLayerName: 'jan_min_max_mean_temp',
        style: 'temp_midcentury_january_min',
      },
      {
        id: 'historical_era_january_max',
        title: 'Historical January Maximum (1980–2009)',
        source: 'rasdaman',
        wmsLayerName: 'jan_min_max_mean_temp',
        style: 'temp_historical_january_max',
      },
      {
        id: 'midcentury_era_january_max',
        title: 'Projected January Maximum (2040–2069)',
        source: 'rasdaman',
        wmsLayerName: 'jan_min_max_mean_temp',
        style: 'temp_midcentury_january_max',
      },

      {
        id: 'historical_era_july_min',
        title: 'Historical July Minimum (1980–2009)',
        source: 'rasdaman',
        wmsLayerName: 'july_min_max_mean_temp',
        style: 'temp_historical_july_min',
      },
      {
        id: 'midcentury_era_july_min',
        title: 'Projected July Minumum (2040–2069)',
        source: 'rasdaman',
        wmsLayerName: 'july_min_max_mean_temp',
        style: 'temp_midcentury_july_min',
      },
      {
        id: 'historical_era_july_max',
        title: 'Historical July Maximum (1980–2009)',
        source: 'rasdaman',
        wmsLayerName: 'july_min_max_mean_temp',
        style: 'temp_historical_july_max',
      },
      {
        id: 'midcentury_era_july_max',
        title: 'Projected July Maximum (2040–2069)',
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
  legends: {
    precipitation: [
      { color: '#8c510a', label: '0in' },
      { color: '#d8b365', label: '10in' },
      { color: '#f6e8c3', label: '20in' },
      { color: '#f5f5f5', label: '50in' },
      { color: '#c7eae5', label: '100in' },
      { color: '#5ab4ac', label: '200in' },
      { color: '#01665e', label: '&ge; 400in' },
    ],
    snowfall: [
      { color: '#edf8fb', label: '0in' },
      { color: '#bfd3e6', label: '2.5in' },
      { color: '#9ebcda', label: '5in' },
      { color: '#8c96c6', label: '10in' },
      { color: '#8c6bb1', label: '20in' },
      { color: '#8841a7', label: '50in' },
      { color: '#0006e016b000', label: '&ge; 100in' },
    ],
    temperature: [
      { color: '#2166ac', label: '&le; &minus;22&deg;F' },
      { color: '#67a9cf', label: '5&deg;F' },
      { color: '#d1e5f0', label: '23&deg;F' },
      { color: '#f7f7f7', label: '32&deg;F' },
      { color: '#fddbc7', label: '41&deg;F' },
      { color: '#ef8a62', label: '59&deg;F' },
      { color: '#b2182b', label: '&ge; 86&deg;F' },
    ],
    design_freezing_index: [
      { color: '#fff7fb', label: '0&deg;F&sdot;days' },
      { color: '#ece7f2', label: '1000&deg;F&sdot;days' },
      { color: '#d0d1e6', label: '2000&deg;F&sdot;days' },
      { color: '#a6bddb', label: '3000&deg;F&sdot;days' },
      { color: '#74a9cf', label: '4000&deg;F&sdot;days' },
      { color: '#3690c0', label: '5000&deg;F&sdot;days' },
      { color: '#0570b0', label: '6000&deg;F&sdot;days' },
      { color: '#034e7b', label: '&ge; 7000&deg;F&sdot;days' },
    ],
    design_thawing_index: [
      { color: '#ffffe5', label: '0&deg;F&sdot;days' },
      { color: '#fff7bc', label: '1000&deg;F&sdot;days' },
      { color: '#fee391', label: '2000&deg;F&sdot;days' },
      { color: '#fec44f', label: '3000&deg;F&sdot;days' },
      { color: '#fe9929', label: '4000&deg;F&sdot;days' },
      { color: '#ec7014', label: '5000&deg;F&sdot;days' },
      { color: '#cc4c02', label: '6000&deg;F&sdot;days' },
      { color: '#8c2d04', label: '&ge; 7000&deg;F&sdot;days' },
    ],
    freezing_index: [
      { color: '#fff7fb', label: '0&deg;F&sdot;days' },
      { color: '#ece7f2', label: '1000&deg;F&sdot;days' },
      { color: '#d0d1e6', label: '2000&deg;F&sdot;days' },
      { color: '#a6bddb', label: '3000&deg;F&sdot;days' },
      { color: '#74a9cf', label: '4000&deg;F&sdot;days' },
      { color: '#3690c0', label: '5000&deg;F&sdot;days' },
      { color: '#0570b0', label: '6000&deg;F&sdot;days' },
      { color: '#034e7b', label: '&ge; 7000&deg;F&sdot;days' },
    ],
    thawing_index: [
      { color: '#ffffd4', label: '0&deg;F&sdot;days' },
      { color: '#fee391', label: '1000&deg;F&sdot;days' },
      { color: '#fec44f', label: '2000&deg;F&sdot;days' },
      { color: '#fe9929', label: '3000&deg;F&sdot;days' },
      { color: '#d95f0e', label: '4000&deg;F&sdot;days' },
      { color: '#993404', label: '&ge; 5000&deg;F&sdot;days' },
    ],
    heating_degree_days: [
      { color: '#fff7fb', label: '0&deg;F&sdot;days' },
      { color: '#ece7f2', label: '2500&deg;F&sdot;days' },
      { color: '#d0d1e6', label: '5000&deg;F&sdot;days' },
      { color: '#a6bddb', label: '7500&deg;F&sdot;days' },
      { color: '#74a9cf', label: '10000&deg;F&sdot;days' },
      { color: '#3690c0', label: '12500&deg;F&sdot;days' },
      { color: '#0570b0', label: '15000&deg;F&sdot;days' },
      { color: '#034e7b', label: '&ge; 17500&deg;F&sdot;days' },
    ],
    ecoregions: [
      { color: '#b9981e', label: 'Arctic Coastal Plain' },
      { color: '#a555e6', label: 'Arctic Foothills' },
      { color: '#44261c', label: 'Seward Peninsula' },
      { color: '#1df0de', label: 'Aleutian Islands' },
      { color: '#7ae6ec', label: 'Brooks Range' },
      { color: '#5ed7cb', label: 'Interior Forested Lowlands and Uplands' },
      { color: '#4c64eb', label: 'Interior Bottomlands' },
      { color: '#05cb09', label: 'Yukon Flats' },
      { color: '#0e80f8', label: 'Ogilvie Mountains' },
      { color: '#8c6c7d', label: 'Alaska Range' },
      { color: '#acfd16', label: 'Copper Plateau' },
      { color: '#83b3cb', label: 'Wrangell Mountains' },
      { color: '#09f9ae', label: 'Ahklun and Kilbuck Mountains' },
      { color: '#83b3ef', label: 'Alaska Peninsula Mountains' },
      { color: '#37ea3f', label: 'Cook Inlet' },
      { color: '#cee34b', label: 'Pacific Coastal Mountains' },
      {
        color: '#4830d1',
        label: 'Coastal Western Hemlock-Sitka Spruce Forests',
      },
    ],
    geology: [],
    permafrost: {
      pfextent_jorgenson: [
        { color: '#253494', label: 'Continuous (&gt; 90%)' },
        { color: '#41b6c4', label: 'Discontinuous (50 &ndash; 90%)' },
        { color: '#7fcdbb', label: 'Isolated (10 &ndash; 50%)' },
        { color: '#c7e9b4', label: 'Sporadic (&lt; 10%)' },
        { color: '#ffffcc', label: 'Unfrozen' },
        { color: '#a5bfdd', label: 'Water' },
        { color: '#edf8fb', label: 'Glacial' },
      ],
      pfextent_obu: [
        { color: '#253494', label: 'Continuous (&gt; 90%)' },
        { color: '#41b6c4', label: 'Discontinuous (50 &ndash; 90%)' },
        { color: '#7fcdbb', label: 'Isolated (10 &ndash; 50%)' },
        { color: '#c7e9b4', label: 'Sporadic (&lt; 10%)' },
      ],
      iem_gipl_magt_alt_4km_2036_2065: [
        { color: '#2166ac', label: '&le; &minus;4&deg;F' },
        { color: '#4393c3', label: '20&deg;F' },
        { color: '#92c5de', label: '24&deg;F' },
        { color: '#d1e5f0', label: '28&deg;F' },
        { color: '#f7f7f7', label: '30&deg;F' },
        { color: '#fddbc7', label: '32&deg;F' },
        { color: '#f4a582', label: '34&deg;F' },
        { color: '#d6604d', label: '&ge; 36&deg;F' },
      ],
      iem_gipl_magt_alt_4km_historical: [
        { color: '#2166ac', label: '&le; &minus;4&deg;F' },
        { color: '#4393c3', label: '20&deg;F' },
        { color: '#92c5de', label: '24&deg;F' },
        { color: '#d1e5f0', label: '28&deg;F' },
        { color: '#f7f7f7', label: '30&deg;F' },
        { color: '#fddbc7', label: '32&deg;F' },
        { color: '#f4a582', label: '34&deg;F' },
        { color: '#d6604d', label: '&ge; 36&deg;F' },
      ],
      obumagt: [
        { color: '#08306b', label: '&le; 14&deg;F' },
        { color: '#3787c0', label: '23&deg;F' },
        { color: '#94c4df', label: '30&deg;F' },
        { color: '#f14432', label: '34&deg;F' },
        { color: '#bc141a', label: '37&deg;F' },
        { color: '#67000d', label: '&ge; 41&deg;F' },
      ],
      icevol_jorgenson: [
        { color: '#7fc97f', label: 'Unfrozen' },
        { color: '#2171b5', label: 'Low' },
        { color: '#6baed6', label: 'Moderate' },
        { color: '#bdd7e7', label: 'High' },
        { color: '#ffffff', label: 'Glacier' },
        { color: '#beaed4', label: 'Variable' },
      ],
    },
  },
  titles: {
    precipitation: 'Precipitation',
    snowfall: 'Snowfall',
    temperature: 'Temperature',
    design_freezing_index: 'Design Freezing Index',
    design_thawing_index: 'Design Thawing Index',
    freezing_index: 'Freezing Index',
    thawing_index: 'Thawing Index',
    heating_degree_days: 'Heating Degree Days',
    ecoregions: 'Ecoregions',
    geology: 'Geology',
    permafrost: 'Permafrost',
  },
}