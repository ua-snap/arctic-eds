// Leaflet, set up for this site: its stylesheet, the proj4leaflet extension
// that provides L.Proj.CRS for the Alaska Albers projection (it loads proj4
// itself), and working default marker images. Leaflet registers itself as
// the `L` global used by the map store and MiniMap.
//
// Don't import this module directly. loadLeaflet() (utils/loadLeaflet.js)
// loads it on demand, so pages without a map don't download Leaflet and
// proj4 (about 95 KB gzipped). It was a client plugin loaded on every page.
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'proj4leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

// Leaflet finds its default marker images by reading a URL out of
// leaflet.css. Vite inlines those images as data URIs, so that lookup
// fails and markers render as broken images. Give Leaflet the bundled
// image URLs directly instead.
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })

export default L
