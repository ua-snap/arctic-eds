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
		layers: ["atlas_mapproxy:alaska_osm_retina"],
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
			origin: [-4648005.934316417, 444809.882955059],
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
		layers: [baseLayer],
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
				lng: undefined,
			},
			places: undefined,
			placeName: undefined,
			placeID: undefined,
			reportIsVisible: false,
			results: {},
			units: 'metric'
		};
	},

	getters: {
		latLng: (state) => {
			return state.latLng;
		},
		places(state) {
			return state.places
		},
		getActiveLayer(state) {
			return state.layer;
		},
		placeName(state) {
			return state.placeName;
		},
		placeID(state) {
			return state.placeID;
		},
		reportIsVisible(state) {
			return state.reportIsVisible;
		},
		results(state) {
			return state.results;
		},
		units(state) {
			return state.units;
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
			state.latLng = { 
				lat: undefined, 
				lng: undefined 
			};
			state.placeName = undefined;
			state.placeID = undefined;
			state.reportIsVisible = false;
			state.results = {};
		},
		openReport(state) {
			state.reportIsVisible = true;
		},
		closeReport(state) {
			state.placeName = undefined;
			state.placeID = undefined;
			state.reportIsVisible = false;
			state.results = {};
		},
		toggleLayer(state, layer) {
			// Remove existing layer: right now, we only
			// want one layer to be visible on any plate in the Atlas.
			// Need to test explicitly for the existence of the
			// layerObject because this code can get run while
			// the full DOM is hydrating, see MapLayer / mounted().
			if (state.layer && layerObject) {
				map.removeLayer(layerObject);
			}

			// Add to map!
			state.layer = layer;
			let layerConfiguration = {
				transparent: true,
				format: "image/png",
				version: "1.3.0",
				layers: layer.wmsLayerName,
				id: layer.id,
			};

			if (layer.style) {
				layerConfiguration.styles = layer.style;
			}

			if (layer.rasdamanConfiguration) {
				layerConfiguration = {
					...layerConfiguration,
					...layer.rasdamanConfiguration,
				};
			}

			let wmsUrl =
				layer.source == "rasdaman"
					? process.env.rasdamanUrl
					: process.env.geoserverUrl;

			layerObject = L.tileLayer.wms(
				wmsUrl,
				layerConfiguration
			);

			map.addLayer(layerObject);
		},
		addEventHandler(state, handler) {
			// Attach an event listener to the map.
			// Listener should be an object with two elements,
			map.on(handler.event, handler.handler);
		},
		convertUnits(state, type) {
			if (type == 'temperature') {
				if (state.units == 'metric') {
					Object.keys(state.results).forEach(key => {
						if (key != 'place') {
							state.results[key] = ((state.results[key] - 32) * (5/9)).toFixed(1);
						}
					});
				} else {
					Object.keys(state.results).forEach(key => {
						if (key != 'place') {
							state.results[key] = ((state.results[key] * (9/5)) + 32).toFixed(1);
						}
					});
				}
			} else {
				if (state.units == 'metric') {
					Object.keys(state.results).forEach(key => {
						if (key != 'place') {
							state.results[key] = (state.results[key] * 25.4).toFixed(0);
						}
					});
				} else {
					Object.keys(state.results).forEach(key => {
						if (key != 'place') {
							state.results[key] = (state.results[key] / 25.4).toFixed(0);
						}
					});
				}
			}
		},
		setResults(state, results) {
			state.results = results;
		},
		setPlaceName(state, name) {
			state.placeName = name;
		},
		setPlaceID(state, id) {
			state.placeID = id;
		},
		setPlaces(state, places) {
			state.places = places
		},
		setLatLng(state, latLng) {
			// latLng is an object with lat / lng properties.
			state.latLng = {
				lat: latLng.lat.toFixed(4),
				lng: latLng.lng.toFixed(4),
			};
		},
		setMetric(state) {
			state.units = 'metric'
		},
		setImperial(state) {
			state.units = 'imperial'
		},
	},
	actions: {
		async fetchPlaces(context) {
			// If we've already fetched this, don't do that again.
			if (context.state.places) {
				return
			}
	
			// TODO: add error handling here for 404 (no data) etc.
			let queryUrl = process.env.apiUrl + '/places/communities'
			let places = await this.$http.$get(queryUrl)
			context.commit('setPlaces', places)
		}
	}
};
