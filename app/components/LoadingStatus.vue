<template>
  <!-- A live region, so screen readers hear the loading and error states. -->
  <div role="status">
    <div v-if="isPlaceDefined && state.pending">
      <!-- Drama dots -->
      <h4 class="title is-5">
        Loading data for
        {{ placeName }}&hellip;
      </h4>
      <p>Hang on, this could take up to a few minutes!</p>
      <b-progress type="is-info"></b-progress>
    </div>

    <div v-if="state && state.error" class="error content is-size-5">
      <template v-if="errorKind == 'unknown-place'">
        <h2 class="title is-4">We couldn&rsquo;t find this place</h2>
        <p>
          There&rsquo;s no community matching this link. Please search for the
          place again.
        </p>
      </template>

      <template v-else-if="errorKind == 'no-data'">
        <h2 class="title is-4">No data available for {{ placeName }}</h2>
        <p>
          Data is available for land areas of Alaska, excluding the Western
          Aleutians. If this place is within that area, we&rsquo;re sorry:
          something&rsquo;s wrong on our end and the app isn&rsquo;t working
          right now. Please try again later, or email us at
          <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a> if you have
          any questions.
        </p>
      </template>

      <template v-else>
        <h2 class="title is-4">
          The report for {{ placeName }} couldn&rsquo;t be loaded
        </h2>
        <p>
          We&rsquo;re sorry, something&rsquo;s wrong on our end and the app
          isn&rsquo;t working right now. Please try again later, or email us at
          <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a> if you have
          any questions.
        </p>
      </template>

      <div class="buttons">
        <b-button
          v-if="canRetry"
          v-on:click="emit('retry')"
          class="is-warning"
          icon-left="refresh"
        >
          <strong>Try again</strong>
        </b-button>
        <b-button v-on:click="close" icon-left="magnify">
          Back to search
        </b-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const props = defineProps({
  state: Object,
})
const emit = defineEmits(['retry'])

// Same address as the footer.
const contactEmail = 'uaf-snap-data-tools@alaska.edu'

const store = useReportStore()
const { placeName, isPlaceDefined } = storeToRefs(store)

const errorKind = computed(() => props.state?.error?.kind)
// Retrying helps when the data service failed or returned something
// unexpected, not when the place itself is the problem.
const canRetry = computed(
  () => !['unknown-place', 'no-data'].includes(errorKind.value)
)

function close() {
  store.closeReport()
}
</script>
