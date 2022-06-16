<template>
  <div>
    <div v-show="!reportIsVisible" class="container">
      <SearchControls />
    </div>

    <Plate :layers="layers" v-show="!reportIsVisible"></Plate>

    <div class="container">
      <section class="section">
        <div v-show="this.reportIsVisible" class="report-wrapper">
          <GeologyReport />
        </div>
      </section>
    </div>
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import Plate from '~/components/Plate'
import GeologyReport from '~/components/plates/geology/Report'
import SearchControls from '~/components/SearchControls.vue'
import layers from '~/components/plates/geology/layers'
import { mapGetters } from 'vuex'

export default {
  name: 'GeologyController',
  components: { Plate, GeologyReport, SearchControls },
  data() {
    return {
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
