<template>
  <section class="section">
    <div class="columns">
      <div class="column is-one-half">
        <PlaceSelector></PlaceSelector>
      </div>
      <div class="column is-one-half">
        <LatLngSelector></LatLngSelector>
      </div>
    </div>
  </section>
</template>
<script>
import LatLngSelector from '~/components/LatLngSelector'
import PlaceSelector from '~/components/PlaceSelector'

export default {
  name: 'SearchControls',
  components: { PlaceSelector, LatLngSelector },
  async fetch() {
    await this.$store.dispatch('report/fetchPlaces')
  },
}
</script>
