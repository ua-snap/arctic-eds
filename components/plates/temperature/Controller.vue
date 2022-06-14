<template>
	<div>
		<div v-show="!reportIsVisible" class="container">
			<SearchControls />
		</div>

		<Plate :layers="layers" v-show="!reportIsVisible">
			<component :is="legend"></component>
		</Plate>

		<div class="container">
			<section class="section">
				<div v-if="this.reportIsVisible" class="report-wrapper">
					<TemperatureReport />
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
import TemperatureLegend from "~/components/plates/temperature/Legend";
import TemperatureReport from "~/components/plates/temperature/Report";
import SearchControls from "~/components/SearchControls.vue";
import layers from "~/components/plates/temperature/layers";
import { mapGetters } from "vuex";

export default {
	name: "TemperatureController",
	components: { Plate, TemperatureLegend, TemperatureReport, SearchControls },
	data() {
		return {
			legend: TemperatureLegend,
			layers: layers
		};
	},
	computed: {
		...mapGetters({
			reportIsVisible: "report/reportIsVisible"
		})
	},
	mounted() {
		// Wire up click handler
		this.$store.commit("map/addLayerEventHandler", {
			event: "click",
			handler: this.handleMapClick
		});

		// Listen for valid lat/lng, handle.
		this.$on("ValidLatLng", function(latLng) {
			this.activateReport(latLng);
		});
	},
	methods: {
		handleMapClick: function(event) {
			this.activateReport(event.latlng);
		},
		activateReport: function(latLng) {
			this.$store.commit("map/setLatLng", latLng);
			this.$store.commit("report/openReport");
		}
	}
};
</script>
