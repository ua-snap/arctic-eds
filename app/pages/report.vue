<template>
  <div>
    <div v-if="reportIsVisible">
      <FullReport />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
<script setup>
import { storeToRefs } from 'pinia'
import FullReport from '~/components/Report'

// The report lays out its own full-width page (see layouts/default.vue).
definePageMeta({ bands: true })

const { reportIsVisible } = storeToRefs(useReportStore())
</script>
