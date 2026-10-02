<template>
  <div class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li class="is-active">
          <a aria-current="page">{{ topic.name }}</a>
        </li>
      </ul>
    </nav>

    <header class="mb-6">
      <p
        class="is-size-7 is-uppercase has-text-weight-semibold has-text-grey mb-2"
      >
        {{ topic.name }}
      </p>
      <h1
        class="title is-1 is-size-2-mobile is-spaced is-family-secondary has-text-weight-extrabold"
      >
        {{ topic.question }}
      </h1>
      <p class="subtitle is-5">{{ topic.intro }}</p>
    </header>

    <!-- The way into the report, through this topic. -->
    <section
      id="site-search"
      class="box mb-6"
      aria-labelledby="site-search-title"
    >
      <h2
        id="site-search-title"
        class="title is-4 is-family-secondary has-text-weight-extrabold"
      >
        Choose your site, see the parameter shift
      </h2>
      <PlaceSearch :lens="topic.slug" />
      <p class="mt-3 has-text-grey">
        Try
        <template v-for="(place, index) in tryPlaces" :key="place.id">
          <NuxtLink
            :to="{
              path: `/report/community/${place.id}`,
              query: { for: topic.slug },
              hash: '#results',
            }"
            >{{ place.name }}</NuxtLink
          ><span v-if="index < tryPlaces.length - 1" aria-hidden="true">
            ·
          </span>
        </template>
      </p>
    </section>

    <section class="mb-6" aria-labelledby="questions-title">
      <h2
        id="questions-title"
        class="is-size-7 is-uppercase has-text-weight-semibold has-text-grey mb-4"
      >
        Questions your report can answer
      </h2>
      <ul class="columns is-multiline">
        <li
          v-for="question in topic.questions"
          :key="question.text"
          class="column is-half-tablet"
        >
          <p
            class="title is-4 is-family-secondary has-text-weight-extrabold mb-3"
          >
            {{ question.text }}
          </p>
          <p class="tags">
            <span class="is-sr-only">Answered by:</span>
            <span
              v-for="key in question.datasets"
              :key="key"
              class="tag is-primary is-light is-medium"
              >{{ datasets[key].name }}</span
            >
          </p>
        </li>
      </ul>
    </section>

    <section class="mb-6" aria-labelledby="datasets-title">
      <h2
        id="datasets-title"
        class="is-size-7 is-uppercase has-text-weight-semibold has-text-grey mb-4"
      >
        The data in play
      </h2>
      <div class="columns is-multiline">
        <article
          v-for="key in topic.datasets"
          :key="key"
          class="column is-half-tablet is-one-third-desktop"
        >
          <h3 class="title is-4 is-family-secondary has-text-weight-extrabold">
            {{ datasets[key].name }}
          </h3>
          <p class="mb-2">{{ datasets[key].what }}</p>
          <p class="is-size-7 has-text-grey">{{ datasets[key].detail }}</p>
        </article>
      </div>
      <p class="has-text-grey">
        Every report also includes the other datasets.
        <NuxtLink to="/data-sources">See all data sources</NuxtLink>.
      </p>
    </section>

    <section aria-labelledby="other-topics-title">
      <h2
        id="other-topics-title"
        class="is-size-7 is-uppercase has-text-weight-semibold has-text-grey mb-4"
      >
        Other kinds of work
      </h2>
      <ul class="is-flex is-flex-wrap-wrap">
        <li
          v-for="other in otherTopics"
          :key="other.slug"
          class="mr-5 mb-2 has-text-weight-semibold"
        >
          <NuxtLink :to="`/for/${other.slug}`">{{ other.name }}</NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PlaceSearch from '~/components/PlaceSearch'
import { tryPlaces } from '~/data/home'
import { datasets, findTopic, topics } from '~/data/topics'

const route = useRoute()

const topic = computed(() => findTopic(route.params.topic))
if (!topic.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const otherTopics = computed(() =>
  topics.filter(other => other.slug !== topic.value.slug)
)

useHead(() => ({
  title: `${topic.value.name} · Arctic-EDS`,
}))
</script>
