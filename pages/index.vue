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
          <h3 class="is-size-3">Climate</h3>
          <hr class="mt-0 mb-4" />
          <div class="columns is-multiline">
            <div class="column is-one-third">
              <img
                src="~/assets/images/map_thumbnails/precipitation.png"
                alt="Precipitation map thumbnail"
                class="map-thumbnail"
                @click="showMap($event, 'precipitation')"
              /><br />
              Precipitation
            </div>
            <div class="column is-one-third">
              <img
                src="~/assets/images/map_thumbnails/snowfall.png"
                alt="Snowfall map thumbnail"
                class="map-thumbnail"
                @click="showMap($event, 'snowfall')"
              /><br />
              Snowfall
            </div>
            <div class="column is-one-third">
              <img
                src="~/assets/images/map_thumbnails/temperature.png"
                alt="Temperature map thumbnail"
                class="map-thumbnail"
                @click="showMap($event, 'temperature')"
              /><br />
              Temperature
            </div>
          </div>
          <h3 class="is-size-3">Engineering</h3>
          <hr class="mt-0 mb-4" />
          <div class="columns is-multiline">
            <div class="column is-one-third">
              <img
                src="~/assets/images/map_thumbnails/design_freezing_index.png"
                alt="Design Freezing Index map thumbnail"
                class="map-thumbnail"
                @click="showMap($event, 'design_freezing_index')"
              /><br />
              Design Freezing Index
            </div>
            <div class="column is-one-third">
              <img
                src="~/assets/images/map_thumbnails/design_thawing_index.png"
                alt="Design Thawing Index map thumbnail"
                class="map-thumbnail"
                @click="showMap($event, 'design_thawing_index')"
              /><br />
              Design Thawing Index
            </div>
            <div class="column is-one-third">
              <img
                src="~/assets/images/map_thumbnails/freezing_index.png"
                alt="Freezing Index map thumbnail"
                class="map-thumbnail"
                @click="showMap($event, 'freezing_index')"
              /><br />
              Freezing Index
            </div>
            <div class="column is-one-third">
              <img
                src="~/assets/images/map_thumbnails/thawing_index.png"
                alt="Thawing Index map thumbnail"
                class="map-thumbnail"
                @click="showMap($event, 'thawing_index')"
              /><br />
              Thawing Index
            </div>
            <div class="column is-one-third">
              <img
                src="~/assets/images/map_thumbnails/heating_degree_days.png"
                alt="Heating Degree Days map thumbnail"
                class="map-thumbnail"
                @click="showMap($event, 'heating_degree_days')"
              /><br />
              Heating Degree Days
            </div>
          </div>
          <h3 class="is-size-3">Physiography</h3>
          <hr class="mt-0 mb-4" />
          <div class="columns is-multiline">
            <div class="column is-one-third">
              <img
                src="~/assets/images/map_thumbnails/ecoregions.png"
                alt="Ecoregions map thumbnail"
                class="map-thumbnail"
                @click="showMap($event, 'ecoregions')"
              /><br />
              Ecoregions
            </div>
            <div class="column is-one-third">
              <img
                src="~/assets/images/map_thumbnails/geology.png"
                alt="Geology map thumbnail"
                class="map-thumbnail"
                @click="showMap($event, 'geology')"
              /><br />
              Geology
            </div>
            <div class="column is-one-third">
              <img
                src="~/assets/images/map_thumbnails/permafrost.png"
                alt="Permafrost map thumbnail"
                class="map-thumbnail"
                @click="showMap($event, 'permafrost')"
              /><br />
              Permafrost
            </div>
          </div>
        </div>
        <MapModal />
        <div v-if="reportIsVisible">
          <FullReport />
        </div>
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
