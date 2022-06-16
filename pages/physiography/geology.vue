<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Geology</h1>
        <div class="content content-clamp is-size-4">
          <p>
            This map shows detailed geological units for the state of Alaska.
          </p>
        </div>
        <div class="content content-clamp is-size-5">
          <p>
            Click any point on the map, or enter a lat/lon, to get the
            geological unit for that point. No legend is shown due to the large
            quantity of different geological units present on the map.
          </p>
        </div>
      </section>
    </div>
    <GeologyController />
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import GeologyController from '~/components/plates/geology/Controller'

export default {
  name: 'Geology',
  layout: 'plate',
  components: {
    GeologyController,
  },
}
</script>
