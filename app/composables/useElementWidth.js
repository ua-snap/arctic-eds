import { onBeforeUnmount, onMounted, ref } from 'vue'

// The current width of an element, so charts can draw at their real size
// (and keep their text at a readable size) instead of scaling a fixed SVG.
export function useElementWidth(elementRef, fallback = 640) {
  const width = ref(fallback)
  let observer

  onMounted(() => {
    if (!elementRef.value) return
    width.value = elementRef.value.clientWidth || fallback
    observer = new ResizeObserver(([entry]) => {
      width.value = Math.round(entry.contentRect.width) || fallback
    })
    observer.observe(elementRef.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return width
}
