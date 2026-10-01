<template>
  <section class="sample-report" aria-labelledby="sample-report-title">
    <h2 id="sample-report-title" class="title is-2">
      Reports show how physical and environmental parameters are changing
    </h2>
    <p class="lede">
      Each report sets projections beside modeled historical baselines for your
      site and shows the range across models.
    </p>

    <!--
      A picture of a report summary, not live data: it fades out and is
      labelled as a sample so it doesn't read as a working tool. The image is
      a screenshot of the Fairbanks example the home page used to render
      (see git history for ShiftExample.vue).
    -->
    <figure class="sample-figure">
      <img
        :src="sampleReportImage"
        width="2360"
        height="1044"
        loading="lazy"
        alt="Sample report summary for Fairbanks, mid-century versus the historical baseline: freezing index down 26%, thawing index up 21%, heating degree days down 14% and annual precipitation up 26%, each with its range across models, and a 24-hour, 100-year design storm of 3.4 to 6.1 inches."
      />
      <span class="tag sample-tag" aria-hidden="true">Sample</span>
    </figure>

    <p class="sample-link">
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
.sample-report {
  max-width: 1180px;
  margin: 0 auto;
  text-align: center;
}
.title {
  // Light, so this section reads as explanation rather than competing with
  // the page's Barlow headline and the bold topic cards below.
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 300;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: #312e30;
  max-width: 44rem;
  margin: 0 auto 0.75rem;
}
.lede {
  font-size: 1.15rem;
  color: #3d3a3b;
  max-width: 40rem;
  margin: 0 auto 2rem;
}

.sample-figure {
  position: relative;
  // Show the top of the summary; the fade takes the rest.
  max-height: 440px;
  overflow: hidden;
  user-select: none;

  img {
    display: block;
    width: 100%;
    height: auto;
    filter: saturate(0.7);
  }

  // The fade: clear at the top, solid background colour at the bottom.
  // A parent band sets --sample-fade-to to its own colour; otherwise it's
  // the page background.
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      color-mix(in srgb, var(--sample-fade-to, #faf9f7) 15%, transparent) 35%,
      color-mix(in srgb, var(--sample-fade-to, #faf9f7) 85%, transparent) 75%,
      var(--sample-fade-to, #faf9f7) 100%
    );
    pointer-events: none;
  }
}
.sample-tag {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: #312e30;
  color: #fff;
}
.sample-link {
  margin-top: -1.5rem;
  position: relative;
  font-weight: 600;
}

// Phones: the whole summary would be too small to read, so show its left
// side (parameters and shifts) at a readable size instead.
@media (max-width: 768px) {
  .sample-figure img {
    height: 280px;
    object-fit: cover;
    object-position: left top;
  }
  .sample-tag {
    top: 0.5rem;
    right: 0.5rem;
    font-size: 0.65rem;
  }
}
</style>
