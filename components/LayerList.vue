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
ul {
  margin: 0 1rem 1rem;

  li {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
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
