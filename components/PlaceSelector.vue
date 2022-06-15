<template>
  <div class="place-selector--wrapper">
    <div class="content">
      <h4 class="title is-5">Find a place by name</h4>
      <p>
        Search below by <strong>community name</strong>:
      </p>
      <p>
        <b-field>
          <b-autocomplete
            rounded
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
            <template #empty>No results found</template>
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
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.place-selector--wrapper * {
  z-index: 10000;
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
      places: 'report/places'
    }),
  },
  watch: {
    selected: function (selected) {
      if (selected && selected.type) {
        let latLng = {
          lat: selected.latitude,
          lng: selected.longitude
        };

        this.$store.commit("report/setPlaceID", selected.id);

        this.$store.commit("report/setLatLng", latLng);

        this.$store.commit("report/openReport", this.$route.fullPath);
      }
    },
  },
}
</script>
