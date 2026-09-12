// Loads Leaflet, which registers itself as the `L` global used by the map
// store and MiniMap, its stylesheet, and the proj4/proj4leaflet extension
// that provides L.Proj.CRS for the Alaska Albers projection. Client-only
// (.client.js): Leaflet touches `window` when it is imported.
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import proj4 from 'proj4'
import p4l from 'proj4leaflet'

export default defineNuxtPlugin(() => {})
