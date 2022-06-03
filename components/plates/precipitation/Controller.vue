<template>
	<div>
		<div v-show="!reportIsVisible" class="container">
			<section class="section">
			<div class="columns" id="controls">
				<!-- ID above (#controls) is used as anchor target, don't remove -->
				<div class="column is-one-half">
					<PlaceSelector></PlaceSelector>
				</div>
				<div class="column is-one-half">
					<LatLngPicker></LatLngPicker>
				</div>
			</div>
			</section>
		</div>

		<Plate :layers="layers" v-show="!reportIsVisible">
			<component :is="legend"></component>
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
import PrecipitationReport from "~/components/plates/precipitation/Report"
import LatLngPicker from "~/components/LatLngPicker";
import layers from "~/components/plates/precipitation/layers";
import { mapGetters } from "vuex";
import PlaceSelector from "~/components/PlaceSelector";

export default {
	name: "PrecipitationController",
	components: { Plate, PrecipitationLegend, PrecipitationReport, LatLngPicker, PlaceSelector },
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
	async fetch() {
    await this.$store.dispatch('map/fetchPlaces')
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
