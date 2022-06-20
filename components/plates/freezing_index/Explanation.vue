<template>
  <div class="content content-clamp" :class="{ 'is-size-5': !legend }">
    <p>
      The freezing index is the annual cumulative degree days (&deg;F) below
      freezing for each location. These degree days are calculated by taking the
      number of degrees below 32&deg;F for each day of the year and adding them
      together into a single value. A higher freezing index means a colder year
      for that location.
    </p>
    <p>
      Larger values indicate colder winter temperatures. A decrease in freezing
      index over time suggests warming conditions and decreased depth and
      duration of freeze in soils and water bodies.
    </p>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'FreezingIndexExplanation',
  props: {
    legend: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
