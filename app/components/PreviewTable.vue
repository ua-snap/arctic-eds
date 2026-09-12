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

<script>
export default {
  name: 'PreviewTable',
  props: ['csvString', 'sizeBlurb'],
  computed: {
    csvParsed() {
      if (this.csvString) {
        let csvSplit = this.csvString.split('\r\n')
        csvSplit = csvSplit.map(row => {
          return row.split(',')
        })
        return csvSplit
      } else {
        return []
      }
    },
    csvHeader() {
      if (this.csvParsed) {
        return this.csvParsed[0]
      }
    },
    csvHead() {
      if (this.csvParsed) {
        return this.csvParsed.slice(1, 6)
      }
    },
    csvTail() {
      if (this.csvParsed) {
        return this.csvParsed.slice(6, 11)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
