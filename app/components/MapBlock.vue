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
      <LeafletMap :mapName="mapName" :label="label" class="map" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.map {
  width: 100%;
}
</style>

<script setup>
import { computed } from 'vue'
import LeafletMap from '~/components/LeafletMap'
import LayerList from '~/components/LayerList'
import mapContent from '~/data/map_content'

const props = defineProps({
  mapName: String,
  label: String,
})

const layers = computed(() => mapContent.layers[props.mapName])
</script>
