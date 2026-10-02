<template>
  <div
    :id="mapName"
    class="is-aspect-ratio-1by1"
    role="region"
    :aria-label="label || `${mapName} map`"
  ></div>
</template>

<style lang="scss" scoped>
// The legend's color swatches, drawn by the map store. The outline keeps
// pale colors visible on the legend's white box.
:deep(.legend-swatch) {
  border: 1px solid var(--bulma-text-weak);
}
</style>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  mapName: String,
  // Accessible name for the map region, e.g. "Precipitation map".
  label: String,
})

const store = useMapStore()

onMounted(() => {
  store.create(props.mapName)
})

onUnmounted(() => {
  store.destroy(props.mapName)
})
</script>
