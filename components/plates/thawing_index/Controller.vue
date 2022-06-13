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
          <ThawingIndexReport />
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
import ThawingIndexLegend from "~/components/plates/thawing_index/Legend";
import ThawingIndexReport from "~/components/plates/thawing_index/Report";
import SearchControls from "~/components/SearchControls";
import layers from "~/components/plates/thawing_index/layers";
import { mapGetters } from "vuex";

export default {
  name: "ThawingIndexController",
  components: { Plate, ThawingIndexLegend, ThawingIndexReport, SearchControls },
  data() {
    return {
      legend: ThawingIndexLegend,
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
      this.$store.commit("report/openReport");
    }
  }
};
</script>
