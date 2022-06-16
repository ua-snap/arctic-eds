<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Heating Degree Days</h1>
        <div class="content content-clamp is-size-4">
          <p>
            The heating degree days are the cumulative annual degree days below
            65&deg;F.
          </p>
        </div>
        <div class="content content-clamp is-size-5">
          <p>
            Click any point on the map, or enter a lat/lon, to get the heating
            degree days for that point.
          </p>
        </div>
      </section>
    </div>
    <HeatingDegreeDaysController />
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import HeatingDegreeDaysController from '~/components/plates/heating_degree_days/Controller'

export default {
  name: 'HeatingDegreeDays',
  layout: 'plate',
  components: {
    HeatingDegreeDaysController,
  },
}
</script>
