<template>
  <span
    class="diff"
    :class="{ warmer: rawDiff > 0, zero: rawDiff == 0, cooler: rawDiff < 0 }"
    v-html="diff"
  ></span>
</template>
<style lang="scss" scoped>
.diff {
  display: block;

  &.warmer {
    color: #ad1f00;
  }
  &.cooler {
    color: blue;
  }
}
</style>
<script>
export default {
  name: 'Diff',
  props: {
    future: {
      type: Number,
      required: true,
    },
    past: {
      type: Number,
      required: true,
    }
  },
  computed: {
    rawDiff() {
      return this.future - this.past
    },
    diff() {
      // let diff
      

        let diff = (((this.future - this.past) / this.past) * 100).toFixed(0) 
      
      // } else if (this.type === 'temp') {
      //   let diff = (this.future - this.past).toFixed(1) // for trailing 0's + consistency
        if (diff > 0) {
          diff = '&plus;' + diff
        }
        diff += '%'
      // }
      return diff
    },
  },
}
</script>
