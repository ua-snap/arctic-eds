<template>
  <div class="content content-clamp" :class="{ 'is-size-5': !legend }">
    <p>
      The thawing index is the annual cumulative degree days (&deg;F) above
      freezing for each location. These degree days are calculated by taking the
      number of degrees above 32&deg;F for each day of the year and adding them
      together into a single value. A higher thawing index means a warmer year
      for that location.
    </p>
    <p>
      Areas with thawing indexes much less than their freezing indexes are
      candidates for at least some permafrost. Areas with small thawing indexes
      and large freezing indexes tend to have continuous permafrost.
    </p>
    <p>
      Larger values indicate warmer temperatures. Increases in thawing index
      over time suggest warmer and longer summers, increased active layer depth,
      and a decrease in ice and snow.
    </p>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'ThawingIndexExplanation',
  props: {
    legend: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
