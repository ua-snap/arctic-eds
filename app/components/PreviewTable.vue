<template>
  <table class="table is-bordered is-narrow is-size-7">
    <thead>
      <tr>
        <th scope="col" v-for="col in csvHeader" class="has-text-weight-bold">
          {{ col }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in csvHead">
        <td v-for="value in row">{{ value }}</td>
      </tr>
      <tr>
        <td
          :colspan="csvHeader.length"
          class="has-text-centered has-text-weight-bold is-size-6"
        >
          &#8942;
        </td>
      </tr>
      <tr v-for="row in csvTail">
        <td v-for="value in row">{{ value }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td :colspan="csvHeader.length" class="has-text-grey">
          {{ sizeBlurb }}
        </td>
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
