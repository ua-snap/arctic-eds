<template>
  <section class="section">
    <div class="block">
      <MapBlock mapName="precipitation">
        <template v-slot:layers>
          <h3 class="title is-">Precipitation</h3>

          <MapLayer mapName="precipitation" :layer="layers.precipitation[0]">
            <template v-slot:title
              >Total annual precipitation, historical</template
            >
            <template v-slot:subtext>1980&ndash;2009, CRU TS 4.0</template>
          </MapLayer>

          <MapLayer mapName="precipitation" :layer="layers.precipitation[1]">
            <template v-slot:title
              >Total annual precipitation, projected</template
            >
            <template v-slot:subtext
              >2040&ndash;2069, NCAR CCSM4, RCP 8.5</template
            >
          </MapLayer>

          <MapLayer mapName="precipitation" :layer="layers.precipitation[2]">
            <template v-slot:title>Total annual snowfall, historical</template>
            <template v-slot:subtext>1910&ndash;1919, CRU TS 3.1</template>
          </MapLayer>

          <MapLayer mapName="precipitation" :layer="layers.precipitation[3]">
            <template v-slot:title>Total annual snowfall, projected</template>
            <template v-slot:subtext
              >2090&ndash;2099, NCAR CCSM4, RCP 8.5</template
            >
          </MapLayer>

          <MapLayer mapName="precipitation" :layer="layers.precipitation[4]">
            <template v-slot:title>Wet days per year, historical</template>
            <template v-slot:subtext>1980&ndash;2009, ERA-Interim</template>
          </MapLayer>

          <MapLayer mapName="precipitation" :layer="layers.precipitation[5]">
            <template v-slot:title>Wet days per year, projected</template>
            <template v-slot:subtext
              >2040&ndash;2069, NCAR CCSM4, RCP 8.5</template
            >
          </MapLayer>
        </template>
      </MapBlock>
    </div>

    <div class="block">
      <MapBlock mapName="permafrost">
        <template v-slot:layers>
          <h3 class="title is-3">Permafrost</h3>

          <MapLayer mapName="permafrost" :layer="layers.permafrost[0]">
            <template v-slot:title>Permafrost extent</template>
            <template v-slot:subtext>Jorgenson et al., 2008</template>
          </MapLayer>

          <MapLayer mapName="permafrost" :layer="layers.permafrost[1]">
            <template v-slot:title>Ground ice volume</template>
            <template v-slot:subtext>Jorgenson et al., 2008</template>
          </MapLayer>

          <MapLayer mapName="permafrost" :layer="layers.permafrost[2]">
            <template v-slot:title>Permafrost extent</template>
            <template v-slot:subtext>Obu et al., 2018</template>
          </MapLayer>

          <MapLayer mapName="permafrost" :layer="layers.permafrost[3]">
            <template v-slot:title
              >Mean annual ground temperature at top of permafrost</template
            >
            <template v-slot:subtext
              >2000&ndash;2016, Obu et al., 2018</template
            >
          </MapLayer>

          <MapLayer mapName="permafrost" :layer="layers.permafrost[4]">
            <template v-slot:title
              >Mean annual ground temperature at 1m</template
            >
            <template v-slot:subtext
              >2021&ndash;2050, 5-Model Average, RCP 8.5, GIPL model</template
            >
          </MapLayer>

          <MapLayer mapName="permafrost" :layer="layers.permafrost[5]">
            <template v-slot:title
              >Mean annual ground temperature at 1m</template
            >
            <template v-slot:subtext
              >2071&ndash;2100, 5-Model Average, RCP 8.5, GIPL model</template
            >
          </MapLayer>
        </template>
      </MapBlock>
    </div>

    <div class="block">
      <MapBlock mapName="temperature">
        <template v-slot:layers>
          <h3 class="title is-3">Temperature</h3>
          <MapLayer mapName="temperature" :layer="layers.temperature[0]" />
          <MapLayer mapName="temperature" :layer="layers.temperature[1]" />
          <MapLayer mapName="temperature" :layer="layers.temperature[2]" />
          <MapLayer mapName="temperature" :layer="layers.temperature[3]" />
          <MapLayer mapName="temperature" :layer="layers.temperature[4]" />
          <MapLayer mapName="temperature" :layer="layers.temperature[5]" />
          <MapLayer mapName="temperature" :layer="layers.temperature[6]" />
          <MapLayer mapName="temperature" :layer="layers.temperature[7]" />
          <MapLayer mapName="temperature" :layer="layers.temperature[8]" />
          <MapLayer mapName="temperature" :layer="layers.temperature[9]" />
        </template>
      </MapBlock>
    </div>

    <div class="block">
      <MapBlock mapName="temperature_indices">
        <template v-slot:layers>
          <h3 class="title is-3">Temperature Indices</h3>
          <MapLayer
            mapName="temperature_indices"
            v-bind:layer="layers.temperature_indices[0]"
          />
          <MapLayer
            mapName="temperature_indices"
            v-bind:layer="layers.temperature_indices[1]"
          />
          <MapLayer
            mapName="temperature_indices"
            v-bind:layer="layers.temperature_indices[2]"
          />
          <MapLayer
            mapName="temperature_indices"
            v-bind:layer="layers.temperature_indices[3]"
          />
          <MapLayer
            mapName="temperature_indices"
            v-bind:layer="layers.temperature_indices[4]"
          />
          <MapLayer
            mapName="temperature_indices"
            v-bind:layer="layers.temperature_indices[5]"
          />
        </template>
      </MapBlock>
    </div>
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
  },
}
</script>
