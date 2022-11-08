<template>
  <div>
    <hr />

    <div id="report">
      <h3 class="title is-3">Ecoregion for {{ placeName }}</h3>
      <h4 class="subtitle is-3">{{ results.physiography.name }}</h4>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EcoregionsReport',

  computed: {
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
