<template>
  <ReportSection id="hazard" title="Environmental hazard">
    <template #lede>
      Low, medium and high hazard classes on a 1&nbsp;km grid around this
      place, overall and for wildfire, erosion and permafrost.
    </template>

    <div class="chart-controls">
      <SegmentedControl v-model="band" label="Hazard" :options="bands" />
    </div>
    <div
      ref="mapElement"
      class="hazard-map"
      role="img"
      :aria-label="`Map of ${bandLabel.toLowerCase()} hazard classes around this place`"
    ></div>
    <ul class="hazard-legend" aria-label="Legend">
      <li v-for="item in legend" :key="item.label">
        <span class="hazard-swatch" :style="{ background: item.color }"></span
        >{{ item.label }}
      </li>
      <li>
        <span class="hazard-swatch hazard-place"></span>This place
      </li>
    </ul>
    <p class="chart-note">
      Preliminary data from a test version of the environmental hazard index.
      Use + and &minus; to zoom; drag to pan.
    </p>

    <template #panel>
      <aside class="data-panel" aria-label="About the environmental hazard data">
        <h3 class="panel-heading">How it was made</h3>
        <dl class="made">
          <dt>Classes</dt>
          <dd>Low, medium, high</dd>
          <dt>Components</dt>
          <dd>Wildfire, erosion, permafrost</dd>
          <dt>Grid</dt>
          <dd>1 km</dd>
          <dt>Status</dt>
          <dd>Test coverage, subject to change</dd>
        </dl>
      </aside>
    </template>
  </ReportSection>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import ReportSection from '~/components/report/ReportSection'
import SegmentedControl from '~/components/report/SegmentedControl'
import { getBaseMapAndLayers } from '~/stores/map'
import { palette } from '~/utils/chart'

const coverage = 'environmental_hazard_index_test'

// Each band has a style of the same name on the server.
const bands = [
  { value: 'hazard', label: 'Overall' },
  { value: 'wildfire', label: 'Wildfire' },
  { value: 'erosion', label: 'Erosion' },
  { value: 'permafrost', label: 'Permafrost' },
]

// The server's color table for every band: classes 0, 1 and 2.
const legend = [
  { label: 'Low', color: '#0072b2' },
  { label: 'Medium', color: '#f0e442' },
  { label: 'High', color: '#d55e00' },
]

// Index into the map's resolutions (4096 m per pixel down to 64): 256 m per
// pixel, about 180 km across the map, so the surrounding region is visible
// and each 1 km cell is still a few pixels wide.
const initialZoom = 4

const config = useRuntimeConfig()
const { latLng } = storeToRefs(useReportStore())

const band = ref('hazard')
const bandLabel = computed(() => bands.find(b => b.value == band.value).label)
const mapElement = ref(null)

// Kept outside Vue's reactivity, as in the map store: Leaflet mutates its
// objects, which reactive proxies don't tolerate.
let map
let hazardLayer
let unmounted = false

onMounted(async () => {
  await loadLeaflet()
  if (unmounted) return

  const center = [Number(latLng.value.lat), Number(latLng.value.lng)]
  map = L.map(mapElement.value, {
    ...getBaseMapAndLayers(config.public.geoserverUrl),
    center,
    zoom: initialZoom,
    minZoom: 1,
    maxZoom: 6,
    dragging: true,
    zoomControl: true,
    doubleClickZoom: true,
    touchZoom: true,
    keyboard: true,
    // The base config's bounds are for the fixed statewide maps.
    maxBounds: undefined,
  })

  hazardLayer = L.tileLayer.wms(config.public.rasdamanUrl, {
    transparent: true,
    format: 'image/png',
    version: '1.3.0',
    layers: coverage,
    styles: `${coverage}_${band.value}`,
    opacity: 0.7,
  })
  hazardLayer.addTo(map)

  L.circleMarker(center, {
    radius: 7,
    color: palette.ink,
    weight: 3,
    fillColor: '#fff',
    fillOpacity: 1,
  }).addTo(map)
})

watch(band, value => {
  hazardLayer?.setParams({ styles: `${coverage}_${value}` })
})

onUnmounted(() => {
  unmounted = true
  map?.remove()
})
</script>

<style lang="scss" scoped>
.hazard-map {
  height: 26rem;
  border-radius: 6px;
  background: #f4f2ee;
}

.hazard-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.25rem;
  margin-top: 0.75rem;
  font-size: 0.85rem;

  li {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }
}
.hazard-swatch {
  display: inline-block;
  width: 0.9rem;
  height: 0.9rem;
  border: 1px solid #cfcac2;
  border-radius: 2px;
}
.hazard-place {
  border: 3px solid #312e30;
  border-radius: 50%;
  background: #fff;
}

@media screen and (max-width: 768px) {
  .hazard-map {
    height: 20rem;
  }
}
</style>
