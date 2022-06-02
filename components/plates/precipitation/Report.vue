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
			<DownloadCsvButton
				text="Download precipitation data as CSV"
				endpoint="mmm/precipitation/all"
				class="mt-3 mb-5"
			/>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import DownloadCsvButton from "~/components/DownloadCsvButton";
import MiniMap from "~/components/MiniMap";
import LoadingStatus from "~/components/LoadingStatus";

export default {
	name: "PrecipitationReport",
	components: {
		DownloadCsvButton
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
			let plate = await this.$axios.$get(
				process.env.apiUrl +
					"/eds/precipitation/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng
			);

			this.results = {
				pr_hist_min: plate["historical"]["prmin"],
				pr_hist_mean: plate["historical"]["prmean"],
				pr_hist_max: plate["historical"]["prmax"],
				pr_2040_min: plate["2010-2039"]["prmin"],
				pr_2040_mean: plate["2010-2039"]["prmean"],
				pr_2040_max: plate["2010-2039"]["prmax"],
				pr_2070_min: plate["2040-2069"]["prmin"],
				pr_2070_mean: plate["2040-2069"]["prmean"],
				pr_2070_max: plate["2040-2069"]["prmax"],
				pr_2100_min: plate["2070-2099"]["prmin"],
				pr_2100_mean: plate["2070-2099"]["prmean"],
				pr_2100_max: plate["2070-2099"]["prmax"]
			};
		}
	}
};
</script>

<style lang="scss" scoped></style>
