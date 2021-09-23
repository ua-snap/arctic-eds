<template>
	<div>
		<div class="container">
			<section class="section">
				<LatLngPicker v-show="!reportIsVisible" />
			</section>
		</div>

		<Plate :layers="layers" v-show="!reportIsVisible">
			<component :is="legend"></component>
		</Plate>

		<div class="container">
			<section class="section">
				<div v-show="this.reportIsVisible" class="report-wrapper">
					<PermafrostReport />
				</div>
			</section>
		</div>
	</div>
</template>
<script lang="scss" scoped></script>
<script>
import Plate from "~/components/Plate";
import PermafrostReport from "~/components/plates/permafrost/Report";
import PermafrostLegend from "~/components/plates/permafrost/Legend";
import LatLngPicker from "~/components/LatLngPicker";
import layers from "~/components/plates/permafrost/layers";

export default {
	name: "PermafrostController",
	components: { Plate, PermafrostReport, PermafrostLegend },
	data() {
		return {
			// If true, then the Plate is hidden and data results are shown.
			reportIsVisible: false,
			legend: PermafrostLegend,
			layers: layers
		};
	},
	mounted() {
		// Wire up click handler
		this.$store.commit("map/addEventHandler", {
			event: "click",
			handler: this.handleMapClick
		});

		// Listen for button click to close the report.
		this.$on("CloseReport", function() {
			this.reportIsVisible = false;
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
			this.reportIsVisible = true;
		}
	}
};
</script>
