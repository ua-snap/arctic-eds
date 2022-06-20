<template>
  <div class="map--legend">
    <LegendItem>
      <template v-slot:title>Freezing index</template>
      <template v-slot:introduction>
        <p>
          These layers show the historical or projected freezing index across
          Alaska.
        </p>
      </template>
      <template v-slot:legend>
        <div class="has-text-weight-bold mb-2">Degree days below 32&deg;F</div>
        <table class="table freezing-index">
          <tbody>
            <tr>
              <td>
                <div class="colorbox dd0"></div>
              </td>
              <td>0</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd1000"></div>
              </td>
              <td>1000</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd2000"></div>
              </td>
              <td>2000</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd3000"></div>
              </td>
              <td>3000</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd4000"></div>
              </td>
              <td>4000</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd5000"></div>
              </td>
              <td>5000</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd6000"></div>
              </td>
              <td>6000</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox dd7000"></div>
              </td>
              <td>&ge; 7000</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:explanation>
        <p>
          The freezing index is the annual cumulative degree days (&deg;F) below
          freezing for each location. These degree days are calculated by taking
          the number of degrees below 32&deg;F for each day of the year and
          adding them together into a single value. A higher freezing index
          means a colder year for that location.
        </p>
        <p>
          Larger values indicate colder winter temperatures. A decrease in
          freezing index over time suggests warming conditions and decreased
          depth and duration of freeze in soils and water bodies.
        </p>
      </template>
      <template v-slot:footer>
        <p>
          <a
            href="http://ckan.snap.uaf.edu/dataset/historical-and-projected-dynamically-downscaled-climate-data-for-the-state-of-alaska-and-surrou"
            >Access detailed information about the dataset used to calculate the
            freezing index</a
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
.freezing-index .colorbox {
  &.dd0 {
    background-color: #fff7fb;
  }
  &.dd1000 {
    background-color: #ece7f2;
  }
  &.dd2000 {
    background-color: #d0d1e6;
  }
  &.dd3000 {
    background-color: #a6bddb;
  }
  &.dd4000 {
    background-color: #74a9cf;
  }
  &.dd5000 {
    background-color: #3690c0;
  }
  &.dd6000 {
    background-color: #0570b0;
  }
  &.dd7000 {
    background-color: #034e7b;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import LegendItem from '~/components/LegendItem'

export default {
  name: 'FreezingIndexLegend',
  components: { LegendItem },
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
