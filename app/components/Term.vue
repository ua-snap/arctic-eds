<template>
  <NuxtLink :to="href"><slot></slot></NuxtLink>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  target: String,
})

const href = computed(() => ({
  path: '/glossary#' + props.target,
}))
</script>
