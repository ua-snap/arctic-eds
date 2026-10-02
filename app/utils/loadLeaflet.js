let leaflet

// Loads Leaflet (lib/leaflet.js) the first time a map needs it and resolves
// to `L`, which is also set as a global once this resolves. Client-only:
// Leaflet touches `window` when it is imported, so call this from onMounted
// or later.
export function loadLeaflet() {
  leaflet ??= import('~/lib/leaflet').then(
    module => module.default,
    error => {
      // Let a later call try again, e.g. after a network error.
      leaflet = undefined
      throw error
    }
  )
  return leaflet
}
