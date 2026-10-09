<template>
  <section class="container" aria-labelledby="sample-report-title">
    <div class="container is-max-desktop has-text-centered mb-5">
      <h2
        id="sample-report-title"
        class="title is-2 is-size-3-mobile is-spaced has-text-weight-light"
      >
        Reports show how physical and environmental parameters are changing
      </h2>
      <p class="subtitle is-5">
        Each report sets projections beside modeled historical baselines for
        your site and shows the range across models.
      </p>
    </div>

    <!--
      A picture of a report summary, not live data: it fades out and is
      labelled as a sample so it doesn't read as a working tool. The image is
      a screenshot of the Fairbanks report's summary (report/ReportSummary.vue)
      at 1180px wide and 2x, with "Fairbanks" in place of its "Summary" label.
    -->
    <p class="has-text-right mb-2" aria-hidden="true">
      <span
        class="tag has-background-grey-dark has-text-white is-uppercase has-text-weight-semibold"
        >Sample</span
      >
    </p>
    <figure class="image sample-figure">
      <img
        :src="sampleReportImage"
        width="2360"
        height="1144"
        loading="lazy"
        alt="Sample report summary for Fairbanks, mid-century versus the 1980 to 2009 baseline: air temperature up 7.5°F (models range from up 4.7°F to up 10.0°F), freezing index down 26% (down 39% to down 13%), thawing index up 21% (up 8% to up 37%), heating degree days down 14% (down 22% to down 7%) and annual precipitation up 30% (up 18% to up 61%)."
      />
    </figure>

    <p class="has-text-centered has-text-weight-semibold">
      <NuxtLink :to="exampleSite.path"
        >Open the full Fairbanks report →</NuxtLink
      >
    </p>
  </section>
</template>

<script setup>
import sampleReportImage from '~/assets/images/sample-report.png'
import { exampleSite } from '~/data/home'
</script>

<style lang="scss" scoped>
// Show the top of the summary and fade the rest out. On phones the whole
// summary would be too small to read, so show its left side (parameters and
// shifts) at a readable size instead.
.sample-figure {
  max-height: 440px;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, black 35%, transparent);

  @media screen and (max-width: 768px) {
    img {
      height: 280px;
      object-fit: cover;
      object-position: left top;
    }
  }
}
</style>
