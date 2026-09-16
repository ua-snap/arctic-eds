<template>
  <span class="term">
    <NuxtLink :to="href"><slot></slot></NuxtLink>
  </span>
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
<style lang="scss" scoped>
.term {
  display: inline-block;
  cursor: help;
  border-bottom: 1px dashed black;
}
:deep(a) {
  cursor: help;
}
</style>
