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
import { mapState } from 'pinia'

export default {
  name: 'DownloadCsvButton',
  props: ['text', 'endpoint'],
  computed: {
    safeMode() {
      return this.$config.public.safeMode
    },
    ...mapState(useReportStore, {
      placeId: 'placeId',
      latLng: 'latLng',
    }),
    downloadTarget() {
      let endpointPath = this.endpoint
      let communityID = this.placeId ? '&community=' + this.placeId : ''

      let url =
        this.$config.public.apiUrl +
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
