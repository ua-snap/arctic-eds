<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Freezing Index</h1>
        <div class="content content-clamp is-size-4">
          <p>
            The freezing index is the cumulative annual degree days below
            freezing.
          </p>
        </div>
        <div class="content content-clamp is-size-5">
          <p>
            Click any point on the map, or enter a lat/lon, to get the freezing
            index for that point.
          </p>
        </div>
      </section>
    </div>
    <FreezingIndexController />
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import FreezingIndexController from '~/components/plates/freezing_index/Controller'

export default {
  name: 'FreezingIndex',
  layout: 'plate',
  components: {
    FreezingIndexController,
  },
}
</script>
