import _ from "lodash";

export default {
	state() {
		return {
			places: undefined,
			placeName: undefined,
			placeID: undefined,
			reportIsVisible: false,
			results: {},
			units: 'metric'
		};
	},
	getters: {
		places(state) {
			return state.places
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
    destroy(state) {
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
							state.results[key] = (state.results[key] * 25.4);
						}
					});
				} else {
					Object.keys(state.results).forEach(key => {
						if (key != 'place') {
							state.results[key] = (state.results[key] / 25.4);
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