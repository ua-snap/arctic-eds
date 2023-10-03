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
    <div class="taglines">
      <div class="left">Plan better.</div>
      <div class="right">🥦 Design harder.</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.blurb {
  text-align: center;
}
.main {
  min-height: 450px;
  background: url('~/assets/images/cityscape.svg');
  background-repeat: repeat-x;
  background-size: auto 172px;
  background-position-y: bottom;

  @media (max-width: 1075px) {
    & {
      background: none;
    }
  }
}
.taglines {
  display: flex;
  flex-flow: row;
  margin-top: 4px;
  text-align: center;
  letter-spacing: 1px;
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1;
  font-family: 'Barlow', sans-serif;
  .left,
  .right {
    padding: 15px;
    width: 50%;
  }
  .left {
    background-color: #f2c716;
    color: #312e30;
  }
  .right {
    background-color: #312e30;
    color: #f2c716;
  }
  @media (max-width: 1075px) {
    & {
      display: none;
    }
  }
}
</style>
<script>
import { mapGetters } from 'vuex'
import SearchControls from '~/components/SearchControls'
import FullReport from '~/components/Report'

export default {
  name: 'HomePage',
  layout: 'home',
  components: {
    SearchControls,
    FullReport,
  },
  computed: {
    ...mapGetters({
      reportIsVisible: 'report/reportIsVisible',
    }),
  },
}
</script>
