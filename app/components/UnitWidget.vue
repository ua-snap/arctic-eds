<template>
  <span class="units">
    <span v-html="symbol.space"></span
    ><span class="has-text-grey" v-html="symbol.symbol"></span>
  </span>
</template>
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const props = defineProps({
  // Can be...
  // temp = ºF / ºC
  // mm_in (millimeters/inches)
  // m_in (meters/inches)
  // dd (degree days, ºF•days / ºC•days)
  unitType: {
    type: String,
    default: 'temp',
  },
})

const { units } = storeToRefs(useReportStore())

const symbol = computed(() => {
  let symbol = ''
  let space = '' // for units that start with a symbol (º), no space

  switch (props.unitType) {
    case 'temp':
      symbol = units.value == 'metric' ? '&deg;C' : '&deg;F'
      break
    case 'mm_in':
      symbol = units.value == 'metric' ? '&#x339C;' : 'in'
      space = '&#8239;'
      break
    case 'm_in':
      symbol = units.value == 'metric' ? 'm' : 'in'
      space = '&#8239;'
      break
    case 'dd':
      symbol = units.value == 'metric' ? '&deg;C&sdot;days' : '&deg;F&sdot;days'
      break
  }
  return {
    symbol: symbol,
    space: space,
  }
})
</script>
