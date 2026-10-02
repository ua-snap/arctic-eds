<template>
  <div class="radio-units no-print">
    <p>You can display these results in Imperial or Metric units.</p>
    <div>
      <!-- The sentence above says what the choice is, so the label is only
           for screen readers. -->
      <LabeledRadioGroup
        v-model="radioUnits"
        label="Units"
        hide-label
        :options="unitOptions"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import LabeledRadioGroup from '~/components/LabeledRadioGroup'

const unitOptions = [
  { value: 'imperial', label: 'Imperial' },
  { value: 'metric', label: 'Metric' },
]

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
