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
  </nav>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  // [{ id, label }]: the report's sections, in page order.
  entries: Array,
})

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
</script>
