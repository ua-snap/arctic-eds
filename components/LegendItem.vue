<template>
	<section class="section">
		<div class="map--legend--item">
			<h4 class="title is-4">
				<slot name="title"></slot>
			</h4>
			<div class="content is-size-5">
				<slot name="introduction"></slot>
			</div>
			<div class="columns">
				<div class="column is-one-third">
					<slot name="legend"></slot>
				</div>
				<div class="column content is-size-6">
					<slot name="explanation"></slot>
				</div>
			</div>
			<div class="content is-size-5">
				<slot name="footer"></slot>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped></style>

<script>
export default {
	name: "LegendItem"
};
</script>
