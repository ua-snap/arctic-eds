<template>
  <div class="map--legend">
    <LegendItem v-show="activeLayerId == 'pfextent_jorgenson'">
      <template v-slot:title
        >Permafrost extent (Jorgenson et al., 2008)</template
      >
      <template v-slot:introduction>
        <p>
          This layer shows the extent of permafrost across Alaska, classified
          into four categories.
        </p>
      </template>
      <template v-slot:legend>
        <table class="table pfextent">
          <tbody>
            <tr>
              <td>
                <div class="colorbox continuous"></div>
              </td>
              <td>Continuous (&gt; 90%)</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox discontinuous"></div>
              </td>
              <td>Discontinuous (50 &ndash; 90%)</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox isolated"></div>
              </td>
              <td>Isolated (10 &ndash; 50%)</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox sporadic"></div>
              </td>
              <td>Sporadic (&lt; 10%)</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:explanation>
        <strong>Continuous</strong> permafrost indicates continuous presence of
        permafrost throughout the region, and
        <strong>discontinuous</strong> regions have a significant but not
        continuous permafrost layer. <strong>Isolated</strong> regions are
        characterized by occasional, significant permafrost areas, whereas
        <strong>sporadic</strong> regions are mostly free of permafrost.
      </template>
      <template v-slot:footer>
        <p>
          <a href="https://catalog.northslopescience.org/dataset/1725"
            >Access detailed information about this dataset</a
          >, including source data downloads.
        </p>
      </template>
    </LegendItem>
    <LegendItem v-show="activeLayerId == 'pfextent_obu'">
      <template v-slot:title>Permafrost extent (Obu et al., 2018)</template>
      <template v-slot:introduction>
        <p>
          This layer shows the extent of permafrost across Alaska, classified
          into four categories.
        </p>
      </template>
      <template v-slot:legend>
        <table class="table pfextent">
          <tbody>
            <tr>
              <td>
                <div class="colorbox continuous"></div>
              </td>
              <td>Continuous (&gt; 90%)</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox discontinuous"></div>
              </td>
              <td>Discontinuous (50 &ndash; 90%)</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox isolated"></div>
              </td>
              <td>Isolated (10 &ndash; 50%)</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox sporadic"></div>
              </td>
              <td>Sporadic (&lt; 10%)</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:explanation>
        <strong>Continuous</strong> permafrost indicates continuous presence of
        permafrost throughout the region, and
        <strong>discontinuous</strong> regions have a significant but not
        continuous permafrost layer. <strong>Isolated</strong> regions are
        characterized by occasional, significant permafrost areas, whereas
        <strong>sporadic</strong> regions are mostly free of permafrost.
      </template>
      <template v-slot:footer>
        <p>
          <a href="https://doi.org/10.1594/PANGAEA.888600"
            >Access detailed information about this dataset</a
          >, including source data downloads.
        </p>
      </template>
    </LegendItem>
    <LegendItem v-show="activeLayerId == 'iem_gipl_magt_alt_4km_2036_2065'">
      <template v-slot:title
        >Ground temperature, 2036&ndash;2065, (GIPL model)</template
      >
      <template v-slot:introduction>
        <p>
          This layer shows model output from the Geophysical Institute
          Permafrost Lab model (GIPL), a landscape&ndash;scale permafrost model.
          This layer shows modeled mean annual ground temperature for
          2036&ndash;2065, with the NCAR&ndash;CCSM4 climate model and RCP 8.5
          emissions scenario.
        </p>
      </template>
      <template v-slot:legend>
        <table class="table temps">
          <tbody>
            <tr>
              <td>
                <div class="colorbox tas-20"></div>
              </td>
              <td>&minus;20&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas-6"></div>
              </td>
              <td>&minus;6&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas-4"></div>
              </td>
              <td>&minus;4&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas-2"></div>
              </td>
              <td>&minus;2&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas-1"></div>
              </td>
              <td>&minus;1&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas0"></div>
              </td>
              <td>0&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas1"></div>
              </td>
              <td>1&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas2"></div>
              </td>
              <td>2&deg;C</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:explanation></template>
      <template v-slot:footer>
        <p>
          <a
            href="http://ckan.snap.uaf.edu/dataset/gipl-model-outputs-linear-coupled-annual"
            >Access detailed information about this dataset</a
          >, including source data downloads.
        </p>
      </template>
    </LegendItem>
    <LegendItem v-show="activeLayerId == 'iem_gipl_magt_alt_4km_historical'">
      <template v-slot:title
        >Ground temperature, 1986&ndash;2005, (GIPL model)</template
      >
      <template v-slot:introduction>
        <p>
          This layer shows model output from the Geophysical Institute
          Permafrost Lab model (GIPL), a landscape&ndash;scale permafrost model.
          This layer shows modeled mean annual ground temperature for
          1986&ndash;2005, with the CRU&ndash;TS historical baseline.
        </p>
      </template>
      <template v-slot:legend>
        <table class="table temps">
          <tbody>
            <tr>
              <td>
                <div class="colorbox tas-20"></div>
              </td>
              <td>&minus;20&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas-6"></div>
              </td>
              <td>&minus;6&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas-4"></div>
              </td>
              <td>&minus;4&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas-2"></div>
              </td>
              <td>&minus;2&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas-1"></div>
              </td>
              <td>&minus;1&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas0"></div>
              </td>
              <td>0&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas1"></div>
              </td>
              <td>1&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas2"></div>
              </td>
              <td>2&deg;C</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:explanation></template>
      <template v-slot:footer>
        <p>
          <a
            href="http://ckan.snap.uaf.edu/dataset/gipl-model-outputs-linear-coupled-annual"
            >Access detailed information about this dataset</a
          >, including source data downloads.
        </p>
      </template>
    </LegendItem>
    <LegendItem v-show="activeLayerId == 'iem_gipl_ALT_4km_historical'">
      <template v-slot:title
        >Active layer thickness, 1986&ndash;2005 (GIPL model)</template
      >
      <template v-slot:introduction
        ><p>
          This layer shows model outputs from the Geophysical Institute
          Permafrost Lab model (GIPL), a landscape scale permafrost model.
          Active layer thickness is defined as the depth of summer seasonal thaw
          in perennially frozen ground. This layer shows model output for for
          1986&ndash;2005, with the CRU&ndash;TS historical baseline.
        </p></template
      >
      <template v-slot:legend>
        <table class="table thickness">
          <tbody>
            <tr>
              <td>
                <div class="colorbox none"></div>
              </td>
              <td>No active layer</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox d0"></div>
              </td>
              <td>0m</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox d05"></div>
              </td>
              <td>0.5m</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox d1"></div>
              </td>
              <td>1m</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox d15"></div>
              </td>
              <td>1.5m</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox d2"></div>
              </td>
              <td>2m</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox d25"></div>
              </td>
              <td>2.5m</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:explanation> </template>
      <template v-slot:footer
        ><p>
          <a
            href="http://ckan.snap.uaf.edu/dataset/gipl-model-outputs-linear-coupled-annual"
            >Access detailed information about this dataset</a
          >, including source data downloads.
        </p></template
      >
    </LegendItem>
    <LegendItem v-show="activeLayerId == 'iem_gipl_ALT_4km_2036_2065'">
      <template v-slot:title
        >Active layer thickness, 2036&ndash;2065 (GIPL model)</template
      >
      <template v-slot:introduction
        ><p>
          This layer shows model outputs from the Geophysical Institute
          Permafrost Lab model (GIPL), a landscape scale permafrost model.
          Active layer thickness is defined as the depth of summer seasonal thaw
          in perennially frozen ground. This layer shows model output for
          2036&ndash;2065, with the NCAR&ndash;CCSM4 climate model and RCP 8.5
          emissions scenario.
        </p></template
      >
      <template v-slot:legend
        ><table class="table thickness">
          <tbody>
            <tr>
              <td>
                <div class="colorbox none"></div>
              </td>
              <td>No active layer</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox d0"></div>
              </td>
              <td>0m</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox d05"></div>
              </td>
              <td>0.5m</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox d1"></div>
              </td>
              <td>1m</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox d15"></div>
              </td>
              <td>1.5m</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox d2"></div>
              </td>
              <td>2m</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox d25"></div>
              </td>
              <td>2.5m</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:explanation> </template>
      <template v-slot:footer
        ><p>
          <a
            href="http://ckan.snap.uaf.edu/dataset/gipl-model-outputs-linear-coupled-annual"
            >Access detailed information about this dataset</a
          >, including source data downloads.
        </p></template
      >
    </LegendItem>
    <LegendItem v-show="activeLayerId == 'obumagt'">
      <template v-slot:title
        >Mean annual ground temperature at top of permafrost, 2000&ndash;2016
        (modeled)</template
      >
      <template v-slot:introduction
        >This layer provides modeled mean annual ground temperatures (MAGT) at
        the top of the permafrost, at 1 km spatial resolution.</template
      >
      <template v-slot:legend>
        <table class="table obutemps">
          <tbody>
            <tr>
              <td>
                <div class="colorbox tas-10"></div>
              </td>
              <td>&minus;10&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas-5"></div>
              </td>
              <td>&minus;5&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas-1"></div>
              </td>
              <td>&minus;1&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas1"></div>
              </td>
              <td>1&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas3"></div>
              </td>
              <td>3&deg;C</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox tas5"></div>
              </td>
              <td>5&deg;C</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:explanation> </template>
      <template v-slot:footer>
        <p>
          <a href="https://doi.org/10.1594/PANGAEA.888600"
            >Access detailed information about this dataset</a
          >, including source data access.
        </p>
      </template>
    </LegendItem>
    <LegendItem
      v-show="activeLayerId == 'icevol_jorgenson'"
      class="map--legend-item"
    >
      <template v-slot:title
        >Ground ice volume (Jorgenson et al., 2008)</template
      >
      <template v-slot:introduction
        >This data set shows the ground ice volume.</template
      >
      <template v-slot:legend
        ><table class="table volume">
          <tbody>
            <tr>
              <td>
                <div class="colorbox unfrozen"></div>
              </td>
              <td>Unfrozen</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox low"></div>
              </td>
              <td>Low</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox moderate"></div>
              </td>
              <td>Moderate</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox high"></div>
              </td>
              <td>High</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox glacier"></div>
              </td>
              <td>Glacier</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox variable"></div>
              </td>
              <td>Variable</td>
            </tr>
          </tbody>
        </table></template
      >
      <template v-slot:explanation></template>
      <template v-slot:footer
        ><p>
          <a href="https://catalog.northslopescience.org/dataset/1725"
            >Access detailed information about this dataset</a
          >, including source data downloads.
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
.pfextent .colorbox {
  &.continuous {
    background-color: #eafdfd;
    border: 1px solid #98a09c;
  }
  &.discontinuous {
    background-color: #79bed0;
  }
  &.sporadic {
    background-color: #427ab7;
  }
  &.isolated {
    background-color: #383873;
  }
}
.temps .colorbox {
  &.tas-20 {
    background-color: rgb(33, 102, 172);
  }
  &.tas-6 {
    background-color: rgb(67, 147, 195);
  }
  &.tas-4 {
    background-color: rgb(146, 197, 222);
  }
  &.tas-2 {
    background-color: rgb(209, 229, 240);
  }
  &.tas-1 {
    background-color: rgb(247, 247, 247);
  }
  &.tas0 {
    background-color: rgb(253, 219, 199);
  }
  &.tas1 {
    background-color: rgb(244, 165, 130);
  }
  &.tas2 {
    background-color: rgb(214, 96, 77);
  }
}

