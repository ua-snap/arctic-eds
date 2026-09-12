<template>
  <div>
    <div v-if="reportIsVisible">
      <FullReport />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import { mapState } from 'pinia'
import FullReport from '~/components/Report'

export default {
  name: 'ReportPage',
  components: {
    FullReport,
  },
  computed: {
    ...mapState(useReportStore, {
      reportIsVisible: 'reportIsVisible',
    }),
  },
}
</script>
