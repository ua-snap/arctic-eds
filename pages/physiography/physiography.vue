<template>
	<div>
		<div class="container">
			<section class="section">
				<h1 class="title is-2">Physiographic Provinces</h1>
				<div class="content content-clamp is-size-4">
					<p>
						Ecoregions are essentially equivalent to the more archaic "physiographic provinces." Ecoregions do combine landscape and vegetation variables, but have less detail about vegetation when compared to "land cover" or "forest type" datasets. Topography plays a prominent role.
					</p>
				</div>
				<div class="content content-clamp is-size-5">
					<p>
						Click any point on the map, or enter a lat/lon, to get the geological unit for that point.
					</p>
				</div>
			</section>
		</div>
		<PhysiographyController />
	</div>
</template>
<script lang="scss" scoped></script>
<script>

import PhysiographyController from "~/components/plates/physiography/Controller";

export default {
	name: "Physiography",
	layout: "plate",
	components: {
		PhysiographyController
	}
};
</script>
