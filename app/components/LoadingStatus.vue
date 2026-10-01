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

    <div v-if="state && state.error" class="error">
      <p class="content is-size-5">
        Oh no! Something&rsquo;s amiss and the report for this place
        couldn&rsquo;t be loaded.
      </p>
      <button type="button" class="button is-warning" v-on:click="close">
        <span class="icon is-small" aria-hidden="true">
          <!-- "emoticon-sad-outline" from Material Design Icons -->
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M12,14C13.75,14 15.29,14.72 16.19,15.81L14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,17.23L7.81,15.81C8.71,14.72 10.25,14 12,14Z"
            />
          </svg>
        </span>
        <span><strong>We&rsquo;re sorry</strong>, please try again</span>
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
<script setup>
import { storeToRefs } from 'pinia'

defineProps({
  state: Object,
})

const store = useReportStore()
const { placeName, isPlaceDefined } = storeToRefs(store)

function close() {
  store.closeReport()
}
</script>
