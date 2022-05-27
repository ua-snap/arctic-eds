<template>
  <a :href="downloadTarget" class="button is-info single">{{ text }}</a>
</template>
<style lang="scss" scoped>
  .single {
    display: block;
    max-width: 30em;
  }
</style>
<script>
import { mapGetters } from "vuex";

export default {
  name: 'DownloadCsvButton',
  props: ['text', 'endpoint'],
  computed: {
    ...mapGetters({
			latLng: "map/latLng"
		}),
    downloadTarget() {
      let endpointPath = this.endpoint

      let url =
        process.env.apiUrl +
        '/' +
        endpointPath +
        '/' +
        this.latLng['lat'] +
        '/' +
        this.latLng['lng'] +
        '?format=csv'

      return url
    },
  },
}
</script>
