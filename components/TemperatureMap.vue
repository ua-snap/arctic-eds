<template>
  <MapModal>
    <template v-slot:layers :layers="layers">
      <div class="layer-list-wrapper">
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
          <h5 class="mb-2">Annual Mean Temperature</h5>
          <ul>
            <li>
              <MapLayer v-bind:key="layers[0].id" v-bind:layer="layers[0]" />
            </li>
            <li class="mb-3">
              <MapLayer v-bind:key="layers[1].id" v-bind:layer="layers[1]" />
            </li>
          </ul>
          <h5 class="layer-section">January Temperatures</h5>
          <h6>Minimum</h6>
          <ul>
            <li>
              <MapLayer v-bind:key="layers[2].id" v-bind:layer="layers[2]" />
            </li>
            <li class="mb-3">
              <MapLayer v-bind:key="layers[3].id" v-bind:layer="layers[3]" />
            </li>
          </ul>
          <h6>Maximum</h6>
          <ul>
            <li>
              <MapLayer v-bind:key="layers[4].id" v-bind:layer="layers[4]" />
            </li>
            <li class="mb-3">
              <MapLayer v-bind:key="layers[5].id" v-bind:layer="layers[5]" />
            </li>
          </ul>
          <h5 class="layer-section">July Temperatures</h5>
          <h6>Minimum</h6>
          <ul>
            <li>
              <MapLayer v-bind:key="layers[6].id" v-bind:layer="layers[6]" />
            </li>
            <li class="mb-3">
              <MapLayer v-bind:key="layers[7].id" v-bind:layer="layers[7]" />
            </li>
          </ul>
          <h6>Maximum</h6>
          <ul>
            <li>
              <MapLayer v-bind:key="layers[8].id" v-bind:layer="layers[8]" />
            </li>
            <li class="mb-3">
              <MapLayer v-bind:key="layers[9].id" v-bind:layer="layers[9]" />
            </li>
          </ul>
        </div>
      </div>
    </template>
  </MapModal>
</template>

<script>
import MapModal from '~/components/MapModal'
import mapContent from '~/components/map_content'

export default {
  name: 'Temperature',
  components: {
    MapModal,
  },
  computed: {
    layers() {
      return mapContent.layers['temperature']
    },
  },
}
</script>
