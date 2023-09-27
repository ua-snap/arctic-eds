<template>
  <div v-if="isDataLoaded">
    <h2 id="permafrost" class="title is-2">Permafrost</h2>
    <div class="content is-size-5">
      <p>
        Annual projections of permafrost top and base depths, talik thickness,
        and mean annual ground temperature at seven different depths are
        provided by the GIPL 2.0 model at a resolution of 1km for years
        2021&ndash;2120. These projections are provided for GFDL CM3 and NCAR
        CCSM4 model outputs, as well as a 5-model average, under the RCP 4.5 and
        RCP 8.5 emissions scenarios.
      </p>
    </div>
    <h4 class="title is-5 mb-1">Data preview</h4>
    <p class="content is-size-5 mb-1">
      CSV download includes annual values for the modeled projected
      (2021&ndash;2100) dataset.
    </p>
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
    </table>

    <DownloadCsvButton
      text="Download permafrost data as CSV"
      endpoint="permafrost/point"
      class="mt-3 mb-5"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DownloadCsvButton from '~/components/DownloadCsvButton'
import UnitWidget from '~/components/UnitWidget'

export default {
  name: 'PermafrostReport',
  components: {
    DownloadCsvButton,
    UnitWidget,
  },
  computed: {
    isDataLoaded() {
      console.log(this.results.permafrost)
      return this.results.permafrost != undefined
    },
    csvParsed() {
      if (this.isDataLoaded) {
        let csvString = this.results.permafrost.preview
        if (csvString) {
          let csvSplit = csvString.split('\r\n')
          csvSplit = csvSplit.map(row => {
            return row.split(',')
          })
          console.log(csvSplit)
          return csvSplit
        }
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
        return this.csvParsed.slice(6)
      }
    },
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
      isPlaceDefined: 'report/isPlaceDefined',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
