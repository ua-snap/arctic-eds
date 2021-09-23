<template>
	<div class="map--legend">
		<LegendItem v-show="activeLayerId == 'pfextent_jorgenson'">
			<template v-slot:title
				>Permafrost extent (Jorgenson et al., 2008)</template
			>
			<template v-slot:introduction>
				<p>
					This layer shows the extent of permafrost across Alaska,
					classified into four categories.
				</p>
			</template>
			<template v-slot:legend>
				<table class="table pfextent_jorgenson">
					<tbody>
						<tr>
							<td>
								<div class="colorbox continuous"></div>
							</td>
							<td>Continuous (&gt;90%)</td>
						</tr>
						<tr>
							<td>
								<div class="colorbox discontinuous"></div>
							</td>
							<td>Discontinuous (50-90%)</td>
						</tr>
						<tr>
							<td>
								<div class="colorbox isolated"></div>
							</td>
							<td>Isolated (10-50%)</td>
						</tr>
						<tr>
							<td>
								<div class="colorbox sporadic"></div>
							</td>
							<td>Sporadic (&lt;10%)</td>
						</tr>
					</tbody>
				</table>
			</template>
			<template v-slot:explanation>
				<strong>Continuous</strong> permafrost indicates continuous presence of permafrost throughout the region, and <strong>discontinuous</strong> regions have a significant but not continuous permafrost layer.  <strong>Isolated</strong> regions are characterized by occasional, significant permafrost areas, whereas <strong>sporadic</strong> regions are mostly free of permafrost.
			</template>
			<template v-slot:footer>
				<p>
					<a
						href="http://ckan.snap.uaf.edu/dataset/gipl-model-outputs-linear-coupled-annual"
						>Read detailed information about this dataset</a
					>, or
					<a
						href="http://data.snap.uaf.edu/data/IEM/Outputs/GIPL/Gen_1a/v_2.0.0/"
						>download it directly</a
					>.
				</p>
			</template>
		</LegendItem>
		<LegendItem v-show="activeLayerId == 'pfextent_obu'">
			Permafrost extent (Obu et al., 2018)
		</LegendItem>
		<LegendItem v-show="activeLayerId == '3mgipl2010'">
			Ground temperature, 3m depth, 2010 (GIPL model)
		</LegendItem>
		<LegendItem v-show="activeLayerId == '3mgipl2050'">
			Ground temperature, 3m depth, 2050 (GIPL model)
		</LegendItem>
		<LegendItem v-show="activeLayerId == 'altGIPL2010'">
			Active layer thickness, 2010 (GIPL model)
		</LegendItem>
		<LegendItem v-show="activeLayerId == 'altGIPL2050'">
			Active layer thickness, 2050 (GIPL model)
		</LegendItem>
		<LegendItem v-show="activeLayerId == 'obumagt'">
			Mean annual ground temperature at top of permafrost, 2000-2016
			(modeled)
		</LegendItem>
		<LegendItem
			v-show="activeLayerId == 'icevol_jorgenson'"
			class="map--legend-item"
		>
			Ground ice volume (Jorgenson et al., 2008)
		</LegendItem>
	</div>
</template>

<style lang="scss" scoped>
table.table td {
	vertical-align: middle;
}
.colorbox {
	height: 2rem;
	width: 2rem;
}
.pfextent_jorgenson .colorbox {
	&.continuous {
		background-color: #eafdfd;
		border: 1px solid #98a09c;
	}
	&.discontinuous {
		background-color: #79bed0;
	}
	&.sporadic {
		background-color: #427ab7;
	}
	&.isolated {
		background-color: #383873;
	}
}
</style>

<script>
import { mapGetters } from "vuex";
import LegendItem from "~/components/LegendItem";

export default {
	name: "PermafrostLegend",
	components: { LegendItem },
	computed: {
		activeLayerId() {
			// This component can get mounted before the active layer
			// is set/present in the global state, so we need to
			// guard for that case.
			if (this.activeLayer) {
				return this.activeLayer.id;
			}
			return undefined;
		},
		...mapGetters({
			activeLayer: "map/getActiveLayer"
		})
	}
};
</script>
