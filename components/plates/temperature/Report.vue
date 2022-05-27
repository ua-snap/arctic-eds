<template>
	<div>
		<CloseReportButton />
		<hr />
		<LoadingStatus :state="state" />

		<div v-if="!$fetchState.pending & !$fetchState.error">
			<h3 class="title is-3">
				Temperature data for {{ latLng.lat }}, {{ latLng.lng }}
			</h3>

			<MiniMap />

			<h4 class="title is-4">
				Temperature (&deg;C)
			</h4>

			<table class="table">
				<thead>
					<tr>
						<th></th>
						<th scope="col" colspan="3">Annual</th>
						<th scope="col" colspan="3">January</th>
						<th scope="col" colspan="3">July</th>
					</tr>
					<tr>
						<th scope="col"></th>
						<th scope="col">Min</th>
						<th scope="col">Mean</th>
						<th scope="col">Max</th>
						<th scope="col">Min</th>
						<th scope="col">Mean</th>
						<th scope="col">Max</th>
						<th scope="col">Min</th>
						<th scope="col">Mean</th>
						<th scope="col">Max</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Historical (1901-2015)</th>
						<td>{{ results.hist_min }}</td>
						<td>{{ results.hist_mean }}</td>
						<td>{{ results.hist_max }}</td>
						<td>{{ results.jan_hist_min }}</td>
						<td>{{ results.jan_hist_mean }}</td>
						<td>{{ results.jan_hist_max }}</td>
						<td>{{ results.july_hist_min }}</td>
						<td>{{ results.july_hist_mean }}</td>
						<td>{{ results.july_hist_max }}</td>
					</tr>
					<tr>
						<th scope="row">Early Century (2010-2039)</th>
						<td>{{ results.temp_2040_min }}</td>
						<td>{{ results.temp_2040_mean }}</td>
						<td>{{ results.temp_2040_max }}</td>
						<td>{{ results.jan_2040_min }}</td>
						<td>{{ results.jan_2040_mean }}</td>
						<td>{{ results.jan_2040_max }}</td>
						<td>{{ results.july_2040_min }}</td>
						<td>{{ results.july_2040_mean }}</td>
						<td>{{ results.july_2040_max }}</td>
					</tr>
					<tr>
						<th scope="row">Mid Century (2040-2069)</th>
						<td>{{ results.temp_2070_min }}</td>
						<td>{{ results.temp_2070_mean }}</td>
						<td>{{ results.temp_2070_max }}</td>
						<td>{{ results.jan_2070_min }}</td>
						<td>{{ results.jan_2070_mean }}</td>
						<td>{{ results.jan_2070_max }}</td>
						<td>{{ results.july_2070_min }}</td>
						<td>{{ results.july_2070_mean }}</td>
						<td>{{ results.july_2070_max }}</td>
					</tr>
					<tr>
						<th scope="row">Late Century (2070-2099)</th>
						<td>{{ results.temp_2100_min }}</td>
						<td>{{ results.temp_2100_mean }}</td>
						<td>{{ results.temp_2100_max }}</td>
						<td>{{ results.jan_2100_min }}</td>
						<td>{{ results.jan_2100_mean }}</td>
						<td>{{ results.jan_2100_max }}</td>
						<td>{{ results.july_2100_min }}</td>
						<td>{{ results.july_2100_mean }}</td>
						<td>{{ results.july_2100_max }}</td>
					</tr>
				</tbody>
			</table>
			<h4 class="title is-6">Access to Data</h4>
			<div class="content">
				<ul>
					<li>
						<a href="http://ckan.snap.uaf.edu/dataset/historical-monthly-and-derived-temperature-products-downscaled-from-cru-ts-data-via-the-delta-m" target="_blank">Historical Monthly and Derived Temperature Products</a>
					</li>
					<li>
						<a href="http://ckan.snap.uaf.edu/dataset/projected-monthly-and-derived-temperature-products-2km-cmip5-ar5" target="_blank">Projected Monthly and Derived Temperature Products</a>
					</li>
				</ul>
			</div>
			<DownloadCsvButton
				text="Download annual temperature mean data as CSV"
				endpoint="mmm/temperature/all"
				class="mt-3 mb-5"
			/>
			<DownloadCsvButton
				text="Download annual January temperature min-mean-max as CSV"
				endpoint="mmm/temperature/jan/all"
				class="mt-3 mb-5"
			/>
			<DownloadCsvButton
				text="Download annual July temperature min-mean-max as CSV"
				endpoint="mmm/temperature/july/all"
				class="mt-3 mb-5"
			/>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import MiniMap from "~/components/MiniMap";
