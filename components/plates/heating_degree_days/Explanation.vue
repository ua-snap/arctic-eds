<template>
  <div class="content content-clamp" :class="{ 'is-size-5': !legend }">
    <p>
      Heating degree days, measured below 65&deg;F, provide information upon
      which the annual fuel requirement for a heated building can be calculated.
      For example, assume that house heating begins when the air temperature is
      near 65&deg;F. If a particular day has a mean temperature of 50&deg;F, the
      heating load for the day is 15 degree days (65&ndash;50). For the entire
      year the heating degree days are the sum of the daily degree days. If the
      mean temperature for a particular day is higher than 65&deg;F, there is
      assumed to be no heating and thus no heating degree days.
    </p>

    <p>Higher values for heating degree days suggest colder, longer winters.</p>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'HeatingDegreeDaysExplanation',
  props: {
    legend: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
