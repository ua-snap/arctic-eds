<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Design Thawing Index</h1>
        <div class="content content-clamp is-size-4">
          <p>
            The design thawing index is the mean of the cumulative annual above
            freezing degree days for the top three years in the era.
          </p>
        </div>
        <PlateInstructions />
      </section>
    </div>
    <DesignThawingIndexController />
  </div>
</template>
<script lang="scss" scoped></script>
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
