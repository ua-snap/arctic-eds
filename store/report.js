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
          case 'fdd_cdd':
            obj[key] = parseFloat(convertFddCdd(state, obj[key]))
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
  // If the variable is precip_frequency, we want the metric and
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

function convertFddCdd(state, value) {
  // This doesn't fix the number of decimal spaces to prevent loss of precision
  // and allows re-conversion back to the original integer value.
  if (state.units == 'metric') {
    return value * (5 / 9)
  } else {
    return value * (9 / 5)
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
    getPlaceById(state, getters, rootState) {
      return _.find(state.places, {
        id: rootState.route.params.communityId,
      })
    },
    placeIsLatLng(state, getters, rootState) {
      return rootState.route.params.lat && rootState.route.params.lng
    },
    placeName(state, getters, rootState) {
      if (getters.placeIsLatLng) {
        return rootState.route.params.lat + ', ' + rootState.route.params.lng
      }

      if (rootState.route.params.communityId) {
        let place = getters.getPlaceById
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
    isHydrologyPresent(state) {
      return Object.keys(state.results.hydrology).length != 0
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
    convertResults(state, onload = false) {
      // Converts all convertible units at the same time for shared report
      let conversions = [
        // This needs to be adapted after the summarized data are restored.
        { type: 'temperature', substring: 'magt', variable: 'permafrost' },
        { type: 'm_in', substring: 'permafrosttop', variable: 'permafrost' },
        { type: 'mm_in', substring: '', variable: 'precipitation' },
        { type: 'mm_in', substring: '', variable: 'snowfall' },
        { type: 'temperature', substring: '', variable: 'temperature' },
        { type: 'mm_in', substring: '', variable: 'precip_frequency' },
        { type: 'mm_in', substring: '', variable: 'hydrology' },
        { type: 'fdd_cdd', substring: '', variable: 'heating_degree_days' },
        { type: 'fdd_cdd', substring: '', variable: 'freezing_index' },
        { type: 'fdd_cdd', substring: '', variable: 'thawing_index' },
      ]
      conversions.forEach(conversion => {
        // The degree days are not converted on page load because
        // they are already in the correct units (imperial) while all
        // the rest of the data comes over in metric units.
        if (onload == true && conversion['type'] == 'fdd_cdd') return

        state.results[conversion['variable']] = convertLeaves(
          state,
          _.cloneDeep(state.results[conversion['variable']]),
          conversion['substring'],
          conversion['variable'],
          conversion['type']
        )
      })
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

        // Copy mock to results so we don't modify mock directly.
        results = { ...mock }
      } else {
        results = await this.$axios.$get(url)
      }
      context.commit('setResults', results)
      if (context.state.units == 'imperial') {
        context.commit('convertResults', true)
      }
    },
    async safeModeFetch(context, key) {
      const results = require('~/assets/safe.json')
      // Need to have a deep clone to prevent re-conversion
      context.commit('setResults', _.cloneDeep(results[key]))
      if (context.state.units == 'imperial') {
        context.commit('convertResults')
      }
    },
    async fetchPlaces(context) {
      if (process.env.safeMode) {
        const places = require('~/assets/safePlaces.json')
        context.commit('setPlaces', places)
      }

      // If we've already fetched this, don't do that again.
      if (context.state.places) {
        return
      }

      // TODO: add error handling here for 404 (no data) etc.
      let queryUrl = process.env.apiUrl + '/places/communities?tags=eds'
      let places = await this.$http.$get(queryUrl)
      let filteredPlaces = _.filter(places, p => {
        return p.region == 'Alaska'
      })
      context.commit('setPlaces', filteredPlaces)
    },
  },
}
