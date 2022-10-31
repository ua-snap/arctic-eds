<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Temperature</h1>
        <div class="content content-clamp is-size-5">
          <p>
            This map shows average annual historical and projected temperatures
            for 1980&ndash;2009 and 2040&ndash;2069, as well as the coldest,
            hottest, and average temperatures for those eras for the months of
            January (typically the coldest month) and July (typically the
            warmest month).
          </p>
        </div>
        <PlateInstructions dataLabel="temperature data" />
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
