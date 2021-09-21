<template>
	<div>
		<div class="container">
			<section class="section">
				<h1 class="title is-2">Permafrost</h1>
				<div class="content content-clamp is-size-4">
					<strong>Permafrost is so <em>cool</em>.</strong> Cool
					cucumbers candy cane winter bruschetta cozy butternut hearty
					broccoli green pepper Italian pepperoncini guacamole kale
					caesar salad frosted gingerbread bites green grapes ginger
					lemongrass agave green tea portobello mushrooms roasted
					peanuts apricot.
				</div>
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
import { mapGetters } from "vuex";
import Plate from "~/components/Plate";
import PermafrostReport from "~/components/plates/permafrost/Report";

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
					id: "1mgipl2050",
					title:
						"GIPL Modeled Mean 2050 Ground Temperature at 1 m Depth",
					wmsLayerName:
						"permafrost_beta:magt_1m_c_iem_gipl2_ar5_ncar_ccsm4_rcp85_2050_3338",
					zindex: 3
				},
				{
					id: "1mgipl2010",
					title:
						"GIPL Modeled Mean 2010 Ground Temperature at 1 m Depth",
					wmsLayerName:
						"permafrost_beta:magt_1m_c_iem_gipl2_ar5_ncar_ccsm4_rcp85_2010_3338",
					zindex: 3
				},
				{
					id: "3mgipl2050",
					title:
						"GIPL Modeled Mean 2050 Ground Temperature at 3 m Depth",
					wmsLayerName:
						"permafrost_beta:magt_3m_c_iem_gipl2_ar5_ncar_ccsm4_rcp85_2050_3338",
					zindex: 3
				},
				{
					id: "3mgipl2010",
					title:
						"GIPL Modeled Mean 2010 Ground Temperature at 3 m Depth",
					wmsLayerName:
						"permafrost_beta:magt_3m_c_iem_gipl2_ar5_ncar_ccsm4_rcp85_2010_3338",
					zindex: 3
				},
				{
					id: "5mgipl2050",
					title:
						"GIPL Modeled Mean 2050 Ground Temperature at 5 m Depth",
					wmsLayerName:
						"permafrost_beta:magt_5m_c_iem_gipl2_ar5_ncar_ccsm4_rcp85_2050_3338",
					zindex: 3
				},
				{
					id: "5mgipl2010",
					title:
						"GIPL Modeled Mean 2010 Ground Temperature at 5 m Depth",
					wmsLayerName:
						"permafrost_beta:magt_5m_c_iem_gipl2_ar5_ncar_ccsm4_rcp85_2010_3338",
					zindex: 3
				},
				{
					id: "obumagt",
					title:
						"2000-2016 Modeled Mean Annual Ground Temperature at Top of Permafrost",
					wmsLayerName: "obu_2018_magt",
					zindex: 3
				},
				{
					id: "altGIPL2010",
					title: "GIPL Modeled 2010 Active Layer Thickness",
					wmsLayerName:
						"permafrost_beta:alt_m_iem_gipl2_ar5_ncar_ccsm4_rcp85_2010_3338",
					zindex: 3
				},
				{
					id: "altGIPL2050",
					title: "GIPL Modeled 2050 Active Layer Thickness",
					wmsLayerName:
						"permafrost_beta:alt_m_iem_gipl2_ar5_ncar_ccsm4_rcp85_2050_3338",
					zindex: 3
				},
				{
					id: "pfextent_jorgenson",
					title: "Permafrost Extent (Jorgenson et al., 2008)",
					wmsLayerName:
						"permafrost_beta:jorgenson_2008_pf_extent_ground_ice_volume",
					zindex: 3
				},
				{
					id: "pfextent_obu",
					title: "Permafrost Extent (Obu et al., 2018)",
					wmsLayerName: "permafrost_beta:obu_pf_extent",
					zindex: 3
				},
				{
					id: "icevol_jorgenson",
					title: "Ground Ice Volume (Jorgenson et al., 2008)",
					wmsLayerName:
						"permafrost_beta:jorgenson_2008_pf_extent_ground_ice_volume",
					styles: "ground_ice_volume",
					zindex: 3
				}
			]
		};
	},
	mounted() {
		this.$store.commit("map/addEventHandler", {
			event: "click",
			handler: this.handleMapClick
		});
	},
	methods: {
		handleMapClick: function(event) {
			this.$store.commit("map/setLatLng", event.latlng);

			// TODO: manage this better with error handling
			this.reportIsVisible = true;
		}
	}
};
</script>
