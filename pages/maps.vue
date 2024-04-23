<template>
  <div>
    <div class="block">
      <h3 class="title is-3">Statewide Climate Overview Maps</h3>
      <div class="content is-size-4">
        <ul>
          <li>
            Use these maps to see Alaska-wide <strong>overview</strong> of some
            climate-related environmental variables. These maps aren&rsquo;t
            interactive.
          </li>
          <li>
            To see all available data for a point,
            <strong
              >select a community or point at the bottom of the page</strong
            >.
          </li>
          <li>
            <span class="down">⇩</span> <strong>Scroll down</strong> to see maps
            of precipitation, permafrost, temperature, and temperature indices
            such as freezing degree days.
          </li>
        </ul>
      </div>
    </div>
    <div class="block">
      <MapBlock mapName="precipitation">
        <template v-slot:layers>
          <h3 class="title is-4">Precipitation</h3>

          <MapLayer mapName="precipitation" :layer="layers.precipitation[0]">
            <template v-slot:title
              >Total annual precipitation, modeled baseline</template
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
            <template v-slot:title
              >Total annual snowfall, modeled baseline</template
            >
            <template v-slot:subtext>1910&ndash;1919, CRU TS 3.1</template>
          </MapLayer>

          <MapLayer mapName="precipitation" :layer="layers.precipitation[3]">
            <template v-slot:title>Total annual snowfall, projected</template>
            <template v-slot:subtext
              >2090&ndash;2099, NCAR CCSM4, RCP 8.5</template
            >
          </MapLayer>

          <MapLayer mapName="precipitation" :layer="layers.precipitation[4]">
            <template v-slot:title
              >Wet days per year, modeled baseline</template
            >
            <template v-slot:subtext>1980&ndash;2017, Daymet</template>
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
          <h3 class="title is-4">Permafrost</h3>

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
          <h3 class="title is-4">Temperature</h3>
          <MapLayer mapName="temperature" :layer="layers.temperature[0]">
            <template v-slot:title
              >Mean annual temperature, modeled baseline</template
            >
            <template v-slot:subtext>1980&ndash;2009, CRU TS</template>
          </MapLayer>
          <MapLayer mapName="temperature" :layer="layers.temperature[1]">
            <template v-slot:title>Mean annual temperature, projected</template>
            <template v-slot:subtext
              >2040&ndash;2069, NCAR CCSM4, RCP 8.5</template
            >
          </MapLayer>
        </template>
      </MapBlock>
    </div>

    <div class="block">
      <MapBlock mapName="temperature_indices">
        <template v-slot:layers>
          <h3 class="title is-4">Temperature Indices</h3>
          <MapLayer
            mapName="temperature_indices"
            v-bind:layer="layers.temperature_indices[0]"
            ><template v-slot:title
              >Heating degree days, modeled baseline</template
            >
            <template v-slot:subtext
              >1980&ndash;2017, Daymet</template
            ></MapLayer
          >
          <MapLayer
            mapName="temperature_indices"
            v-bind:layer="layers.temperature_indices[1]"
            ><template v-slot:title>Heating degree days, projected</template>
            <template v-slot:subtext
              >2040&ndash;2069, NCAR CCSM4, RCP 8.5</template
            ></MapLayer
          >
          <MapLayer
            mapName="temperature_indices"
            v-bind:layer="layers.temperature_indices[2]"
            ><template v-slot:title>Freezing index, modeled baseline</template>
            <template v-slot:subtext
              >1980&ndash;2017, Daymet</template
            ></MapLayer
          >
          <MapLayer
            mapName="temperature_indices"
            v-bind:layer="layers.temperature_indices[3]"
            ><template v-slot:title>Freezing index, projected</template>
            <template v-slot:subtext
              >2040&ndash;2069, NCAR CCSM4, RCP 8.5</template
            ></MapLayer
          >
          <MapLayer
            mapName="temperature_indices"
            v-bind:layer="layers.temperature_indices[4]"
            ><template v-slot:title>Thawing index, modeled baseline</template>
            <template v-slot:subtext
              >1980&ndash;2017, Daymet</template
            ></MapLayer
          >
          <MapLayer
            mapName="temperature_indices"
            v-bind:layer="layers.temperature_indices[5]"
            ><template v-slot:title>Thawing index, projected</template>
            <template v-slot:subtext
              >2040&ndash;2069, NCAR CCSM4, RCP 8.5</template
            ></MapLayer
          >
        </template>
      </MapBlock>
    </div>
  </div>
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
