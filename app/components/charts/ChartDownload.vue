<template>
  <!-- Saves the chart above it as SVG (vector, editable) or JPEG. -->
  <p class="chart-download">
    <span class="chart-download-label">Download chart:</span>
    <button type="button" class="button is-small is-text" @click="saveSvg">
      SVG
    </button>
    <button
      type="button"
      class="button is-small is-text"
      :class="{ 'is-loading': busy }"
      :disabled="busy"
      @click="saveJpeg"
    >
      JPEG
    </button>
    <span v-if="failed" class="has-text-danger" role="alert">
      The download didn&rsquo;t work; please try again.
    </span>
  </p>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { chartFilename, downloadJpeg, downloadSvg } from '~/utils/chartExport'

const props = defineProps({
  // The chart's <svg> element.
  svg: Object,
  // The chart's title, written above it in the file.
  title: String,
  // [{ label, color }] for charts whose legend sits outside the SVG.
  legend: { type: Array, default: () => [] },
})

const { placeName } = storeToRefs(useReportStore())
const busy = ref(false)
const failed = ref(false)

function options() {
  const date = new Date().toISOString().slice(0, 10)
  return {
    title: props.title,
    legend: props.legend,
    source: `Arctic-EDS report for ${placeName.value} · ${window.location.href} · downloaded ${date}`,
  }
}

const filename = () => chartFilename(placeName.value, props.title)

function saveSvg() {
  failed.value = false
  try {
    downloadSvg(props.svg, filename(), options())
  } catch {
    failed.value = true
  }
}

async function saveJpeg() {
  failed.value = false
  busy.value = true
  try {
    await downloadJpeg(props.svg, filename(), options())
  } catch {
    failed.value = true
  } finally {
    busy.value = false
  }
}
</script>

<style lang="scss" scoped>
.chart-download {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;
  margin-top: 0.25rem;
  font-size: 0.8rem;

  .button {
    height: auto;
    padding: 0.15rem 0.4rem;
  }
}
.chart-download-label {
  color: #6b6866;
}
</style>
