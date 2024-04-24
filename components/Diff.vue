<template>
  <span class="diff" v-html="diff"></span>
</template>
<style lang="scss" scoped>
.diff {
  display: block;
  font-weight: 500;
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
    },
    kind: {
      type: String,
      required: true,
    },
    precision: {
      type: Number,
      required: false,
    },
  },
  computed: {
    rawDiff() {
      return this.future - this.past
    },
    diff() {
      let diff
      if (this.kind == 'abs') {
        let precision
        if (typeof this.precision === undefined) {
          precision = 2
        } else {
          precision = this.precision
        }
        // Special case where we override precision = 1
        // because the delta is for mm/precip > 100
        if (this.future - this.past > 100 && precision == 1) {
          precision = 2
        }
        diff = Number(Number(this.future - this.past).toPrecision(precision))
        if (diff > 0) {
          diff = '&plus;' + diff
        }
      } else {
        diff = (((this.future - this.past) / this.past) * 100).toFixed(0)
        if (diff > 0) {
          diff = '&plus;' + diff
        }
        diff += '%'
      }

      return diff
    },
  },
}
</script>
