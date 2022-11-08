<template>
  <div>
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
    this.radioUnits = this.storeRadioUnits
  },
  watch: {
    radioUnits: function () {
      if (this.radioUnits == 'metric') {
        if (this.storeRadioUnits != 'metric') {
          this.$store.commit('report/setMetric')
          this.$store.commit('report/convertResults', {
            type: this.type,
            patterns: this.patterns,
            variable: this.variable,
          })
        }
      } else {
        this.$store.commit('report/setImperial')
        this.$store.commit('report/convertResults', {
          type: this.type,
          patterns: this.patterns,
          variable: this.variable,
        })
      }
    },
  },
}
</script>
