<template>
  <nav class="report-toc no-print" aria-label="On this page">
    <p class="eyebrow">On this page</p>
    <ul class="toc-list">
      <li v-for="entry in entries" :key="entry.id">
        <a
          :href="`#${entry.id}`"
          :class="{ 'is-active': entry.id === activeId }"
          :aria-current="entry.id === activeId ? 'location' : null"
          >{{ entry.label }}</a
        >
      </li>
    </ul>

    <p class="eyebrow">Download</p>
    <ul class="toc-list">
      <li>
        <button type="button" :disabled="zipping" @click="downloadAll">
          All data (ZIP)
        </button>
      </li>
      <li>
        <button type="button" @click="print">Print / PDF</button>
      </li>
    </ul>
    <p class="toc-status" role="status">{{ status }}</p>
  </nav>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { makeZip } from '~/utils/zip'

const props = defineProps({
  // [{ id, label }]: the report's sections, in page order.
  entries: Array,
  // [{ endpoint, name }]: every CSV the report offers, for the ZIP.
  downloads: Array,
  // Names the ZIP file, e.g. "Fairbanks".
  placeLabel: String,
})

const csvUrl = useCsvUrl()

// The section being read: the last one whose top has scrolled past the
// upper part of the window.
const activeId = ref(props.entries[0]?.id)
let frame
function updateActive() {
  frame = undefined
  let current = props.entries[0]?.id
  for (const entry of props.entries) {
    const el = document.getElementById(entry.id)
    if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.3) {
      current = entry.id
    }
  }
  activeId.value = current
}
function onScroll() {
  frame ??= requestAnimationFrame(updateActive)
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  updateActive()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (frame) cancelAnimationFrame(frame)
})

function print() {
  window.print()
}

// The API's file name, e.g. "Heating Degree Days for Fairbanks.csv".
function fileName(response, fallback) {
  const header = response.headers.get('content-disposition') || ''
  const encoded = /filename\*=utf-8''([^;]+)/i.exec(header)
  if (encoded) return decodeURIComponent(encoded[1])
  const plain = /filename="?([^";]+)"?/i.exec(header)
  return plain ? decodeURIComponent(plain[1]) : `${fallback}.csv`
}

const zipping = ref(false)
const status = ref('')

async function downloadAll() {
  zipping.value = true
  let done = 0
  const total = props.downloads.length
  status.value = `Gathering ${total} files…`

  const results = await Promise.allSettled(
    props.downloads.map(async download => {
      const response = await fetch(csvUrl(download.endpoint))
      if (!response.ok) throw new Error(response.statusText)
      const data = new Uint8Array(await response.arrayBuffer())
      done++
      status.value = `Gathered ${done} of ${total} files…`
      return { name: fileName(response, download.name), data }
    })
  )

  const files = results.filter(r => r.status == 'fulfilled').map(r => r.value)
  const failed = props.downloads.filter(
    (_, i) => results[i].status == 'rejected'
  )

  if (files.length) {
    const link = document.createElement('a')
    link.href = URL.createObjectURL(makeZip(files))
    link.download = `Arctic-EDS ${props.placeLabel}.zip`
    link.click()
    setTimeout(() => URL.revokeObjectURL(link.href), 10000)
  }

  if (failed.length == 0) {
    status.value = ''
  } else if (files.length) {
    status.value =
      `Left out ${failed.map(d => d.name).join(', ')}, which didn't ` +
      'download. Try the Download CSV button in that section.'
  } else {
    status.value = "The data didn't download. Please try again."
  }
  zipping.value = false
}
</script>
