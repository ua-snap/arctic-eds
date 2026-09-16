<template>
  <div :id="mapName" class="map"></div>
</template>

<style lang="scss" scoped>
.map {
  aspect-ratio: 1/1;
  height: 100%;
}
:deep(.legend) {
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  .legend-item {
    display: flex;
    align-items: center;
    font-size: 1rem;
  }
  .legend-swatch {
    display: inline-block;
    border: 1px solid #666;
    margin: 5px;
    width: 20px;
    height: 20px;
  }
}
</style>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  mapName: String,
})

const store = useMapStore()

onMounted(() => {
  store.create(props.mapName)
})

onUnmounted(() => {
  store.destroy(props.mapName)
})
</script>
