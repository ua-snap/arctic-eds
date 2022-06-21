<template>
  <div class="map--legend" v-if="activeLayerId">
    <LegendItem>
      <template v-slot:title>
        <p v-show="activeLayerId.includes('_annual_mean_')">
          Annual mean temperature
        </p>
        <p v-show="activeLayerId.includes('_january_min')">
          January minimum temperature
        </p>
        <p v-show="activeLayerId.includes('_july_min')">
          July minimum temperature
        </p>
        <p v-show="activeLayerId.includes('_january_max')">
          January maximum temperature
        </p>
        <p v-show="activeLayerId.includes('_july_max')">
          July maximum temperature
        </p>
      </template>
      <template v-slot:introduction>
        <p>
          These layers show mean, minimum, or maximum temperatures for the year
          or selected month. Historical values are for 1980&ndash;2009 while
          projected values are for 2040&ndash;2069.
        </p>
      </template>
      <template v-slot:legend>
        <table class="table temperature">
          <tbody>
            <tr>
              <td>
                <div class="colorbox tas-22"></div>
              </td>
              <td>&le; &minus;22&deg;F</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas5"></div>
              </td>
              <td>5&deg;F</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas23"></div>
              </td>
              <td>23&deg;F</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas32"></div>
              </td>
              <td>32&deg;F</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas41"></div>
              </td>
              <td>41&deg;F</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas59"></div>
              </td>
              <td>59&deg;F</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas86"></div>
              </td>
              <td>&ge; 86&deg;F</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:explanation>
        <TemperatureExplanation :legend="true" />
      </template>
      <template v-slot:footer
        ><p>
          Access detailed information about this dataset, including source data
          downloads:
        </p>
        <ul>
          <li>
            <a
              href="http://ckan.snap.uaf.edu/dataset/historical-monthly-and-derived-temperature-products-downscaled-from-cru-ts-data-via-the-delta-m"
              >Historical Monthly and Derived Temperature Products</a
            >
          </li>
          <li>
            <a
              href="http://ckan.snap.uaf.edu/dataset/projected-monthly-and-derived-temperature-products-2km-cmip5-ar5"
              >Projected Monthly and Derived Temperature Products</a
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
.temperature .colorbox {
  &.tas-22 {
    background-color: #2166ac;
  }
  &.tas5 {
    background-color: #67a9cf;
  }
  &.tas23 {
    background-color: #d1e5f0;
  }
  &.tas32 {
    background-color: #f7f7f7;
    border: 1px solid #ddd;
  }
  &.tas41 {
    background-color: #fddbc7;
  }
  &.tas59 {
    background-color: #ef8a62;
  }
  &.tas86 {
    background-color: #b2182b;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import LegendItem from '~/components/LegendItem'
import TemperatureExplanation from '~/components/plates/temperature/Explanation'

export default {
  name: 'TemperatureLegend',
  components: { LegendItem, TemperatureExplanation },
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
