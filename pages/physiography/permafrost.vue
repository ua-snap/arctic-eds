<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Permafrost</h1>
        <div class="content content-clamp is-size-4">
          <p>
            This map shows data about permafrost extent, ice volume and ground
            temperatures. Many of these data layers are model outputs, including
            projections of changing permafrost conditions throughout the state.
          </p>
        </div>
        <UserPrompt dataLabel="permafrost conditions" />
      </section>
    </div>
    <PermafrostController />
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import PermafrostController from '~/components/plates/permafrost/Controller'

export default {
  name: 'Permafrost',
  layout: 'plate',
  components: {
    PermafrostController,
  },
}
</script>
