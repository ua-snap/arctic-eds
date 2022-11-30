<template>
  <a :href="downloadTarget" class="button is-info single">{{ text }}</a>
</template>
<style lang="scss" scoped>
.single {
  display: block;
  max-width: 30em;
  @media print {
    display: none;
  }
}
</style>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DownloadCsvButton',
  props: ['text', 'endpoint'],
  computed: {
    ...mapGetters({
      placeId: 'report/placeId',
      latLng: 'report/latLng',
    }),
    downloadTarget() {
      let endpointPath = this.endpoint
      let communityID = this.placeId ? '&community=' + this.placeId : ''

      let url =
        process.env.apiUrl +
        '/' +
        endpointPath +
        '/' +
        this.latLng['lat'] +
        '/' +
        this.latLng['lng'] +
        '?format=csv' +
        communityID

      return url
    },
  },
}
</script>
