<template>
  <div class="content content-clamp is-size-5">
    <p>
      Click any point on the map, or enter a lat/lon, to get the
      {{ dataLabel }} for that point.
    </p>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
export default {
  name: 'UserPrompt',
  props: {
    dataLabel: {
      type: String,
      default: '',
    },
  },
}
</script>
