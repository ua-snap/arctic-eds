<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Permafrost</h1>
        <div class="content content-clamp is-size-4">
          <p>
            Permafrost is defined as that part of the lithosphere in which a
            naturally occurring temperature below 0°C (32°F) has existed for two
            or more years. Historically, only the southern coasts were free of
            permafrost, but ongoing warming is broadening the permafrost-free
            zone in Alaska..
          </p>
          <p>
            An area of solid rock or well-drained gravel free of moisture is
            classified as permafrost if it meets the definition above. However,
            most permafrost contains ice in quantities ranging from partial
            filling of the soil pore space to massive formations of segregated
            ground ice. Once permafrost is established, it stops the
            infiltration of groundwater and forces melt and rain water to escape
            by surface drainage.
          </p>
        </div>
        <PlateInstructions />
      </section>
    </div>
    <PermafrostController />
  </div>
</template>
<script>
import PermafrostController from '~/components/plates/permafrost/Controller'
import PlateInstructions from '~/components/PlateInstructions'

export default {
  name: 'Permafrost',
  layout: 'plate',
  components: {
    PermafrostController,
    PlateInstructions,
  },
}
</script>
