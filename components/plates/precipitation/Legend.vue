<template>
  <div class="map--legend">
    <LegendItem>
      <template v-slot:title>Precipitation</template>
      <template v-slot:introduction>
        <p>
          This layer shows the cumulative annual precipitation across Alaska.
        </p>
      </template>
      <template v-slot:legend>
        <table class="table precipitation">
          <tbody>
            <tr>
              <td>
                <div class="colorbox pr0"></div>
              </td>
              <td>0mm &ndash; 1mm</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox pr1"></div>
              </td>
              <td>1mm &ndash; 10mm</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox pr10"></div>
              </td>
              <td>10mm &ndash; 25mm</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox pr25"></div>
              </td>
              <td>25mm &ndash; 50mm</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox pr50"></div>
              </td>
              <td>50mm &ndash; 100mm</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox pr100"></div>
              </td>
              <td>100mm &ndash; 200mm</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox pr200"></div>
              </td>
              <td>200mm &ndash; 400mm</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox pr400"></div>
              </td>
              <td>&gt; 400mm</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:explanation>
        <p><i>Placeholder for precipitation legend text</i></p>
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
    /* Color map has half opacity at 0 */
    background-color: #8c510a80;
  }
  &.pr1 {
    background-color: #8c510a;
  }
  &.pr5 {
    background-color: #d8b365;
  }
  &.pr10 {
    background-color: #f6e8c3;
  }
  &.pr25 {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
  }
  &.pr50 {
    background-color: #c7eae5;
  }
  &.pr100 {
    background-color: #5ab4ac;
  }
  &.pr200 {
    background-color: #01665e;
  }
  &.pr400 {
    background-color: #01665e;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import LegendItem from '~/components/LegendItem'

export default {
  name: 'PrecipitationLegend',
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
