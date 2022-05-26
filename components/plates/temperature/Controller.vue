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
				<div v-if="this.reportIsVisible" class="report-wrapper">
				<img v-if="isFetching" src="~/assets/images/spinning.gif" />		
				<table  v-if="!isFetching">
					<thead>
						<tr>
							<th colspan="10">Temperature</th>
						</tr>
						<tr>
							<th></th>
							<th colspan="3">Annual</th>
							<th colspan="3">January</th>
							<th colspan="3">July</th>
						</tr>
						<tr>
							<th></th>
							<th>Min</th>
							<th>Mean</th>
							<th>Max</th>
							<th>Min</th>
							<th>Mean</th>
							<th>Max</th>
							<th>Min</th>
							<th>Mean</th>
							<th>Max</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Historical (1901-2015)</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>{{janHistorical['historical']['tasmin']}}</td>
							<td>{{janHistorical['historical']['tasmean']}}</td>
							<td>{{janHistorical['historical']['tasmax']}}</td>
							<td>{{julyHistorical['historical']['tasmin']}}</td>
							<td>{{julyHistorical['historical']['tasmean']}}</td>
							<td>{{julyHistorical['historical']['tasmax']}}</td>
						</tr>
						<tr>
							<td>Early Century (2010-2039)</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>{{jan2040['projected']['tasmin']}}</td>
							<td>{{jan2040['projected']['tasmean']}}</td>
							<td>{{jan2040['projected']['tasmax']}}</td>
							<td>{{july2040['projected']['tasmin']}}</td>
							<td>{{july2040['projected']['tasmean']}}</td>
							<td>{{july2040['projected']['tasmax']}}</td>
						</tr>
						<tr>
							<td>Mid Century (2040-2069)</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>{{jan2070['projected']['tasmin']}}</td>
							<td>{{jan2070['projected']['tasmean']}}</td>
							<td>{{jan2070['projected']['tasmax']}}</td>
							<td>{{july2070['projected']['tasmin']}}</td>
							<td>{{july2070['projected']['tasmean']}}</td>
							<td>{{july2070['projected']['tasmax']}}</td>
						</tr>
						<tr>
							<td>Late Century (2070-2099)</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>{{jan2100['projected']['tasmin']}}</td>
							<td>{{jan2100['projected']['tasmean']}}</td>
							<td>{{jan2100['projected']['tasmax']}}</td>
							<td>{{july2100['projected']['tasmin']}}</td>
							<td>{{july2100['projected']['tasmean']}}</td>
							<td>{{july2100['projected']['tasmax']}}</td>
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
import TemperatureLegend from "~/components/plates/temperature/Legend";
import LatLngPicker from "~/components/LatLngPicker";
import layers from "~/components/plates/temperature/layers";
import { mapGetters } from "vuex";

export default {
	name: "TemperatureController",
	components: { Plate, TemperatureLegend },
	data() {
		return {
			legend: TemperatureLegend,
			layers: layers,
			janHistorical: undefined,
			julyHistorical: undefined,
			jan2040: undefined,
			july2040: undefined,
			jan2070: undefined,
			july2070: undefined,
			jan2100: undefined,
			july2100: undefined,
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
			this.janHistorical = await this.historical('jan')
			this.julyHistorical = await this.historical('july')
			this.jan2040 = await this.projected('jan',2010,2039)
			this.july2040 = await this.projected('july',2010,2039)
			this.jan2070 = await this.projected('jan',2040,2069)
			this.july2070 = await this.projected('july',2040,2069)
			this.jan2100 = await this.projected('jan',2070,2099)
			this.july2100 = await this.projected('july',2070,2099)
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
		historical: function(month) {
			let queryUrl = process.env.apiUrl + '/mmm/temperature/' + month + '/historical/' + this.latLng.lat + '/' + this.latLng.lng
			return this.$http.$get(queryUrl)
		},
		projected: function(month, start, end) {
			let queryUrl = process.env.apiUrl + '/mmm/temperature/' + month + '/projected/' + this.latLng.lat + '/' + this.latLng.lng + '/' + start + '/' + end
			return this.$http.$get(queryUrl)
		}
	}
};
</script>
