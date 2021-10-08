<template>
	<div>
		<client-only>
			<div class="back">
				<b-button
					v-on:click="close"
					class="default"
					type="is-info"
					icon-left="arrow-left-circle"
				>
					<strong>Go back</strong>, pick another place</b-button
				>
			</div>
			<hr />

			<div v-if="$fetchState.pending">
				<!-- Drama dots -->
				<h4 class="title is-5">Loading data&hellip;</h4>
				<b-progress type="is-info"></b-progress>
			</div>

			<div v-else-if="$fetchState.error" class="error">
				<p class="content is-size-5">
					Oh no! Something&rsquo;s amiss and the report for this place
					couldn&rsquo;t be loaded.
				</p>
				<b-button
					v-on:click="close"
					class="is-warning"
					icon-left="emoticon-sad-outline"
				>
					<strong>We&rsquo;re sorry</strong>, please try
					again</b-button
				>
			</div>

			<div v-else>
				<h3 class="title is-3">
					Geological unit for {{ latLng.lat }}, {{ latLng.lng }}
				</h3>

				<MiniMap />

				<table class="table">
					<tbody>
						<tr>
							<th scope="row">Age</th>
							<td>{{ results.age }}</td>
						</tr>
						<tr>
							<th scope="row">Classification</th>
							<td>{{ results.name }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</client-only>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import MiniMap from "~/components/MiniMap";

export default {
	name: "PermafrostReport",
	data() {
		return {
			// Will have the results of the data fetch.
			results: {}
		};
	},

	computed: {
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
					"/geology/point/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng
			);
		}
	},

	methods: {
		close() {
			this.$store.commit("closeReport");
		}
	}
};
</script>

<style lang="scss" scoped></style>
