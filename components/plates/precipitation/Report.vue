<template>
	<div>
		<CloseReportButton />
		<hr />
		<LoadingStatus :state="state" />

		<div v-if="!$fetchState.pending && !$fetchState.error">
			<h3 class="title is-3">
				Precipitation data for {{ results.place }}
			</h3>

			<MiniMap />

			<h4 class="title is-4">
				Annual Precipitation Totals
			</h4>

			<UnitRadio type="precipitation" />

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
						<td>
							{{ results.pr_hist_min
							}}<UnitWidget variable="pr" type="light" />
						</td>
						<td>
							{{ results.pr_hist_mean
							}}<UnitWidget variable="pr" type="light" />
						</td>
						<td>
							{{ results.pr_hist_max
							}}<UnitWidget variable="pr" type="light" />
						</td>
					</tr>
					<tr>
						<th scope="row">Early Century (2010-2039)</th>
						<td>
							{{ results.pr_2040_min
							}}<UnitWidget variable="pr" type="light" />
						</td>
						<td>
							{{ results.pr_2040_mean
							}}<UnitWidget variable="pr" type="light" />
						</td>
						<td>
							{{ results.pr_2040_max
							}}<UnitWidget variable="pr" type="light" />
						</td>
					</tr>
					<tr>
						<th scope="row">Mid Century (2040-2069)</th>
						<td>
							{{ results.pr_2070_min
							}}<UnitWidget variable="pr" type="light" />
						</td>
						<td>
							{{ results.pr_2070_mean
							}}<UnitWidget variable="pr" type="light" />
						</td>
						<td>
							{{ results.pr_2070_max
							}}<UnitWidget variable="pr" type="light" />
						</td>
					</tr>
					<tr>
						<th scope="row">Late Century (2070-2099)</th>
						<td>
							{{ results.pr_2100_min
							}}<UnitWidget variable="pr" type="light" />
						</td>
						<td>
							{{ results.pr_2100_mean
							}}<UnitWidget variable="pr" type="light" />
						</td>
						<td>
							{{ results.pr_2100_max
							}}<UnitWidget variable="pr" type="light" />
						</td>
					</tr>
				</tbody>
			</table>
			<h4 class="title is-6">Access to Data</h4>
			<div class="content">
				<ul>
					<li>
						<a
							href="http://ckan.snap.uaf.edu/dataset/historical-monthly-and-derived-precipitation-products-downscaled-from-cru-ts-data-via-the-delta"
							target="_blank"
							>Historical Monthly and Derived Precipitation
							Products</a
						>
					</li>
					<li>
						<a
							href="http://ckan.snap.uaf.edu/dataset/projected-monthly-and-derived-precipitation-products-2km-cmip5-ar5"
							target="_blank"
							>Projected Monthly and Derived Precipitation
							Products</a
						>
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
import UnitWidget from "~/components/UnitWidget";
import UnitRadio from "~/components/UnitRadio";

export default {
	name: "PrecipitationReport",
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
			latLng: "report/latLng",
		}),
	},
	watch: {
		latLng: function() {
			this.$fetch();
		},
	},
	async fetch() {
		if (this.latLng.lat && this.latLng.lng) {
			let plate = await this.$axios.$get(
				process.env.apiUrl +
					"/eds/precipitation/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng
			);

			let place = this.latLng.lat + ", " + this.latLng.lng;
			if (this.placeName) {
				place = this.placeName;
			}

			let plateResults = {
				place: place,
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
				pr_2100_max: plate["2070-2099"]["prmax"],
			};

			this.$store.commit("report/setResults", plateResults);
		}
	},
};
</script>

<style lang="scss" scoped></style>
