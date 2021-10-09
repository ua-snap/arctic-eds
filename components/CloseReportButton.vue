<template>
	<div class="back">
		<b-button
			v-on:click="close"
			class="default"
			type="is-info"
			icon-left="arrow-left-circle"
		>
			<strong>Go back</strong>, pick another place</b-button
		>
	</div>
</template>
<style lang="scss" scoped></style>
<script>
export default {
	name: "CloseReportButton",
	methods: {
		close() {
			this.$store.commit("closeReport");
		}
	}
};
</script>
