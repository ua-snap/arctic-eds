<template>
	<div>
		<CloseReportButton />
		<hr />
		<LoadingStatus :state="state" />

		<div v-if="!$fetchState.pending & !$fetchState.error">
			<h3 class="title is-3">
				Precipitation data for {{ latLng.lat }}, {{ latLng.lng }}
			</h3>

			<MiniMap />

			<h4 class="title is-4">
				Annual Precipitation Totals (inches)
			</h4>

			<table class="table">
				<thead>
					<tr>
						<th scope="col"></th>
						<th scope="col">Min</th>
						<th scope="col">Mean</th>
						<th scope="col">Max</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Historical (1901-2015)</th>
						<td>{{ results.pr_hist_min }}</td>
						<td>{{ results.pr_hist_mean }}</td>
						<td>{{ results.pr_hist_max }}</td>
					</tr>
					<tr>
						<th scope="row">Early Century (2010-2039)</th>
						<td>{{ results.pr_2040_min }}</td>
						<td>{{ results.pr_2040_mean }}</td>
						<td>{{ results.pr_2040_max }}</td>
					</tr>
					<tr>
						<th scope="row">Mid Century (2040-2069)</th>
						<td>{{ results.pr_2070_min }}</td>
						<td>{{ results.pr_2070_mean }}</td>
						<td>{{ results.pr_2070_max }}</td>
					</tr>
					<tr>
						<th scope="row">Late Century (2070-2099)</th>
						<td>{{ results.pr_2100_min }}</td>
						<td>{{ results.pr_2100_mean }}</td>
						<td>{{ results.pr_2100_max }}</td>
					</tr>
				</tbody>
			</table>
			<h4 class="title is-6">Access to Data</h4>
			<div class="content">
				<ul>
					<li>
						<a href="http://ckan.snap.uaf.edu/dataset/historical-monthly-and-derived-precipitation-products-downscaled-from-cru-ts-data-via-the-delta" target="_blank">Historical Monthly and Derived Precipitation Products</a>
					</li>
					<li>
						<a href="http://ckan.snap.uaf.edu/dataset/projected-monthly-and-derived-precipitation-products-2km-cmip5-ar5" target="_blank">Projected Monthly and Derived Precipitation Products</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import MiniMap from "~/components/MiniMap";
import LoadingStatus from "~/components/LoadingStatus";

export default {
	name: "PrecipitationReport",
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
			let hist = await this.$axios.$get(
				process.env.apiUrl +
					"/mmm/precipitation/historical/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng
			);
			let pr2040 = await this.$axios.$get(
				process.env.apiUrl +
					"/mmm/precipitation/projected/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng +
					"/2010/2039"
			);
			let pr2070 = await this.$axios.$get(
				process.env.apiUrl +
					"/mmm/precipitation/projected/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng +
					"/2040/2069"
			);
			let pr2100 = await this.$axios.$get(
				process.env.apiUrl +
					"/mmm/precipitation/projected/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng +
					"/2070/2099"
			);

			this.results = {
				pr_hist_min: hist["historical"]["prmin"],
				pr_hist_mean: hist["historical"]["prmean"],
				pr_hist_max: hist["historical"]["prmax"],
				pr_2040_min: pr2040["projected"]["prmin"],
				pr_2040_mean: pr2040["projected"]["prmean"],
				pr_2040_max: pr2040["projected"]["prmax"],
				pr_2070_min: pr2070["projected"]["prmin"],
				pr_2070_mean: pr2070["projected"]["prmean"],
				pr_2070_max: pr2070["projected"]["prmax"],
				pr_2100_min: pr2100["projected"]["prmin"],
				pr_2100_mean: pr2100["projected"]["prmean"],
				pr_2100_max: pr2100["projected"]["prmax"]
			};
		}
	}
};
</script>

<style lang="scss" scoped></style>
