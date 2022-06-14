import _ from "lodash";

export default {
	state() {
		return {
			places: undefined,
			placeName: undefined,
			placeID: undefined,
			reportIsVisible: false,
			results: {},
			units: 'imperial',
			// Currently active/clicked location
			latLng: {
				lat: undefined,
				lng: undefined,
			}
		};
	},
	getters: {
		places(state) {
			return state.places
		},
		latLng: (state) => {
			return state.latLng;
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
		},

	},

	mutations: {
    destroy(state) {
			state.placeName = undefined;
			state.placeID = undefined;
			state.reportIsVisible = false;
			state.results = {};
			state.latLng = {
				lat: undefined,
				lng: undefined,
			};
		},
		openReport(state, fullPath) {
			state.reportIsVisible = true;
			if (state.placeName) {
				this.$router.push({
					path:
						fullPath +
						'/community/' +
						state.placeID,
						hash: '#results'
				})
			} else {
				this.$router.push({
					path:
						fullPath +
						'/' +
						state.latLng.lat +
						'/' +
						state.latLng.lng,
						hash: '#results'
				})
			}
		},
		closeReport(state) {
			state.placeName = undefined;
			state.placeID = undefined;
			state.reportIsVisible = false;
			state.results = {};
			state.latLng = {
				lat: undefined,
				lng: undefined,
			};
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
				// Precipitation
				if (state.units == 'metric') {
					Object.keys(state.results).forEach(key => {
						if (key != 'place') {
							state.results[key] = (state.results[key] * 25.4).toFixed(0);
						}
					});
				} else {
					Object.keys(state.results).forEach(key => {
						if (key != 'place') {
							state.results[key] = (state.results[key] / 25.4).toFixed(1);
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
			state.places = places;
		},
		setLatLng(state, latLng) {
			// latLng is an object with lat / lng properties.
			state.latLng = {
				lat: latLng.lat.toFixed(4),
				lng: latLng.lng.toFixed(4),
			};
		},
		setMetric(state) {
			state.units = 'metric';
		},
		setImperial(state) {
			state.units = 'imperial';
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