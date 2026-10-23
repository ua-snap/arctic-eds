<template>
  <section class="container is-max-desktop" aria-labelledby="about-title">
    <h2
      id="about-title"
      class="title is-2 is-size-3-mobile has-text-weight-light has-text-centered mb-6"
    >
      Arctic-EDS Functionality
    </h2>

    <div class="content is-size-5 mx-auto mb-6">
      <ul>
        <li>
          Arctic-EDS gathers the best available model projections for Alaska and
          puts them in one report for your site.
        </li>
        <li>
          Each report offers data from multiple models and compares projections
          with each model’s own historical baseline, so you see how far a
          parameter moves and how much the models agree.
        </li>
        <li>
          Every section links to its source data, applicable scientific
          references, and a CSV download.
        </li>
        <li>
          The <NuxtLink to="/guidance">Guidance</NuxtLink> page offers support
          and examples for applying report data to a plan, decision-making
          process, or design.
        </li>
      </ul>
    </div>

    <div class="has-text-centered">
      <h3
        class="is-size-7 is-uppercase has-text-weight-semibold has-text-grey mb-4"
      >
        Key ideas you’ll meet
      </h3>
      <ul class="buttons is-centered">
        <li v-for="concept in concepts" :key="concept.term">
          <DefinitionTip
            :term="concept.term"
            :definition="concept.definition"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import DefinitionTip from '~/components/DefinitionTip'

// The terms people meet in a report, each with a short definition. The
// longer versions of some live on the glossary page.
const concepts = [
  {
    term: 'Modeled baseline',
    definition:
      'The models’ simulation of the historical period. Projections are compared with it, rather than with weather-station records, which won’t match a grid cell exactly.',
  },
  {
    term: 'Projected shift',
    definition:
      'The future value minus the modeled baseline: how far a parameter is expected to move.',
  },
  {
    term: 'Range across models',
    definition:
      'The spread from the lowest to the highest projection. A wide range means the models disagree, which is worth designing around.',
  },
  {
    term: 'Emissions scenario',
    definition:
      'An assumed path for future greenhouse gas emissions. Reports use RCP 4.5 (lower), 6.0 and 8.5 (higher).',
  },
  {
    term: 'Downscaling',
    definition:
      'Turning coarse global model output into higher-resolution data, for more detail on local conditions.',
  },
  {
    term: 'Bias correction',
    definition:
      'Adjusting model output for its systematic errors, so it better matches observations.',
  },
  {
    term: 'Grid cell',
    definition:
      'Values are averaged over an area, from about 0.5 to 12 km across depending on the dataset, so they describe the surrounding area rather than an exact point.',
  },
  {
    term: 'Return period',
    definition:
      'The average time between events of a given size. A 100-year storm has a 1% chance of happening in any year.',
  },
]
</script>
