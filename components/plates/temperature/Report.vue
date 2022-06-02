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
			let plate = await this.$axios.$get(
				process.env.apiUrl +
					"/eds/temperature/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng
			);

			this.results = {
				hist_min: plate[0]["historical"]["tasmin"],
				hist_mean: plate[0]["historical"]["tasmean"],
				hist_max: plate[0]["historical"]["tasmax"],
				jan_hist_min: plate[1]["historical"]["tasmin"],
				jan_hist_mean: plate[1]["historical"]["tasmean"],
				jan_hist_max: plate[1]["historical"]["tasmax"],
				july_hist_min: plate[2]["historical"]["tasmin"],
				july_hist_mean: plate[2]["historical"]["tasmean"],
				july_hist_max: plate[2]["historical"]["tasmax"],
				temp_2040_min: plate[3]["projected"]["tasmin"],
				temp_2040_mean: plate[3]["projected"]["tasmean"],
				temp_2040_max: plate[3]["projected"]["tasmax"],
				jan_2040_min: plate[4]["projected"]["tasmin"],
				jan_2040_mean: plate[4]["projected"]["tasmean"],
				jan_2040_max: plate[4]["projected"]["tasmax"],
				july_2040_min: plate[5]["projected"]["tasmin"],
				july_2040_mean: plate[5]["projected"]["tasmean"],
				july_2040_max: plate[5]["projected"]["tasmax"],
				temp_2070_min: plate[6]["projected"]["tasmin"],
				temp_2070_mean: plate[6]["projected"]["tasmean"],
				temp_2070_max: plate[6]["projected"]["tasmax"],
				jan_2070_min: plate[7]["projected"]["tasmin"],
				jan_2070_mean: plate[7]["projected"]["tasmean"],
				jan_2070_max: plate[7]["projected"]["tasmax"],
				july_2070_min: plate[8]["projected"]["tasmin"],
				july_2070_mean: plate[8]["projected"]["tasmean"],
				july_2070_max: plate[8]["projected"]["tasmax"],
				temp_2100_min: plate[9]["projected"]["tasmin"],
				temp_2100_mean: plate[9]["projected"]["tasmean"],
				temp_2100_max: plate[9]["projected"]["tasmax"],
				jan_2100_min: plate[10]["projected"]["tasmin"],
				jan_2100_mean: plate[10]["projected"]["tasmean"],
				jan_2100_max: plate[10]["projected"]["tasmax"],
				july_2100_min: plate[11]["projected"]["tasmin"],
				july_2100_mean: plate[11]["projected"]["tasmean"],
				july_2100_max: plate[11]["projected"]["tasmax"]
			};
		}
	}
};
</script>

<style lang="scss" scoped></style>
