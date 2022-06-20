<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Snowfall</h1>
        <div class="content content-clamp is-size-5">
          <p>
            Snowfall is extremely low in Arctic Alaska, among the highest in the
            world in the southern coastal mountains, and moderate in the regions
            between. These layers show historical or projected mean annual
            snowfall across Alaska.
          </p>
        </div>
        <PlateInstructions />
      </section>
    </div>
    <SnowfallController />
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import SnowfallController from '~/components/plates/snowfall/Controller'
import PlateInstructions from '~/components/PlateInstructions'

export default {
  name: 'Snowfall',
  layout: 'plate',
  components: {
    SnowfallController,
    PlateInstructions,
  },
}
</script>
