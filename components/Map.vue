<template>
  <div class="map" :id="mapId"></div>
</template>

<style lang="scss" scoped>
.map {
  height: 75vh;
  width: 100%;
}
</style>

<script>
import _ from 'lodash'

export default {
  name: 'Map',
  props: ['mapId'],
  mounted() {
    this.$store.commit('map/create', this.mapId)
  },
  destroyed() {
    this.$store.commit('map/destroy', this.mapId)
    this.$store.commit('report/destroy', this.mapId)
  },
}
</script>
