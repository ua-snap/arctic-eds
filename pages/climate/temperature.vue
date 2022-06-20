<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Temperature</h1>
        <div class="content content-clamp is-size-5">
          <p><i>Placeholder for Temperature text</i></p>
        </div>
        <PlateInstructions />
      </section>
    </div>
    <TemperatureController />
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import TemperatureController from '~/components/plates/temperature/Controller'
import PlateInstructions from '~/components/PlateInstructions'

export default {
  name: 'Temperature',
  layout: 'plate',
  components: {
    TemperatureController,
    PlateInstructions,
  },
}
</script>
