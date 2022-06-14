<template>
	<div>
		<div class="columns">
			<div
				:class="{ hide: layers.length == 1 }"
				class="column is-one-quarter"
			>
				<slot name="layers">
					<LayerList :layers="layers" />
				</slot>
			</div>
			<div class="column">
				<Map />
				<!-- Legend slot -->
				<slot name="legend" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
// If the map only has one layer, hide the sidebar;
// We still want that component to exist, because it
// manages default layer visibility.
.hide {
	display: none;
}
</style>

<script>
import Map from "~/components/Map";
import LayerList from "~/components/LayerList";

export default {
	name: "Plate",
	components: { Map },
	props: ["layers", "hidden"]
};
</script>
