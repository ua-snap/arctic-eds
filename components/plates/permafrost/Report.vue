<template>
	<div>
		<CloseReportButton />
		<hr />
		<LoadingStatus :state="state" />

		<div v-if="!$fetchState.pending & !$fetchState.error">
			<h3 class="title is-3">
				Permafrost data for {{ latLng.lat }}, {{ latLng.lng }}
			</h3>

			<MiniMap />

			<h4 class="title is-4">
				GIPL Mean Annual Ground Temperature (&deg;C)
			</h4>

			<table class="table">
				<thead>
					<tr>
						<th scope="col">Depth (m)</th>
						<th scope="col">2010</th>
						<th scope="col">2050</th>
						<th scope="col">Change</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>{{ results.gipl_magt_2010_1m }}</td>
						<td>{{ results.gipl_magt_2050_1m }}</td>
						<td>
							{{
								"+" +
									(
										results.gipl_magt_2050_1m -
										results.gipl_magt_2010_1m
									).toFixed(2)
							}}
						</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>{{ results.gipl_magt_2010_3m }}</td>
						<td>{{ results.gipl_magt_2050_3m }}</td>
						<td>
							{{
								"+" +
									(
										results.gipl_magt_2050_3m -
										results.gipl_magt_2010_3m
									).toFixed(2)
							}}
						</td>
					</tr>
					<tr>
						<th scope="row">5</th>
						<td>{{ results.gipl_magt_2010_5m }}</td>
						<td>{{ results.gipl_magt_2050_5m }}</td>
						<td>
							{{
								"+" +
									(
										results.gipl_magt_2050_5m -
										results.gipl_magt_2010_5m
									).toFixed(2)
							}}
						</td>
					</tr>
				</tbody>
			</table>

			<h4 class="title is-4">GIPL Active Layer Thickness (m)</h4>
			<table class="table">
				<thead>
					<tr>
						<th scope="col">2010</th>
						<th scope="col">2050</th>
						<th scope="col">Change</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ results.gipl_alt_2010 }}</td>
						<td>{{ results.gipl_alt_2050 }}</td>
						<td>
							{{
								"+" +
									(
										results.gipl_alt_2050 -
										results.gipl_alt_2010
									).toFixed(2)
							}}
						</td>
					</tr>
				</tbody>
			</table>
			<h4 class="title is-6">Additional data</h4>
			<div class="content">
				<ul>
					<li>
						Obu et al. (2018) Mean Annual Ground Temperature (deg.
						C) at Top of Permafrost:
						<strong>{{ results.magt_2018 }}</strong>
					</li>
					<li>
						Jorgenson et al. (2008) Ground Ice Volume:
						<strong>{{ results.giv_2008 }}</strong>
					</li>
					<li>
						Jorgenson et al. (2008) Permafrost Extent:
						<strong>{{ results.pe_2008 }}</strong>
					</li>
					<li>
						Obu et al. (2018) Permafrost Extent:
						<strong>{{ results.pe_2018 }}</strong>
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
			let res = await this.$axios.$get(
				process.env.apiUrl +
					"/permafrost/point/" +
					this.latLng.lat +
					"/" +
					this.latLng.lng
			);

			this.results = {
				gipl_alt_2010: res["gipl_alt"][0]["thickness"],
				gipl_alt_2050: res["gipl_alt"][1]["thickness"],
				gipl_magt_2010_1m: res["gipl_magt"][0]["temp"],
				gipl_magt_2010_3m: res["gipl_magt"][2]["temp"],
				gipl_magt_2010_5m: res["gipl_magt"][4]["temp"],
				gipl_magt_2050_1m: res["gipl_magt"][1]["temp"],
				gipl_magt_2050_3m: res["gipl_magt"][3]["temp"],
				gipl_magt_2050_5m: res["gipl_magt"][5]["temp"],
				giv_2008: res["jorg"]["ice"],
				pe_2008: res["jorg"]["pfx"],
				magt_2018: res["obu_magt"]["temp"],
				pe_2018: res["obupfx"]["pfx"]
			};
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
