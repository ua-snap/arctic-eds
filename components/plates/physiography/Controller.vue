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
				<div v-show="this.reportIsVisible" class="report-wrapper">
					<PhysiographyReport />
				</div>
			</section>
		</div>
	</div>
</template>
<script lang="scss" scoped></script>
<script>
import Plate from "~/components/Plate";
import PhysiographyReport from "~/components/plates/physiography/Report";
import PhysiographyLegend from "~/components/plates/physiography/Legend";
import SearchControls from "~/components/SearchControls";
import layers from "~/components/plates/physiography/layers";
import { mapGetters } from "vuex";

export default {
	name: "PhysiographyController",
	components: { Plate, PhysiographyReport, PhysiographyLegend, SearchControls },
	data() {
		return {
			legend: PhysiographyLegend,
			layers: layers
		};
	},
	computed: {
		...mapGetters({
			reportIsVisible: "map/reportIsVisible"
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
			this.$store.commit("map/openReport");
		}
	}
};
</script>
