<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Precipitation</h1>
        <div class="content content-clamp is-size-5">
          <p>
            Mean annual precipitation varies from over 7500 mm (300 in) in parts
            of southeastern Alaska to 100 mm (4 in) along the Arctic coast.
          </p>

          <p>
            The Pacific Mountain System intercepts much of the moisture in the
            air leaving the North Pacific Ocean. To the north, additional
            mountain ranges dry the air, further decreasing mean annual
            precipitation to as little as four inches per year north of the
            Brooks Range. The Bering Sea and Arctic Ocean are relatively poor
            sources of moisture for precipitation.
          </p>

          <p>
            The Arctic and Interior (area between the Brooks Range to the north
            and the Alaska Range to the south) regions are often classed as
            semiarid and arid because of their low rainfall. However, due to
            permafrost, which prevents subterranean drainage, and low
            evaporation and transpiration rates (particularly during the
            winters) water needs are less than at lower latitudes.
          </p>

          <p>
            The Interior is generally not a water-limited ecosystem, with large
            areas of wet muskeg and lakes as well as significant river runoff.
            In the Arctic, countless shallow lakes disguise the fact that water
            supplies are limited, though the area never exhibits the standard
            desert environmental characteristics.
          </p>
        </div>
        <UserPrompt dataLabel="precipitation" />
      </section>
    </div>
    <PrecipitationController />
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import PrecipitationController from '~/components/plates/precipitation/Controller'
import UserPrompt from '~/components/UserPrompt'

export default {
  name: 'Precipitation',
  layout: 'plate',
  components: {
    PrecipitationController,
    UserPrompt,
  },
}
</script>
