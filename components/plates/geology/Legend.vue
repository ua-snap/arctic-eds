<template>
  <div class="map--legend">
    <LegendItem>
      <template v-slot:introduction>
        <p>
          In Paleozoic and early Mesozoic times (541 to 250 million years ago),
          much of what is now continental Alaska were ocean basins. These ocean
          basins were later squeezed and uplifted in response to tectonic plate
          movement.
        </p>
        <p>
          Mid-late Mesozoic was the time of the most dramatic changes in Alaska
          geography and many of the motions initiated then persist today.
          Widespread intrusion of granitic bodies into existing rocks also
          occurred during the Mesozoic, presumably also a result of the dynamics
          of lithospheric plate collision.
        </p>
        <p>
          During the early Tertiary period (60 to 30 million years ago)
          extensive volcanic activity occurred, particularly in the Wrangell
          Mountains, the Alaska Peninsula, and the Aleutian Islands. During this
          warm period, large peat swamps formed and subsequently produced the
          coal deposits in the Cook Inlet region and on the northern side of the
          Alaska Range. Throughout the late Tertiary (30 to 2 million years ago)
          volcanic activity remained widespread.
        </p>
        <p>
          During the Pleistocene ice age (2.5 million to 12 thousand years ago),
          broad snowfields formed in the Brooks, Alaska, and Coast Ranges and
          filled the trough between the Alaska Range and the coast ranges. Great
          glaciers from the snowfields carved the mountains and valleys of
          Alaska into their present shape and provided the sediments that now
          cover valley floors and basins.
        </p>
      </template>
    </LegendItem>
  </div>
</template>

<script>
import LegendItem from '~/components/LegendItem'

export default {
  name: 'GeologyLegend',
  components: { LegendItem },
}
</script>
