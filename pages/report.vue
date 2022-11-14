<template>
  <div>
    <div class="container">
      <section class="section">
        <FullReport />
      </section>
    </div>
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import FullReport from '~/components/Report'
export default {
  name: 'Report',
  layout: 'plate',
  components: {
    FullReport,
  },
}
</script>
