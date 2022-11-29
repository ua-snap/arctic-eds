<template>
  <div>
    <ul>
      <li v-for="layer in layers">
        <MapLayer v-bind:key="layer.id" v-bind:layer="layer" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.layer-list-wrapper {
  border-top: 1px solid #ddd;
  padding-top: 15px;
  overflow-y: auto;

  // Offset height by:
  // 42px for the map title
  // 32px for the map blurb
  // 30px for the top (15px) + bottom (15px) margin around modal
  height: calc(100vh - 42px - 32px - 30px);
}
</style>

<script>
import MapLayer from './MapLayer'

export default {
  name: 'LayerList',
  components: {
    MapLayer,
  },
  props: ['layers'],
}
</script>
