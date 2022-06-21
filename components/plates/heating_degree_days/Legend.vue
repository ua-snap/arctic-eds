<template>
  <div class="map--legend">
    <LegendItem>
      <template v-slot:title>Heating degree days</template>
      <template v-slot:introduction>
        <p>
          These layers show the historical or projected cumulative annual
          heating degree days across Alaska.
        </p>
      </template>
      <template v-slot:legend>
        <div class="has-text-weight-bold mb-2">Degree days below 65&deg;F</div>
        <table class="table heating-degree-days">
          <tbody>
            <tr>
              <td>
                <div class="colorbox dd0"></div>
              </td>
              <td>0</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd2500"></div>
              </td>
              <td>2500</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd5000"></div>
              </td>
              <td>5000</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd7500"></div>
              </td>
              <td>7500</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd10000"></div>
              </td>
              <td>10000</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd12500"></div>
              </td>
              <td>12500</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd15000"></div>
              </td>
              <td>15000</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd17500"></div>
              </td>
              <td>&ge; 17500</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:explanation>
        <HeatingDegreeDaysExplanation :legend="true" />
      </template>
      <template v-slot:footer>
        <p>
          <a
            href="http://ckan.snap.uaf.edu/dataset/historical-and-projected-dynamically-downscaled-climate-data-for-the-state-of-alaska-and-surrou"
            >Access detailed information about the dataset used to calculate
            heating degree days</a
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
.heating-degree-days .colorbox {
  &.dd0 {
    background-color: #fff7fb;
  }
  &.dd2500 {
    background-color: #ece7f2;
  }
  &.dd5000 {
    background-color: #d0d1e6;
  }
  &.dd7500 {
    background-color: #a6bddb;
  }
  &.dd10000 {
    background-color: #74a9cf;
  }
  &.dd12500 {
    background-color: #3690c0;
  }
  &.dd15000 {
    background-color: #0570b0;
  }
  &.dd17500 {
    background-color: #034e7b;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import LegendItem from '~/components/LegendItem'
import HeatingDegreeDaysExplanation from '~/components/plates/heating_degree_days/Explanation'

export default {
  name: 'HeatingDegreeDaysLegend',
  components: { LegendItem, HeatingDegreeDaysExplanation },
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
