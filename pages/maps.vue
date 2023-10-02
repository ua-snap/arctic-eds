<template>
  <section class="section">
    <div class="px-5 pb-6 is-hidden-mobile">
      <div class="columns is-multiline">
        <div class="column is-half">
          <h3 class="is-size-4">Precipitation</h3>
          <p class="category-subtitle mb-1">
            Mean annual precipitation and snowfall
          </p>
          <img
            src="~/assets/images/map_thumbnails/precipitation.png"
            alt="Precipitation map thumbnail"
            class="map-thumbnail"
            @click="showMap($event, 'precipitation')"
          />
        </div>
        <div class="column is-half">
          <h3 class="is-size-4">Temperature</h3>
          <p class="category-subtitle mb-1">
            Average, minimum, and maximum temperatures
          </p>
          <img
            src="~/assets/images/map_thumbnails/temperature.png"
            alt="Temperature map thumbnail"
            class="map-thumbnail"
            @click="showMap($event, 'temperature')"
          />
        </div>
        <div class="column is-half">
          <h3 class="is-size-4">Temperature Indices</h3>
          <p class="category-subtitle mb-1">
            Heating degree days, freezing/thawing degree days, and more
          </p>
          <img
            src="~/assets/images/map_thumbnails/temperature_indices.png"
            alt="Design Freezing Index map thumbnail"
            class="map-thumbnail"
            @click="showMap($event, 'temperature_indices')"
          />
        </div>
        <div class="column is-half">
          <h3 class="is-size-4">Permafrost</h3>
          <p class="category-subtitle mb-1">
            Permafrost extent, mean annual ground temperature, and more
          </p>
          <img
            src="~/assets/images/map_thumbnails/permafrost.png"
            alt="Permafrost map thumbnail"
            class="map-thumbnail"
            @click="showMap($event, 'permafrost')"
          />
        </div>
      </div>
    </div>
    <TemperatureMap v-if="this.selectedMap == 'temperature'" />
    <TemperatureIndicesMap v-if="this.selectedMap == 'temperature_indices'" />
    <MapModal
      v-if="
        this.selectedMap != undefined &&
        this.selectedMap != 'temperature' &&
        this.selectedMap != 'temperature_indices'
      "
    />
  </section>
</template>

<style lang="scss" scoped>
p:last-of-type {
  margin-bottom: 2.5rem;
}
img {
  display: block;
  margin: 1rem auto;
  width: 30rem;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'content',
  computed: {
    ...mapGetters({
      selectedMap: 'map/selectedMap',
    }),
  },
  methods: {
    showMap(event, mapId) {
      this.$router.push({
        hash: mapId,
      })
    },
  },
  created() {
    const path = (/#!(\/.*)$/.exec(this.$route.fullPath) || [])[1]
    if (path) {
      this.$router.push({ path: path })
    }
  },
}
</script>
