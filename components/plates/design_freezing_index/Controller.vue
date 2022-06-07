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
          <DesignFreezingIndexReport />
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
import DesignFreezingIndexLegend from "~/components/plates/design_freezing_index/Legend";
import DesignFreezingIndexReport from "~/components/plates/design_freezing_index/Report";
import SearchControls from "~/components/SearchControls";
import layers from "~/components/plates/design_freezing_index/layers";
import { mapGetters } from "vuex";

export default {
  name: "DesignFreezingIndexController",
  components: { Plate, DesignFreezingIndexLegend, DesignFreezingIndexReport, SearchControls },
  data() {
    return {
      legend: DesignFreezingIndexLegend,
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