import DownloadCsvButton from "~/components/DownloadCsvButton";
import LoadingStatus from "~/components/LoadingStatus";

export default {
	name: "TemperatureReport",
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
			let hist = await this.$axios.$get(
				process.env.apiUrl +
					"/mmm/temperature/historical/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng
			);
			let janhist = await this.$axios.$get(
				process.env.apiUrl +
					"/mmm/temperature/jan/historical/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng
			);
			let julyhist = await this.$axios.$get(
				process.env.apiUrl +
					"/mmm/temperature/july/historical/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng
			);
			let temp2040 = await this.$axios.$get(
				process.env.apiUrl +
					"/mmm/temperature/projected/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng +
					"/2010/2039"
			);
			let jan2040 = await this.$axios.$get(
				process.env.apiUrl +
					"/mmm/temperature/jan/projected/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng +
					"/2010/2039"
			);
			let july2040 = await this.$axios.$get(
				process.env.apiUrl +
					"/mmm/temperature/july/projected/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng +
					"/2010/2039"
			);
			let temp2070 = await this.$axios.$get(
				process.env.apiUrl +
					"/mmm/temperature/projected/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng +
					"/2040/2069"
			);
			let jan2070 = await this.$axios.$get(
				process.env.apiUrl +
					"/mmm/temperature/jan/projected/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng +
					"/2040/2069"
			);
			let july2070 = await this.$axios.$get(
				process.env.apiUrl +
					"/mmm/temperature/july/projected/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng +
					"/2040/2069"
			);
			let temp2100 = await this.$axios.$get(
				process.env.apiUrl +
					"/mmm/temperature/projected/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng +
					"/2070/2099"
			);
			let jan2100 = await this.$axios.$get(
				process.env.apiUrl +
					"/mmm/temperature/jan/projected/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng +
					"/2070/2099"
			);
			let july2100 = await this.$axios.$get(
				process.env.apiUrl +
					"/mmm/temperature/july/projected/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng +
					"/2070/2099"
			);

			this.results = {
				hist_min: hist["historical"]["tasmin"],
				hist_mean: hist["historical"]["tasmean"],
				hist_max: hist["historical"]["tasmax"],
				jan_hist_min: janhist["historical"]["tasmin"],
				jan_hist_mean: janhist["historical"]["tasmean"],
				jan_hist_max: janhist["historical"]["tasmax"],
				july_hist_min: julyhist["historical"]["tasmin"],
				july_hist_mean: julyhist["historical"]["tasmean"],
				july_hist_max: julyhist["historical"]["tasmax"],
				temp_2040_min: temp2040["projected"]["tasmin"],
				temp_2040_mean: temp2040["projected"]["tasmean"],
				temp_2040_max: temp2040["projected"]["tasmax"],
				jan_2040_min: jan2040["projected"]["tasmin"],
				jan_2040_mean: jan2040["projected"]["tasmean"],
				jan_2040_max: jan2040["projected"]["tasmax"],
				july_2040_min: july2040["projected"]["tasmin"],
				july_2040_mean: july2040["projected"]["tasmean"],
				july_2040_max: july2040["projected"]["tasmax"],
				temp_2070_min: temp2070["projected"]["tasmin"],
				temp_2070_mean: temp2070["projected"]["tasmean"],
				temp_2070_max: temp2070["projected"]["tasmax"],
				jan_2070_min: jan2070["projected"]["tasmin"],
				jan_2070_mean: jan2070["projected"]["tasmean"],
				jan_2070_max: jan2070["projected"]["tasmax"],
				july_2070_min: july2070["projected"]["tasmin"],
				july_2070_mean: july2070["projected"]["tasmean"],
				july_2070_max: july2070["projected"]["tasmax"],
				temp_2100_min: temp2100["projected"]["tasmin"],
				temp_2100_mean: temp2100["projected"]["tasmean"],
				temp_2100_max: temp2100["projected"]["tasmax"],
				jan_2100_min: jan2100["projected"]["tasmin"],
				jan_2100_mean: jan2100["projected"]["tasmean"],
				jan_2100_max: jan2100["projected"]["tasmax"],
				july_2100_min: july2100["projected"]["tasmin"],
				july_2100_mean: july2100["projected"]["tasmean"],
				july_2100_max: july2100["projected"]["tasmax"]
			};
		}
	}
};
</script>

<style lang="scss" scoped></style>
