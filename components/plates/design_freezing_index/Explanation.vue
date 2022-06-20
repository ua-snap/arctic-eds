<template>
  <div class="content content-clamp" :class="{ 'is-size-5': !legend }">
    <p>
      The design freezing index is the mean of the three years with the highest
      freezing index for each location. The freezing index is the annual
      cumulative degree days (&deg;F) below freezing. These degree days are
      calculated by taking the number of degrees below 32&deg;F for each day of
      the year and adding them together into a single value. Larger values
      indicate colder annual temperatures.
    </p>
    <p>
      These are the highest likely values of the freezing index &mdash; a useful
      measure when design criteria are governed by the deepest likely frozen
      ground or ice.
    </p>
    <p>
      A decrease in design freezing index over time suggests less extreme cold
      temperatures with a decrease in necessary insulation and heating.
    </p>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'DesignFreezingIndexExplanation',
  props: {
    legend: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
