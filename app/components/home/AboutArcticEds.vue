<template>
  <section class="about-arctic-eds" aria-labelledby="about-title">
    <h2 id="about-title" class="title is-2">How Arctic-EDS works</h2>

    <ul class="summary">
      <li>
        <strong>Future conditions, ready for design.</strong>
        Arctic-EDS gathers model projections for Alaska, picks the ones that
        perform best here, and puts them in one report for your site.
      </li>
      <li>
        <strong>Change, not a single number.</strong>
        Each report compares the future with the model’s own historical
        baseline, so you see how far a parameter moves and how much the models
        agree.
      </li>
      <li>
        <strong>Everything traceable.</strong>
        Every section links to its source data, references and a CSV download,
        and the <NuxtLink to="/guidance">Guidance</NuxtLink> page covers
        applying it to a design.
      </li>
    </ul>

    <div class="concepts">
      <h3 class="concepts-title">Key ideas you’ll meet</h3>
      <ul class="concept-list">
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

<style lang="scss" scoped>
.about-arctic-eds {
  max-width: 60rem;
  margin: 0 auto;
}
// Matches the light headings of the sections above.
.title {
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 300;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: #312e30;
  text-align: center;
  margin-bottom: 2.5rem;
}

// Three short statements, side by side on wide screens.
.summary {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem 2.5rem;
  margin-bottom: 3rem;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #3d3a3b;

  strong {
    display: block;
    font-size: 1.2rem;
    line-height: 1.3;
    color: #312e30;
    margin-bottom: 0.4rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
  }
}

.concepts {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #ebe8e3;
}
.concepts-title {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6b6866;
  margin-bottom: 1rem;
}
.concept-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;

  // Each concept is a tag-like button that opens its definition.
  :deep(.definition-trigger) {
    border: 1px solid #cfd8d5;
    border-radius: 999px;
    padding: 0.4rem 0.9rem;
    background: #f3f7f6;
    color: #24413d;
    font-weight: 600;
    font-size: 0.95rem;

    &:hover,
    &[data-state='open'] {
      background: #e1ebe8;
      border-color: #8ba09a;
    }
  }
}
</style>
