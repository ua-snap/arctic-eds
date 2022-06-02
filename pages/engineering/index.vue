<template>
  <div class="container">
    <section class="section">
      <div class="columns">
        <div class="column is-one-quarter">
          <img src="~/assets/images/PHYS_alaska_dem.jpg" />
          <div class="content is-size-5">
            <ul>
              <li>Earthquakes</li>
              <li><NuxtLink to="/physiography/geology">Geology</NuxtLink></li>
              <li>Forest Types</li>
              <li>Glaciation</li>
              <li>
                <NuxtLink to="/physiography/permafrost">Permafrost</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/physiography/physiography"
                  >Freezing Index</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <h3 class="title is-3">Physiography</h3>
          <div class="content is-size-5">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
export default {
  name: "FreezingIndex",
  layout: "category",
  created: function() {}
};
</script>
