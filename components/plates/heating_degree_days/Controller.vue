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
          <HeatingDegreeDaysReport />
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
import HeatingDegreeDaysLegend from "~/components/plates/heating_degree_days/Legend";
import HeatingDegreeDaysReport from "~/components/plates/heating_degree_days/Report";
import SearchControls from "~/components/SearchControls";
import layers from "~/components/plates/heating_degree_days/layers";
import { mapGetters } from "vuex";

export default {
  name: "HeatingDegreeDaysController",
  components: { Plate, HeatingDegreeDaysLegend, HeatingDegreeDaysReport, SearchControls },
  data() {
    return {
      legend: HeatingDegreeDaysLegend,
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
