<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Design Freezing Index</h1>
        <div class="content content-clamp is-size-4">
          <p>
            The design freezing index is the mean of the cumulative annual below
            freezing degree days for the top three years in the era.
          </p>
        </div>
        <div class="content content-clamp is-size-5">
          <p>
            Click any point on the map, or enter a lat/lon, to get the design
            freezing index for that point.
          </p>
        </div>
      </section>
    </div>
    <DesignFreezingIndexController />
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import DesignFreezingIndexController from '~/components/plates/design_freezing_index/Controller'

export default {
  name: 'DesignFreezingIndex',
  layout: 'plate',
  components: {
    DesignFreezingIndexController,
  },
}
</script>
