<template>
	<div>
		<CloseReportButton />
		<hr />
		<LoadingStatus :state="state" />

		<div v-if="!$fetchState.pending & !$fetchState.error">
			<h3 class="title is-3">
				Ecoregion for {{ latLng.lat }}, {{ latLng.lng }}
			</h3>
			<h4 class="subtitle is-3">{{ results.name }}</h4>
			<MiniMap />
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import MiniMap from "~/components/MiniMap";
import LoadingStatus from "~/components/LoadingStatus";

export default {
	name: "PermafrostReport",
	data() {
		return {
			// Will have the results of the data fetch.
			results: {}
		};
	},

	computed: {
		state: function() {
			return this.$fetchState;
		},
		...mapGetters({
			latLng: "map/latLng"
		})
	},

	watch: {
		latLng: function() {
			this.$fetch();
		}
	},

	fetchOnServer: false,
	async fetch() {
		if (this.latLng.lat && this.latLng.lng) {
			this.results = await this.$axios.$get(
				process.env.apiUrl +
					"/physiography/point/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng
			);
		}
	}
};
</script>

<style lang="scss" scoped></style>
