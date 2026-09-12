<template>
  <div>
    <div v-if="reportIsVisible">
      <FullReport />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import { mapGetters } from 'vuex'
import FullReport from '~/components/Report'

export default {
  name: 'ReportPage',
  components: {
    FullReport,
  },
  computed: {
    ...mapGetters({
      reportIsVisible: 'report/reportIsVisible',
    }),
  },
}
</script>
