export default {
  layers: {
    precipitation: [
      {
        id: 'historical_era_precip',
        title: 'Historical Annual Precipitation (1980-2009)',
        source: 'rasdaman',
        wmsLayerName: 'annual_precip_totals_mm',
        style: 'precip_mm_historical_era',
        legend: 'precipitation',
        default: true,
      },
      {
        id: 'midcentury_era_precip',
        title:
          'Projected Mid-Century Annual Precipitation (2040-2069, NCAR CCSM4, RCP 8.5)',
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
        title: 'Projected Annual Snowfall (2090-2099, NCAR CCSM4, RCP 8.5)',
        source: 'rasdaman',
        wmsLayerName: 'mean_annual_snowfall_mm',
        rasdamanConfiguration: {
          dim_model: 5,
          dim_scenario: 3,
          dim_decade: 18,
        },
        style: 'snowfall_mm',
        legend: 'snowfall',
      },
      {
        id: 'historical_wet_days_per_year',
        title: 'Historical Wet Days Per Year (1980-2009)',
        source: 'rasdaman',
        wmsLayerName: 'wet_days_per_year',
        style: 'arctic_eds_historical_wet_days_per_year',
        legend: 'wet_days_per_year',
      },
      {
        id: 'projected_wet_days_per_year',
        title: 'Projected Wet Days Per Year (2040-2069, NCAR CCSM4, RCP 8.5)',
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
    ],
    temperature_indices: [
      {
        id: 'heating_degree_days_index_historical',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'heating_degree_days_Fdays',
        style: 'arctic_eds_heating_degree_days_historical',
        legend: 'heating_degree_days',
        default: true,
      },
      {
        id: 'ncarccsm4_heating_degree_days_midcentury',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'heating_degree_days_Fdays',
        style: 'arctic_eds_heating_degree_days_future',
        legend: 'heating_degree_days',
      },
      {
        id: 'freezing_index_historical',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'air_freezing_index_Fdays',
        style: 'arctic_eds_freezing_index_historical',
        legend: 'freezing_index',
      },
      {
        id: 'ncarccsm4_freezing_index_midcentury',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'air_freezing_index_Fdays',
        style: 'arctic_eds_freezing_index_future',
        legend: 'freezing_index',
      },
      {
        id: 'thawing_index_historical',
        title: 'Historical',
        source: 'rasdaman',
        wmsLayerName: 'air_thawing_index_Fdays',
        style: 'arctic_eds_thawing_index_historical',
        legend: 'thawing_index',
      },
      {
        id: 'ncarccsm4_thawing_index_midcentury',
        title: 'Projected',
        source: 'rasdaman',
        wmsLayerName: 'air_thawing_index_Fdays',
        style: 'arctic_eds_thawing_index_future',
        legend: 'thawing_index',
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
        id: 'icevol_jorgenson',
        title: 'Ground ice volume (Jorgenson et al., 2008)',
        wmsLayerName:
          'permafrost_beta:jorgenson_2008_pf_extent_ground_ice_volume',
        style: 'permafrost_beta:ground_ice_volume',
        legend: 'icevol_jorgenson',
      },

      {
        id: 'pfextent_obu',
        title: 'Permafrost extent (Obu et al., 2018)',
        wmsLayerName: 'permafrost_beta:obu_pf_extent',
        legend: 'pfextent_obu',
      },
      {
        id: 'obumagt',
        title:
          'Mean annual ground temperature at top of permafrost, 2000-2016 (modeled), Obu 2018',
        wmsLayerName: 'obu_2018_magt',
        style: 'ground_temperature_arctic_eds',
        legend: 'magt',
      },
      {
        id: 'gipl_magt_1m_2021_2050',
        title:
          'Mean annual ground temperature at 1 m depth, 2021-2050 (5-Model Average, RCP 8.5), GIPL model',
        source: 'rasdaman',
        wmsLayerName: 'crrel_gipl_outputs_nc',
        style: 'arctic_eds_gipl_magt1m_nearcentury',
        legend: 'magt',
      },
      {
        id: 'gipl_magt_1m_2071_2100',
        title:
          'Mean annual ground temperature at 1 m depth, 2071&ndash;2100 (5&ndash;Model Average, RCP 8.5), GIPL model',
        source: 'rasdaman',
        wmsLayerName: 'crrel_gipl_outputs_nc',
        style: 'arctic_eds_gipl_magt1m_latecentury',
        legend: 'magt',
      },
    ],
  },
  legends: {
    precipitation: [
      { color: '#8c510a', label: '&ge;0in, &lt;10in' },
      { color: '#d8b365', label: '&ge;10in, &lt;20in' },
      { color: '#f6e8c3', label: '&ge;20in, &lt;50in' },
      { color: '#c7eae5', label: '&ge;50in, &lt;100in' },
      { color: '#5ab4ac', label: '&ge;100in, &lt;200in' },
      { color: '#01665e', label: '&ge;200in' },
    ],
    snowfall: [
      { color: '#edf8fb', label: '&ge;0in, &lt;2.5in' },
      { color: '#bfd3e6', label: '&ge;2.5in, &lt;5in' },
      { color: '#9ebcda', label: '&ge;5in, &lt;10in' },
      { color: '#8c96c6', label: '&ge;10in, &lt;20in' },
      { color: '#8856a7', label: '&ge;20in, &lt;50in' },
      { color: '#810f7c', label: '&ge;50in' },
    ],
    wet_days_per_year: [
      { color: '#edf8fb', label: '&ge;0 days, &lt;60 days' },
      { color: '#ccece6', label: '&ge;60 days, &lt;120 days' },
      { color: '#99d8c9', label: '&ge;120 days, &lt;180 days' },
      { color: '#66c2a4', label: '&ge;180 days' },
    ],
    temperature: [
      { color: '#2166ac', label: '&lt;10&deg;F' },
      { color: '#4393c3', label: '&ge;10&deg;F, &lt;15&deg;F' },
      { color: '#92c5de', label: '&ge;15&deg;F, &lt;20&deg;F' },
      { color: '#d1e5f0', label: '&ge;20&deg;F, &lt;25&deg;F' },
      { color: '#fddbc7', label: '&ge;25&deg;F, &lt;30&deg;F' },
      { color: '#f4a582', label: '&ge;30&deg;F, &lt;35&deg;F' },
      { color: '#d6604d', label: '&ge;35&deg;F, &lt;40&deg;F' },
      { color: '#b2182b', label: '&ge;40&deg;F' },
    ],
    freezing_index: [
      {
        color: '#eff3ff',
        label: '&ge;0&deg;F&sdot;days, &lt;1000&deg;F&sdot;days',
      },
      {
        color: '#c6dbef',
        label: '&ge;1000&deg;F&sdot;days, &lt;2000&deg;F&sdot;days',
      },
      {
        color: '#9ecae1',
        label: '&ge;2000&deg;F&sdot;days, &lt;3000&deg;F&sdot;days',
      },
      {
        color: '#6baed6',
        label: '&ge;3000&deg;F&sdot;days, &lt;4000&deg;F&sdot;days',
      },
      {
        color: '#4292c6',
        label: '&ge;4000&deg;F&sdot;days, &lt;5000&deg;F&sdot;days',
      },
      {
        color: '#2171b5',
        label: '&ge;5000&deg;F&sdot;days, &lt;6000&deg;F&sdot;days',
      },
      {
        color: '#084594',
        label: '&ge;6000&deg;F&sdot;days',
      },
    ],
    thawing_index: [
      {
        color: '#feedde',
        label: '&ge;0&deg;F&sdot;days, &lt;1000&deg;F&sdot;days',
      },
      {
        color: '#fdbe85',
        label: '&ge;1000&deg;F&sdot;days, &lt;2000&deg;F&sdot;days',
      },
      {
        color: '#fd8d3c',
        label: '&ge;2000&deg;F&sdot;days, &lt;3000&deg;F&sdot;days',
      },
      {
        color: '#e6550d',
        label: '&ge;3000&deg;F&sdot;days, &lt;4000&deg;F&sdot;days',
      },
      {
        color: '#a63603',
        label: '&ge;4000&deg;F&sdot;days',
      },
    ],
    heating_degree_days: [
      {
        color: '#eff3ff',
        label: '&ge;0&deg;F&sdot;days, &lt;2500&deg;F&sdot;days',
      },
      {
        color: '#c6dbef',
        label: '&ge;2500&deg;F&sdot;days, &lt;5000&deg;F&sdot;days',
      },
      {
        color: '#9ecae1',
        label: '&ge;5000&deg;F&sdot;days, &lt;7500&deg;F&sdot;days',
      },
      {
        color: '#6baed6',
        label: '&ge;7500&deg;F&sdot;days, &lt;10000&deg;F&sdot;days',
      },
      {
        color: '#4292c6',
        label: '&ge;10000&deg;F&sdot;days, &lt;12500&deg;F&sdot;days',
      },
      {
        color: '#2171b5',
        label: '&ge;12500&deg;F&sdot;days, &lt;15000&deg;F&sdot;days',
      },
      {
        color: '#084594',
        label: '&ge;15000&deg;F&sdot;days',
      },
    ],
    pfextent_jorgenson: [
      { color: '#253494', label: 'Continuous (&gt; 90%)' },
      { color: '#41b6c4', label: 'Discontinuous (50 - 90%)' },
      { color: '#7fcdbb', label: 'Isolated (10 - 50%)' },
      { color: '#c7e9b4', label: 'Sporadic (&lt; 10%)' },
      { color: '#ffffcc', label: 'Unfrozen' },
      { color: '#a5bfdd', label: 'Water' },
      { color: '#edf8fb', label: 'Glacial' },
    ],
    pfextent_obu: [
      { color: '#253494', label: 'Continuous (&gt; 90%)' },
      { color: '#41b6c4', label: 'Discontinuous (50 - 90%)' },
      { color: '#7fcdbb', label: 'Isolated (10 - 50%)' },
      { color: '#c7e9b4', label: 'Sporadic (&lt; 10%)' },
    ],
    magt: [
      { color: '#5e3c99', label: '&lt;25&deg;F' },
      { color: '#b2abd2', label: '&ge;25&deg;F, &lt;30&deg;F' },
      { color: '#f7f7f7', label: '&ge;30&deg;F, &lt;35&deg;F' },
      { color: '#fdb863', label: '&ge;35&deg;F, &lt;40&deg;F' },
      { color: '#e66101', label: '&ge;40&deg;F' },
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
}
