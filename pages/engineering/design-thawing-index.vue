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
        <PlateInstructions />
      </section>
    </div>
    <DesignThawingIndexController />
  </div>
</template>
<script>
import DesignThawingIndexController from '~/components/plates/design_thawing_index/Controller'
import PlateInstructions from '~/components/PlateInstructions'

export default {
  name: 'DesignThawingIndex',
  layout: 'plate',
  components: {
    DesignThawingIndexController,
    PlateInstructions,
  },
}
</script>
