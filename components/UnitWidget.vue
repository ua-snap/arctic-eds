<template>
  <span class="units">
    <span v-html="symbol.space"></span
    ><span class="light" v-html="symbol.symbol"></span>
  </span>
</template>
<style lang="scss" scoped>
.light {
  color: #888;
  @media print {
    color: #666;
  }
}
</style>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UnitWidget',
  props: {
    // Can be...
    // temp = ºF / ºC
    // mm_in (millimeters/inches)
    // m_in (meters/inches)
    // dd (degree days, ºF•days / ºC•days)
    unitType: {
      type: String,
      default: 'temp',
    },
  },
  computed: {
    symbol() {
      let symbol = ''
      let space = '' // for units that start with a symbol (º), no space

      switch (this.unitType) {
        case 'temp':
          symbol = this.units == 'metric' ? '&deg;C' : '&deg;F'
          break
        case 'mm_in':
          symbol = this.units == 'metric' ? '&#x339C;' : 'in'
          space = '&#8239;'
          break
        case 'm_in':
          symbol = this.units == 'metric' ? 'm' : 'in'
          space = '&#8239;'
          break
        case 'dd':
          symbol =
            this.units == 'metric' ? '&deg;C&sdot;days' : '&deg;F&sdot;days'
          break
      }
      return {
        symbol: symbol,
        space: space,
      }
    },
    ...mapGetters({
      units: 'report/units',
    }),
  },
}
</script>
