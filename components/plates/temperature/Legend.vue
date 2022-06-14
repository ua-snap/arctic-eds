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
	        <p v-show="activeLayerId.includes('_annual_mean_temp')">
	          This layer shows the annual mean temperature across Alaska.
	        </p>
					<p v-show="activeLayerId.includes('_january_min')">
	          This layer shows the minimum January temperature across Alaska.
	        </p>
					<p v-show="activeLayerId.includes('_july_min')">
	          This layer shows the minimum July temperature across Alaska.
	        </p>
					<p v-show="activeLayerId.includes('_january_max')">
	          This layer shows the maximum January temperature across Alaska.
	        </p>
					<p v-show="activeLayerId.includes('_july_max')">
	          This layer shows the maximum July temperature across Alaska.
	        </p>
	      </template>
	      <template v-slot:legend>
	        <table class="table temperature">
	          <tbody>
	            <tr>
	              <td>
	                <div class="colorbox tas-30"></div>
	              </td>
	              <td>&lt; &minus;30&deg;C</td>
	            </tr>
	            <tr>
	              <td>
	                <div class="colorbox tas-15"></div>
	              </td>
	              <td>&minus;30&deg;C &ndash; &minus;15&deg;C</td>
	            </tr>
	            <tr>
	              <td>
	                <div class="colorbox tas-5"></div>
	              </td>
	              <td>&minus;15&deg;C &ndash; &minus;5&deg;C</td>
	            </tr>
	            <tr>
	              <td>
	                <div class="colorbox tas0"></div>
	              </td>
	              <td>&minus;5&deg;C &ndash; 0&deg;C</td>
	            </tr>
	            <tr>
	              <td>
	                <div class="colorbox tas5"></div>
	              </td>
	              <td>0&deg;C &ndash; 5&deg;C</td>
	            </tr>
	            <tr>
	              <td>
	                <div class="colorbox tas15"></div>
	              </td>
	              <td>5&deg;C &ndash; 15&deg;C</td>
	            </tr>
	            <tr>
	              <td>
	                <div class="colorbox tas30"></div>
	              </td>
	              <td>15&deg;C &ndash; 30&deg;C</td>
	            </tr>
							<tr>
	              <td>
	                <div class="colorbox tas30"></div>
	              </td>
	              <td>&gt; 30&deg;C</td>
	            </tr>
	          </tbody>
	        </table>
	      </template>
	      <template v-slot:explanation>
	        <p><i>Placeholder for temperature legend text</i></p>
	      </template>
	      <template v-slot:footer
	        ><p>
	          Access detailed information about this dataset, including source data downloads:
	          <ul>
	            <li><a href="http://ckan.snap.uaf.edu/dataset/historical-monthly-and-derived-temperature-products-downscaled-from-cru-ts-data-via-the-delta-m">Historical Monthly and Derived Temperature Products</a></li>
	            <li><a href="http://ckan.snap.uaf.edu/dataset/projected-monthly-and-derived-temperature-products-2km-cmip5-ar5">Projected Monthly and Derived Temperature Products</a></li>
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
.temperature .colorbox {
  &.tas-30 {
    background-color: #2166AC;
  }
  &.tas-15 {
    background-color: #67A9CF;
  }
  &.tas-5 {
    background-color: #D1E5F0;
  }
  &.tas0 {
    background-color: #F7F7F7;
		border: 1px solid #ddd;
  }
  &.tas5 {
    background-color: #FDDBC7;
  }
  &.tas15 {
    background-color: #EF8A62;
  }
  &.tas30 {
    background-color: #B2182B;
  }
}
</style>

<script>
import { mapGetters } from "vuex";
import LegendItem from "~/components/LegendItem";

export default {
  name: "TemperatureLegend",
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
