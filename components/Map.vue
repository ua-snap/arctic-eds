<template>
	<div>
		<div id="map"></div>
	</div>
</template>

<style lang="scss" scoped>
#map {
	height: 100vh;
	width: 100%;
	cursor: pointer;
}
</style>

<script>
import _ from "lodash";

export default {
	name: "Map",
	mounted() {
		this.$store.commit("map/create");
	},
	destroyed() {
		this.$store.commit("map/destroy");
		this.$store.commit("report/destroy");
	}
};
</script>
