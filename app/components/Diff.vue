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

const diff = computed(() => {
  let diff
  if (props.kind == 'abs') {
    let precision
    if (typeof props.precision === undefined) {
      precision = 2
    } else {
      precision = props.precision
    }

    // Special case where we override precision = 1
    // because the delta is for mm/precip > 100
    if (props.future - props.past > 100 && precision == 1) {
      precision = 2
    }

    diff = Number(Number(props.future - props.past).toPrecision(precision))

    if (diff > 0) {
      diff = '&plus;' + diff
    }
  } else {
    diff = (((props.future - props.past) / props.past) * 100).toFixed(0)
    if (diff > 0) {
      diff = '&plus;' + diff
    }
    diff += '%'
  }

  return diff
})
</script>
