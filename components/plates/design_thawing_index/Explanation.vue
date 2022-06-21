<template>
  <div class="content content-clamp" :class="{ 'is-size-5': !legend }">
    <p>
      The design thawing index is the mean of the three years with the highest
      thawing index for each location. The thawing index is the annual
      cumulative degree days (&deg;F) above freezing. These degree days are
      calculated by taking the number of degrees above 32&deg;F for each day of
      the year and adding them together into a single value. A higher design
      thawing index means a warmer era for that location.
    </p>

    <p>
      These are the highest likely values of the thawing index &mdash; a useful
      measure when design criteria are governed by the shallowest likely depth
      of frozen ground or ice.
    </p>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'DesignThawingIndexExplanation',
  props: {
    legend: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
