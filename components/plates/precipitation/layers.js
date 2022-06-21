export default [
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
    title: 'Projected Mid&ndash;Century (2040&ndash;2069, NCAR CCSM4, RCP 8.5)',
    source: 'rasdaman',
    wmsLayerName: 'annual_precip_totals_mm',
    style: 'precip_mm_midcentury_era',
  },
]
