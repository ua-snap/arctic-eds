<template>
  <div class="content content-clamp" :class="{ 'is-size-5': !legend }">
    <p>
      The Pacific Mountain System intercepts much of the moisture in the air
      leaving the North Pacific Ocean. To the north, additional mountain ranges
      dry the air, further decreasing mean annual precipitation to as little as
      four inches per year north of the Brooks Range. The Bering Sea and Arctic
      Ocean are relatively poor sources of moisture for precipitation.
    </p>
    <p>
      The Arctic and Interior (area between the Brooks Range to the north and
      the Alaska Range to the south) regions are often classed as semiarid and
      arid because of their low rainfall. However, due to permafrost, which
      prevents subterranean drainage, and low evaporation and transpiration
      rates (particularly during the winters) water needs are less than at lower
      latitudes.
    </p>
    <p>
      The Interior is generally not a water-limited ecosystem, with large areas
      of wet muskeg and lakes as well as significant river runoff. In the
      Arctic, countless shallow lakes disguise the fact that water supplies are
      limited, though the area never exhibits the standard desert environmental
      characteristics.
    </p>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'PrecipitationExplanation',
  props: {
    legend: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
