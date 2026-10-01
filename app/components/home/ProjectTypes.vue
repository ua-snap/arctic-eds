<template>
  <section class="project-types" aria-labelledby="project-types-title">
    <header class="project-types-header">
      <h2 id="project-types-title" class="title is-2">
        Scientific datasets for engineering and transportation across Alaska
      </h2>
      <p class="lede">
        What are you building, and what do you need to know about changing
        conditions there?
      </p>
    </header>

    <ul class="columns is-multiline">
      <li
        v-for="topic in topics"
        :key="topic.slug"
        class="column is-half-tablet is-one-third-desktop"
      >
        <NuxtLink :to="`/for/${topic.slug}`" class="card">
          <div class="card-content">
            <p class="project-name">{{ topic.name }}</p>
            <h3 class="question">{{ topic.question }}</h3>
            <p class="data">{{ topic.summary }}</p>
            <p class="more" aria-hidden="true">
              More {{ topic.name.toLowerCase() }} questions →
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { topics } from '~/data/topics'
</script>

<style lang="scss" scoped>
.project-types {
  max-width: 1180px;
  margin: 0 auto;
}
// Matches the sample section's heading: light, centred, explanatory.
.project-types-header {
  text-align: center;
  margin-bottom: 2.75rem;

  .title {
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
    margin: 0 auto;
  }
}
ul.columns {
  list-style: none;
  // Room between cards: Bulma uses this for the column padding and the
  // matching negative margins (its default is 0.75rem).
  --bulma-column-gap: 1rem;
}
.card {
  display: block;
  height: 100%;
  box-shadow: none;
  border: 1px solid #dcd8d2;
  color: inherit;
  transition: border-color 0.15s;

  &:hover {
    border-color: #312e30;

    .question {
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 4px;
    }
  }
}
.card-content {
  // A column, so the "More …" link sits at the bottom of every card in a row.
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem 2rem 1.75rem;
}
// The question carries the card; the project type is a small label above it.
.project-name {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6b6866;
  margin-bottom: 0.75rem;
}
.question {
  font-family: 'Barlow', sans-serif;
  font-weight: 900;
  font-size: 1.45rem;
  line-height: 1.2;
  color: #312e30;
  margin-bottom: 0.9rem;
}
.data {
  font-size: 1rem;
  line-height: 1.55;
  color: #4a4746;
}
.more {
  margin-top: auto;
  padding-top: 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #2f5f5a;
}
</style>
