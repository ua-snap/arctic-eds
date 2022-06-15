<template>
	<div class="latlng-picker">
		<div class="field-wrapper">
			<b-field label="Latitude" horizontal>
				<b-input v-model="lat" placeholder="64.8436"></b-input>
			</b-field>
		</div>
		<div class="field-wrapper">
			<b-field label="Longtitude" horizontal>
				<b-input v-model="lng" placeholder="-147.7230"></b-input>
			</b-field>
		</div>
		<b-button v-on:click="processClick" :disabled="!isValid" :type="type"
			>Get point data</b-button
		>
	</div>
</template>

<style lang="scss" scoped>
.field-wrapper {
	display: inline-block;
	::v-deep input[type="text"] {
		width: 6rem;
	}
	::v-deep .field-label {
		margin-right: 1rem;
	}
	&:not(:first-child) {
		margin-left: 2rem;
		margin-right: 2rem;
	}
}
</style>
<script>
export default {
	name: "LatLngPicker",
	data() {
		return {
			lat: undefined,
			lng: undefined,
			isValid: false,
			type: "is-light",
			latLng: undefined
		};
	},
	watch: {
		lat() {
			this.validate();
		},
		lng() {
			this.validate();
		}
	},
	methods: {
		validate() {
			let lat = parseFloat(this.lat);
			let lng = parseFloat(this.lng);

			if (
				// Check for bbox; these tests will also fail
				// if the user has entered a non-numeric string.
				lat >= 51.229 &&
				lat <= 71.3526 &&
				lng >= -179.1506 &&
				lng <= -129.9795
			) {
				// Valid!
				this.isValid = true;
				this.type = "is-success";
				this.latLng = { lat: lat, lng: lng };
			} else {
				this.isValid = false;
				this.type = "is-light";
				this.latLng = {};
			}
		},
		processClick() {
			if (this.isValid) {
				this.$store.commit("report/setLatLng", this.latLng);

        this.$store.commit("report/openReport", this.$route.fullPath);
			}
		}
	}
};
</script>
