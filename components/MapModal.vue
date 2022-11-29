<template>
  <b-modal v-model="open" class="map-modal">
    <div class="map-content">
      <h4 class="is-size-4 pt-2 pl-4 map-title">
        {{ mapTitle }}
      </h4>
      <p class="pl-4 map-blurb">{{ mapBlurb }}</p>
      <div class="is-flex">
        <slot name="layers">
          <div class="layer-list-wrapper">
            <LayerList class="layers mx-3" :layers="layers" />
          </div>
        </slot>
        <Map class="map" />
      </div>
    </div>
  </b-modal>
</template>

<style lang="scss" scoped>
::v-deep {
  .modal-content {
    max-width: 100% !important;
    max-height: 100%;
    background-color: #ffffff;
    width: calc(100vw - 30px);
    height: calc(100vh - 30px);
    margin: 15px;
  }
  .layer-list-wrapper {
    border-top: 1px solid #ddd;
    padding-top: 15px;
    overflow-wrap: normal;
    overflow-y: auto;

    width: 25%;

    // Offset height by:
    // 42px for the map title
    // 32px for the map blurb
    // 30px for the top (15px) + bottom (15px) margin around modal
    height: calc(100vh - 42px - 32px - 30px);
  }
  .map {
    width: 75%;

    // Offset height by:
    // 42px for the map title
    // 32px for the map blurb
    // 30px for the top (15px) + bottom (15px) margin around modal
    height: calc(100vh - 42px - 32px - 30px);
  }
  .modal-close {
    top: 34px;
    right: 38px;
    background-color: rgba(10, 10, 10, 0.3);
    &:hover {
      background-color: rgba(10, 10, 10, 0.6);
    }
  }
  .map-title {
    height: 42px;
    padding-top: 9px;
  }
  .map-blurb {
    height: 32px;
  }
  .layers {
    h6 {
      margin-bottom: 0;
      color: #666;
      font-size: 110%;
      margin-top: 0;
    }
    ul {
      list-style-type: none;
      margin: 0;
      li {
        margin: 0.1rem 0;
        padding: 0.1rem;
      }
    }
  }
}
</style>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import Map from '~/components/Map'
import LayerList from '~/components/LayerList'
import mapContent from '~/components/map_content'

export default {
  name: 'MapModal',
  components: {
    Map,
    LayerList,
  },
  computed: {
    ...mapGetters({
      selectedMap: 'map/selectedMap',
    }),
    mapTitle() {
      return mapContent.titles[this.selectedMap]
    },
    mapBlurb() {
      return mapContent.blurbs[this.selectedMap]
    },
    open: {
      get() {
        return this.selectedMap != undefined
      },
      set() {
        this.$store.commit('map/selectMap', undefined)
      },
    },
    layers() {
      return mapContent.layers[this.selectedMap]
    },
  },
  methods: {
    selectDefaultLayer() {
      let defaultLayer = _.filter(
        mapContent.layers[this.selectedMap],
        layer => {
          return layer['default']
        }
      )[0]
      this.$store.commit('map/selectLayer', defaultLayer)
    },
  },
}
</script>
