<template>
  <div class="columns">
    <div class="column left">
      <PlaceSelector></PlaceSelector>
    </div>
    <div class="column right">
      <LatLngSelector></LatLngSelector>
    </div>
  </div>
</template>
<style type="scss" scoped>
.left {
  display: flex;
  justify-content: right;
  text-align: right;
  padding-right: 2rem;
}
.right {
  padding-left: 2rem;
}
@media (max-width: 1075px) {
  .left {
    display: block;
    text-align: left;
    padding: 0 1rem;
  }
  .right {
    padding: 0 1rem;
  }
}
</style>
<script setup>
import LatLngSelector from '~/components/LatLngSelector'
import PlaceSelector from '~/components/PlaceSelector'

// Fetch the community list in the browser only. Fetching during SSR would
// run at `nuxt generate` time and bake a stale snapshot of the Data API's
// places into the static payload (see issue #452).
const store = useReportStore()
onMounted(async () => {
  try {
    await store.fetchPlaces()
  } catch (error) {
    console.error('Failed to fetch places', error)
  }
})
</script>
