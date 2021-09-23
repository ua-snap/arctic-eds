<template>
	<div>
		<div class="columns">
			<div class="column is-one-quarter">
				<LayerList :layers="layers" />
			</div>
			<div class="column">
				<Map />
				<!-- Legend slot -->
				<slot />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>

<script>
import Map from "~/components/Map";
import LayerList from "~/components/LayerList";

export default {
	name: "Plate",
	components: { Map },
	props: ["layers", "hidden"]
};
</script>
