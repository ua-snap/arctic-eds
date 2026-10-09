<template>
  <div class="content is-size-5 section-error" role="status">
    <h2 v-if="title" class="title is-2">{{ title }}</h2>
    <p>
      Sorry, this part of the report couldn&rsquo;t be displayed because some of
      its data is missing or unexpected. The rest of the report is unaffected.
    </p>
  </div>
</template>
<style lang="scss" scoped></style>
<script setup>
defineProps({
  // Shown when the failed section's own heading was part of what failed.
  title: String,
})
</script>
