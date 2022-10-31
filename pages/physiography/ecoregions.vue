<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Ecoregions</h1>
        <div class="content content-clamp is-size-4">
          <p>
            Ecoregions are essentially equivalent to the more archaic
            "physiographic provinces." Ecoregions do combine landscape and
            vegetation variables, but have less detail about vegetation when
            compared to "land cover" or "forest type" datasets. Topography plays
            a prominent role.
          </p>
        </div>
        <PlateInstructions dataLabel="the ecoregion" />
      </section>
    </div>
    <EcoregionsController />
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import EcoregionsController from '~/components/plates/ecoregions/Controller'
import PlateInstructions from '~/components/PlateInstructions'

export default {
  name: 'Ecoregions',
  layout: 'plate',
  components: {
    EcoregionsController,
    PlateInstructions,
  },
}
</script>
