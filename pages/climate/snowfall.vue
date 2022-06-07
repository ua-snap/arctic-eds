<template>
	<div>
		<div class="container">
			<section class="section">
				<h1 class="title is-2">Snowfall</h1>
				<div class="content content-clamp is-size-5">
					<p>
						Snowfall is extremely low in Arctic Alaska, among the highest in the world in the southern
						coastal mountains, and moderate in the regions between. Snowfall in the coastal mountain ranges
						provides the source of supply for the snowfields and glaciers that cover about 20,000 square
						miles of the state. An impression of the rate of snowfall in this area can be obtained from
						Thompson Pass (near Valdez), which has recorded up to 225 inches in a single month.
					</p>

					<p>
						On the north and west coasts, snowfall is light to moderate, but the winds continuously rework
						the snow into drifts. In the Interior, winter winds are low and this combined with the forest
						cover in the area leaves the snow relatively undisturbed after it falls. In both areas winter
						thawing is rare and snow, once fallen, tends to persist until spring. South of the Alaska Range,
						winter thaws often melt the snow on the ground, and snow that falls along the coast seldom
						remains more than a few weeks.
					</p>

					<p>
						The average density of freshly fallen snow is about 0.10 but is probably lower in the Interior
						and higher in the southern coastal areas. The density increases from mechanical breakage of the
						snowflakes during drifting, packing due to snow load above, and recrystallization.
					</p>

					<p>
						Bilello showed that average winter snow densities for snow on the ground vary from 20 to 35
						percent water by volume, and he associated high densities with low average winter temperatures
						and high average winter wind velocities.
					</p>
				</div>
			</section>
		</div>
		<SnowfallController />
	</div>
</template>
<script lang="scss" scoped></script>
<script>
import SnowfallController from "~/components/plates/snowfall/Controller";

export default {
	name: "Snowfall",
	layout: "plate",
	components: {
		SnowfallController,
	},
};
</script>
