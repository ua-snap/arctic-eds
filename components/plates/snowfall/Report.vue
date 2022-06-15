<template>
	<div>
		<CloseReportButton />
		<hr />
		<LoadingStatus :state="state" />

		<div v-if="!$fetchState.pending && !$fetchState.error && Object.keys(results).length > 0">
			<h3 class="title is-3">
				Snowfall Equivalent data for {{ results.place }}
			</h3>

			<MiniMap />

			<h4 class="title is-4">
				Annual Snowfall Equivalent Totals
			</h4>

			<UnitRadio />

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
						<th scope="row">Historical (1910-2009)</th>
						<td>
							{{ results.sfe_hist_min
							}}<UnitWidget variable="pr" />
						</td>
						<td>
							{{ results.sfe_hist_mean
							}}<UnitWidget variable="pr" />
						</td>
						<td>
							{{ results.sfe_hist_max
							}}<UnitWidget variable="pr" />
						</td>
					</tr>
					<tr>
						<th scope="row">Future Projections (2010-2099)</th>
						<td>
							{{ results.sfe_proj_min
							}}<UnitWidget variable="pr" />
						</td>
						<td>
							{{ results.sfe_proj_mean
							}}<UnitWidget variable="pr" />
						</td>
						<td>
							{{ results.sfe_proj_max
							}}<UnitWidget variable="pr" />
						</td>
					</tr>
				</tbody>
			</table>
			<h4 class="title is-6">Access to Data</h4>
			<div class="content">
				<ul>
					<li>
						<a
							href="http://ckan.snap.uaf.edu/dataset/historical-decadal-averages-of-monthly-snowfall-equivalent-771m-cru-ts3-0-ts3-1"
							target="_blank"
							>Historical Decadal Averages of Monthly Snowfall
							Equivalent 771m CRU TS3.0/TS3.1</a
						>
					</li>
					<li>
						<a
							href="http://ckan.snap.uaf.edu/dataset/projected-decadal-averages-of-monthly-snowfall-equivalent-771m-cmip5-ar5"
							target="_blank"
							>Projected Decadal Averages of Monthly Snowfall
							Equivalent 771m CMIP5/AR5</a
						>
					</li>
				</ul>
			</div>
			<DownloadCsvButton
				text="Download snowfall equivalent data as CSV"
				endpoint="mmm/snow/snowfallequivalent/all"
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
import UnitWidget from "~/components/UnitWidget";
import UnitRadio from "~/components/UnitRadio";

export default {
	name: "SnowfallReport",
	components: {
		DownloadCsvButton,
		MiniMap,
		LoadingStatus,
		UnitWidget,
		UnitRadio,
	},
	computed: {
		state: function() {
			return this.$fetchState;
		},
		...mapGetters({
			results: "report/results",
			placeName: "report/placeName",
			reportIsVisible: "report/reportIsVisible",
			latLng: "report/latLng"
		}),
	},

	watch: {
		reportIsVisible: function() {
			this.$fetch();
		},
	},
	async fetch() {
		if (this.latLng != undefined) {
			if (this.latLng.lat && this.latLng.lng) {
			let url = process.env.apiUrl +
					"/mmm/snow/snowfallequivalent/hp/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng;

			await this.$store.dispatch("report/apiFetch", url);

			let place = this.latLng.lat + ", " + this.latLng.lng;
			if (this.placeName) {
				place = this.placeName;
			}

			let plateResults = {
				place: place,
				sfe_hist_min: this.results["historical"]["sfemin"],
				sfe_hist_mean: this.results["historical"]["sfemean"],
				sfe_hist_max: this.results["historical"]["sfemax"],
				sfe_proj_min: this.results["projected"]["sfemin"],
				sfe_proj_mean: this.results["projected"]["sfemean"],
				sfe_proj_max: this.results["projected"]["sfemax"],
			};
			this.$store.commit("report/setResults", plateResults);
		}
		}
	},
};
</script>

<style lang="scss" scoped></style>
