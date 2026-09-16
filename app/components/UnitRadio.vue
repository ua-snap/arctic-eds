<template>
  <div class="radio-units no-print">
    <p>You can display these results in Imperial or Metric units.</p>
    <div>
      <b-field label="Units">
        <b-radio v-model="radioUnits" name="radioUnits" native-value="imperial">
          Imperial
        </b-radio>
        <b-radio v-model="radioUnits" name="radioUnits" native-value="metric">
          Metric
        </b-radio>
      </b-field>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'

const store = useReportStore()
const radioUnits = ref(store.units)

watch(radioUnits, () => {
  if (radioUnits.value != store.units) {
    if (radioUnits.value == 'metric') {
      store.setMetric()
    } else {
      store.setImperial()
    }
    store.convertResults()
  }
})
</script>
<style scoped>
:deep(label) {
  display: none;
}
</style>
