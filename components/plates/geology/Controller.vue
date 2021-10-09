<template>
	<div>
		<div v-show="!reportIsVisible" class="container">
			<section class="section">
				<LatLngPicker />
			</section>
		</div>

		<Plate :layers="layers" v-show="!reportIsVisible"></Plate>

		<div class="container">
			<section class="section">
				<div v-show="this.reportIsVisible" class="report-wrapper">
					<GeologyReport />
				</div>
			</section>
		</div>
	</div>
</template>
<script lang="scss" scoped></script>
<script>
import Plate from "~/components/Plate";
import GeologyReport from "~/components/plates/geology/Report";
import LatLngPicker from "~/components/LatLngPicker";
import layers from "~/components/plates/geology/layers";
import { mapGetters } from "vuex";

export default {
	name: "GeologyController",
	components: { Plate, GeologyReport },
	data() {
		return {
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
			this.$store.commit("openReport", latLng);
		}
	}
};
</script>
