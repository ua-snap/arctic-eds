<template>
  <div>
    <div id="map-search" v-show="!reportIsVisible" class="container"></div>

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
import Plate from '~/components/Plate'
import PrecipitationLegend from '~/components/plates/precipitation/Legend'
import PrecipitationReport from '~/components/plates/precipitation/Report'
import layers from '~/components/plates/precipitation/layers'
import { mapGetters } from 'vuex'

export default {
  name: 'PrecipitationController',
  components: {
    Plate,
    PrecipitationLegend,
    PrecipitationReport,
  },
  data() {
    return {
      legend: PrecipitationLegend,
      layers: layers,
    }
  },
  computed: {
    ...mapGetters({
      reportIsVisible: 'report/reportIsVisible',
      isPlaceDefined: 'report/isPlaceDefined',
    }),
  },
  mounted() {
    this.$store.commit('map/addLayerEventHandler', {
      event: 'click',
      handler: this.handleMapClick,
    })

    if (this.isPlaceDefined) {
      this.activateReport()
    }
  },
  methods: {
    handleMapClick: function(event) {
      this.$router.push({
        path:
          this.$route.path +
          '/report/' +
          event.latlng.lat.toFixed(4) +
          '/' +
          event.latlng.lng.toFixed(4),
        hash: '#report',
      })
    },
    activateReport: function() {
      this.$store.commit('report/openReport')
    },
  },
}
</script>
