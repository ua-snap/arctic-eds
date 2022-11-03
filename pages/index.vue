<template>
  <div>
    <div class="toc--wrapper columns is-desktop mx-5">
      <div class="blurb column is-one-third-desktop mb-3">
        <h2 class="title is-4 mt-3">
          Modern environmental data for science and engineering.
        </h2>
        <div class="content is-size-5">
          <p>
            Do you need readily available, high quality engineering and
            environmental data for projects in Alaska and the Arctic?
          </p>
          <p>
            The Arctic-EDS offers curated, vetted datasets through online maps,
            processing modules and direct data access.
          </p>
          <p>
            <b-button tag="nuxt-link" to="/about">
              Learn more about the system
            </b-button>
          </p>
        </div>
      </div>
      <div class="column">
        <div class="columns">
          <div class="column is-one-third">
            <div class="toc--panel">
              <h3>Climate</h3>
              <div class="toc--panel--image image--climate"></div>

              <ul>
                <li>
                  <NuxtLink to="/climate/precipitation">Precipitation</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/climate/snowfall">Snowfall</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/climate/temperature">Temperature</NuxtLink>
                </li>
              </ul>
            </div>
          </div>
          <div class="column is-one-third">
            <div class="toc--panel">
              <h3>Engineering</h3>
              <div class="toc--panel--image image--engineering"></div>

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
          <div class="column is-one-third">
            <div class="toc--panel">
              <h3>Physiography</h3>
              <div class="toc--panel--image image--physiography"></div>

              <ul>
                <li>
                  <NuxtLink to="/physiography/ecoregions">Ecoregions</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/physiography/geology">Geology</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/physiography/permafrost">Permafrost</NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
::v-deep {
  a.button {
    color: white !important;
    background-color: #d43f16;
    border: none;
    font-weight: 600;
  }
}
.toc--wrapper {
  margin-bottom: 6rem;

  .blurb {
    @media (min-width: 1024px) {
      padding-right: 2rem;
    }
    h2.title {
      padding-bottom: 0.3rem;
    }
  }
  .toc--panel {
    h3 {
      color: #d43f16;
      font-size: 1.65rem;
      font-weight: 700;
      position: relative;
      top: 0.6rem;
      text-transform: uppercase;
    }

    ul {
      font-size: 1.2rem;
      margin-top: 0.2rem;
      li {
        margin-bottom: 0.25rem;
        a {
          color: #d43f16;
          font-weight: 600;
        }
      }
    }

    .toc--panel--image {
      min-height: 12vw;
      background-size: cover;
      transition: background-image 0.2s ease-in-out;

      // The color background image is listed twice so it pre-loads
      // to prevent a flicker when the image is hovered.
      &.image--physiography {
        background-image: url('~/assets/images/PHYS_alaska_dem.jpg'),
          url('~/assets/images/PHYS_alaska_dem_COLOR.jpg');

        &:hover {
          background-image: url('~/assets/images/PHYS_alaska_dem_COLOR.jpg');
        }
      }

      &.image--water {
        background-image: url('~/assets/images/WATER_douglas-bagg-4rLs3n7CwFQ-unsplash.jpg'),
          url('~/assets/images/WATER_douglas-bagg-4rLs3n7CwFQ-unsplash_COLOR.jpg');

        &:hover {
          background-image: url('~/assets/images/WATER_douglas-bagg-4rLs3n7CwFQ-unsplash_COLOR.jpg');
        }
      }

      &.image--light {
        background-image: url('~/assets/images/LIGHT_suns_todd-paris.jpg'),
          url('~/assets/images/LIGHT_suns_todd-paris_COLOR.jpg');

        &:hover {
          background-image: url('~/assets/images/LIGHT_suns_todd-paris_COLOR.jpg');
        }
      }

      &.image--climate {
        background-image: url('~/assets/images/CLIM_simon-schoepf-fyqH3jQxl5Y-unsplash.jpg'),
          url('~/assets/images/CLIM_simon-schoepf-fyqH3jQxl5Y-unsplash_COLOR.jpg');

        &:hover {
          background-image: url('~/assets/images/CLIM_simon-schoepf-fyqH3jQxl5Y-unsplash_COLOR.jpg');
        }
      }

      &.image--engineering {
        background-image: url('~/assets/images/ENG_tanana-river-bridge.jpg'),
          url('~/assets/images/ENG_tanana-river-bridge_COLOR.jpg');

        &:hover {
          background-image: url('~/assets/images/ENG_tanana-river-bridge_COLOR.jpg');
        }
      }
    }
  }
}
</style>
<script>
export default {
  name: 'HomePage',
  layout: 'home',
  created() {
    const path = (/#!(\/.*)$/.exec(this.$route.fullPath) || [])[1]
    if (path) {
      this.$router.push({ path: path })
    }
  },
}
</script>
