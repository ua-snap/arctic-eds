<template>
  <div class="content content-clamp" :class="{ 'is-size-5': !legend }">
    <p>
      Historically, Arctic regions had no months with mean monthly temperatures
      greater than 50&deg;F and had at least one month with a mean temperature
      32&deg;F or colder. Subarctic lands had from one to four months with
      monthly mean temperatures greater than 50&deg;F and at least one month
      with a mean temperature 32&deg;F or colder. As climate shifts, these
      definitions are changing.
    </p>
    <p>
      This map shows average annual historical and projected temperatures for
      1901 and 2099, as well as the coldest, hottest, and average temperatures
      for those years for the months of January (typically the coldest month)
      and July (typically the warmest month). It can be seen that the highest
      temperatures are in the most continental portions of the state.
    </p>
    <p>
      In general, minimum daily temperatures are found at or before sunrise and
      maximum temperatures are found during the afternoon. However, the precise
      pattern varies with location and time of year.
    </p>
    <p>
      Mean annual temperatures for Alaska are seen to decrease from south to
      north in a fairly regular pattern. There have been marked decreases over
      time in the proportion of the state with mean temperature below freezing
      (32&deg;F), and this trend is projected to continue.
    </p>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'TemperatureExplanation',
  props: {
    legend: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
