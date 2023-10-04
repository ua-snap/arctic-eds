import _ from 'lodash'

function convertLeaves(state, obj, substring, variable, type) {
  for (const key in obj) {
    if (typeof obj[key] === 'number') {
      if (key.includes(substring)) {
        switch (type) {
          case 'temperature':
            obj[key] = parseFloat(convertTemperature(state, obj[key]))
            break
          case 'm_in':
            obj[key] = parseFloat(convertMetersInches(state, obj[key]))
            break
          case 'mm_in':
            obj[key] = parseFloat(
              convertMillimetersInches(state, variable, obj[key])
            )
            break
        }
      } else {
        obj[key] = parseFloat(obj[key])
      }
    } else if (typeof obj[key] === 'object') {
      obj[key] = convertLeaves(state, obj[key], substring, variable, type)
    }
  }
  return obj
}

function convertTemperature(state, value) {
  if (state.units == 'metric') {
    return ((value - 32) * (5 / 9)).toFixed(1)
  } else {
    return (value * (9 / 5) + 32).toFixed(1)
  }
}

function convertMillimetersInches(state, variable, value) {
  // If the variable is proj_precip, we want the metric and
  // imperial units to be set to 2 decimal places to match
  // the DOT Projected Precipitation application.
  if (state.units == 'metric') {
    if (variable == 'proj_precip') {
      return (value * 25.4).toFixed(2)
    } else {
      return (value * 25.4).toFixed(0)
    }
  } else {
    if (variable == 'proj_precip') {
      return (value / 25.4).toFixed(2)
    } else {
      return (value / 25.4).toFixed(1)
    }
  }
}

function convertMetersInches(state, value) {
  if (state.units == 'metric') {
    return (value * 0.0254).toFixed(2)
  } else {
    return (value / 0.0254).toFixed(1)
  }
}

export default {
  state() {
    return {
      places: undefined,
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
    reportIsVisible(state, getters) {
      if (getters.isPlaceDefined) {
        return true
      } else {
        return false
      }
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
      state.results = {}
    },
    closeReport(state) {
      this.$router.push({
        path: '/',
      })

      state.placeName = undefined
      state.results = {}
    },
    convertResults(state) {
      // Converts all convertible units at the same time for shared report
      let conversions = [
        // This needs to be adapted after the summarized data are restored.
        { type: 'temperature', substring: 'magt_', variable: 'permafrost' },
        { type: 'm_in', substring: 'permafrosttop', variable: 'permafrost' },
        { type: 'mm_in', substring: '', variable: 'precipitation' },
        { type: 'mm_in', substring: '', variable: 'snowfall' },
        { type: 'temperature', substring: '', variable: 'temperature' },
        { type: 'mm_in', substring: '', variable: 'precip_frequency' },
      ]
      conversions.forEach(conversion => {
        state.results[conversion['variable']] = convertLeaves(
          state,
          _.cloneDeep(state.results[conversion['variable']]),
          conversion['substring'],
          conversion['variable'],
          conversion['type']
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
      let results
      if (process.env.mockApi) {
        const mock = require('~/assets/mock.json')
        results = mock
      } else {
        results = await this.$axios.$get(url)
      }
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
