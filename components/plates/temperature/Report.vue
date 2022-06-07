<template>
	<div>
		<CloseReportButton />
		<hr />
		<LoadingStatus :state="state" />

		<div v-if="!$fetchState.pending && !$fetchState.error">
			<h3 class="title is-3">
				Temperature data for {{ results.place }}
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
			placeName: "map/placeName",
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

			let place = this.latLng.lat + ', ' + this.latLng.lng;
			if (this.placeName) {
				place = this.placeName
			}

			this.results = {
				place: place,
				hist_min: plate["historical"]["all"]["tasmin"],
				hist_mean: plate["historical"]["all"]["tasmean"],
				hist_max: plate["historical"]["all"]["tasmax"],
				jan_hist_min: plate["historical"]["jan"]["tasmin"],
				jan_hist_mean: plate["historical"]["jan"]["tasmean"],
				jan_hist_max: plate["historical"]["jan"]["tasmax"],
				july_hist_min: plate["historical"]["july"]["tasmin"],
				july_hist_mean: plate["historical"]["july"]["tasmean"],
				july_hist_max: plate["historical"]["july"]["tasmax"],
				temp_2040_min: plate["2010-2039"]["all"]["tasmin"],
				temp_2040_mean: plate["2010-2039"]["all"]["tasmean"],
				temp_2040_max: plate["2010-2039"]["all"]["tasmax"],
				jan_2040_min: plate["2010-2039"]["jan"]["tasmin"],
				jan_2040_mean: plate["2010-2039"]["jan"]["tasmean"],
				jan_2040_max: plate["2010-2039"]["jan"]["tasmax"],
				july_2040_min: plate["2010-2039"]["july"]["tasmin"],
				july_2040_mean: plate["2010-2039"]["july"]["tasmean"],
				july_2040_max: plate["2010-2039"]["july"]["tasmax"],
				temp_2070_min: plate["2040-2069"]["all"]["tasmin"],
				temp_2070_mean: plate["2040-2069"]["all"]["tasmean"],
				temp_2070_max: plate["2040-2069"]["all"]["tasmax"],
				jan_2070_min: plate["2040-2069"]["jan"]["tasmin"],
				jan_2070_mean: plate["2040-2069"]["jan"]["tasmean"],
				jan_2070_max: plate["2040-2069"]["jan"]["tasmax"],
				july_2070_min: plate["2040-2069"]["july"]["tasmin"],
				july_2070_mean: plate["2040-2069"]["july"]["tasmean"],
				july_2070_max: plate["2040-2069"]["july"]["tasmax"],
				temp_2100_min: plate["2070-2099"]["all"]["tasmin"],
				temp_2100_mean: plate["2070-2099"]["all"]["tasmean"],
				temp_2100_max: plate["2070-2099"]["all"]["tasmax"],
				jan_2100_min: plate["2070-2099"]["jan"]["tasmin"],
				jan_2100_mean: plate["2070-2099"]["jan"]["tasmean"],
				jan_2100_max: plate["2070-2099"]["jan"]["tasmax"],
				july_2100_min: plate["2070-2099"]["july"]["tasmin"],
				july_2100_mean: plate["2070-2099"]["july"]["tasmean"],
				july_2100_max: plate["2070-2099"]["july"]["tasmax"]
			};
		}
	}
};
</script>

<style lang="scss" scoped></style>
