<template>
  <div class="container">
    <section class="section">
      <div class="columns">
        <div class="column is-one-quarter">
          <img src="~/assets/images/ENG_tanana-river-bridge.jpg" />
          <div class="content is-size-5">
            <ul>
              <li>
                <NuxtLink to="/engineering/design-freezing-index"
                  >Design Freezing Index</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/engineering/design-thawing-index"
                  >Design Thawing Index</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/engineering/freezing-index"
                  >Freezing Index</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/engineering/heating-degree-days"
                  >Heating Degree Days</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/engineering/thawing-index"
                  >Thawing Index</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <h3 class="title is-3">Engineering</h3>
          <div class="content is-size-5">
            <p>
              Knowledge of the temperature pattern of a place makes it possible
              to estimate various thermal loads. Of particular interest and in
              standard use are heating, freezing, and thawing loads measured in
              degree days per year.
            </p>
            <p>
              The freezing index (degree days below 32&deg;F) provides a basis
              on which to estimate the depth of annual ground freezing or ice
              thickness on bodies of water.
            </p>
            <p>
              The thawing index (degree days above 32&deg;F) provides a measure
              of ground thaw during the summer.
            </p>
            <p>
              Heating degree day, measured below 65&deg;F, provide the basis for
              developing heating fuel requirement estimates.
            </p>
            <p>
              Degree days are a cumulative measure of the duration and magnitude
              of a thermal load. Note that this thermal load can be measured
              either above or below a given threshold. For example, a larger
              value for heating degree days indicates a
              <strong>colder</strong> region requiring more energy to heat a
              building to 65&deg;F. Conversely, a larger value for thawing index
              indicates a <strong>warmer</strong> location, with greater
              cumulative above-freezing temperatures and greater summer thaw.
            </p>
            <p>
              For design purposes it should be noted that all these indices,
              historical and projected, are estimates only, and can be expected
              to vary from year to year.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
export default {
  name: 'Engineering',
  layout: 'category',
  created: function() {},
}
</script>
