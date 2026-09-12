<template>
  <div class="container">
    <div class="content clamp is-size-5">
      <h1>Guidance: using and interpreting Arctic-EDS data</h1>
      <h2>What is the Arctic-EDS?</h2>
      <p>
        The purpose of the Arctic Environmental and Engineering Data and Design
        Support System (Arctic-EDS) is to apply downscaled climate model output
        to existing engineering methods. The Arctic-EDS simplifies and
        centralizes the process of finding, selecting, extracting, and
        formatting downscaled climate model output for engineering applications.
      </p>
      <h2>Why use the Arctic-EDS?</h2>
      <p>
        Design standards relying solely on historical observations may assume
        that the climate is stationary - but an Arctic climate warming four
        times faster than the rest of world (Rantanen et al., 2022) and numerous
        simulations of climate futures indicate that the past is no longer a
        reliable portrait of the conditions under which infrastructure will have
        to perform in the future. Moreover, historical data from climate
        stations is very limited. While actual historical datasets consisting of
        precise measurements for particular times and locations are preferred,
        such records are sparse for Alaska and the Arctic. Earth&rsquo;s climate
        processes are continuous in time and space, but measurements of
        Earth&rsquo;s climate are not.
      </p>
      <h2>View our video walkthrough</h2>
      <figure>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/_OCvLhlHQFQ?si=vcXw92WVJmx8H6Fn"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </figure>
      <h2>How can I use the data in the Arctic-EDS?</h2>
      <ul>
        <li>
          Use data summaries to look for trends and change compared to model
          baselines. Minimum and maximum values show extremes&mdash;use these to
          establish the outliers. Use mean values to look for changes in general
          trends.
        </li>
        <li>Summarize data over 30-year eras, or decadally.</li>
        <li>
          Use multiple models and scenarios to gain insight into the range of
          possible futures.
        </li>
        <li>
          Read the referenced academic papers to better understand how the data
          are generated, how they can be applied, and limitations or
          considerations to their use.
        </li>
        <li>
          Take further steps with the data: perform additional downscaling or
          local bias-correction to point-based sensors.
        </li>
      </ul>
      <h2>What are the limitations of the Arctic-EDS?</h2>
      <ul>
        <li>
          <strong>Climate modeling is imperfect</strong>. Even the most
          sophisticated climate models cannot perfectly simulate the totality of
          the Earth&rsquo;s complex climate system.
        </li>
        <li>
          <strong>Different climate models use different assumptions</strong>.
          Each individual simulation represents choices regarding how to
          represent and compute Earth&rsquo;s climate system: these assumptions
          and parameterizations induce uncertainty and bias.
        </li>
        <li>
          <strong>Human behavior is unpredictable</strong>. Emissions scenarios
          called <i>representative concentration pathways</i> (RCPs) or
          <i> shared socioeconomic pathways </i> (SSPs) represent various social
          and economic futures and are used to parameterize climate simulations.
        </li>
        <li>
          <strong
            >Creating seamless gridded baseline datasets requires filling
            gaps</strong
          >. Interpolation and extrapolation based on the best available data
          and statistical algorithms are used to create climate &ldquo;maps
          without gaps&rdquo;&mdash;but this process is imperfect. Modeled
          baseline data are outputs from a statistical model, not local
          observational measurements.
        </li>
        <li>
          <strong
            >Modeled and interpolated data cannot be directly compared to
            observational historical data</strong
          >. Modeled and interpolated gridded data represent broader spatial
          extents (from 1-20 square kilometers) and incorporate variations in
          geography and altitude which won&rsquo;t align with point-based
          station data. See below for further guidance regarding bias correction
          to point-based observational data.
        </li>
        <li>
          <strong
            >Data are not available at extremely fine spatial scales</strong
          >. For example, modeled baseline data may represent a 12 km x 12 km
          grid cell, not a single point. Variations in elevation and other
          geographic factors within the entire 144 km<sup>2</sup> area of the
          grid cell influence the value of that cell. Even with the best
          downscaling methods, climate models cannot capture all microclimate
          variability. For example, a small pond or hillock within a grid cell
          might experience permafrost conditions and dynamics not represented by
          the grid cell itself.
        </li>
        <li>
          <strong
            >Data are not available at extremely fine temporal scales</strong
          >. For example, estimates for extreme precipitation for a time period
          of less than one hour are not available in the Arctic-EDS because such
          short durations cannot be statistically validated.
        </li>
        <li>
          <strong
            >Incorporating downscaled climate model output to engineering
            applications introduces uncertainties</strong
          >
          when compared with engineering processes that rely solely on
          historical observation data.
        </li>
      </ul>

      <h2>How does Arctic-EDS regulate uncertainties?</h2>
      <ul>
        <li>
          The Arctic-EDS presents data from multiple climate models and multiple
          emissions scenarios to provide ensemble ranges and bounds for each
          type of variable.
        </li>
        <li>
          Each dataset includes details on its spatial and temporal scales.
        </li>
        <li>
          Data have been bias-corrected via the comparison of hindcast climate
          model simulations to historical conditions.
        </li>
      </ul>
      <h2>What is bias correction?</h2>
      <p>
        Bias correction is the process of mathematically scaling climate model
        outputs to account for their systematic errors in order to improve their
        performance with respect to a modeled baseline or to actual historical
        observations. Bias correction methods can be mathematically simple, e.g.
        subtraction via the delta method, or more complex, e.g. quantile mapping
        or machine learning models.
      </p>

      <p>
        No climate model or data processing technique entirely eliminates
        uncertainty, but bias correction can reduce mismatches between modeled
        baseline gridded data and measured historical point location data. Bias
        correction is applied to most downscaled climate model output.
      </p>
      <h3>What degree of bias correction is sufficient?</h3>
      <p>
        The ultimate precision of bias correction required depends on the
        application. In some use cases, additional bias correction beyond what
        is already present in the Arctic-EDS may be necessary to seamlessly
        transition from engineering practices based on actual historical data to
        techniques using downscaled climate model output. High precision bias
        correction is less important when the application focuses on trends
        rather than actual values. Precision is most important when the
        application requires thresholds or exceedence values, or in relation to
        extreme events.
      </p>

      <p>
        For example, if an engineering standard is based on mean annual
        temperature, a discrepancy between 6.0°C (measured historical) and 5.1°C
        (baseline modeled) may be less important if the projected modeled data
        have a warming trend of 1.0°C per decade leading to a mean annual
        temperature of 12.1°C by end of the time period relevant to the
        application. However, the same temperature discrepancy might yield an
        alarming divergence in values if the metric of interest is degree days
        above or below a particular threshold, or if the metric were dependent
        on a phase change such as permafrost thaw or dewpoint.
      </p>

      <p>
        In a hypothetical case in which cooling degree days above 25°C were
        calculated for a location in which the actual historical measured
        temperature was 25°C each day of the year, but the modeled baseline
        temperature was 26°C each day of the year, the annual cumulative sum of
        the former would yield a value of 0 degree days while the latter would
        yield a value of 365 degree days&mdash;showing how the interaction of
        thresholds can impact calculation and interpretation of climate model
        output.
      </p>
      <h2>What techniques can aid in using the Arctic-EDS?</h2>
      <p>
        <strong>
          Peer reviewed frameworks for applying downscaled climate model output
          to engineering applications exist.
        </strong>
      </p>

      <p>Cook et al. (2017) propose a six step framework:</p>
      <ol>
        <li>
          define the existing design standard or application that relies on
          climate information
        </li>
        <li>
          understand the historical requirements for the existing standard and
          retrieve data
        </li>
        <li>
          appropriate climate model output based on requirements for the
          existing application
        </li>
        <li>account for climate model uncertainty and reliability</li>
        <li>
          incorporate climate model output into the required engineering format
        </li>
        <li>
          interpret the results and incorporate changes into design practice
        </li>
      </ol>

      <p>
        The Arctic-EDS can enhance and perhaps even fulfill steps within this
        framework via pre-selection of models and scenarios, bias correction,
        and uncertainty regulation&mdash;but it is not a turnkey solution. Each
        engineering application may require additional steps (additional bias
        correction or spatial/temporal downscaling) to appropriately interpret
        downscaled climate model outputs and apply them to a specific
        engineering design.
      </p>

      <p>
        Further tool updates will continue to refine and assist with techniques
        and guidance for data use. We suggest using multiple models, being
        transparent about assumptions, and assessing tradeoffs in risk,
        resiliency, performance, and costs while designing for low-regret,
        adaptability, and robustness.
      </p>
      <h2>References</h2>
      <blockquote>
        Rantanen, M., Karpechko, A. Y., Lipponen, A., Nordling, K., Hyvärinen,
        O., Ruosteenoja, K., ... & Laaksonen, A. (2022). The Arctic has warmed
        nearly four times faster than the globe since 1979.
        <i>Communications earth & environment</i>, 3(1), 168.
        <a href="https://doi.org/10.1038/s43247-022-00498-3"
          >https://doi.org/10.1038/s43247-022-00498-3</a
        >
      </blockquote>

      <blockquote>
        Cook, L. M., Anderson, C. J., & Samaras, C. (2017). Framework for
        incorporating downscaled climate output into existing engineering
        methods: Application to precipitation frequency curves.
        <i>Journal of Infrastructure Systems</i>, 23(4), 04017027.
        <a href="https://doi.org/10.1184/R1/5257867.v2"
          >https://doi.org/10.1184/R1/5257867.v2</a
        >
      </blockquote>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 2rem;
}
h2 {
  font-size: 1.85rem;
  margin-bottom: 0.5rem;
}
</style>

<script></script>
