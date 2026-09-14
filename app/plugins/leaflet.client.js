// Loads Leaflet, which registers itself as the `L` global used by the map
// store and MiniMap, its stylesheet, and the proj4/proj4leaflet extension
// that provides L.Proj.CRS for the Alaska Albers projection. Client-only
// (.client.js): Leaflet touches `window` when it is imported.
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import proj4 from 'proj4'
import p4l from 'proj4leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

export default defineNuxtPlugin(() => {
  // Leaflet finds its default marker images by reading a URL out of
  // leaflet.css. Vite inlines those images as data URIs, so that lookup
  // fails and markers render as broken images. Give Leaflet the bundled
  // image URLs directly instead.
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })
})
