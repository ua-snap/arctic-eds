<template>
  <!-- Shown when the report was opened from a topic page (?for=<slug>). -->
  <aside v-if="topic" class="notification report-lens" aria-label="Start here">
    <p class="lens-title">
      For <strong>{{ topic.name.toLowerCase() }}</strong
      >, start with:
    </p>
    <ul class="lens-sections">
      <li v-for="key in topic.datasets" :key="key">
        <a :href="`#${datasets[key].section}`">{{ datasets[key].name }}</a>
      </li>
    </ul>
    <p class="lens-back">
      <NuxtLink :to="`/for/${topic.slug}`"
        >More {{ topic.name.toLowerCase() }} questions</NuxtLink
      >
    </p>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { datasets, findTopic } from '~/data/topics'

const route = useRoute()
const topic = computed(() => findTopic(route.query.for))
</script>

<style lang="scss" scoped>
.report-lens {
  background: #e6eeec;
  border-left: 0;
  margin: 1.5rem 0;
}
.lens-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
.lens-sections {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin: 0 0 0.75rem;

  a {
    font-size: 1.15rem;
    font-weight: 600;
  }
}
.lens-back {
  font-size: 0.9rem;
}
</style>
