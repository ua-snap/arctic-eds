<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-2">Heating Degree Days</h1>
        <div class="content content-clamp is-size-4">
          <p>
            The heating degree days are the cumulative annual degree days below
            65&deg;F.
          </p>
        </div>
        <UserPrompt dataLabel="heating degree days" />
      </section>
    </div>
    <HeatingDegreeDaysController />
  </div>
</template>
<script lang="scss" scoped></script>
<script>
import HeatingDegreeDaysController from '~/components/plates/heating_degree_days/Controller'

export default {
  name: 'HeatingDegreeDays',
  layout: 'plate',
  components: {
    HeatingDegreeDaysController,
  },
}
</script>
