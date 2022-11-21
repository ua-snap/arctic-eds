<template>
  <div>
    <client-only>
      <div v-show="!reportIsVisible">
        <div class="mx-5 mb-5">
          <h2 class="title is-4 mt-3">
            Modern environmental data for science and engineering.
          </h2>
          <div class="content is-size-5">
            <p>
              Do you need readily available, high quality engineering and
              environmental data for projects in Alaska and the Arctic?
            </p>
            <p>
              The Arctic-EDS offers curated, vetted datasets through online
              maps, processing modules and direct data access.
            </p>
            <p>
              <b-button tag="nuxt-link" to="/about">
                Learn more about the system
              </b-button>
            </p>
          </div>
        </div>

        <SearchControls />
        <div class="px-5 pb-6">
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
        <MapModal />
      </div>
      <div v-if="reportIsVisible">
        <FullReport />
      </div>
    </client-only>
  </div>
</template>
<style lang="scss" scoped>
::v-deep {
  a.button {
    color: white !important;
    background-color: #d43f16;
    border: none;
    font-weight: 600;
  }
  .map-thumbnail {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
<script>
import { mapGetters } from 'vuex'
import MapModal from '~/components/MapModal'
import SearchControls from '~/components/SearchControls'
import FullReport from '~/components/Report'

export default {
  name: 'HomePage',
  layout: 'home',
  components: {
    MapModal,
    SearchControls,
    FullReport,
  },
  computed: {
    ...mapGetters({
      selectedMap: 'map/selectedMap',
      reportIsVisible: 'report/reportIsVisible',
    }),
  },
  created() {
    const path = (/#!(\/.*)$/.exec(this.$route.fullPath) || [])[1]
    if (path) {
      this.$router.push({ path: path })
    }
  },
  methods: {
    showMap(event, mapId) {
      this.$store.commit('map/selectMap', mapId)
    },
  },
}
</script>
