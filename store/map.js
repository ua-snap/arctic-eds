import _ from "lodash";

// This needs to be outside of the Store or there's problems
// because Leaflet mutates the state of the map, and Vuex
// throws a "Don't do that" error; plus, having these objects
// within the scope of the Nuxt/Vue reactivity decoration causes
// unpredictable buggy behavior ("too much recursion")
var map;
var layerObject;

function getBaseMapAndLayers() {
	var baseLayer = new L.tileLayer.wms(process.env.geoserverUrl, {
		transparent: true,
		srs: "EPSG:3338",
		format: "image/png",
		version: "1.3.0",
		layers: ["atlas_mapproxy:alaska_osm"]
	});

	// Projection definition.
	var proj = new L.Proj.CRS(
		"EPSG:3338",
		"+proj=aea +lat_1=55 +lat_2=65 +lat_0=50 +lon_0=-154 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
		{
			resolutions: [4096, 2048, 1024, 512, 256, 128, 64],

			// Origin should be lower-left coordinate
			// in projected space.  Use GeoServer to
			// find this:
			// TileSet > Gridset Bounds > compute from maximum extent of SRS
			origin: [-4648005.934316417, 444809.882955059]
		}
	);

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
		layers: [baseLayer]
	};

	return config;
}

export default {
	state() {
		return {
			// Layer definition which is active on the map.
			layer: undefined,
			// Currently active/clicked location
			latLng: {
				lat: undefined,
				lng: undefined
			}
		};
	},

	getters: {
		latLng: state => {
			return state.latLng;
		},
		getActiveLayer(state) {
			return state.layer;
		}
	},

	mutations: {
		create() {
			map = L.map("map", getBaseMapAndLayers());
			new L.Control.Zoom({ position: "topright" }).addTo(map);
		},
		destroy(state) {
			map.remove();
			state.layer = undefined;
		},
		toggleLayer(state, layer) {
			// Remove existing layer: right now, we only
			// want one layer to be visible on any plate in the Atlas.
			// Need to test explicitly for the existence of the
			// layerObject because this code can get run while
			// the full DOM is hydrating, see MapLayer / mounted().
			// if (state.layer && state.layer.layerObject) {
			if (state.layer && layerObject) {
				map.removeLayer(layerObject);
			}

			// Add to map!
			state.layer = layer;
			let layerConfiguration = {
				continuousWorld: true,
				transparent: true,
				tiled: "true",
				format: "image/png",
				version: "1.3.0",
				layers: layer.wmsLayerName,
				id: layer.id
			};
			if (layer.style) {
				layerConfiguration.styles = layer.style;
			}
			layerObject = L.tileLayer.wms(
				process.env.geoserverUrl,
				layerConfiguration
			);
			map.addLayer(layerObject);
		},
		addEventHandler(state, handler) {
			// Attach an event listener to the map.
			// Listener should be an object with two elements,
			map.on(handler.event, handler.handler);
		},
		setLatLng(state, latLng) {
			// latLng is an object with lat / lng properties.
			state.latLng = {
				lat: latLng.lat.toFixed(4),
				lng: latLng.lng.toFixed(4)
			};
		}
	}
};
