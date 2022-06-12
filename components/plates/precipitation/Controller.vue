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
					<PrecipitationReport />
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
import PrecipitationLegend from "~/components/plates/precipitation/Legend";
import PrecipitationReport from "~/components/plates/precipitation/Report";
import layers from "~/components/plates/precipitation/layers";
import { mapGetters } from "vuex";
import SearchControls from "~/components/SearchControls.vue";

export default {
	name: "PrecipitationController",
	components: {
		Plate,
		PrecipitationLegend,
		PrecipitationReport,
		SearchControls,
	},
	data() {
		return {
			legend: PrecipitationLegend,
			layers: layers,
		};
	},
	computed: {
		...mapGetters({
			reportIsVisible: "map/reportIsVisible",
		}),
	},
	mounted() {
		// Wire up click handler
		this.$store.commit("map/addEventHandler", {
			event: "click",
			handler: this.handleMapClick,
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
			this.$store.commit("map/openReport");
		},
	},
};
</script>
