<template>
  <div class="container">
    <div class="content is-size-5">
      <h2>Glossary of terms</h2>
      <dl>
        <dt><a id="dynamical-downscaling">Dynamical downscaling</a></dt>
        <dd>
          Dynamical downscaling involves setting up boundary conditions for a
          region using a relatively coarse Global Climate Model (GCM), then
          creating a higher resolution regional model based on physical
          principles. This method is computationally intensive.
        </dd>
        <dt><a id="emissions-scenario">Emissions Scenario</a></dt>
        <dd>
          Emission scenarios reflect plausible future human greenhouse gas and
          other aerosol emissions. In the past, the Intergovernmental Panel on
          Climate Change (IPCC) referenced emission scenarios when describing
          possible pathways for climate change. Later, Representative
          Concentration Pathways (RCPs) were designed to help climate modelers
          connect emissions trajectories with Radiative Forcing values. The
          RCP4.5 scenario represented a future with fewer increases to emssions,
          and the RCP8.5 scenario represented a future with greater global
          emissions. RCP6.0 was a middle-of-the-road scenario. Today, the
          scenarios used by the IPCC are known as Shared Socio-economic
          Pathways, or SSPs. SSPs include information about demographics and
          policy, which underlie each scenario.
        </dd>
        <dt><a id="exceedance-probability">Exceedance Probability</a></dt>
        <dd>
          Exceedance probability is the statistically determined probability
          that a certain value will be exceeded in a specified future time
          period. In hydrology, the exceedance probability is the inverse of the
          annual recurrence interval, return interval, or return period.
        </dd>
        <dt><a id="reanalaysis">Reanalysis</a></dt>
        <dd>
          Climate reanalyses combine past weather observations with models to
          generate time series of climate variables. ERA5 is the latest climate
          reanalysis produced by the European Centre for Medium-Range Weather
          Forecasts (ECMWF). It provides hourly data on multiple parameters,
          with estimates of uncertainty.
        </dd>
        <dt><a id="statistical-downscaling">Statistical Downscaling</a></dt>
        <dd>
          Statistical downscaling involves defining a mathematical relationship
          between historic observed climate data and the output of GCMs or other
          climate models for the same time period, then using this relationship
          to create future projections.
        </dd>
      </dl>
    </div>
  </div>
</template>

<style lang="scss" scoped>
dt {
  font-weight: 500;
  margin-top: 1.5rem;

  a {
    color: black !important;
    cursor: default;
  }
}
</style>

<script>
export default {
  layout: 'content',
}
</script>
