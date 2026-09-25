import parseDMS from 'parse-dms'

// The extent of the data, as a bounding box.
const bbox = { south: 51.229, north: 71.3526, west: -179.1506, east: -129.9795 }

export const latLngFormatHelp =
  "Accepted formats are decimal degrees and DMS, i.e. 65.24, -142.22 or 58º 18' 0'' N, 134º 24' 57.6'' W"

// Reads a latitude/longitude point from free text.
//
// Returns null when the text doesn't look like coordinates at all (so it can
// be treated as a place name), { lat, lng } for a usable point, or
// { error } for coordinates that can't be used.
export function parseLatLng(text) {
  const input = (text || '').trim()

  // Place names never start with a digit or a sign, so anything else is left
  // to the community search.
  if (!/^[-+−]?\d/.test(input)) {
    return null
  }

  let parsed
  try {
    parsed = parseDMS(input.replace(/−/g, '-'))
  } catch (e) {
    parsed = undefined
  }
  if (!parsed || parsed.lat === undefined || parsed.lon === undefined) {
    return { error: `That can't be read as a point. ${latLngFormatHelp}` }
  }

  const lat = parsed.lat
  const lng = parsed.lon
  if (
    lat >= bbox.south &&
    lat <= bbox.north &&
    lng >= bbox.west &&
    lng <= bbox.east
  ) {
    return { lat, lng }
  }
  return {
    error: `That point is outside Alaska's data coverage: latitude ${bbox.south}–${bbox.north}, longitude ${bbox.west} to ${bbox.east}.`,
  }
}

// The report route for a point, at the precision the old point search used.
export function latLngReportPath({ lat, lng }) {
  return `/report/${lat.toFixed(4)}/${lng.toFixed(4)}`
}
