<template>
  <div class="content is-size-5 content-clamp">
    <p v-if="context == 'snap' || context == 'snowfall'">
      The results shown below come from two types of data sources: historical
      modeled data (CRU TS), and projected downscaled GCM data from across five
      different climate models (NCAR CCSM4, GFDL CM3, GISS E2-R, MRI CGCM3, and
      IPSL CM5A-LR) and three climate scenarios (RCP 4.5, 6.0 and 8.5).
      Projected data can show more variability than the historical data in the
      table below because it is showing the extreme values across all models and
      scenarios. Using the mean column can be useful to assess general trends
      over time. Both historical and projected data are at a
      <span v-if="context == 'snap'">2&#x202F;km</span
      ><span v-else>771&#x202F;m</span>
      spatial resolution, which should be considered in the context of elevation
      change and other factors which can impact interpretation.
    </p>
    <p v-if="context == 'wrf'">
      The results below come from two types of data sources: historical modeled
      data (ERA Interim) and projected climate conditions using two climate
      models (NCAR CCSM4 and GFDL CM3) and one emissions scenario (RCP 8.5).
      Both historical and projected data are downscaled from their native
      resolutions to 20&#x202f;km using the WRF model, which should be
      considered in the context of elevation change and other factors which can
      impact interpretation.
    </p>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'DataExplanation',
  props: ['context'],
}
</script>
