<template>
  <div> 
    <p>
      You can display this table in Imperial or Metric units.
    </p>
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
export default {
	name: "UnitRadio",
  props: ['type'],
  data() {
		return {
			radioUnits: 'metric'
		};
	},
	watch: {
		radioUnits: function () {
      if (this.radioUnits == 'metric') {
        this.$store.commit('report/setMetric');
				this.$store.commit('report/convertUnits', this.type);
      } else {
        this.$store.commit('report/setImperial');
				this.$store.commit('report/convertUnits', this.type);
      }
    }
	}
}
</script>