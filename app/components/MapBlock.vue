<template>
  <div class="columns">
    <div class="column is-one-third">
      <slot name="layers">
        <div class="layer-list-wrapper">
          <LayerList class="layers" :layers="layers" :mapName="mapName" />
        </div>
      </slot>
    </div>
    <div class="column">
      <LeafletMap :mapName="mapName" class="map" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.map {
  width: 100%;
}
</style>

<script>
import { filter } from 'lodash-es'
import LeafletMap from '~/components/LeafletMap'
import LayerList from '~/components/LayerList'
import mapContent from '~/data/map_content'

export default {
  name: 'MapBlock',
  components: {
    LeafletMap,
    LayerList,
  },
  props: ['mapName'],
  computed: {
    mapTitle() {
      return mapContent.titles[this.mapName]
    },
    layers() {
      return mapContent.layers[this.mapName]
    },
  },
  methods: {
    selectDefaultLayer() {
      let defaultLayer = filter(mapContent.layers[this.map], layer => {
        return layer['default']
      })[0]
    },
  },
}
</script>
