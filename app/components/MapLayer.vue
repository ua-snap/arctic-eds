<template>
  <div
    role="button"
    tabindex="0"
    :aria-pressed="active ? 'true' : 'false'"
    @click="toggleLayer"
    @keydown.enter.prevent="toggleLayer"
    @keydown.space.prevent="toggleLayer"
    class="columns is-size-5 is-clickable"
    :class="{
      'has-background-primary-light has-text-weight-semibold': active,
    }"
  >
    <span class="column">
      <div class="layer-title">
        <slot name="title">{{ layer.title }}</slot>
      </div>
      <div class="has-text-weight-normal">
        <slot name="subtext"></slot>
      </div>
    </span>
    <span
      class="column is-1 is-flex is-align-items-center is-size-4"
      aria-hidden="true"
    >
      <div v-if="active">&#x25b6;</div>
    </span>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const props = defineProps({
  layer: Object,
  mapName: String,
})

const store = useMapStore()
const { getSelectedLayers: activeLayers } = storeToRefs(store)

const active = computed(() => {
  // Get all layers + then the active layer for this map.
  // Need to get all layers so that reactivity works.
  if (activeLayers.value) {
    return activeLayers.value[props.mapName] === props.layer.id
  }
  // Otherwise, make it active if it's defaulted to be active.
  return props.layer.default
})

function toggleLayer() {
  store.toggleLayer({
    layer: props.layer,
    mapId: props.mapName,
  })
}

onMounted(() => {
  if (props.layer.default) {
    // We need to wait for Vue to render the full DOM which
    // includes the Leaflet elements before we can trigger this.
    nextTick(toggleLayer)
  }
})
</script>
