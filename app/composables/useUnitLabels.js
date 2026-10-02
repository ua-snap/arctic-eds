import { computed } from 'vue'
import { storeToRefs } from 'pinia'

// Unit symbols for the report's current units, matching how the report store
// converts each kind of value.
export function useUnitLabels() {
  const { units } = storeToRefs(useReportStore())
  return computed(() => {
    const metric = units.value == 'metric'
    return {
      metric,
      // Temperatures, and the freezing point on that scale.
      temp: metric ? '°C' : '°F',
      freezing: metric ? 0 : 32,
      // Precipitation, snowfall, runoff: millimeters or inches.
      depth: metric ? 'mm' : 'in',
      // Degree days.
      dd: metric ? '°C·days' : '°F·days',
    }
  })
}
