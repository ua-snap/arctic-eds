<template>
  <section class="section">
    <div class="block">
      <h3 class="is-size-4">Precipitation</h3>
      <MapBlock mapName="precipitation" />
    </div>

    <div class="block">
      <h3 class="is-size-4">Permafrost</h3>
      <MapBlock mapName="permafrost" />
    </div>

    <div class="block">
      <h3 class="is-size-4">Temperazzture</h3>
      <MapBlock mapName="temperature">
        <template v-slot:layers>
          <div class="content mx-5">
            <p>
              Historical layers show <strong>modeled</strong> data from the CRU
              TS model, averaged over 1980&ndash;2009.
            </p>
            <p>
              Projected layers show data from the NCAR CCSM4 model under the RCP
              8.5 scenario, averaged over 2040&ndash;2069.
            </p>
            <h5 class="mb-2">Annual Mean Temperature</h5>
            <ul>
              <li>
                <MapLayer
                  mapName="temperature"
                  :layer="layers.temperature[0]"
                />
              </li>
              <li class="mb-3">
                <MapLayer
                  mapName="temperature"
                  :layer="layers.temperature[1]"
                />
              </li>
            </ul>
            <h5 class="layer-section">January Temperatures</h5>
            <h6>Minimum</h6>
            <ul>
              <li>
                <MapLayer
                  mapName="temperature"
                  :layer="layers.temperature[2]"
                />
              </li>
              <li class="mb-3">
                <MapLayer
                  mapName="temperature"
                  :layer="layers.temperature[3]"
                />
              </li>
            </ul>
            <h6>Maximum</h6>
            <ul>
              <li>
                <MapLayer
                  mapName="temperature"
                  :layer="layers.temperature[4]"
                />
              </li>
              <li class="mb-3">
                <MapLayer
                  mapName="temperature"
                  :layer="layers.temperature[5]"
                />
              </li>
            </ul>
            <h5 class="layer-section">July Temperatures</h5>
            <h6>Minimum</h6>
            <ul>
              <li>
                <MapLayer
                  mapName="temperature"
                  :layer="layers.temperature[6]"
                />
              </li>
              <li class="mb-3">
                <MapLayer
                  mapName="temperature"
                  :layer="layers.temperature[7]"
                />
              </li>
            </ul>
            <h6>Maximum</h6>
            <ul>
              <li>
                <MapLayer
                  mapName="temperature"
                  :layer="layers.temperature[8]"
                />
              </li>
              <li class="mb-3">
                <MapLayer
                  mapName="temperature"
                  :layer="layers.temperature[9]"
                />
              </li>
            </ul>
          </div>
        </template>
      </MapBlock>
    </div>

    <!--     <div class="block">
      <h3 class="is-size-4">Temperature Indices</h3>
      <MapBlock mapName="temperature_indices" />
    </div> -->
  </section>
</template>

<style lang="scss" scoped></style>

<script>
import MapBlock from '~/components/MapBlock'
import mapLayers from '~/components/map_content'

export default {
  layout: 'content',
  computed: {
    layers: function () {
      return mapLayers.layers
    },
  }
}
</script>
