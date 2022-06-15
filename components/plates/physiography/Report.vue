<template>
	<div>
		<CloseReportButton />
		<hr />
		<LoadingStatus :state="state" />

		<div v-if="!$fetchState.pending & !$fetchState.error">
			<h3 class="title is-3">
				Ecoregion for {{ results.place }}
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
	name: "PhysiographyReport",
	components: {
    MiniMap,
    LoadingStatus
  },
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
			placeName: "report/placeName",
			reportIsVisible: "report/reportIsVisible",
			latLng: "report/latLng"
		})
	},

	watch: {
		reportIsVisible: function() {
			this.$fetch();
		}
	},
	async fetch() {
		if (this.latLng != undefined) {
			if (this.latLng.lat && this.latLng.lng) {
				this.results = await this.$axios.$get(
					process.env.apiUrl +
						"/physiography/point/" +
						this.latLng.lat +
						"/" +
						this.latLng.lng
				);

				let place = this.latLng.lat + ', ' + this.latLng.lng;
				if (this.placeName) {
					place = this.placeName
				}
				
				this.results.place = place;
			}
		}
	}
};
</script>

<style lang="scss" scoped></style>
