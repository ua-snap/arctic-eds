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
        <PlateInstructions />
      </section>
    </div>
    <ThawingIndexController />
  </div>
</template>
<script>
import ThawingIndexController from '~/components/plates/thawing_index/Controller'
import PlateInstructions from '~/components/PlateInstructions'

export default {
  name: 'ThawingIndex',
  layout: 'plate',
  components: {
    ThawingIndexController,
    PlateInstructions,
  },
}
</script>
