import { storeToRefs } from 'pinia'

// Builds the API's CSV download URL for an endpoint at the report's place,
// e.g. csvUrl('tas2km/point').
export function useCsvUrl() {
  const config = useRuntimeConfig()
  const { placeId, latLng } = storeToRefs(useReportStore())

  return function csvUrl(endpoint) {
    const community = placeId.value ? '&community=' + placeId.value : ''
    return (
      `${config.public.apiUrl}/${endpoint}/` +
      `${latLng.value.lat}/${latLng.value.lng}?format=csv${community}`
    )
  }
}
