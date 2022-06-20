<template>
  <div class="map--legend">
    <LegendItem>
      <template v-slot:title>Precipitation</template>
      <template v-slot:introduction>
        <p>
          These layers show historical or projected cumulative annual
          precipitation across Alaska. Solid precipitation (ice and snow) are
          measured as water equivalent here.
        </p>
      </template>
      <template v-slot:legend>
        <table class="table precipitation">
          <tbody>
            <tr>
              <td>
                <div class="colorbox pr0"></div>
              </td>
              <td>0in</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox pr10"></div>
              </td>
              <td>10in</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox pr20"></div>
              </td>
              <td>20in</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox pr50"></div>
              </td>
              <td>50in</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox pr100"></div>
              </td>
              <td>100in</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox pr200"></div>
              </td>
              <td>200in</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox pr400"></div>
              </td>
              <td>&ge; 400in</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:explanation
        ><PrecipitationExplanation :legend="true" />
      </template>
      <template v-slot:footer
        ><p>
          Access detailed information about this dataset, including source data
          downloads:
        </p>
        <ul>
          <li>
            <a
              href="http://ckan.snap.uaf.edu/dataset/historical-monthly-and-derived-precipitation-products-downscaled-from-cru-ts-data-via-the-delta"
              >Historical Monthly and Derived Precipitation Products</a
            >
          </li>
          <li>
            <a
              href="http://ckan.snap.uaf.edu/dataset/projected-monthly-and-derived-precipitation-products-2km-cmip5-ar5"
              >Projected Monthly and Derived Precipitation Products</a
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
.precipitation .colorbox {
  &.pr0 {
    background-color: #8c510a;
  }
  &.pr10 {
    background-color: #d8b365;
  }
  &.pr20 {
    background-color: #f6e8c3;
  }
  &.pr50 {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
  }
  &.pr100 {
    background-color: #c7eae5;
  }
  &.pr200 {
    background-color: #5ab4ac;
  }
  &.pr400 {
    background-color: #01665e;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import LegendItem from '~/components/LegendItem'
import PrecipitationExplanation from '~/components/plates/precipitation/Explanation'

export default {
  name: 'PrecipitationLegend',
  components: { LegendItem, PrecipitationExplanation },
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
