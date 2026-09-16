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
        <template #default="props">
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
:deep(input.input) {
  box-shadow: none;
  border: 3px solid #8ba09a;
  border-radius: 0;
}
</style>
<script setup>
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

const router = useRouter()
const route = useRoute()

const { places } = storeToRefs(useReportStore())

const selected = ref(undefined) // the actual selected place
const selectedPlace = ref('') // the temporary search fragment

const filteredDataObj = computed(() => {
  // Guard in case the async loading of places isn't done yet.
  if (places.value) {
    return places.value.filter(option => {
      return (
        option.name
          .toString()
          .toLowerCase()
          .indexOf(selectedPlace.value.toLowerCase()) >= 0 ||
        (option.alt_name &&
          option.alt_name
            .toString()
            .toLowerCase()
            .indexOf(selectedPlace.value.toLowerCase()) >= 0)
      )
    })
  }
})

watch(selected, newSelected => {
  if (newSelected) {
    router.push({
      path: route.path + 'report/community/' + newSelected.id + '#results',
    })
  }
})
</script>
