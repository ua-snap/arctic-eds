<template>
  <div>
    <div class="report--minimap--wrapper">
      <div id="report--minimmap--map"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.report--minimap--wrapper {
  margin: 2rem 0 3rem;
}
#report--minimmap--map {
  height: 300px;
  width: 300px;
}
</style>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'

const { latLng, isPlaceDefined } = storeToRefs(useReportStore())

// Leaflet instances are kept non-reactive on purpose.
let map
let marker

function getBaseMapAndLayers() {
  var baseLayer = new L.tileLayer.wms(
    'https://basemap.nationalmap.gov/arcgis/services/USGSTopo/MapServer/WmsServer?',
    {
      transparent: true,
      format: 'image/png',
      version: '1.3.0',
      layers: ['0'],
    }
  )

  // Map base configuration
  var config = {
    zoom: 11,
    minZoom: 0,
    maxZoom: 6,
    center: [64.7, -155],
    scrollWheelZoom: false,
    zoomControl: false,
    doubleClickZoom: false,
    attributionControl: false,
    layers: [baseLayer],
  }

  return config
}

onMounted(() => {
  if (isPlaceDefined.value) {
    map = L.map('report--minimmap--map', getBaseMapAndLayers())

    marker = L.marker(latLng.value).addTo(map)
    map.panTo(latLng.value)
  }
})

onUnmounted(() => {
  marker = undefined
  if (map) {
    map.remove()
  }
})
</script>
