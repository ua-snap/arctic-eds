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
    if (variable == 'precip_frequency') {
      return (value * 25.4).toFixed(2)
    } else {
      return (value * 25.4).toFixed(0)
    }
  } else {
    if (variable == 'precip_frequency') {
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
      units: undefined,
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
    isElevationPresent(state) {
      return Object.keys(state.results.elevation).length != 0
    },
    isGeologyPresent(state) {
      return Object.keys(state.results.geology).length != 0
    },
    isPhysiographyPresent(state) {
      return Object.keys(state.results.physiography).length != 0
    },
    isPrecipitationPresent(state) {
      return Object.keys(state.results.precipitation).length != 0
    },
    isPrecipitationFrequencyPresent(state) {
      return Object.keys(state.results.precip_frequency).length != 0
    },
    isSnowfallPresent(state) {
      return Object.keys(state.results.snowfall).length != 0
    },
    isTemperaturePresent(state) {
      return Object.keys(state.results.temperature).length != 0
    },
    isHeatingDegreeDaysPresent(state) {
      return Object.keys(state.results.heating_degree_days).length != 0
    },
    isFreezingIndexPresent(state) {
      return Object.keys(state.results.freezing_index).length != 0
    },
    isThawingIndexPresent(state) {
      return Object.keys(state.results.thawing_index).length != 0
    },
    isPermafrostPresent(state) {
      return Object.keys(state.results.permafrost).length != 0
    },
    isWetDaysPerYearPresent(state) {
      return Object.keys(state.results.wet_days_per_year).length != 0
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
