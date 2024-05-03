<template>
  <a :href="downloadTarget" class="no-print">{{
    text
  }}</a>
</template>
<style lang="scss" scoped>
.single {
  display: block;
  max-width: 30em;
}
</style>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DownloadCsvButton',
  props: ['text', 'endpoint'],
  computed: {
    safeMode() {
      return process.env.safeMode
    },
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
