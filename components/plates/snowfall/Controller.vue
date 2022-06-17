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
          <SnowfallReport />
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
import SnowfallLegend from '~/components/plates/snowfall/Legend'
import SnowfallReport from '~/components/plates/snowfall/Report'
import SearchControls from '~/components/SearchControls'
import layers from '~/components/plates/snowfall/layers'
import { mapGetters } from 'vuex'

export default {
  name: 'SnowfallController',
  components: { Plate, SnowfallLegend, SnowfallReport, SearchControls },
  data() {
    return {
      legend: SnowfallLegend,
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
