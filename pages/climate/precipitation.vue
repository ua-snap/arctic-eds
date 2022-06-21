<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Precipitation</h1>
        <div class="content content-clamp is-size-5">
          <p>
            Mean annual precipitation (total rainwater equivalent) varies from
            over 7500 mm (300 in) in parts of southeastern Alaska to 100 mm (4
            in) along the Arctic coast. These layers show cumulative annual
            precipitation across Alaska.
          </p>
        </div>
        <PlateInstructions />
      </section>
    </div>
    <PrecipitationController />
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import PrecipitationController from '~/components/plates/precipitation/Controller'
import PlateInstructions from '~/components/PlateInstructions'

export default {
  name: 'Precipitation',
  layout: 'plate',
  components: {
    PrecipitationController,
    PlateInstructions,
  },
}
</script>
