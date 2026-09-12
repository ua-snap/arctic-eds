<template>
  <div class="columns">
    <div class="column is-one-half left">
      <PlaceSelector></PlaceSelector>
    </div>
    <div class="column is-one-half right">
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
<script>
import LatLngSelector from '~/components/LatLngSelector'
import PlaceSelector from '~/components/PlaceSelector'

export default {
  name: 'SearchControls',
  components: { PlaceSelector, LatLngSelector },
  async setup() {
    // Was the Nuxt 2 fetch() hook. useAsyncData runs it during
    // `nuxt generate`, so the community list is serialized into the page
    // payload as before, and on the client for client-side navigation.
    const store = useReportStore()
    await useAsyncData('places', async () => {
      await store.fetchPlaces()
      return true
    })
  },
}
</script>
