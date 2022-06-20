<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Thawing Index</h1>
        <div class="content content-clamp is-size-4">
          <p>
            The thawing index, or degree days above freezing, is a measure of
            thawing that occurs during a year. It is also a measure of summer
            duration and temperatures.
          </p>
        </div>
        <div class="content content-clamp is-size-5">
          <p>
            Click any point on the map, or enter a lat/lon, to get the thawing
            index for that point.
          </p>
        </div>
      </section>
    </div>
    <ThawingIndexController />
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import ThawingIndexController from '~/components/plates/thawing_index/Controller'

export default {
  name: 'ThawingIndex',
  layout: 'plate',
  components: {
    ThawingIndexController,
  },
}
</script>
