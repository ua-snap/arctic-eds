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

// Was the Nuxt 2 fetch() hook. useAsyncData runs it during
// `nuxt generate`, so the community list is serialized into the page
// payload as before, and on the client for client-side navigation.
const store = useReportStore()
await useAsyncData('places', async () => {
  await store.fetchPlaces()
  return true
})
</script>
