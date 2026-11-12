<template>
  <!--
    A small static map of the grid cells a report section's values come
    from, outlined around the point the report is for.
  -->
  <figure class="grid-cell-map">
    <div
      ref="mapEl"
      class="grid-cell-map-canvas"
      role="img"
      :aria-label="label"
    ></div>
    <figcaption>
      <ul class="grid-cell-legend">
        <li v-for="cell in cells" :key="cell.label">
          <span
            class="grid-cell-swatch"
            :class="{ 'is-dashed': cell.dashed }"
            :style="{ borderColor: cell.color }"
            aria-hidden="true"
          ></span>
          {{ cell.label }}
        </li>
        <li>
          <span class="grid-cell-point" aria-hidden="true"></span>
          {{ pointLabel }}
        </li>
      </ul>
    </figcaption>
  </figure>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { getBaseMapAndLayers } from '~/stores/map'

const props = defineProps({
  // Accessible description of the map.
  label: String,
  // The report's point: { lat, lon }.
  point: Object,
  pointLabel: { type: String, default: 'Your point' },
  // [{ lat, lon, degrees, label, color, dashed }]: cell centres and sizes.
  cells: Array,
})

const config = useRuntimeConfig()
const mapEl = ref(null)
let map

// The cell's corners. Drawn as a polygon so it follows the map projection.
function corners(cell) {
  const half = cell.degrees / 2
  return [
    [cell.lat - half, cell.lon - half],
    [cell.lat - half, cell.lon + half],
    [cell.lat + half, cell.lon + half],
    [cell.lat + half, cell.lon - half],
  ]
}

onMounted(async () => {
  await loadLeaflet()
  // Skip it if the section was removed while Leaflet was loading.
  if (!mapEl.value) return

  const options = getBaseMapAndLayers(config.public.geoserverUrl)
  delete options.maxBounds
  map = L.map(mapEl.value, options)

  const outlines = props.cells.map(cell =>
    L.polygon(corners(cell), {
      color: cell.color,
      weight: 2,
      dashArray: cell.dashed ? '5 4' : null,
      fillColor: cell.color,
      fillOpacity: cell.dashed ? 0 : 0.12,
      interactive: false,
    }).addTo(map)
  )
  L.circleMarker([props.point.lat, props.point.lon], {
    radius: 5,
    color: '#fff',
    weight: 2,
    fillColor: '#1f1d1b',
    fillOpacity: 1,
    interactive: false,
  }).addTo(map)

  map.fitBounds(L.featureGroup(outlines).getBounds(), { padding: [16, 16] })
})

onUnmounted(() => {
  map?.remove()
  map = undefined
})
</script>

<style lang="scss" scoped>
.grid-cell-map {
  margin: 0;
}
.grid-cell-map-canvas {
  height: 13rem;
  border: 1px solid #e3dfd8;
  border-radius: 4px;
  background: #f4f2ef;
}
.grid-cell-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: #6b6866;

  li {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
}
.grid-cell-swatch {
  width: 1rem;
  height: 0.75rem;
  border: 2px solid;

  &.is-dashed {
    border-style: dashed;
  }
}
.grid-cell-point {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: #1f1d1b;
}
</style>
