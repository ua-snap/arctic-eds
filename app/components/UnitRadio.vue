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
<script>
import { mapState } from 'pinia'

export default {
  name: 'UnitRadio',
  props: ['type', 'patterns', 'variable'],
  data() {
    return {
      radioUnits: this.storeRadioUnits,
    }
  },
  computed: {
    ...mapState(useReportStore, {
      storeRadioUnits: 'units',
    }),
  },
  mounted() {
    this.radioUnits = this.storeRadioUnits
  },
  watch: {
    radioUnits: function () {
      if (this.radioUnits != this.storeRadioUnits) {
        if (this.radioUnits == 'metric') {
          useReportStore().setMetric()
        } else {
          useReportStore().setImperial()
        }
        useReportStore().convertResults()
      }
    },
  },
}
</script>
<style scoped>
:deep(label) {
  display: none;
}
</style>
