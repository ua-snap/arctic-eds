<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Design Thawing Index</h1>
        <div class="content content-clamp is-size-4">
          <p>
            The design thawing index is the average thawing index for the three
            warmest years of the 30 years in the era (historical or projected).
          </p>
        </div>
        <div class="content content-clamp is-size-5">
          <p>
            Click any point on the map, or enter a lat/lon, to get the design
            thawing index for that point.
          </p>
        </div>
      </section>
    </div>
    <DesignThawingIndexController />
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import DesignThawingIndexController from '~/components/plates/design_thawing_index/Controller'

export default {
  name: 'DesignThawingIndex',
  layout: 'plate',
  components: {
    DesignThawingIndexController,
  },
}
</script>
