<template>
  <section class="section">
    <div class="columns" id="controls">
      <!-- ID above (#controls) is used as anchor target, don't remove -->
      <div class="column is-one-half">
        <PlaceSelector></PlaceSelector>
      </div>
      <div class="column is-one-half">
        <LatLngPicker></LatLngPicker>
      </div>
    </div>
  </section>
</template>
<script>
import LatLngPicker from '~/components/LatLngPicker'
import PlaceSelector from '~/components/PlaceSelector'

export default {
  name: 'SearchControls',
  components: { PlaceSelector, LatLngPicker },
  async fetch() {
    await this.$store.dispatch('report/fetchPlaces')
  },
}
</script>
