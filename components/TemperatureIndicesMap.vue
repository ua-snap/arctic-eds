<template>
  <MapBlock>
    <template v-slot:layers>
      <div class="layer-list-wrapper">
        <div class="layers content mx-5">
          <p>
            Historical layers show <strong>modeled</strong> data from the ERA
            Interim model, averaged over 1980&ndash;2009.
          </p>
          <p>
            Projected layers show data from the NCAR CCSM4 model under the RCP
            8.5 scenario, averaged over 2040&ndash;2069.
          </p>
          <h5 class="mb-2">Heating Degree Days</h5>
          <ul>
            <li>
              <MapLayer v-bind:key="layers[0].id" v-bind:layer="layers[0]" />
            </li>
            <li class="mb-3">
              <MapLayer v-bind:key="layers[1].id" v-bind:layer="layers[1]" />
            </li>
          </ul>
          <h5 class="mb-2">Freezing Index</h5>
          <ul>
            <li>
              <MapLayer v-bind:key="layers[2].id" v-bind:layer="layers[2]" />
            </li>
            <li class="mb-3">
              <MapLayer v-bind:key="layers[3].id" v-bind:layer="layers[3]" />
            </li>
          </ul>
          <h5 class="mb-2">Thawing Index</h5>
          <ul>
            <li>
              <MapLayer v-bind:key="layers[4].id" v-bind:layer="layers[4]" />
            </li>
            <li class="mb-3">
              <MapLayer v-bind:key="layers[5].id" v-bind:layer="layers[5]" />
            </li>
          </ul>
        </div>
      </div>
    </template>
  </MapBlock>
</template>

<script>
import MapBlock from '~/components/MapBlock'
import mapContent from '~/components/map_content'

export default {
  name: 'TemperatureIndicesMap',
  components: {
    MapBlock,
  },
  computed: {
    layers() {
      return mapContent.layers['temperature_indices']
    },
  },
}
</script>
