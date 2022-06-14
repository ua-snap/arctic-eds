<template>
	<div>
		<div v-if="state && state.pending">
			<!-- Drama dots -->
			<h4 class="title is-5">Loading data for {{ placeName ? placeName : latLng.lat + ', ' + latLng.lng }}&hellip;</h4>
			<b-progress type="is-info"></b-progress>
		</div>

		<div v-if="state && state.error" class="error">
			<p class="content is-size-5">
				Oh no! Something&rsquo;s amiss and the report for this place
				couldn&rsquo;t be loaded.
			</p>
			<b-button
				v-on:click="close"
				class="is-warning"
				icon-left="emoticon-sad-outline"
			>
				<strong>We&rsquo;re sorry</strong>, please try again</b-button
			>
		</div>
	</div>
</template>
<style lang="scss" scoped></style>
<script>
import { mapGetters } from 'vuex'

export default {
	name: "LoadingStatus",
	props: ["state"],
	computed: {
    ...mapGetters({
      placeName: "report/placeName",
			latLng: "report/latLng"
		})
	},
	methods: {
		close() {
			this.$store.commit("report/closeReport");
		}
	}
};
</script>
