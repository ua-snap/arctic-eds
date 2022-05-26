<template>
	<div class="map--legend">
		
	</div>
</template>

<style lang="scss" scoped>

</style>

<script>
import { mapGetters } from "vuex";
import LegendItem from "~/components/LegendItem";

export default {
	name: "TemperatureLegend",
	components: { LegendItem },
	computed: {
		activeLayerId() {
			// This component can get mounted before the active layer
			// is set/present in the global state, so we need to
			// guard for that case.
			if (this.activeLayer) {
				return this.activeLayer.id;
			}
			return undefined;
		},
		...mapGetters({
			activeLayer: "map/getActiveLayer"
		})
	}
};
</script>
