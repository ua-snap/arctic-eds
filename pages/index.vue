<template>
  <div>
    <div class="main">
      <div v-if="!reportIsVisible">
        <p class="content mt-6 mb-6 is-size-4 blurb">
          Use Arctic-EDS to query historical, current and projected
          environmental data for engineering applications.<br />Download data or
          use our computational notebooks for analysis.
        </p>
        <SearchControls />
      </div>
      <div v-if="reportIsVisible">
        <FullReport />
      </div>
    </div>
    <div class="taglines columns">
      <div class="column left">Plan better.</div>
      <div class="column right">Design harder.</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.blurb {
  text-align: center;
}
.main {
  min-height: 35rem;
  padding-bottom: 0;
  margin-bottom: 0;
  background: url('~/assets/images/cityscape.svg');
  background-repeat: repeat-x;
  background-size: auto 19rem;
  background-position-y: bottom 0px;
  background-origin: border-box;
}
.taglines {
  position: relative;
  top: -1rem;
  text-align: center;
  letter-spacing: 1px;
  font-size: 2.5rem;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1;
  font-family: 'Barlow', sans-serif;
  .left {
    background-color: #f2c716;
    color: #312e30;
  }
  .right {
    background-color: #312e30;
    color: #f2c716;
  }
}
</style>
<script>
import { mapGetters } from 'vuex'
import MapModal from '~/components/MapModal'
import TemperatureMap from '~/components/TemperatureMap'
import TemperatureIndicesMap from '~/components/TemperatureIndicesMap'
import SearchControls from '~/components/SearchControls'
import FullReport from '~/components/Report'

export default {
  name: 'HomePage',
  layout: 'home',
  components: {
    MapModal,
    TemperatureMap,
    TemperatureIndicesMap,
    SearchControls,
    FullReport,
  },
  computed: {
    ...mapGetters({
      selectedMap: 'map/selectedMap',
      reportIsVisible: 'report/reportIsVisible',
    }),
  },
  created() {
    const path = (/#!(\/.*)$/.exec(this.$route.fullPath) || [])[1]
    if (path) {
      this.$router.push({ path: path })
    }
  },
  methods: {
    showMap(event, mapId) {
      this.$router.push({
        hash: mapId,
      })
    },
  },
}
</script>
