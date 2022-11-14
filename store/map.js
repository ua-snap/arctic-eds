import _ from 'lodash'
import ak from '!raw-loader!../assets/alaska.geojson'
const akJson = JSON.parse(ak)
import mapContent from '~/components/map_content'

// This needs to be outside of the Store or there's problems
// because Leaflet mutates the state of the map, and Vuex
// throws a "Don't do that" error; plus, having these objects
// within the scope of the Nuxt/Vue reactivity decoration causes
// unpredictable buggy behavior ("too much recursion")
var map
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
  let southWest = L.latLng('50', '-175')
  let northEast = L.latLng('65', '-98')
  let bounds = L.latLngBounds(southWest, northEast)

  // Map base configuration
  var config = {
    zoom: 1,
    minZoom: 0,
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
      selectedMap: undefined,
      selectedLayer: undefined,
    }
  },

  getters: {
    selectedMap(state) {
      return state.selectedMap
    },
    selectedLayer(state) {
      return state.selectedLayer
    },
  },

  mutations: {
    create(state) {
      map = L.map('map', getBaseMapAndLayers())
      new L.Control.Zoom().addTo(map)
    },
    destroy(state) {
      map.remove()
    },
    selectMap(state, selectedMap) {
      state.selectedMap = selectedMap
    },
    selectLayer(state, selectedLayer) {
      state.selectedLayer = selectedLayer
    },
    addLayers(state, layers) {
      let layerObjs = {}
      let defaultLayer

      layers.forEach(layer => {
        let layerObj = buildLayer(layer)

        if (layer['default']) {
          defaultLayer = layerObj
        }

        layerObjs[layer.title] = layerObj
      })

      map.on('baselayerchange', e => {
        this.commit('map/selectLayer', e.layer.options.id)
        this.commit('map/addLegend')
      })

      let layerControl = L.control.layers(layerObjs).addTo(map)
      map.addLayer(defaultLayer)
      this.commit('map/addLegend')
    },
    addLegend(state) {
      if (legendControl) {
        legendControl.remove()
      }
      legendControl = L.control({ position: 'bottomleft' })
      legendControl.onAdd = map => {
        var div = L.DomUtil.create('div', 'info legend')

        let legendItems
        if (_.isArray(mapContent.legends[state.selectedMap])) {
          legendItems = mapContent.legends[state.selectedMap]
        } else {
          legendItems =
            mapContent.legends[state.selectedMap][state.selectedLayer]
        }

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

      legendControl.addTo(map)
    },
  },
}
