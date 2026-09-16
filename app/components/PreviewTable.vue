<template>
  <table class="preview">
    <thead>
      <tr>
        <th scope="col" v-for="col in csvHeader">{{ col }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in csvHead">
        <td v-for="value in row">{{ value }}</td>
      </tr>
      <tr>
        <td :colspan="csvHeader.length" class="vellip">&#8942;</td>
      </tr>
      <tr v-for="row in csvTail">
        <td v-for="value in row">{{ value }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td :colspan="csvHeader.length">{{ sizeBlurb }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  csvString: String,
  sizeBlurb: String,
})

const csvParsed = computed(() => {
  if (props.csvString) {
    let csvSplit = props.csvString.split('\r\n')
    csvSplit = csvSplit.map(row => {
      return row.split(',')
    })
    return csvSplit
  } else {
    return []
  }
})

const csvHeader = computed(() => csvParsed.value[0])
const csvHead = computed(() => csvParsed.value.slice(1, 6))
const csvTail = computed(() => csvParsed.value.slice(6, 11))
</script>

<style lang="scss" scoped></style>
