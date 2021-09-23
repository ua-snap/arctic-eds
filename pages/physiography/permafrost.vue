<template>
	<div>
		<div class="container">
			<section class="section">
				<h1 class="title is-2">Permafrost</h1>
				<div class="content content-clamp is-size-4">
					<p>
						This map shows data about permafrost extent, ice volume
						and ground temperatures. Many of these data layers are
						model outputs, including projections of changing
						permafrost conditions throughout the state.
					</p>
				</div>
				<div class="content content-clamp is-size-5">
					<p>
						Click any point on the map, or enter a lat/lon, to get a
						detailed report on permafrost conditions at that point.
						A legend for the active map layer is shown below the
						map.
					</p>
				</div>
			</section>
			<section class="section">
				<LatLngPicker v-show="!reportIsVisible" />
			</section>
		</div>

		<Plate :layers="layers" v-show="!reportIsVisible" />

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
import LatLngPicker from "~/components/LatLngPicker";

export default {
	name: "Permafrost",
	layout: "plate",
	components: { Plate, PermafrostReport },
	data() {
		return {
			// If true, then the Plate is hidden and data results are shown.
			reportIsVisible: false,
			layers: [
				{
					id: "pfextent_jorgenson",
					title: "Permafrost extent (Jorgenson et al., 2008)",
					wmsLayerName:
						"permafrost_beta:jorgenson_2008_pf_extent_ground_ice_volume",
					default: true
				},

				{
					id: "pfextent_obu",
					title: "Permafrost extent (Obu et al., 2018)",
					wmsLayerName: "permafrost_beta:obu_pf_extent"
				},

				{
					id: "3mgipl2010",
					title: "Ground temperature, 3m depth, 2010 (GIPL model)",
					wmsLayerName:
						"permafrost_beta:magt_3m_c_iem_gipl2_ar5_ncar_ccsm4_rcp85_2010_3338"
				},
				{
					id: "3mgipl2050",
					title: "Ground temperature, 3m depth, 2050 (GIPL model)",
					wmsLayerName:
						"permafrost_beta:magt_3m_c_iem_gipl2_ar5_ncar_ccsm4_rcp85_2050_3338"
				},

				{
					id: "altGIPL2010",
					title: "Active layer thickness, 2010 (GIPL model)",
					wmsLayerName:
						"permafrost_beta:alt_m_iem_gipl2_ar5_ncar_ccsm4_rcp85_2010_3338"
				},

				{
					id: "altGIPL2050",
					title: "Active layer thickness, 2050 (GIPL model)",
					wmsLayerName:
						"permafrost_beta:alt_m_iem_gipl2_ar5_ncar_ccsm4_rcp85_2050_3338"
				},

				{
					id: "obumagt",
					title:
						"Mean annual ground temperature at top of permafrost, 2000-2016 (modeled)",
					wmsLayerName: "obu_2018_magt"
				},
				{
					id: "icevol_jorgenson",
					title: "Ground ice volume (Jorgenson et al., 2008)",
					wmsLayerName:
						"permafrost_beta:jorgenson_2008_pf_extent_ground_ice_volume",
					style: "ground_ice_volume"
				}
			]
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
			this.activateReport(event.latlng)
		},
		activateReport: function(latLng) {
			this.$store.commit("map/setLatLng", latLng);
			this.reportIsVisible = true;
		}
	}
};
</script>
