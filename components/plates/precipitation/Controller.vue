<template>
	<div>
		<div v-show="!reportIsVisible" class="container">
			<section class="section">
				<LatLngPicker />
			</section>
		</div>

		<Plate :layers="layers" v-show="!reportIsVisible">
			<component :is="legend"></component>
		</Plate>

		<div class="container">
			<section class="section">
				<div v-show="this.reportIsVisible" class="report-wrapper">
					<!-- later -->
				</div>
			</section>
		</div>
	</div>
</template>
<script lang="scss" scoped></script>
<script>
import Plate from "~/components/Plate";
import PrecipitationLegend from "~/components/plates/precipitation/Legend";
import LatLngPicker from "~/components/LatLngPicker";
import layers from "~/components/plates/precipitation/layers";
import { mapGetters } from "vuex";

export default {
	name: "PermafrostController",
	components: { Plate, PrecipitationLegend },
	data() {
		return {
			legend: PrecipitationLegend,
			layers: layers
		};
	},
	computed: {
		...mapGetters({
			reportIsVisible: "reportIsVisible"
		})
	},
	mounted() {
		// Wire up click handler
		this.$store.commit("map/addEventHandler", {
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
			this.$store.commit("openReport");
		}
	}
};
</script>
