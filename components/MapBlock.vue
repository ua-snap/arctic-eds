<template>
  <div class="columns">
    <div class="column is-two-thirds">
      <Map :mapName="mapName" class="map" />
    </div>
    <div class="column">
      <slot name="layers">
        <div class="layer-list-wrapper">
          <LayerList class="layers" :layers="layers" :mapName="mapName" />
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import Map from '~/components/Map'
import LayerList from '~/components/LayerList'
import mapContent from '~/components/map_content'

export default {
  name: 'MapBlock',
  components: {
    Map,
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
      let defaultLayer = _.filter(mapContent.layers[this.map], layer => {
        return layer['default']
      })[0]
    },
  },
}
</script>
