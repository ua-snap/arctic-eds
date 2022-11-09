<template>
  <div>
    <div v-if="!this.reportIsVisible">
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
            The Arctic-EDS offers curated, vetted datasets through online maps,
            processing modules and direct data access.
          </p>
          <p>
            <b-button tag="nuxt-link" to="/about">
              Learn more about the system
            </b-button>
          </p>
        </div>
      </div>
      <SearchControls />
      <div class="columns mx-2 mb-5">
        <div class="column is-half">
          <h4 class="is-size-4">Precipitation</h4>
          <Map mapId="precipitation" />
        </div>
        <div class="column is-half">
          <h4 class="is-size-4">Snowfall</h4>
          <Map mapId="snowfall" />
        </div>
      </div>
      <div class="columns mx-2 mb-5">
        <div class="column is-half">
          <h4 class="is-size-4">Temperature</h4>
          <Map mapId="temperature" />
        </div>
        <div class="column is-half">
          <h4 class="is-size-4">Design Freezing Index</h4>
          <Map mapId="design_freezing_index" />
        </div>
      </div>
      <div class="columns mx-2 mb-5">
        <div class="column is-half">
          <h4 class="is-size-4">Design Thawing Index</h4>
          <Map mapId="design_thawing_index" />
        </div>
        <div class="column is-half">
          <h4 class="is-size-4">Freezing Index</h4>
          <Map mapId="freezing_index" />
        </div>
      </div>
      <div class="columns mx-2 mb-5">
        <div class="column is-half">
          <h4 class="is-size-4">Thawing Index</h4>
          <Map mapId="thawing_index" />
        </div>
        <div class="column is-half">
          <h4 class="is-size-4">Heating Degree Days</h4>
          <Map mapId="heating_degree_days" />
        </div>
      </div>
      <div class="columns mx-2 mb-5">
        <div class="column is-half">
          <h4 class="is-size-4">Ecoregions</h4>
          <Map mapId="ecoregions" />
        </div>
        <div class="column is-half">
          <h4 class="is-size-4">Geology</h4>
          <Map mapId="geology" />
        </div>
      </div>
      <div class="columns mx-2 mb-5">
        <div class="column is-half">
          <h4 class="is-size-4">Permafrost</h4>
          <Map mapId="permafrost" />
        </div>
      </div>
    </div>
    <!-- <div v-if="reportIsVisible">
      <FullReport />
    </div> -->
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
}
</style>
<script>
import { mapGetters } from 'vuex'
import Map from '~/components/Map'
import layers from '~/components/layers'
import SearchControls from '~/components/SearchControls'
import FullReport from '~/components/Report'

export default {
  name: 'HomePage',
  layout: 'home',
  components: {
    Map,
    SearchControls,
    FullReport,
  },
  ...mapGetters({
    reportIsVisible: 'report/reportIsVisible',
  }),
  created() {
    const path = (/#!(\/.*)$/.exec(this.$route.fullPath) || [])[1]
    if (path) {
      this.$router.push({ path: path })
    }
  },
  mounted() {
    Object.keys(layers.variables).forEach(layerVariable => {
      let defaultLayer = _.filter(layers.variables[layerVariable], layer => {
        return layer['default']
      })[0]
      this.$store.commit('map/toggleLayer', {
        mapId: layerVariable,
        layer: defaultLayer,
      })
    })
  },
}
</script>
