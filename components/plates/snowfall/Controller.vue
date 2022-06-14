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
          <SnowfallReport />
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
import SnowfallLegend from "~/components/plates/snowfall/Legend";
import SnowfallReport from "~/components/plates/snowfall/Report";
import SearchControls from "~/components/SearchControls";
import layers from "~/components/plates/snowfall/layers";
import { mapGetters } from "vuex";

export default {
	name: "SnowfallController",
	components: { Plate, SnowfallLegend, SnowfallReport, SearchControls },
	data() {
		return {
			legend: SnowfallLegend,
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

		// Listen for valid lat/lng, handle.
		if (this.latLng) {
			this.activateReport(this.latLng);
		};
	},
	methods: {
		handleMapClick: function (event) {
			this.activateReport(event.latlng);
		},
		activateReport: function (latLng) {
			if (typeof(latLng.lat) == 'number') {
				this.$store.commit("report/setLatLng", latLng);
			}
      this.$store.commit("report/openReport", this.$route.fullPath);
		}
	}
};
</script>
