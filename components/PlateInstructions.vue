<template>
  <div class="content is-size-5">
    <p>
      Click any point on the map, or enter a lat/lon, to get
      {{ dataLabel }} for that point.
    </p>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'PlateInstructions',
  props: {
    dataLabel: {
      type: String,
      default: '',
    },
  },
}
</script>
