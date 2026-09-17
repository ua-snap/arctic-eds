<template>
  <div
    role="button"
    tabindex="0"
    :aria-pressed="active ? 'true' : 'false'"
    @click="toggleLayer"
    @keydown.enter.prevent="toggleLayer"
    @keydown.space.prevent="toggleLayer"
    class="layer columns"
    :class="{ active: active }"
  >
    <span class="column description">
      <div class="layer-title">
        <slot name="title">{{ layer.title }}</slot>
      </div>
      <div class="subtext"><slot name="subtext"></slot></div>
    </span>
    <span class="column is-1 if-active" aria-hidden="true">
      <div v-if="active">&#x25b6;</div>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.layer {
  line-height: 1.2;
  font-size: 1.25rem;
  cursor: pointer;
  padding-right: 0;

  // A lighter tint of the turquoise accent, with a full-strength bar at
  // the side, keeps the text well above 4.5:1 contrast (WCAG 1.4.3).
  &.active {
    font-weight: 600;
    background-color: #d3dcd9;
    box-shadow: inset 6px 0 0 #8ba09a;
  }

  .if-active {
    display: flex;
    align-items: center;
    font-size: 125%;
  }

  .subtext {
    display: block;
    margin-top: 0;
    padding-top: 0;

    font-weight: 400;
  }
}
</style>

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
