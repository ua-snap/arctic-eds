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
        <PlateInstructions />
      </section>
    </div>
    <FreezingIndexController />
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import FreezingIndexController from '~/components/plates/freezing_index/Controller'
import PlateInstructions from '~/components/PlateInstructions'

export default {
  name: 'FreezingIndex',
  layout: 'plate',
  components: {
    FreezingIndexController,
    PlateInstructions,
  },
}
</script>
