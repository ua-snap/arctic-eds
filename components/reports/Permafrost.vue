<template>
  <div v-if="Object.keys(results.permafrost).length != 0">
    <table class="preview">
      <thead>
        <tr>
          <th scope="col" v-for="column in csvHeader">{{ column }}</th>
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
  data() {
    return {
      csvHeader: [
        'year',
        'model',
        'scenario',
        'magt0.5m',
        'magt1m',
        'magt2m',
        'magt3m',
        'magt4m',
        'magt5m',
        'magtsurface',
        'permafrostbase',
        'permafrosttop',
        'talikthickness',
      ],
    }
  },
  computed: {
    csvHead() {
      let csvPreview = []
      let csvSubset = this.results.permafrost['GFDL-CM3']
      for (const key in csvSubset) {
        csvPreview.push([
          key,
          'GFDL-CM3',
          'RCP 4.5',
          csvSubset[key]['RCP 4.5']['magt0.5m'],
          csvSubset[key]['RCP 4.5']['magt1m'],
          csvSubset[key]['RCP 4.5']['magt2m'],
          csvSubset[key]['RCP 4.5']['magt3m'],
          csvSubset[key]['RCP 4.5']['magt4m'],
          csvSubset[key]['RCP 4.5']['magt5m'],
          csvSubset[key]['RCP 4.5']['magtsurface'],
          csvSubset[key]['RCP 4.5']['permafrostbase'],
          csvSubset[key]['RCP 4.5']['permafrosttop'],
          csvSubset[key]['RCP 4.5']['talikthickness'],
        ])
      }
      let cvh = csvPreview.slice(0, 5)
      console.log(cvh)
      return cvh
    },
    csvTail() {
      let csvPreview = []
      let csvSubset = this.results.permafrost['NCAR-CCSM4']
      for (const key in csvSubset) {
        csvPreview.push([
          key,
          'NCAR-CCSM4',
          'RCP 8.5',
          csvSubset[key]['RCP 8.5']['magt0.5m'],
          csvSubset[key]['RCP 8.5']['magt1m'],
          csvSubset[key]['RCP 8.5']['magt2m'],
          csvSubset[key]['RCP 8.5']['magt3m'],
          csvSubset[key]['RCP 8.5']['magt4m'],
          csvSubset[key]['RCP 8.5']['magt5m'],
          csvSubset[key]['RCP 8.5']['magtsurface'],
          csvSubset[key]['RCP 8.5']['permafrostbase'],
          csvSubset[key]['RCP 8.5']['permafrosttop'],
          csvSubset[key]['RCP 8.5']['talikthickness'],
        ])
      }
      let cvh = csvPreview.slice(5, 10)
      console.log(cvh)
      return cvh
    },
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
      isPlaceDefined: 'report/isPlaceDefined',
    }),
  }
}
</script>

<style lang="scss" scoped></style>
