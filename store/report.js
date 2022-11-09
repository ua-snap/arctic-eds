import _ from 'lodash'

function convertUnits(state, type, substring = '', variable) {
  Object.keys(state.results[variable]).forEach(key => {
    if (key.includes(substring)) {
      switch (type) {
        case 'temperature':
          state.results[variable][key] = convertTemperature(
            state,
            variable,
            key
          )
          break
        case 'm_in':
          state.results[variable][key] = convertMetersInches(
            state,
            variable,
            key
          )
          break
        case 'mm_in':
          state.results[variable][key] = convertMillimetersInches(
            state,
            variable,
            key
          )
          break
      }
    }
  })
}

function convertTemperature(state, variable, key) {
  if (state.units == 'metric') {
    return ((state.results[variable][key] - 32) * (5 / 9)).toFixed(1)
  } else {
    return (state.results[variable][key] * (9 / 5) + 32).toFixed(1)
  }
}

function convertMillimetersInches(state, variable, key) {
  if (state.units == 'metric') {
    return (state.results[variable][key] * 25.4).toFixed(0)
  } else {
    return (state.results[variable][key] / 25.4).toFixed(1)
  }
}

function convertMetersInches(state, variable, key) {
  if (state.units == 'metric') {
    return (state.results[variable][key] * 0.0254).toFixed(2)
  } else {
    return (state.results[variable][key] / 0.0254).toFixed(1)
  }
}

export default {
  state() {
    return {
      places: undefined,
      reportIsVisible: false,
      results: {},
      units: 'imperial',
    }
  },
  getters: {
    places(state) {
      return state.places
    },
    latLng(state, getters, rootState) {
      if (rootState.route.params.lat && rootState.route.params.lng) {
        let latLng = {
          lat: rootState.route.params.lat,
          lng: rootState.route.params.lng,
        }
        return latLng
      }

      // Look it up by place name.
      if (rootState.route.params.communityId) {
        let place = _.find(state.places, {
          id: rootState.route.params.communityId,
        })
        if (place) {
          let latLng = { lat: place.latitude, lng: place.longitude }
          return latLng
        }
      }
    },
    isPlaceDefined(state, getters) {
      return getters.latLng || getters.placeId
    },
    placeName(state, getters, rootState) {
      if (rootState.route.params.lat && rootState.route.params.lng) {
        return rootState.route.params.lat + ', ' + rootState.route.params.lng
      }

      if (rootState.route.params.communityId) {
        let place = _.find(state.places, {
          id: rootState.route.params.communityId,
        })
        if (place) {
          let placeName = place.name + ', ' + place.region
          if (place.alt_name) {
            placeName =
              place.name + ' (' + place.alt_name + '), ' + place.region
          }
          return placeName
        }
      }
      return undefined
    },
    placeId(state, getters, rootState) {
      if (rootState.route.params.communityId) {
        return rootState.route.params.communityId
      }
      return undefined
    },
    reportIsVisible(state) {
      console.log('Getting here')
      return false
      // if (state.isPlaceDefined()) {
      //   return true
      // } else {
      //   return false
      // }
      // return state.reportIsVisible
    },
    results(state) {
      return state.results
    },
    units(state) {
      return state.units
    },
  },

  mutations: {
    destroy(state) {
      state.placeName = undefined
      state.reportIsVisible = false
      state.results = {}
    },
    openReport(state) {
      state.reportIsVisible = true
    },
    closeReport(state, fullPath) {
      // Ensure that report is in URL before attempting
      // to remove it.
      if (fullPath.includes('report')) {
        let pathArray = fullPath.split('/report')

        // Router push to base URL of plate
        this.$router.push({
          path: fullPath.split('/report')[0],
          hash: 'map-search',
        })
      }
      state.placeName = undefined
      state.reportIsVisible = false
      state.results = {}
      state.latLng = {
        lat: undefined,
        lng: undefined,
      }
    },
    convertResults(state) {
      // Converts all convertible units at the same time for shared report
      let conversions = [
        { type: 'temperature', substring: 'magt_', variable: 'permafrost' },
        { type: 'temperature', substring: '', variable: 'temperature' },
        { type: 'mm_in', substring: '', variable: 'precipitation' },
        { type: 'mm_in', substring: '', variable: 'snowfall' },
      ]
      conversions.forEach(conversion => {
        convertUnits(
          state,
          conversion['type'],
          conversion['substring'],
          conversion['variable']
        )
      })
    },
    setPlateResults(state, payload) {
      state.results[payload.variable] = payload.plateResults
    },
    setResults(state, results) {
      state.results = results
    },
    setPlaces(state, places) {
      state.places = places
    },
    setMetric(state) {
      state.units = 'metric'
    },
    setImperial(state) {
      state.units = 'imperial'
    },
  },
  actions: {
    async apiFetch(context, url) {
      let results = await this.$axios.$get(url)
      context.commit('setResults', results)
    },
    async fetchPlaces(context) {
      // If we've already fetched this, don't do that again.
      if (context.state.places) {
        return
      }

      // TODO: add error handling here for 404 (no data) etc.
      let queryUrl = process.env.apiUrl + '/places/communities'
      let places = await this.$http.$get(queryUrl)
      context.commit('setPlaces', places)
    },
  },
}
