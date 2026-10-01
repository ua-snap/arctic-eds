<template>
  <!-- Shown when the report was opened from a topic page (?for=<slug>). -->
  <aside
    v-if="topic"
    class="notification is-primary is-light my-5"
    aria-label="Start here"
  >
    <p class="is-size-5 mb-2">
      For <strong>{{ topic.name.toLowerCase() }}</strong
      >, start with:
    </p>
    <ul class="is-flex is-flex-wrap-wrap mb-3">
      <li v-for="key in topic.datasets" :key="key" class="mr-5">
        <a
          class="is-size-5 has-text-weight-semibold"
          :href="`#${datasets[key].section}`"
          >{{ datasets[key].name }}</a
        >
      </li>
    </ul>
    <p class="is-size-7">
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
