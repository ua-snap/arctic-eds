<template>
  <div class="map--legend">
    <LegendItem v-show="activeLayerId == 'ak_level3_ecoregions'">
      <template v-slot:title>Alaska Ecoregions, Level III</template>
      <template v-slot:introduction>
        <p>
          Ecoregions denote areas of general similarity in ecosystems and in the
          type, quality, and quantity of environmental resources. The ecoregions
          of Alaska are a framework for organizing and interpreting
          environmental data for State, national, and international level
          inventory, monitoring, and research efforts.
        </p>
      </template>
      <template v-slot:legend>
        <table class="table ecoregions">
          <tbody>
            <tr>
              <td>
                <div class="colorbox arctic-coastal-plain"></div>
              </td>
              <td>Arctic Coastal Plain</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox arctic-foothills"></div>
              </td>
              <td>Arctic Foothills</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox seward-peninsula"></div>
              </td>
              <td>Seward Peninsula</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox aleutian-islands"></div>
              </td>
              <td>Aleutian Islands</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox brooks-range"></div>
              </td>
              <td>Brooks Range</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox interior-forest"></div>
              </td>
              <td>Interior Forested Lowlands and Uplands</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox interior-bottomlands"></div>
              </td>
              <td>Interior Bottomlands</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox yukon-flats"></div>
              </td>
              <td>Yukon Flats</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox ogilvie-mountains"></div>
              </td>
              <td>Ogilvie Mountains</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox alaska-range"></div>
              </td>
              <td>Alaska Range</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox copper-plateau"></div>
              </td>
              <td>Copper Plateau</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox wrangell-mountains"></div>
              </td>
              <td>Wrangell Mountains</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox ahklun-kilbuck-mountains"></div>
              </td>
              <td>Ahklun and Kilbuck Mountains</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox alaska-peninsula-mountains"></div>
              </td>
              <td>Alaska Peninsula Mountains</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox cook-inlet"></div>
              </td>
              <td>Cook Inlet</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox pacific-coastal-mountains"></div>
              </td>
              <td>Pacific Coastal Mountains</td>
            </tr>
            <tr>
              <td>
                <div class="colorbox coastal-western-hemlock"></div>
              </td>
              <td>Coastal Western Hemlock-Sitka Spruce Forests</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:explanation>
        The map and descriptions for 20 ecological regions were derived by
        synthesizing information on the geographic distribution of environmental
        factors such as climate, physiography, geology, permafrost, soils, and
        vegetation. A qualitative assessment was used to interpret the
        distributional patterns and relative importance of these factors from
        place to place (Gallant and others, 1995). Numeric identifiers assigned
        to the ecoregions are coordinated with those used on the map of
        &ldquo;Ecoregions of the Conterminous United States&rdquo; (Omernik
        1987, U.S. EPA 2010) as a continuation of efforts to map ecoregions for
        the United States. Additionally, the ecoregions for Alaska and the
        conterminous United States, along with ecological regions for Canada
        (Wiken 1986) and Mexico, have been combined for maps at three
        hierarchical levels for North America (Omernik 1995, Commission for
        Environmental Cooperation, 1997, 2006). A Roman numeral hierarchical
        scheme has been adopted for different levels of ecological regions.
        Level I is the coarsest level, dividing North America into 15 ecological
        regions. Level II divides the continent into 50 regions. At Level III,
        there are currently 182 ecological regions for North America. Level IV
        ecoregions have been developed for the conterminous United States, but
        Level III is the highest level available for Alaska.
      </template>
      <template v-slot:footer>
        <p>
          <a
            href="https://www.epa.gov/eco-research/ecoregion-download-files-state-region-10#pane-01"
            >Access detailed information about this dataset</a
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
.ecoregions .colorbox {
  &.arctic-coastal-plain {
    background-color: #b9981e;
  }
  &.arctic-foothills {
    background-color: #a555e6;
  }
  &.subarctic-coastal-plains {
    background-color: #fd8dfa;
  }
  &.seward-peninsula {
    background-color: #44261c;
  }
  &.bristol-bay {
    background-color: #c25ad4;
  }
  &.aleutian-islands {
    background-color: #1df0de;
  }
  &.brooks-range {
    background-color: #7ae6ec;
  }
  &.interior-forest {
    background-color: #5ed7cb;
  }
  &.interior-bottomlands {
    background-color: #4c64eb;
  }
  &.yukon-flats {
    background-color: #05cb09;
  }
  &.ogilvie-mountains {
    background-color: #0e80f8;
  }
  &.interior-highlands {
    background-color: #77df87;
  }
  &.alaska-range {
    background-color: #8c6c7d;
  }
  &.copper-plateau {
    background-color: #acfd16;
  }
  &.wrangell-mountains {
    background-color: #83b3cb;
  }
  &.ahklun-kilbuck-mountains {
    background-color: #09f9ae;
  }
  &.alaska-peninsula-mountains {
    background-color: #83b3ef;
  }
  &.cook-inlet {
    background-color: #37ea3f;
  }
  &.pacific-coastal-mountains {
    background-color: #cee34b;
  }
  &.coastal-western-hemlock {
    background-color: #4830d1;
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
