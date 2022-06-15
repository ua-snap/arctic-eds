<template>
  <div>
    <div v-show="!reportIsVisible" class="container">
      <SearchControls />
    </div>

    <Plate :layers="layers" v-show="!reportIsVisible">
      <template v-slot:legend>
        <component :is="legend"></component>
      </template>
    </Plate>

    <div class="container">
      <section class="section">
        <div v-show="this.reportIsVisible" class="report-wrapper">
          <FreezingIndexReport />
        </div>
      </section>
    </div>
  </div>
</template>
<style lang="scss" scoped>
td {
  padding: 8px;
  text-align: center;
}
th {
  padding: 8px;
}
</style>
<script>
import Plate from "~/components/Plate";
import FreezingIndexLegend from "~/components/plates/freezing_index/Legend";
import FreezingIndexReport from "~/components/plates/freezing_index/Report";
import SearchControls from "~/components/SearchControls";
import layers from "~/components/plates/freezing_index/layers";
import { mapGetters } from "vuex";

export default {
	name: "FreezingIndexController",
	components: { Plate, FreezingIndexLegend, FreezingIndexReport, SearchControls },
	data() {
		return {
			legend: FreezingIndexLegend,
			layers: layers
		};
	},
	computed: {
		...mapGetters({
			reportIsVisible: "report/reportIsVisible",
			latLng: "report/latLng"
		})
	},
	mounted() {
		// Wire up click handler
		this.$store.commit("map/addLayerEventHandler", {
			event: "click",
			handler: this.handleMapClick
		});

		if (this.latLng.lat && this.latLng.lng) {
			this.activateReport(this.latLng);
		};
	},
	methods: {
		handleMapClick: function(event) {
			this.activateReport(event.latlng);
		},
		activateReport: function(latLng) {
			if (typeof(latLng.lat) == 'number') {
				this.$store.commit("report/setLatLng", latLng);
			}
      this.$store.commit("report/openReport", this.$route.fullPath);
		}
	}
};
</script>
