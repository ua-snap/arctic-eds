import _ from "lodash";

// This needs to be outside of the Store or there's problems
// because Leaflet mutates the state of the map, and Vuex
// throws a "Don't do that" error.
var map;

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
			resolutions: [4096, 2048, 1024, 512, 256, 128, 64]
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
	state: {
		// Layer definitions which are active on the map.
		layers: {},
		// Currently active/clicked location
		latLng: {
			lat: undefined,
			lng: undefined
		}
	},

	getters: {
		latLng: state => {
			return state.latLng;
		}
	},

	mutations: {
		create() {
			map = L.map("map", getBaseMapAndLayers());
			new L.Control.Zoom({ position: "topright" }).addTo(map);
		},
		destroy(state) {
			map.remove();
			state.layers = undefined;
		},
		toggleLayer(state, layer) {
			if (state.layers[layer.id]) {
				// Remove if already present
				map.removeLayer(state.layers[layer.id].layerObject);
				delete state.layers[layer.id];
			} else {
				// Add to map!
				state.layers[layer.id] = layer;
				state.layers[layer.id].layerObject = L.tileLayer.wms(
					process.env.geoserverUrl,
					{
						continuousWorld: true,
						transparent: true,
						tiled: "true",
						format: "image/png",
						version: "1.3.0",
						layers: layer.wmsLayerName,
						id: layer.id
					}
				);
				state.layers[layer.id].layerObject.addTo(map);
			}
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
