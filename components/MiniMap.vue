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
			latLng: "report/latLng"
		})
	},
	data() {
		return {
			map: undefined,
			marker: undefined
		};
	},
	mounted() {
		if (this.latLng.lat && this.latLng.lng) {
			this.map = L.map(
				"report--minimmap--map",
				this.getBaseMapAndLayers()
			);

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
			var baseLayer = new L.tileLayer.wms(
				"https://basemap.nationalmap.gov/arcgis/services/USGSTopo/MapServer/WmsServer?",
				{
					transparent: true,
					format: "image/png",
					version: "1.3.0",
					layers: ["0"]
				}
			);

			// Map base configuration
			var config = {
				zoom: 11,
				minZoom: 0,
				maxZoom: 6,
				center: [64.7, -155],
				scrollWheelZoom: false,
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
