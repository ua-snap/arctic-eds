<template>
  <div>
    <div id="map-search" v-show="!reportIsVisible" class="container">
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
          <EcoregionsReport />
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import Plate from '~/components/Plate'
import EcoregionsReport from '~/components/plates/ecoregions/Report'
import EcoregionsLegend from '~/components/plates/ecoregions/Legend'
import SearchControls from '~/components/SearchControls'
import layers from '~/components/plates/ecoregions/layers'
import { mapGetters } from 'vuex'

export default {
  name: 'EcoregionsController',
  components: { Plate, EcoregionsReport, EcoregionsLegend, SearchControls },
  data() {
    return {
      legend: EcoregionsLegend,
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
    handleMapClick: function (event) {
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
    activateReport: function () {
      this.$store.commit('report/openReport')
    },
  },
}
</script>
