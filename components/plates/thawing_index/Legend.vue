<template>
  <div class="map--legend">
    <LegendItem>
      <template v-slot:title>Thawing index</template>
      <template v-slot:introduction>
        <p>
          This layer shows the thawing index across Alaska.
        </p>
      </template>
      <template v-slot:legend>
        <div class="has-text-weight-bold mb-2">Degree days above 32&deg;F</div>
        <table class="table thawing-index">
          <tbody>
            <tr>
              <td>
                <div class="colorbox dd0"></div>
              </td>
              <td>0 &ndash; 1000</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd1000"></div>
              </td>
              <td>1000 &ndash; 2000</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd2000"></div>
              </td>
              <td>2000 &ndash; 3000</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd3000"></div>
              </td>
              <td>3000 &ndash; 4000</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd4000"></div>
              </td>
              <td>4000 &ndash; 5000</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd5000"></div>
              </td>
              <td>5000 &ndash; 6000</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd6000"></div>
              </td>
              <td>6000 &ndash; 7000</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd7000"></div>
              </td>
              <td>&gt; 7000</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:explanation>
        The thawing index is the
        <strong>annual cumulative degree days (&deg;F) above freezing</strong>
        for each location. These degree days are calculated by taking the number
        of degrees above 32&deg;F for each day of the year and adding them
        together into a single value. A
        <strong>higher thawing index means a warmer year</strong> for that
        location.
      </template>
      <template v-slot:footer>
        <p>
          <a
            href="http://ckan.snap.uaf.edu/dataset/historical-and-projected-dynamically-downscaled-climate-data-for-the-state-of-alaska-and-surrou"
            >Access detailed information about the dataset used to calculate the
            thawing index</a
          >, including source data downloads.
        </p>
      </template>
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
.thawing-index .colorbox {
  &.dd7000 {
    background-color: #8c2d04;
  }
  &.dd6000 {
    background-color: #cc4c02;
  }
  &.dd5000 {
    background-color: #ec7014;
  }
  &.dd4000 {
    background-color: #fe9929;
  }
  &.dd3000 {
    background-color: #fec44f;
  }
  &.dd2000 {
    background-color: #fee391;
  }
  &.dd1000 {
    background-color: #fff7bc;
  }
  &.dd0 {
    background-color: #ffffe5;
  }
}
</style>

<script>
import { mapGetters } from "vuex";
import LegendItem from "~/components/LegendItem";

export default {
  name: "ThawingIndexLegend",
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
