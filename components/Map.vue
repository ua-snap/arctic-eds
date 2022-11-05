<template>
  <div id="map"></div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'Map',
  computed: {
    ...mapGetters({
      selectedMap: 'map/selectedMap',
    }),
  },
  mounted() {
    this.$store.commit('map/create')
  },
  destroyed() {
    this.$store.commit('map/destroy')
    this.$store.commit('report/destroy')
  },
}
</script>
