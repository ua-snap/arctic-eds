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
import SnowfallReport from "~/components/plates/snowfall/Report"
import LatLngPicker from "~/components/LatLngPicker";
import layers from "~/components/plates/snowfall/layers";
import { mapGetters } from "vuex";

export default {
	name: "SnowfallController",
	components: { Plate, SnowfallLegend, SnowfallReport },
	data() {
		return {
			legend: SnowfallLegend,
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
		this.$on("ValidLatLng", function (latLng) {
			this.activateReport(latLng);
		});
	},
	methods: {
		handleMapClick: function (event) {
			this.activateReport(event.latlng);
		},
		activateReport: function (latLng) {
			this.$store.commit("map/setLatLng", latLng);
			this.$store.commit("openReport");
		}
	}
};
</script>
