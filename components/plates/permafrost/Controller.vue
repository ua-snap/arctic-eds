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
import SearchControls from "~/components/SearchControls.vue";
import layers from "~/components/plates/permafrost/layers";
import { mapGetters } from "vuex";

export default {
	name: "PermafrostController",
	components: { Plate, PermafrostReport, PermafrostLegend, SearchControls },
	data() {
		return {
			legend: PermafrostLegend,
			layers: layers
		};
	},
	computed: {
		...mapGetters({
			reportIsVisible: "report/reportIsVisible",
			latLng: "report/latLng"
		})
	},
	mounted() {
		// Wire up click handler
		this.$store.commit("map/addLayerEventHandler", {
			event: "click",
			handler: this.handleMapClick
		});

		if (this.latLng.lat && this.latLng.lng) {
			this.activateReport(this.latLng);
		};
	},
	methods: {
		handleMapClick: function(event) {
			this.activateReport(event.latlng);
		},
		activateReport: function(latLng) {
			if (typeof(latLng.lat) == 'number') {
				this.$store.commit("report/setLatLng", latLng);
			}
      this.$store.commit("report/openReport", this.$route.fullPath);
		}
	}
};
</script>
