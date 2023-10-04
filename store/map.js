import _ from 'lodash'
import ak from '!raw-loader!../assets/alaska.geojson'
const akJson = JSON.parse(ak)
import mapContent from '~/components/map_content'
import Vue from 'vue'

// These three variables needs to be outside of the Store or there's problems
// because Leaflet mutates the state of the map, and Vuex
// throws a "Don't do that" error; plus, having these objects
// within the scope of the Nuxt/Vue reactivity decoration causes
// unpredictable buggy behavior ("too much recursion")

// collection of Leaflet map objects, keys mapping to map_content.js
var maps = {}

// collection of active layer Leaflet objects, keyed like `maps` var above
var layerObjects = {}

// Collection of legend objects, keyed like `maps` var above
var legendControls = {}

function getBaseMapAndLayers() {
  var baseLayer = new L.tileLayer.wms(process.env.geoserverUrl, {
    transparent: true,
    srs: 'EPSG:3338',
    format: 'image/png',
    version: '1.3.0',
    layers: [
      'atlas_mapproxy:alaska_osm_retina',
      'ak_shadow_mask:ak_symmetric_difference',
    ],
  })

  // Projection definition.
  var proj = new L.Proj.CRS(
    'EPSG:3338',
    '+proj=aea +lat_1=55 +lat_2=65 +lat_0=50 +lon_0=-154 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs',
    {
      resolutions: [4096, 2048, 1024, 512, 256, 128, 64],

      // Origin should be lower-left coordinate
      // in projected space.  Use GeoServer to
      // find this:
      // TileSet > Gridset Bounds > compute from maximum extent of SRS
      origin: [-4648005.934316417, 444809.882955059],
    }
  )

  // Set maximum bounds of main map
  let southWest = L.latLng('50.5', '155')
  let northEast = L.latLng('64', '-131')
  let bounds = L.latLngBounds(southWest, northEast)

  // Map base configuration
  var config = {
    zoom: 1,
    minZoom: 1,
    maxZoom: 6,
    center: [64.7, -155],
    scrollWheelZoom: false,
    crs: proj,
    continuousWorld: true,
    zoomControl: false,
    doubleClickZoom: false,
    attributionControl: false,
    layers: [baseLayer],
    maxBounds: bounds,
  }

  return config
}

function buildLayer(layer) {
  let layerConfiguration = {
    transparent: true,
    format: 'image/png',
    version: '1.3.0',
    layers: layer.wmsLayerName,
    id: layer.id,
  }

  if (layer.style) {
    layerConfiguration.styles = layer.style
  }

  if (layer.rasdamanConfiguration) {
    layerConfiguration = {
      ...layerConfiguration,
      ...layer.rasdamanConfiguration,
    }
  }

  let wmsUrl =
    layer.source == 'rasdaman'
      ? process.env.rasdamanUrl
      : process.env.geoserverUrl

  return L.tileLayer.wms(wmsUrl, layerConfiguration)
}

export default {
  state() {
    return {
      selectedLayers: {},
    }
  },

  getters: {
    getSelectedLayers(state) {
      return state.selectedLayers
    },
  },

  mutations: {
    create(state, mapName) {
      maps[mapName] = L.map(mapName, getBaseMapAndLayers())
      maps[mapName].on('drag', function () {
        map.mapName.panInsideBounds(mapConfig.maxBounds, { animate: false })
      })
      new L.Control.Zoom({ position: 'topright' }).addTo(maps[mapName])
    },
    destroy(state, mapName) {
      if (maps[mapName]) {
        maps[mapName].remove()
      }
    },
    setSelectedLayer(state, layerInfo) {
      // Because it's an object, need to use Vue.set to get
      // proper reactivity
      Vue.set(state.selectedLayers, layerInfo.mapName, layerInfo.layer.id)
    },
    addLegend(state, mapId) {
      if (legendControls[mapId]) {
        legendControls[mapId].remove()
      }
      legendControls[mapId] = L.control({ position: 'bottomleft' })
      legendControls[mapId].onAdd = map => {
        var div = L.DomUtil.create('div', 'info legend')
        let mapLayers = mapContent.layers[mapId]
        let currentLayer = _.find(mapLayers, {
          id: state.selectedLayers[mapId],
        })
        let legend = currentLayer.legend
        let legendItems = mapContent.legends[legend]

        div.innerHTML = ''
        legendItems.forEach(legendItem => {
          div.innerHTML +=
            '<div class="legend-item"><div class="legend-swatch" style="background-color: ' +
            legendItem['color'] +
            ';"></div> ' +
            legendItem['label'] +
            '</div>'
        })
        return div
      }

      legendControls[mapId].addTo(maps[mapId])
    },
    toggleLayer(state, layerObj) {
      // Remove existing layer: right now, we only
      // want one layer to be visible on any plate in the Atlas.
      // Need to test explicitly for the existence of the
      // layerObject because this code can get run while
      // the full DOM is hydrating, see MapLayer / mounted().

      if (
        state.selectedLayers[layerObj.mapId] &&
        layerObjects[layerObj.mapId]
      ) {
        maps[layerObj.mapId].removeLayer(layerObjects[layerObj.mapId])
      }

      // Build configuration merging some basics with
      // layer-specific configuration in map_content.js
      let layer = layerObj.layer
      let layerConfiguration = {
        transparent: true,
        format: 'image/png',
        version: '1.3.0',
        layers: layer.wmsLayerName,
        id: layer.id,
      }

      if (layer.style) {
        layerConfiguration.styles = layer.style
      }

      if (layer.rasdamanConfiguration) {
        layerConfiguration = {
          ...layerConfiguration,
          ...layer.rasdamanConfiguration,
        }
      }

      let wmsUrl =
        layer.source == 'rasdaman'
          ? process.env.rasdamanUrl
          : process.env.geoserverUrl

      layerObjects[layerObj.mapId] = L.tileLayer.wms(wmsUrl, layerConfiguration)
      maps[layerObj.mapId].addLayer(layerObjects[layerObj.mapId])
      this.commit('map/setSelectedLayer', {
        mapName: layerObj.mapId,
        layer: layer,
      })
      this.commit('map/addLegend', layerObj.mapId)
    },
  },
}
