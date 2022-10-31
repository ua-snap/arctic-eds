<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Freezing Index</h1>
        <div class="content content-clamp is-size-4">
          <p>
            The freezing index, or degree days below freezing, can be used to
            estimate the depth of ground freezing during the winter, the depth
            of ice that will be formed on a lake, or the amount of heat which
            must be added to an exposed water tank to keep it unfrozen.
          </p>
        </div>
        <PlateInstructions dataLabel="freezing index data" />
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
