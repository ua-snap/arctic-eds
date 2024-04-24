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
  },
  computed: {
    rawDiff() {
      return this.future - this.past
    },
    diff() {
      let diff
      if (this.kind == 'abs') {
        diff = this.future - this.past
        if(diff > 0) {
          diff = '&plus;' + diff
        }
        console.log(diff)
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
