<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Ecoregions</h1>
        <div class="content content-clamp is-size-4">
          <p>
            Ecoregions combine landscape, topographic, and vegetation variables,
            but have less detail about vegetation when compared to "land cover"
            or "forest type" datasets.
          </p>
        </div>
        <UserPrompt dataLabel="ecoregion" />
      </section>
    </div>
    <PhysiographyController />
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import PhysiographyController from '~/components/plates/physiography/Controller'
import UserPrompt from '~/components/UserPrompt'

export default {
  name: 'Physiography',
  layout: 'plate',
  components: {
    PhysiographyController,
    UserPrompt,
  },
}
</script>
