<template>
	<div>
		<div class="columns" v-bind:class="{ hidden: hidden }">
			<div class="column is-one-quarter">
				<LayerList :layers="layers" />
			</div>
			<div class="column">
				<Map/>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.hidden {
		display: none;
	}
</style>

<script>
import Map from '~/components/Map'
import LayerList from '~/components/LayerList'

export default {
	name: 'Plate',
	components: { Map },
	props: ['layers', 'hidden']
}
</script>
