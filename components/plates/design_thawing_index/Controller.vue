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
          <DesignThawingIndexReport />
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
import DesignThawingIndexLegend from "~/components/plates/design_thawing_index/Legend";
import DesignThawingIndexReport from "~/components/plates/design_thawing_index/Report";
import SearchControls from "~/components/SearchControls";
import layers from "~/components/plates/design_thawing_index/layers";
import { mapGetters } from "vuex";

export default {
  name: "DesignThawingIndexController",
  components: { Plate, DesignThawingIndexLegend, DesignThawingIndexReport, SearchControls },
  data() {
    return {
      legend: DesignThawingIndexLegend,
      layers: layers
    };
  },
  computed: {
    ...mapGetters({
      reportIsVisible: "report/reportIsVisible"
    })
  },
  mounted() {
    // Wire up click handler
    this.$store.commit("map/addLayerEventHandler", {
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
      this.$store.commit("report/openReport");
    }
  }
};
</script>
