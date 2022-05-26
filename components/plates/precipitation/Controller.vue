<template>
	<div>
		<div v-show="!reportIsVisible" class="container">
			<section class="section">
				<LatLngPicker />
			</section>
		</div>

		<Plate :layers="layers" v-show="!reportIsVisible">
			<component :is="legend"></component>
		</Plate>

		<div class="container">
			<section class="section">
				<div v-show="this.reportIsVisible" class="report-wrapper">
					<img v-if="isFetching" src="~/assets/images/spinning.gif" />
					<table v-if="!isFetching">
					<thead>
						<tr>
							<th colspan="4">Precipitation</th>
						</tr>
						<tr>
							<th></th>
							<th colspan="3">Annual</th>
						</tr>
						<tr>
							<th></th>
							<th>Min</th>
							<th>Mean</th>
							<th>Max</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Historical (1901-2015)</td>
							<td>{{historicalData['historical']['prmin']}}</td>
							<td>{{historicalData['historical']['prmean']}}</td>
							<td>{{historicalData['historical']['prmax']}}</td>
						</tr>
						<tr>
							<td>Early Century (2010-2039)</td>
							<td>{{pr2040['projected']['prmin']}}</td>
							<td>{{pr2040['projected']['prmean']}}</td>
							<td>{{pr2040['projected']['prmax']}}</td>
						</tr>
						<tr>
							<td>Mid Century (2040-2069)</td>
							<td>{{pr2070['projected']['prmin']}}</td>
							<td>{{pr2070['projected']['prmean']}}</td>
							<td>{{pr2070['projected']['prmax']}}</td>
						</tr>
						<tr>
							<td>Late Century (2070-2099)</td>
							<td>{{pr2100['projected']['prmin']}}</td>
							<td>{{pr2100['projected']['prmean']}}</td>
							<td>{{pr2100['projected']['prmax']}}</td>
						</tr>
					</tbody>
				</table>
				</div>
			</section>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	td {
		padding: 8px;
		text-align: center;
	}
	th {
		padding: 8px;
	}
</style>
<script>
import Plate from "~/components/Plate";
import PrecipitationLegend from "~/components/plates/precipitation/Legend";
import LatLngPicker from "~/components/LatLngPicker";
import layers from "~/components/plates/precipitation/layers";
import { mapGetters } from "vuex";

export default {
	name: "PrecipitationController",
	components: { Plate, PrecipitationLegend },
	data() {
		return {
			legend: PrecipitationLegend,
			layers: layers,
			historicalData: undefined,
			pr2040: undefined,
			pr2070: undefined,
			pr2100: undefined,
			isFetching: true
		};
	},
	computed: {
		...mapGetters({
			reportIsVisible: "reportIsVisible",
			latLng: 'map/latLng'
		}),
		async fetch_data() {
			this.isFetching=true
			this.historicalData = await this.historical()
			this.pr2040 = await this.projected(2010,2039)
			this.pr2070 = await this.projected(2040,2069)
			this.pr2100 = await this.projected(2070,2099)
			this.isFetching=false
		}
	},
	mounted() {
		// Wire up click handler
		this.$store.commit("map/addEventHandler", {
			event: "click",
			handler: this.handleMapClick
		});

		// Listen for valid lat/lng, handle.
		this.$on("ValidLatLng", function(latLng) {
			this.activateReport(latLng);
		});
	},
	methods: {
		handleMapClick: function(event) {
			this.activateReport(event.latlng);
		},
		activateReport: function(latLng) {
			this.$store.commit("map/setLatLng", latLng);
			this.$store.commit("openReport");

			this.fetch_data
		},
		historical: function() {
			let queryUrl = process.env.apiUrl + '/mmm/precipitation/historical/' + this.latLng.lat + '/' + this.latLng.lng
			return this.$http.$get(queryUrl)
		},
		projected: function(start, end) {
			let queryUrl = process.env.apiUrl + '/mmm/precipitation/projected/' + this.latLng.lat + '/' + this.latLng.lng + '/' + start + '/' + end
			return this.$http.$get(queryUrl)
		}
	}
};
</script>
