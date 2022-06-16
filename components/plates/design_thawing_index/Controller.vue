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
import Plate from '~/components/Plate'
import DesignThawingIndexLegend from '~/components/plates/design_thawing_index/Legend'
import DesignThawingIndexReport from '~/components/plates/design_thawing_index/Report'
import SearchControls from '~/components/SearchControls'
import layers from '~/components/plates/design_thawing_index/layers'
import { mapGetters } from 'vuex'

export default {
  name: 'DesignThawingIndexController',
  components: {
    Plate,
    DesignThawingIndexLegend,
    DesignThawingIndexReport,
    SearchControls,
  },
  data() {
    return {
      legend: DesignThawingIndexLegend,
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
