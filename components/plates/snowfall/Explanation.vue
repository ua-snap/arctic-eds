<template>
  <div class="content content-clamp" :class="{ 'is-size-5': !legend }">
    <p>
      Snowfall is extremely low in Arctic Alaska, among the highest in the world
      in the southern coastal mountains, and moderate in the regions between.
      Snowfall in the coastal mountain ranges provides the source of supply for
      the snowfields and glaciers that cover about 34,000 square miles of the
      state. Thompson Pass (near Valdez) has recorded up to 225 inches in a
      single month.
    </p>
    <p>
      On the north and west coasts, snowfall is light to moderate, but the winds
      continuously rework the snow into drifts. In the Interior, low-speed
      winter winds, combined with forest cover, leaves snow relatively
      undisturbed after it falls. In both areas winter thawing is rare and snow,
      once fallen, tends to persist until spring. South of the Alaska Range,
      winter thaws often melt the snow on the ground, and snow that falls along
      the coast seldom remains more than a few weeks. These patterns are
      shifting with climate change.
    </p>
    <p>
      The average density of freshly fallen snow is about 0.10 but varies
      greatly by region and season. Older snow varies due to differences in
      temperature, wind conditions, drifting, packing due to snow load above,
      and recrystallization
    </p>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'SnowfallExplanation',
  props: {
    legend: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
