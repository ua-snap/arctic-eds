<template>
  <div class="map--legend">
    <LegendItem>
      <template v-slot:title>Mean annual snowfall</template>
      <template v-slot:introduction>
        <p>
          This layer shows the mean annual snowfall across Alaska.
        </p>
      </template>
      <template v-slot:legend>
        <table class="table snowfall">
          <tbody>
            <tr>
              <td>
                <div class="colorbox in0"></div>
              </td>
              <td>0in &ndash; 5in</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox in5"></div>
              </td>
              <td>5in &ndash; 50in</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox in50"></div>
              </td>
              <td>50in &ndash; 100in</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox in100"></div>
              </td>
              <td>100in &ndash; 150in</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox in150"></div>
              </td>
              <td>&gt; 150in</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:explanation>
        <p><i>Placeholder for snowfall legend text</i></p>
      </template>
			<template v-slot:footer
        ><p>
          Access detailed information about this dataset, including source data downloads:
          <ul>
            <li><a href="http://ckan.snap.uaf.edu/dataset/historical-decadal-averages-of-monthly-snowfall-equivalent-771m-cru-ts3-0-ts3-1">Historical Decadal Averages of Monthly Snowfall Equivalent</a></li>
            <li><a href="http://ckan.snap.uaf.edu/dataset/projected-decadal-averages-of-monthly-snowfall-equivalent-771m-cmip5-ar5">Projected Decadal Averages of Monthly Snowfall Equivalent</a></li>
          </ul>
        </p></template
      >
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
.snowfall .colorbox {
  &.in0 {
    /* Color map has 0 opacity. This is here as a placeholder for now */
    background-color: #edf8fb00;
    border: 1px solid #ddd;
  }
  &.in5 {
    background-color: #edf8fb;
    border: 1px solid #ddd;
  }
  &.in50 {
    background-color: #b3cde3;
  }
  &.in100 {
    background-color: #8c96c6;
  }
  &.in150 {
    background-color: #88419d;
  }
}
</style>

<script>
import { mapGetters } from "vuex";
import LegendItem from "~/components/LegendItem";

export default {
  name: "SnowfallLegend",
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
