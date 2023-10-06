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
import { mapGetters } from 'vuex'

export default {
  name: 'UnitRadio',
  props: ['type', 'patterns', 'variable'],
  data() {
    return {
      radioUnits: this.storeRadioUnits,
    }
  },
  computed: {
    ...mapGetters({
      storeRadioUnits: 'report/units',
    }),
  },
  mounted() {
    if (this.storeRadioUnits == undefined) {
      this.radioUnits = 'imperial'
    } else {
      this.radioUnits = this.storeRadioUnits
    }
  },
  watch: {
    radioUnits: function () {
      if (this.radioUnits != this.storeRadioUnits) {
        if (this.radioUnits == 'metric') {
          this.$store.commit('report/setMetric')
        } else {
          this.$store.commit('report/setImperial')
        }
        this.$store.commit('report/convertResults')
      }
    },
  },
}
</script>
<style scoped>
::v-deep label {
  display: none;
}
</style>
