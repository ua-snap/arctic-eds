import { defineStore } from 'pinia'
import { cloneDeep, filter, find } from 'lodash-es'

function convertLeaves(units, obj, substring, variable, type) {
  for (const key in obj) {
    if (typeof obj[key] === 'number') {
      if (key.includes(substring)) {
        switch (type) {
          case 'temperature':
            obj[key] = parseFloat(convertTemperature(units, obj[key]))
            break
          case 'm_in':
            obj[key] = parseFloat(convertMetersInches(units, obj[key]))
            break
          case 'mm_in':
            obj[key] = parseFloat(
              convertMillimetersInches(units, variable, obj[key])
            )
            break
          case 'fdd_cdd':
            obj[key] = parseFloat(convertFddCdd(units, obj[key]))
            break
        }
      } else {
        obj[key] = parseFloat(obj[key])
      }
    } else if (typeof obj[key] === 'object') {
      obj[key] = convertLeaves(units, obj[key], substring, variable, type)
    }
  }
  return obj
}

function convertTemperature(units, value) {
  if (units == 'metric') {
    return ((value - 32) * (5 / 9)).toFixed(1)
  } else {
    return (value * (9 / 5) + 32).toFixed(1)
  }
}

function convertMillimetersInches(units, variable, value) {
  // If the variable is precip_frequency, we want the metric and
  // imperial units to be set to 2 decimal places to match
  // the DOT Projected Precipitation application.
  if (units == 'metric') {
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

function convertMetersInches(units, value) {
  if (units == 'metric') {
    return (value * 0.0254).toFixed(2)
  } else {
    return (value / 0.0254).toFixed(1)
  }
}

function convertFddCdd(units, value) {
  // This doesn't fix the number of decimal spaces to prevent loss of precision
  // and allows re-conversion back to the original integer value.
  if (units == 'metric') {
    return value * (5 / 9)
  } else {
    return value * (9 / 5)
  }
}

export const useReportStore = defineStore('report', () => {
  const route = useRoute()
  const router = useRouter()
  const config = useRuntimeConfig()

  // State
  const places = ref(undefined)
  const results = ref({})
  const units = ref('imperial')

  // Getters. The place is defined by the current route (previously read
  // through vuex-router-sync as rootState.route.params).
  const latLng = computed(() => {
    if (route.params.lat && route.params.lng) {
      let latLng = {
        lat: route.params.lat,
        lng: route.params.lng,
      }
      return latLng
    }

    // Look it up by place name.
    if (route.params.communityId) {
      let place = find(places.value, {
        id: route.params.communityId,
      })
      if (place) {
        let latLng = { lat: place.latitude, lng: place.longitude }
        return latLng
      }
    }
  })
  const placeId = computed(() => {
    if (route.params.communityId) {
      return route.params.communityId
    }
    return undefined
  })
  const isPlaceDefined = computed(() => {
    return latLng.value || placeId.value
  })
  const getPlaceById = computed(() => {
    return find(places.value, {
      id: route.params.communityId,
    })
  })
  const placeIsLatLng = computed(() => {
    return route.params.lat && route.params.lng
  })
  const placeName = computed(() => {
    if (placeIsLatLng.value) {
      return route.params.lat + ', ' + route.params.lng
    }

    if (route.params.communityId) {
      let place = getPlaceById.value
      if (place) {
        let placeName = place.name + ', ' + place.region
        if (place.alt_name) {
          placeName = place.name + ' (' + place.alt_name + '), ' + place.region
        }
        return placeName
      }
    }
    return undefined
  })
  const reportIsVisible = computed(() => {
    if (isPlaceDefined.value) {
      return true
    } else {
      return false
    }
  })
  const isElevationPresent = computed(() => {
    return Object.keys(results.value.elevation).length != 0
  })
  const isHydrologyPresent = computed(() => {
    return Object.keys(results.value.hydrology).length != 0
  })
  const isPrecipitationPresent = computed(() => {
    return Object.keys(results.value.precipitation).length != 0
  })
  const isPrecipitationFrequencyPresent = computed(() => {
    return Object.keys(results.value.precip_frequency).length != 0
  })
  const isSnowfallPresent = computed(() => {
    return Object.keys(results.value.snowfall).length != 0
  })
  const isTemperaturePresent = computed(() => {
    return Object.keys(results.value.temperature).length != 0
  })
  const isHeatingDegreeDaysPresent = computed(() => {
    return Object.keys(results.value.heating_degree_days).length != 0
  })
  const isFreezingIndexPresent = computed(() => {
    return Object.keys(results.value.freezing_index).length != 0
  })
  const isThawingIndexPresent = computed(() => {
    return Object.keys(results.value.thawing_index).length != 0
  })
  const isPermafrostPresent = computed(() => {
    return Object.keys(results.value.permafrost).length != 0
  })
  const isWetDaysPerYearPresent = computed(() => {
    return Object.keys(results.value.wet_days_per_year).length != 0
  })

  // Actions (Vuex mutations and actions both become plain functions)
  function destroy() {
    results.value = {}
  }
  function closeReport() {
    router.push({
      path: '/',
    })

    results.value = {}
  }
  function convertResults(onload = false) {
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

      results.value[conversion['variable']] = convertLeaves(
        units.value,
        cloneDeep(results.value[conversion['variable']]),
        conversion['substring'],
        conversion['variable'],
        conversion['type']
      )
    })
  }
  function setResults(newResults) {
    results.value = newResults
  }
  function setPlaces(newPlaces) {
    places.value = newPlaces
  }
  function setMetric() {
    units.value = 'metric'
  }
  function setImperial() {
    units.value = 'imperial'
  }

  async function apiFetch(url) {
    let fetched
    if (config.public.mockApi) {
      // Loaded on demand so the 500 KB fixture stays out of the main bundle.
      const { default: mock } = await import('~/assets/mock.json')

      // Copy mock to results so we don't modify mock directly.
      fetched = { ...mock }
    } else {
      fetched = await $fetch(url)
    }
    setResults(fetched)
    if (units.value == 'imperial') {
      convertResults(true)
    }
  }
  async function safeModeFetch(key) {
    const { default: safeResults } = await import('~/assets/safe.json')
    // Need to have a deep clone to prevent re-conversion
    setResults(cloneDeep(safeResults[key]))
    if (units.value == 'imperial') {
      convertResults()
    }
  }
  async function fetchPlaces() {
    if (config.public.safeMode) {
      const { default: safePlaces } = await import('~/assets/safePlaces.json')
      setPlaces(safePlaces)
    }

    // If we've already fetched this, don't do that again.
    if (places.value) {
      return
    }

    // TODO: add error handling here for 404 (no data) etc.
    let queryUrl = config.public.apiUrl + '/places/communities?tags=eds'
    let fetched = await $fetch(queryUrl)
    let filteredPlaces = filter(fetched, p => {
      return p.region == 'Alaska'
    })
    setPlaces(filteredPlaces)
  }

  return {
    places,
    results,
    units,
    latLng,
    placeId,
    isPlaceDefined,
    getPlaceById,
    placeIsLatLng,
    placeName,
    reportIsVisible,
    isElevationPresent,
    isHydrologyPresent,
    isPrecipitationPresent,
    isPrecipitationFrequencyPresent,
    isSnowfallPresent,
    isTemperaturePresent,
    isHeatingDegreeDaysPresent,
    isFreezingIndexPresent,
    isThawingIndexPresent,
    isPermafrostPresent,
    isWetDaysPerYearPresent,
    destroy,
    closeReport,
    convertResults,
    setResults,
    setPlaces,
    setMetric,
    setImperial,
    apiFetch,
    safeModeFetch,
    fetchPlaces,
  }
})
