<template>
  <div>
    <ul>
      <li v-for="layer in layers">
        <MapLayer v-bind:key="layer.id" v-bind:layer="layer" :mapName="mapName" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
import MapLayer from './MapLayer'

export default {
  name: 'LayerList',
  components: {
    MapLayer,
  },
  props: ['layers', 'mapName'],
}
</script>
