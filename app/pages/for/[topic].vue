<template>
  <div class="topic-page">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li class="is-active">
          <a aria-current="page">{{ topic.name }}</a>
        </li>
      </ul>
    </nav>

    <header class="topic-header">
      <p class="eyebrow">{{ topic.name }}</p>
      <h1 class="title is-1">{{ topic.question }}</h1>
      <p class="intro">{{ topic.intro }}</p>
    </header>

    <!-- The way into the report, through this topic. -->
    <section
      id="site-search"
      class="box site-search"
      aria-labelledby="site-search-title"
    >
      <h2 id="site-search-title" class="title is-3">
        Choose your site, see the parameter shift
      </h2>
      <PlaceSearch :lens="topic.slug" />
      <p class="try">
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

    <section class="questions" aria-labelledby="questions-title">
      <h2 id="questions-title" class="section-title">
        Questions your report can answer
      </h2>
      <ul class="question-list">
        <li v-for="question in topic.questions" :key="question.text">
          <p class="question">{{ question.text }}</p>
          <p class="answered-by">
            <span class="visually-hidden">Answered by:</span>
            <span
              v-for="key in question.datasets"
              :key="key"
              class="tag is-medium"
              >{{ datasets[key].name }}</span
            >
          </p>
        </li>
      </ul>
    </section>

    <section class="datasets" aria-labelledby="datasets-title">
      <h2 id="datasets-title" class="section-title">The data in play</h2>
      <div class="columns is-multiline">
        <div
          v-for="key in topic.datasets"
          :key="key"
          class="column is-half-tablet is-one-third-desktop"
        >
          <article class="dataset">
            <h3 class="dataset-name">{{ datasets[key].name }}</h3>
            <p class="dataset-what">{{ datasets[key].what }}</p>
            <p class="dataset-detail">{{ datasets[key].detail }}</p>
          </article>
        </div>
      </div>
      <p class="all-data">
        Every report also includes the other datasets.
        <NuxtLink to="/data-sources">See all data sources</NuxtLink>.
      </p>
    </section>

    <section class="other-topics" aria-labelledby="other-topics-title">
      <h2 id="other-topics-title" class="section-title">Other kinds of work</h2>
      <ul>
        <li v-for="other in otherTopics" :key="other.slug">
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

<style lang="scss" scoped>
.topic-page {
  max-width: 1180px;
  margin: 0 auto;
}
.eyebrow {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #5c5a58;
  margin-bottom: 0.5rem;
}
.topic-header {
  max-width: 50rem;
  margin: 1.5rem 0 2rem;

  .title {
    font-family: 'Barlow', sans-serif;
    font-weight: 900;
    font-size: clamp(2.25rem, 5vw, 3.5rem);
    line-height: 1.05;
    margin-bottom: 1rem;
  }
  .intro {
    font-size: 1.25rem;
    color: #3d3a3b;
  }
}

.site-search {
  box-shadow: none;
  border: 2px solid #312e30;
  padding: 2rem;
  margin-bottom: 3.5rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }

  .title {
    font-family: 'Barlow', sans-serif;
    font-weight: 900;
    margin-bottom: 1.25rem;
  }
  .try {
    margin-top: 0.75rem;
    color: #5c5a58;
  }
}

.section-title {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #5c5a58;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #dcd8d2;
  margin-bottom: 1.5rem;
}

.questions {
  margin-bottom: 3.5rem;
}
.question-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem 3rem;

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
  }
}
.question {
  font-family: 'Barlow', sans-serif;
  font-weight: 900;
  font-size: 1.6rem;
  line-height: 1.12;
  color: #312e30;
  margin-bottom: 0.6rem;
}
.answered-by {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;

  .tag {
    font-weight: 600;
    background: #e6eeec;
    color: #24413d;
  }
}

.datasets {
  margin-bottom: 3.5rem;
}
.dataset {
  height: 100%;
  border-top: 6px solid #312e30;
  padding-top: 1rem;
}
.dataset-name {
  font-family: 'Barlow', sans-serif;
  font-weight: 900;
  font-size: 1.75rem;
  line-height: 1.1;
  margin-bottom: 0.5rem;
}
.dataset-what {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.dataset-detail {
  font-size: 0.85rem;
  color: #5c5a58;
}
.all-data {
  margin-top: 0.5rem;
  color: #5c5a58;
}

.other-topics ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 2rem;

  a {
    font-weight: 600;
  }
}
</style>
