<template>
  <section class="container is-max-desktop" aria-labelledby="about-title">
    <h2
      id="about-title"
      class="title is-2 is-size-3-mobile has-text-weight-light has-text-centered mb-6"
    >
      How Arctic-EDS works
    </h2>

    <ul class="columns mb-6">
      <li class="column">
        <strong class="is-block is-size-5 mb-2"
          >Future conditions, ready for design.</strong
        >
        Arctic-EDS gathers model projections for Alaska, picks the ones that
        perform best here, and puts them in one report for your site.
      </li>
      <li class="column">
        <strong class="is-block is-size-5 mb-2"
          >Change, not a single number.</strong
        >
        Each report compares the future with the model’s own historical
        baseline, so you see how far a parameter moves and how much the models
        agree.
      </li>
      <li class="column">
        <strong class="is-block is-size-5 mb-2">Everything traceable.</strong>
        Every section links to its source data, references and a CSV download,
        and the <NuxtLink to="/guidance">Guidance</NuxtLink> page covers
        applying it to a design.
      </li>
    </ul>

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