.thickness .colorbox {
  &.none {
    background-color: #aaaaaa;
  }
  &.d0 {
    background-color: #fdfecc;
  }
  &.d05 {
    background-color: #92d8a4;
  }
  &.d1 {
    background-color: #52a9a3;
  }
  &.d15 {
    background-color: #417799;
  }
  &.d2 {
    background-color: #424380;
  }
  &.d25 {
    background-color: #2b1d32;
  }
}
.obutemps .colorbox {
  &.tas-10 {
    background-color: #08306b;
  }
  &.tas-5 {
    background-color: #3787c0;
  }
  &.tas-1 {
    background-color: #94c4df;
  }
  &.tas1 {
    background-color: #f14432;
  }
  &.tas3 {
    background-color: #bc141a;
  }
  &.tas5 {
    background-color: #67000d;
  }
}
.volume .colorbox {
  &.unfrozen {
    background-color: #7fc97f;
  }
  &.low {
    background-color: #2171b5;
  }
  &.moderate {
    background-color: #6baed6;
  }
  &.high {
    background-color: #bdd7e7;
  }
  &.glacier {
    background-color: #ffffff;
    border: 1px solid #98a09c;
  }
  &.variable {
    background-color: #beaed4;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import LegendItem from '~/components/LegendItem'

export default {
  name: 'PermafrostLegend',
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
