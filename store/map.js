import _ from 'lodash'
import ak from '!raw-loader!../assets/alaska.geojson'
const akJson = JSON.parse(ak)
import mapContent from '~/components/map_content'

// This needs to be outside of the Store or there's problems
// because Leaflet mutates the state of the map, and Vuex
// throws a "Don't do that" error; plus, having these objects
// within the scope of the Nuxt/Vue reactivity decoration causes
// unpredictable buggy behavior ("too much recursion")
var map = {}
var layerObject
var legendControl

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
      selectedLayer: undefined,
    }
  },

  getters: {
    selectedLayer(state) {
      return state.selectedLayer
    },
  },

  mutations: {
    create(state, mapName) {
      map.mapName = L.map(mapName, getBaseMapAndLayers())
      map.mapName.on('drag', function () {
        map.mapName.panInsideBounds(mapConfig.maxBounds, { animate: false })
      })
      new L.Control.Zoom({ position: 'topright' }).addTo(map.mapName)
    },
    destroy(state) {
      map.mapName.remove()
    },
    selectLayer(state, selectedLayer) {
      state.selectedLayer = selectedLayer
    },
    addLegend(state, mapId) {
      if (legendControl) {
        legendControl.remove()
      }
      legendControl = L.control({ position: 'bottomleft' })
      legendControl.onAdd = map => {
        var div = L.DomUtil.create('div', 'info legend')
        let mapLayers = mapContent.layers[mapId]
        let currentLayer = _.find(mapLayers, { id: state.selectedLayer.id })
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

      legendControl.addTo(map.mapName)
    },
    toggleLayer(state, layerObj) {
      // Remove existing layer: right now, we only
      // want one layer to be visible on any plate in the Atlas.
      // Need to test explicitly for the existence of the
      // layerObject because this code can get run while
      // the full DOM is hydrating, see MapLayer / mounted().
      if (state.selectedLayer && layerObject) {
        map.mapName.removeLayer(layerObject)
      }

      // Add to map!
      state.layer = layerObj.layer
      let layerConfiguration = {
        transparent: true,
        format: 'image/png',
        version: '1.3.0',
        layers: state.layer.wmsLayerName,
        id: state.layer.id,
      }

      if (state.layer.style) {
        layerConfiguration.styles = state.layer.style
      }

      if (state.layer.rasdamanConfiguration) {
        layerConfiguration = {
          ...layerConfiguration,
          ...state.layer.rasdamanConfiguration,
        }
      }

      let wmsUrl =
        state.layer.source == 'rasdaman'
          ? process.env.rasdamanUrl
          : process.env.geoserverUrl

      layerObject = L.tileLayer.wms(wmsUrl, layerConfiguration)

      map.mapName.addLayer(layerObject)
      this.commit('map/selectLayer', state.layer)
      this.commit('map/addLegend', layerObj.mapId)
    },
  },
}
