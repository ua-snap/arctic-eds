<template>
  <div class="map--legend">
    <LegendItem>
      <template v-slot:title>Mean annual snowfall</template>
      <template v-slot:introduction>
        <p>
          These layers show the historical or projected mean annual snowfall
          across Alaska.
        </p>
      </template>
      <template v-slot:legend>
        <table class="table snowfall">
          <tbody>
            <tr>
              <td>
                <div class="colorbox in0"></div>
              </td>
              <td>0in</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox in2"></div>
              </td>
              <td>2.5in</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox in5"></div>
              </td>
              <td>5in</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox in10"></div>
              </td>
              <td>10in</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox in20"></div>
              </td>
              <td>20in</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox in50"></div>
              </td>
              <td>50in</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox in100"></div>
              </td>
              <td>&ge; 100in</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:explanation>
        <SnowfallExplanation :legend="true"
      /></template>
      <template v-slot:footer
        ><p>
          Access detailed information about this dataset, including source data
          downloads:
        </p>
        <ul>
          <li>
            <a
              href="http://ckan.snap.uaf.edu/dataset/historical-decadal-averages-of-monthly-snowfall-equivalent-771m-cru-ts3-0-ts3-1"
              >Historical Decadal Averages of Monthly Snowfall Equivalent</a
            >
          </li>
          <li>
            <a
              href="http://ckan.snap.uaf.edu/dataset/projected-decadal-averages-of-monthly-snowfall-equivalent-771m-cmip5-ar5"
              >Projected Decadal Averages of Monthly Snowfall Equivalent</a
            >
          </li>
        </ul>
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
.snowfall .colorbox {
  &.in0 {
    background-color: #edf8fb;
    border: 1px solid #ddd;
  }
  &.in2 {
    background-color: #bfd3e6;
  }
  &.in5 {
    background-color: #9ebcda;
  }
  &.in10 {
    background-color: #8c96c6;
  }
  &.in20 {
    background-color: #8c6bb1;
  }
  &.in50 {
    background-color: #8841a7;
  }
  &.in100 {
    background-color: #6e016b;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import LegendItem from '~/components/LegendItem'
import SnowfallExplanation from '~/components/plates/snowfall/Explanation'

export default {
  name: 'SnowfallLegend',
  components: { LegendItem, SnowfallExplanation },
  computed: {
    activeLayerId() {
      // This component can get mounted before the active layer
      // is set/present in the global state, so we need to
      // guard for that case.
      if (this.activeLayer) {
        return this.activeLayer.id
      }
      return undefined
    },
    ...mapGetters({
      activeLayer: 'map/getActiveLayer',
    }),
  },
}
</script>
