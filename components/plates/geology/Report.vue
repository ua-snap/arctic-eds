<template>
  <div v-if="Object.keys(results.geology).length != 0">
    <hr />

    <div id="report">
      <h3 class="title is-3">Geological unit for {{ placeName }}</h3>

      <table class="table">
        <tbody>
          <tr>
            <th scope="row">Age</th>
            <td>{{ results.geology.age }}</td>
          </tr>
          <tr>
            <th scope="row">Classification</th>
            <td>{{ results.geology.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GeologyReport',

  computed: {
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
