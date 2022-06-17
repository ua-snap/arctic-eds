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
          <PhysiographyReport />
        </div>
      </section>
    </div>
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import Plate from '~/components/Plate'
import PhysiographyReport from '~/components/plates/physiography/Report'
import PhysiographyLegend from '~/components/plates/physiography/Legend'
import SearchControls from '~/components/SearchControls'
import layers from '~/components/plates/physiography/layers'
import { mapGetters } from 'vuex'

export default {
  name: 'PhysiographyController',
  components: { Plate, PhysiographyReport, PhysiographyLegend, SearchControls },
  data() {
    return {
      legend: PhysiographyLegend,
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
