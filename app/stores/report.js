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

// Top-level sections the /eds/all endpoint is expected to return.
const RESULT_SECTIONS = [
  'elevation',
  'freezing_index',
  'heating_degree_days',
  'hydrology',
  'permafrost',
  'precip_frequency',
  'precipitation',
  'snowfall',
  'temperature',
  'thawing_index',
  'wet_days_per_year',
]

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

// Errors carry a `kind` so the UI can tell failures apart:
// 'network', 'malformed', 'unknown-place', 'no-data'.
export function reportError(kind, message, cause) {
  const error = new Error(message)
  error.kind = kind
  error.cause = cause
  return error
}

// Guards against unexpected API returns: a non-object body (e.g. JSON that
// failed to parse, which $fetch hands back as a string) is rejected, and any
// missing or non-object section is replaced with an empty object.
export function normalizeResults(raw) {
  if (!isPlainObject(raw)) {
    throw reportError('malformed', 'Report data is not a JSON object')
  }
  const normalized = { ...raw }
  RESULT_SECTIONS.forEach(section => {
    if (!isPlainObject(normalized[section])) {
      normalized[section] = {}
    }
  })
  return normalized
}

export const useReportStore = defineStore('report', () => {
  const route = useRoute()
  const router = useRouter()
  const config = useRuntimeConfig()

  // State
  const places = ref(undefined)
  // Set when the community list can't be fetched, so the search controls can
  // say so instead of silently offering an autocomplete that can't work.
  const placesError = ref(null)
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
  function hasSection(key) {
    const section = results.value?.[key]
    return isPlainObject(section) && Object.keys(section).length != 0
  }
  const isElevationPresent = computed(() => {
    const elevation = results.value?.elevation
    return (
      isPlainObject(elevation) &&
      ['min', 'max', 'mean'].every(key => typeof elevation[key] === 'number')
    )
  })
  const isHydrologyPresent = computed(() => hasSection('hydrology'))
  const isPrecipitationPresent = computed(() => hasSection('precipitation'))
  const isPrecipitationFrequencyPresent = computed(() =>
    hasSection('precip_frequency')
  )
  const isSnowfallPresent = computed(() => hasSection('snowfall'))
  const isTemperaturePresent = computed(() => hasSection('temperature'))
  const isHeatingDegreeDaysPresent = computed(() =>
    hasSection('heating_degree_days')
  )
  const isFreezingIndexPresent = computed(() => hasSection('freezing_index'))
  const isThawingIndexPresent = computed(() => hasSection('thawing_index'))
  const isPermafrostPresent = computed(() => hasSection('permafrost'))
  const isWetDaysPerYearPresent = computed(() =>
    hasSection('wet_days_per_year')
  )
  // True when any section beyond elevation has data. Points outside the data
  // extent (e.g. the ocean) come back as HTTP 200 with every section empty.
  const hasAnyData = computed(() =>
    RESULT_SECTIONS.some(key => key != 'elevation' && hasSection(key))
  )

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
      // Loaded on demand so the 2 MB fixture stays out of the main bundle.
      const { default: mock } = await import('~/assets/mock.json')

      // Copy mock to results so we don't modify mock directly.
      fetched = { ...mock }
    } else {
      try {
        fetched = await $fetch(url)
      } catch (error) {
        throw reportError('network', 'Report data could not be fetched', error)
      }
    }
    setResults(normalizeResults(fetched))
    if (units.value == 'imperial') {
      convertResults(true)
    }
  }
  async function safeModeFetch(key) {
    const { default: safeResults } = await import('~/assets/safe.json')
    // Need to have a deep clone to prevent re-conversion
    setResults(normalizeResults(cloneDeep(safeResults[key])))
    if (units.value == 'imperial') {
      convertResults()
    }
  }
  async function fetchPlaces() {
    placesError.value = null
    if (config.public.safeMode) {
      const { default: safePlaces } = await import('~/assets/safePlaces.json')
      setPlaces(safePlaces)
    }

    // If we've already fetched this, don't do that again.
    if (places.value) {
      return
    }

    let queryUrl = config.public.apiUrl + '/places/communities?tags=eds'
    let fetched
    try {
      fetched = await $fetch(queryUrl)
    } catch (error) {
      placesError.value = reportError(
        'network',
        'Places could not be fetched',
        error
      )
      throw placesError.value
    }
    if (!Array.isArray(fetched)) {
      placesError.value = reportError(
        'malformed',
        'Places data is not a JSON array'
      )
      throw placesError.value
    }
    let filteredPlaces = filter(fetched, p => {
      return p.region == 'Alaska'
    })
    setPlaces(filteredPlaces)
  }

  return {
    places,
    placesError,
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
    hasAnyData,
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
