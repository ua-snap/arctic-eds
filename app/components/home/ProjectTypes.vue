<template>
  <section class="project-types" aria-labelledby="project-types-title">
    <div class="project-types-header">
      <h2 id="project-types-title" class="title is-3 mb-0">
        What engineers use it for
      </h2>
      <p class="has-text-grey-dark">
        Every report covers every dataset, whatever you’re building.
      </p>
    </div>

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

    <div class="notification something-else">
      <p>
        <strong>Working on something else?</strong> Search any Alaska site
        above. Every report includes temperature, precipitation, design storms,
        snowfall, hydrology, degree days and permafrost.
      </p>
      <NuxtLink to="/data-sources" class="button is-primary is-outlined"
        >Browse the data sources</NuxtLink
      >
    </div>
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
.project-types-header {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}
ul.columns {
  list-style: none;
  margin-left: -0.75rem;
  margin-right: -0.75rem;
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
      text-decoration-thickness: 3px;
      text-underline-offset: 4px;
    }
  }
}
.card-content {
  padding: 1.5rem 1.5rem 1.75rem;
}
// The question carries the card; the project type is a small label above it.
.project-name {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #5c5a58;
  margin-bottom: 0.5rem;
}
.question {
  font-family: 'Barlow', sans-serif;
  font-weight: 900;
  font-size: 1.75rem;
  line-height: 1.1;
  color: #312e30;
  margin-bottom: 0.75rem;
}
.data {
  font-size: 0.9rem;
  color: #5c5a58;
}
.more {
  margin-top: 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #2f5f5a;
}
.something-else {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 1.5rem;
  background: #fff;
  border: 1px solid #dcd8d2;
}
</style>
