<template>
  <div>
    <div id="map-search" v-show="!reportIsVisible" class="container"></div>

    <Plate :layers="layers" v-show="!reportIsVisible">
      <template v-slot:layers>
        <div class="layers content mx-5">
          <p>
            Historical layers show <strong>modeled</strong> data from the CRU TS
            model, averaged over 1980&ndash;2009.
          </p>
          <p>
            Projected layers show data from the NCAR CCSM4 model under the RCP
            8.5 scenario, averaged over 2040&ndash;2069.
            <NuxtLink to="/climate-modeling">Read more</NuxtLink>
          </p>
          <h5>Annual Mean Temperature</h5>
          <ul>
            <li><MapLayer v-bind:layer="layers[0]" /></li>
            <li><MapLayer v-bind:layer="layers[1]" /></li>
          </ul>
          <h5 class="layer-section">January Temperatures</h5>
          <h6>Minimum</h6>
          <ul>
            <li><MapLayer v-bind:layer="layers[2]" /></li>
            <li><MapLayer v-bind:layer="layers[3]" /></li>
          </ul>
          <h6>Maximum</h6>
          <ul>
            <li><MapLayer v-bind:layer="layers[4]" /></li>
            <li><MapLayer v-bind:layer="layers[5]" /></li>
          </ul>
          <h5 class="layer-section">July Temperatures</h5>
          <h6>Minimum</h6>
          <ul>
            <li><MapLayer v-bind:layer="layers[6]" /></li>
            <li><MapLayer v-bind:layer="layers[7]" /></li>
          </ul>
          <h6>Maximum</h6>
          <ul>
            <li><MapLayer v-bind:layer="layers[8]" /></li>
            <li><MapLayer v-bind:layer="layers[9]" /></li>
          </ul>
        </div>
      </template>

      <template v-slot:legend>
        <component :is="legend"></component>
      </template>
    </Plate>

    <div class="container">
      <section class="section">
        <div v-if="this.reportIsVisible" class="report-wrapper">
          <TemperatureReport />
        </div>
      </section>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layers {
  h5 {
    margin-bottom: 0.25rem;
  }
  h6 {
    margin-bottom: 0rem;
    color: #666;
    font-size: 110%;
    margin-top: 0;
  }
  ul {
    list-style-type: none;
    margin: 0.1rem 0 0.75rem 1rem;
    li {
      margin: 0;
      padding: 0;
    }
  }
  .layer-section {
    margin-top: 1.25rem;
  }
}
</style>
<script>
import Plate from '~/components/Plate'
import TemperatureLegend from '~/components/plates/temperature/Legend'
import TemperatureReport from '~/components/plates/temperature/Report'
import layers from '~/components/plates/temperature/layers'
import { mapGetters } from 'vuex'

export default {
  name: 'TemperatureController',
  components: { Plate, TemperatureLegend, TemperatureReport },
  data() {
    return {
      legend: TemperatureLegend,
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
