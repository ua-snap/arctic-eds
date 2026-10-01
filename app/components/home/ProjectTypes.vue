<template>
  <section class="container" aria-labelledby="project-types-title">
    <header class="container is-max-desktop has-text-centered mb-6">
      <h2
        id="project-types-title"
        class="title is-2 is-size-3-mobile is-spaced has-text-weight-light"
      >
        Scientific datasets for engineering and transportation across Alaska
      </h2>
      <p class="subtitle is-5">
        What are you building, and what do you need to know about changing
        conditions there?
      </p>
    </header>

    <ul class="columns is-multiline">
      <li
        v-for="topic in topics"
        :key="topic.slug"
        class="column is-half-tablet is-one-third-desktop is-flex"
      >
        <NuxtLink
          :to="`/for/${topic.slug}`"
          class="card is-flex-grow-1 is-flex is-flex-direction-column"
        >
          <div
            class="card-content is-flex-grow-1 is-flex is-flex-direction-column"
          >
            <p
              class="is-size-7 is-uppercase has-text-weight-semibold has-text-grey mb-3"
            >
              {{ topic.name }}
            </p>
            <h3
              class="title is-4 is-family-secondary has-text-weight-extrabold"
            >
              {{ topic.question }}
            </h3>
            <p>{{ topic.summary }}</p>
            <p
              class="mt-auto pt-5 has-text-link has-text-weight-semibold"
              aria-hidden="true"
            >
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
