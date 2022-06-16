<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Permafrost</h1>
        <div class="content content-clamp is-size-4">
          <p>
            This map shows data about permafrost extent, ice volume and ground
            temperatures. Many of these data layers are model outputs, including
            projections of changing permafrost conditions throughout the state.
          </p>
        </div>
        <div class="content content-clamp is-size-5">
          <p>
            Click any point on the map, or enter a lat/lon, to get a detailed
            report on permafrost conditions at that point. A legend for the
            active map layer is shown below the map.
          </p>
        </div>
      </section>
    </div>
    <PermafrostController />
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import PermafrostController from '~/components/plates/permafrost/Controller'

export default {
  name: 'Permafrost',
  layout: 'plate',
  components: {
    PermafrostController,
  },
}
</script>
