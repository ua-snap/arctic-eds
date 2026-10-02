<template>
  <header class="report-header">
    <svg
      class="report-locator"
      :viewBox="`0 0 ${outline.width} ${outline.height}`"
      aria-hidden="true"
    >
      <path :d="outline.path" fill="#e6e1d8" />
      <circle :cx="dot[0]" :cy="dot[1]" r="4" :fill="palette.warm" />
    </svg>
    <div class="report-title">
      <p class="eyebrow">Report</p>
      <h1 class="title is-1 mb-2">{{ name }}</h1>
      <p class="report-meta">
        {{ coordinates
        }}<template v-if="elevation">
          &middot; elevation {{ elevation }} within 1&nbsp;km</template
        >
      </p>
    </div>
    <div class="report-tools no-print">
      <SegmentedControl
        v-model="unitChoice"
        label="Units"
        hide-label
        :options="unitOptions"
      />
      <button type="button" class="copy-link" @click="copyLink">
        <span aria-live="polite">{{
          copied ? 'Link copied' : 'Copy link to this report'
        }}</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import SegmentedControl from '~/components/report/SegmentedControl'
import * as outline from '~/data/alaskaOutline'
import { formatNumber, palette } from '~/utils/chart'

const store = useReportStore()
const { results, latLng, getPlaceById, placeIsLatLng, units } =
  storeToRefs(store)

const lat = computed(() => Number(latLng.value.lat))
const lng = computed(() => Number(latLng.value.lng))

const coordinates = computed(
  () =>
    `${Math.abs(lat.value)}°${lat.value < 0 ? 'S' : 'N'}, ` +
    `${Math.abs(lng.value)}°${lng.value < 0 ? 'W' : 'E'}`
)

const name = computed(() => {
  const place = getPlaceById.value
  if (placeIsLatLng.value || !place) return coordinates.value
  return place.alt_name ? `${place.name} (${place.alt_name})` : place.name
})

const elevation = computed(() => {
  const { min, max } = results.value.elevation || {}
  if (!Number.isFinite(min) || !Number.isFinite(max)) return undefined
  if (units.value == 'metric') {
    return `${formatNumber(min)}–${formatNumber(max)} m`
  }
  const ft = m => formatNumber(m * 3.28084)
  return `${ft(min)}–${ft(max)} ft`
})

const dot = computed(() => outline.project(lat.value, lng.value))

const unitOptions = [
  { value: 'imperial', label: 'Imperial' },
  { value: 'metric', label: 'Metric' },
]
const unitChoice = ref(units.value)
watch(unitChoice, choice => {
  if (choice == units.value) return
  if (choice == 'metric') {
    store.setMetric()
  } else {
    store.setImperial()
  }
  store.convertResults()
})

const copied = ref(false)
async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => (copied.value = false), 2500)
  } catch {
    // Clipboard access can be refused; the address bar still has the link.
  }
}
</script>
