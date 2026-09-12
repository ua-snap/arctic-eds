<template>
  <div class="content is-size-5 wrapper">
    <b>Alaska community name</b>
    <b-field>
      <b-autocomplete
        v-model="selectedPlace"
        :data="filteredDataObj"
        keep-first
        field="name"
        placeholder="e.g. Fairbanks"
        icon="magnify"
        clearable
        clear-on-select
        @select="option => (selected = option)"
      >
        <template #empty>No results found!</template>
        <template slot-scope="props">
          <div class="search-item">
            {{ props.option.name }}
            <span class="alt-name" v-if="props.option.alt_name"
              >({{ props.option.alt_name }})</span
            >
          </div>
        </template>
      </b-autocomplete>
    </b-field>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  text-align: left;
  width: 30rem;
}
.search-item {
  font-weight: 600;
  white-space: normal;
  .area-additional-info {
    text-transform: uppercase;
    display: inline-block;
    padding-left: 1ex;
    color: #888;
    font-size: 90%;
  }
}
::v-deep input.input {  
  box-shadow: none;
  border: 3px solid #8ba09a;
  border-radius: 0;
}

</style>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'PlaceSelector',
  data() {
    return {
      selected: undefined, // the actual selected place
      selectedPlace: '', // the temporary search fragment
    }
  },
  computed: {
    filteredDataObj() {
      // Guard in case the async loading of places isn't done yet.
      if (this.places) {
        return this.places.filter(option => {
          return (
            option.name
              .toString()
              .toLowerCase()
              .indexOf(this.selectedPlace.toLowerCase()) >= 0 ||
            (option.alt_name &&
              option.alt_name
                .toString()
                .toLowerCase()
                .indexOf(this.selectedPlace.toLowerCase()) >= 0)
          )
        })
      }
    },
    ...mapGetters({
      places: 'report/places',
    }),
  },
  watch: {
    selected: function (selected) {
      if (selected) {
        this.$router.push({
          path:
            this.$route.path + 'report/community/' + selected.id + '#results',
        })
      }
    },
  },
}
</script>
