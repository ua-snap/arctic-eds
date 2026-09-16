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

const { reportIsVisible } = storeToRefs(useReportStore())
</script>
