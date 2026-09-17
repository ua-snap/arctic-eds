<template>
  <span class="diff" v-html="diff"></span>
</template>
<style lang="scss" scoped>
.diff {
  display: block;
  font-weight: 500;
}
</style>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  future: {
    type: Number,
    required: true,
  },
  past: {
    type: Number,
    required: true,
  },
  kind: {
    type: String,
    required: true,
  },
  precision: {
    type: Number,
    required: false,
  },
})

// Renders the sign as a typographic character rather than the ASCII
// hyphen-minus a plain Number gives us, so that +3.2 and &minus;3.2 are a
// matched pair. Safe to emit as entities because this is rendered with v-html.
function signed(value) {
  if (value > 0) {
    return '&plus;' + value
  }
  return String(value).replace(/^-/, '&minus;')
}

const diff = computed(() => {
  let diff
  if (props.kind == 'abs') {
    let precision
    if (typeof props.precision === 'undefined') {
      precision = 2
    } else {
      precision = props.precision
    }

    // Special case where we override precision = 1
    // because the delta is for mm/precip > 100
    if (props.future - props.past > 100 && precision == 1) {
      precision = 2
    }

    diff = signed(
      Number(Number(props.future - props.past).toPrecision(precision))
    )
  } else {
    diff = signed((((props.future - props.past) / props.past) * 100).toFixed(0))
    diff += '%'
  }

  return diff
})
</script>
