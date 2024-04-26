<template>
  <div class="container">
    <div class="content is-size-5">
      <h2>Glossary of terms</h2>
      <dl>
        <dt><a id="bias_correction">Bias correction</a></dt>
        <dd>
          Bias-correction is the process of mathematically scaling climate model
          outputs to account for their systematic errors, in order to improve
          their fitting to observations. Bias correction methods can be
          mathematically simple, e.g. subtraction, or more complex, e.g. fitting
          statistical curves. No climate model or data processing technique can
          entirely eliminate uncertainty, but bias-correction can help reduce
          mismatches between modeled gridded data and measured historical data
          for point locations. Bias correction is applied to most modeled
          climate data.
        </dd>
        <dt><a id="downscaling">Downscaling</a></dt>
        <dd>
          Downscaling is a collection of methods which can transform
          lower-resolution (coarser, more pixelated) datasets into
          higher-resolution products. This is useful for providing increased
          detail on local conditions. Downscaling techniques can be divided into
          two broad categories: dynamical and statistical.

          <dl>
            <dt><a id="dynamical-downscaling">Dynamical downscaling</a></dt>
            <dd>
              Dynamical downscaling involves setting up boundary conditions for
              a region using a relatively coarse Global Climate Model (GCM),
              then creating a higher resolution regional model based on physical
              principles. This method is computationally intensive.
            </dd>
            <dt><a id="statistical-downscaling">Statistical downscaling</a></dt>
            <dd>
              Statistical downscaling involves defining a mathematical
              relationship between historic observed climate data and the output
              of GCMs or other climate models for the same time period, then
              using this relationship to create future projections.
            </dd>
          </dl>
        </dd>

        <dt><a id="emissions-scenario">Emissions scenario</a></dt>
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
        <dt><a id="exceedance-probability">Exceedance probability</a></dt>
        <dd>
          Exceedance probability is the statistically determined probability
          that a certain value will be exceeded in a specified future time
          period. In hydrology, the exceedance probability is the inverse of the
          annual recurrence interval, return interval, or return period.
        </dd>
        <dt><a id="gcm">Global climate model (GCM)</a></dt>
        <dd>
          A global climate model (GCM) is a mathematical representation of the
          interactions and energy balance among Earth’s atmosphere, land
          surface, ocean, and sea ice. Climate models divide the globe into a
          three-dimensional grid of cells that interact with one another as a
          coupled system. Outputs from GCMs provide long-term climate
          projections.
        </dd>
        <dt><a id="gridded_dataset">Gridded dataset</a></dt>
        <dd>
          A gridded dataset is a continuous grid-based representation of a
          variable (e.g. temperature) in two dimensions (e.g latitude and
          longitude). In contrast, point datasets or line (vector) datasets
          offer values for only a subset of possible locations (e.g. cities,
          rivers, or roads). Gridded datasets may be low-resolution (large grid
          cells) or high-resolution, but do not have data gaps or
          discontinuities. If gridded datasets are created from point or vector
          datasets, mathematical interpolation and modeling is required.
        </dd>

        <dt><a id="reanalaysis">Reanalysis</a></dt>
        <dd>
          Climate reanalyses combine past weather observations with models to
          generate time series of climate variables. ERA5 is the latest climate
          reanalysis produced by the European Centre for Medium-Range Weather
          Forecasts (ECMWF). It provides hourly data on multiple parameters,
          with estimates of uncertainty.
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

<script></script>
