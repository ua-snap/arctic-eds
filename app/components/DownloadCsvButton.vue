<template>
  <a :href="downloadTarget" class="no-print">{{ text }}</a>
</template>
<style lang="scss" scoped>
.single {
  display: block;
  max-width: 30em;
}
</style>
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const props = defineProps({
  text: String,
  endpoint: String,
})

const config = useRuntimeConfig()
const { placeId, latLng } = storeToRefs(useReportStore())

const downloadTarget = computed(() => {
  let endpointPath = props.endpoint
  let communityID = placeId.value ? '&community=' + placeId.value : ''

  let url =
    config.public.apiUrl +
    '/' +
    endpointPath +
    '/' +
    latLng.value['lat'] +
    '/' +
    latLng.value['lng'] +
    '?format=csv' +
    communityID

  return url
})
</script>
