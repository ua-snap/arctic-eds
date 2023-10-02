export default {
  layers: {
    precipitation: [
      {
        id: 'historical_era_precip',
        title: 'Historical Annual Precipitation (1980&ndash;2009)',
        source: 'rasdaman',
        wmsLayerName: 'annual_precip_totals_mm',
        style: 'precip_mm_historical_era',
        legend: 'precipitation',
        default: true,
      },
      {
        id: 'midcentury_era_precip',
        title:
          'Projected Mid&ndash;Century Annual Precipitation (2040&ndash;2069, NCAR CCSM4, RCP 8.5)',
        source: 'rasdaman',
        wmsLayerName: 'annual_precip_totals_mm',
        style: 'precip_mm_midcentury_era',
        legend: 'precipitation',
      },
      {
        id: 'historical_mean_annual_snowfall',
        title: 'Historical Annual Snowfall (1910-1919)',
        source: 'rasdaman',
        wmsLayerName: 'mean_annual_snowfall_mm',
        rasdamanConfiguration: {
          dim_model: 0,
          dim_scenario: 0,
          dim_decade: 0,
        },
        style: 'snowfall_mm',
        legend: 'snowfall',
      },
      {
        id: 'future_mean_annual_snowfall',
        title: 'Projected Annual Snowfall (2090-2099, MRI CGCM3, RCP 8.5)',
        source: 'rasdaman',
        wmsLayerName: 'mean_annual_snowfall_mm',
        rasdamanConfiguration: {
          dim_model: 4,
          dim_scenario: 3,
          dim_decade: 18,
        },
        style: 'snowfall_mm',
        legend: 'snowfall',
      },
      {
        id: 'historical_wet_days_per_year',
        title: 'Historical Wet Days Per Year (1980&ndash;2009)',
        source: 'rasdaman',
        wmsLayerName: 'wet_days_per_year',
        style: 'arctic_eds_historical_wet_days_per_year',
        legend: 'wet_days_per_year',
      },
      {
        id: 'projected_wet_days_per_year',
        title:
          'Projected Wet Days Per Year (2040&ndash;2069, NCAR CCSM4, RCP 8.5)',
        source: 'rasdaman',
        wmsLayerName: 'wet_days_per_year',
        style: 'arctic_eds_projected_wet_days_per_year',
        legend: 'wet_days_per_year',
      },
    ],
    temperature: [
      {
        id: 'historical_era_annual_mean_temp',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'annual_mean_temp',
        style: 'temp_historical_era',
        legend: 'temperature',
        default: true,
      },
      {
        id: 'midcentury_era_annual_mean_temp',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'annual_mean_temp',
        style: 'temp_midcentury_era',
        legend: 'temperature',
      },

      {
        id: 'historical_era_january_min',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'jan_min_max_mean_temp',
        style: 'temp_historical_january_min',
        legend: 'temperature',
      },
      {
        id: 'midcentury_era_january_min',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'jan_min_max_mean_temp',
        style: 'temp_midcentury_january_min',
        legend: 'temperature',
      },
      {
        id: 'historical_era_january_max',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'jan_min_max_mean_temp',
        style: 'temp_historical_january_max',
        legend: 'temperature',
      },
      {
        id: 'midcentury_era_january_max',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'jan_min_max_mean_temp',
        style: 'temp_midcentury_january_max',
        legend: 'temperature',
      },

      {
        id: 'historical_era_july_min',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'july_min_max_mean_temp',
        style: 'temp_historical_july_min',
        legend: 'temperature',
      },
      {
        id: 'midcentury_era_july_min',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'july_min_max_mean_temp',
        style: 'temp_midcentury_july_min',
        legend: 'temperature',
      },
      {
        id: 'historical_era_july_max',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'july_min_max_mean_temp',
        style: 'temp_historical_july_max',
        legend: 'temperature',
      },
      {
        id: 'midcentury_era_july_max',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'july_min_max_mean_temp',
        style: 'temp_midcentury_july_max',
        legend: 'temperature',
      },
    ],
    temperature_indices: [
      {
        id: 'heating_degree_days_index_condensed_historical',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'heating_degree_days',
        style: 'arctic_eds_heating_degree_days_historical_condensed_compressed',
        legend: 'heating_degree_days',
        default: true,
      },
      {
        id: 'ncarccsm4_heating_degree_days_midcentury',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'heating_degree_days',
        style: 'arctic_eds_heating_degree_days_future_condensed_compressed',
        legend: 'heating_degree_days',
      },
      {
        id: 'freezing_index_condensed_historical',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'freezing_index',
        style: 'arctic_eds_freezing_index_historical_condensed',
        legend: 'freezing_index',
      },
      {
        id: 'ncarccsm4_freezing_index_midcentury',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'freezing_index',
        style: 'arctic_eds_freezing_index_future_condensed',
        legend: 'freezing_index',
      },
      {
        id: 'thawing_index_condensed_historical',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'thawing_index',
        style: 'arctic_eds_thawing_index_historical_condensed_compressed',
        legend: 'thawing_index',
      },
      {
        id: 'ncarccsm4_thawing_index_midcentury',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'thawing_index',
        style: 'arctic_eds_thawing_index_future_condensed_compressed',
        legend: 'thawing_index',
      },
      {
        id: 'historical_design_freezing_index',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'design_freezing_index',
        rasdamanConfiguration: {
          dim_model: 0,
          dim_era: 0,
        },
        style: 'arctic_eds',
        legend: 'design_freezing_index',
      },
      {
        id: 'ncarccsm4_design_freezing_index',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'design_freezing_index',
        rasdamanConfiguration: {
          dim_model: 2,
          dim_era: 2,
        },
        style: 'arctic_eds',
        legend: 'design_freezing_index',
      },
      {
        id: 'historical_design_thawing_index',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'design_thawing_index',
        rasdamanConfiguration: {
          dim_model: 0,
          dim_era: 0,
        },
        style: 'arctic_eds',
        legend: 'design_thawing_index',
      },
      {
        id: 'ncarccsm4_design_thawing_index',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'design_thawing_index',
        rasdamanConfiguration: {
          dim_model: 2,
          dim_era: 2,
        },
        style: 'arctic_eds',
        legend: 'design_thawing_index',
      },
    ],
    permafrost: [
      {
        id: 'pfextent_jorgenson',
        title: 'Permafrost extent (Jorgenson et al., 2008)',
        wmsLayerName:
          'permafrost_beta:jorgenson_2008_pf_extent_ground_ice_volume',
        legend: 'pfextent_jorgenson',
        default: true,
      },

      {
        id: 'pfextent_obu',
        title: 'Permafrost extent (Obu et al., 2018)',
        wmsLayerName: 'permafrost_beta:obu_pf_extent',
        legend: 'pfextent_obu',
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
        legend: 'magt',
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
        legend: 'magt',
      },
      {
        id: 'obumagt',
        title:
          'Mean annual ground temperature at top of permafrost, 2000&ndash;2016 (modeled)',
        wmsLayerName: 'obu_2018_magt',
        style: 'ground_temperature_blue_to_red_arctic_eds',
        legend: 'obumagt',
      },
      {
        id: 'icevol_jorgenson',
        title: 'Ground ice volume (Jorgenson et al., 2008)',
        wmsLayerName:
          'permafrost_beta:jorgenson_2008_pf_extent_ground_ice_volume',
        style: 'permafrost_beta:ground_ice_volume',
        legend: 'icevol_jorgenson',
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
    wet_days_per_year: [
      { color: '#edf8fb', label: '&ge;0 days, &lt;60 days' },
      { color: '#ccece6', label: '&ge;60 days, &lt;120 days' },
      { color: '#99d8c9', label: '&ge;120 days, &lt;180 days' },
      { color: '#66c2a4', label: '&ge;180 days' },
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
    magt: [
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
  titles: {
    precipitation: 'Precipitation',
    temperature: 'Temperature',
    temperature_indices: 'Temperature Indices',
    permafrost: 'Permafrost',
  },
}
