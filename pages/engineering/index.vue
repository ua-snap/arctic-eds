<template>
  <div class="container">
    <section class="section">
      <div class="columns">
        <div class="column is-one-quarter">
          <img src="~/assets/images/ENG_tanana-river-bridge.jpg" />
          <div class="content is-size-5">
            <ul>
              <li>
                <NuxtLink to="/engineering/freezing-index"
                  >Freezing Index</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/engineering/design-freezing-index"
                  >Design Freezing Index</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/engineering/thawing-index"
                  >Thawing Index</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/engineering/design-thawing-index"
                  >Design Thawing Index</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/engineering/heating-degree-days"
                  >Heating Degree Days</NuxtLink
                >
              </li>
              <li>Building Design Criteria</li>
            </ul>
          </div>
        </div>
        <div class="column">
          <h3 class="title is-3">Engineering</h3>
          <div class="content is-size-5">
            <p>
              <i>Placholder for Engineering text.</i>
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
  created: function () {},
}
</script>
