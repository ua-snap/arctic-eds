<template>
  <section class="section">

        <div class="block">
          <h3 class="is-size-4">Precipitation</h3>
          <MapBlock mapName="precipitation" />
        </div>

        <div class="block">
          <h3 class="is-size-4">Permafrost</h3>
          <MapBlock mapName="permafrost" />
        </div>

        <div class="block">
          <h3 class="is-size-4">Temperature</h3>
          <MapBlock mapName="temperature" />
        </div>

        <div class="block">
          <h3 class="is-size-4">Temperature Indices</h3>
          <MapBlock mapName="temperature_indices" />
        </div>
        
  </section>
</template>

<style lang="scss" scoped>
p:last-of-type {
  margin-bottom: 2.5rem;
}
img {
  display: block;
  margin: 1rem auto;
  width: 30rem;
}
</style>

<script>
import MapBlock from '~/components/MapBlock'
import { mapGetters } from 'vuex'

export default {
  layout: 'content',
  computed: {
    ...mapGetters({
      selectedMap: 'map/selectedMap',
    }),
  },
  methods: {
    showMap(event, mapId) {
      this.$router.push({
        hash: mapId,
      })
    },
  },
  created() {
    const path = (/#!(\/.*)$/.exec(this.$route.fullPath) || [])[1]
    if (path) {
      this.$router.push({ path: path })
    }
  },
}
</script>
