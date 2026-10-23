<template>
  <!--
    One report section: a heading, a one-sentence finding, the chart in a
    card, and the data panel alongside.
  -->
  <section :id="id" class="report-section" :aria-labelledby="`${id}-title`">
    <div class="report-section-main">
      <h2 :id="`${id}-title`" class="title is-3 mb-3">{{ title }}</h2>
      <p class="lede"><slot name="lede" /></p>
      <div class="chart-card">
        <slot />
      </div>
    </div>
    <slot name="panel" />
  </section>
</template>

<script setup>
defineProps({
  // Anchor for the contents list and topic links.
  id: String,
  title: String,
})
</script>
