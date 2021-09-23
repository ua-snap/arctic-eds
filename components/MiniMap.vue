<template>
	<div>
		<div class="report--minimap--wrapper">
			<div id="report--minimmap--map"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.report--minimap--wrapper {
	margin: 2rem 0 3rem;
}
#report--minimmap--map {
	height: 20vw;
	width: 20vw;
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
	name: "MiniMap",
	computed: {
		...mapGetters({
			latLng: "map/latLng"
		})
	},
	data () {
		return {
			map: undefined,
			marker: undefined
		}
	},
	mounted() {
		if (this.latLng.lat && this.latLng.lng) {
			this.map = L.map("report--minimmap--map", this.getBaseMapAndLayers());

			this.marker = L.marker(this.latLng).addTo(this.map);
			this.map.panTo(this.latLng);
		}
	},
	destroyed() {
		this.marker = undefined;
		if (this.map) {
			this.map.remove();
		}
	},
	methods: {
		getBaseMapAndLayers() {
			var baseLayer = new L.tileLayer.wms(process.env.geoserverUrl, {
				transparent: true,
				srs: "EPSG:3338",
				format: "image/png",
				version: "1.3.0",
				layers: ["atlas_mapproxy:alaska_osm"]
			});

			// Projection definition.
			var proj = new L.Proj.CRS(
				"EPSG:3338",
				"+proj=aea +lat_1=55 +lat_2=65 +lat_0=50 +lon_0=-154 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
				{
					resolutions: [4096, 2048, 1024, 512, 256, 128, 64]
				}
			);

			// Map base configuration
			var config = {
				zoom: 3,
				minZoom: 0,
				maxZoom: 6,
				center: [64.7, -155],
				scrollWheelZoom: false,
				crs: proj,
				continuousWorld: true,
				zoomControl: false,
				doubleClickZoom: false,
				attributionControl: false,
				layers: [baseLayer]
			};

			return config;
		}
	}
};
</script>
