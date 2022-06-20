<template>
  <div class="container">
    <section class="section">
      <div class="columns">
        <div class="column is-one-quarter">
          <img src="~/assets/images/PHYS_alaska_dem.jpg" />
          <div class="content is-size-5">
            <ul>
              <li>Climatic Zones</li>
              <li>
                <NuxtLink to="/climate/precipitation">Precipitation</NuxtLink>
              </li>
              <li>Wet Days Per Year</li>
              <li>
                <NuxtLink to="/climate/snowfall">Snowfall</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/climate/temperature">Temperature</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <h3 class="title is-3">Climate</h3>
          <div class="content is-size-5">
            <p>
              Climate data are derived from historical and projected data from
              Global Circulation Models (GCMs) run under different scenarios
              (Representative Concentration Pathways, RCPs)
              <a href="https://uaf-snap.org/methods-overview/downscaling/"
                >downscaled with gridded PRISM climate data</a
              >.
            </p>
            <p>
              Read more about
              <a href="https://uaf-snap.org/methods-overview/uncertainty/"
                >Sources of uncertainty in climate modeling</a
              >
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
  name: 'Physiography',
  layout: 'category',
  created: function () {},
}
</script>
