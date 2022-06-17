<template>
  <div>
    <div class="toc--wrapper columns mx-5">
      <div class="blurb column is-one-third mx-3">
        <h2 class="title is-4 mt-3">
          Modern environmental data for science and engineering.
        </h2>
        <div class="content is-size-5">
          <p>
            Technical professionals working on projects in Alaska and the Arctic
            need readily&ndash;available, high&ndash;quality engineering and
            environmental data.
          </p>
          <p>
            The Arctic-EDS offers curated, vetted datasets through online maps,
            processing modules and direct data access.
          </p>
          <p>
            <b-button tag="nuxt-link" to="/about" icon-right="arrow-right">
              Read more
            </b-button>
          </p>
        </div>
      </div>
      <div class="column">
        <div class="columns">
          <div class="column is-one-third">
            <div class="toc--panel">
              <NuxtLink to="/climate">
                <h3>Climate</h3>
                <div class="toc--panel--image image--climate"></div>
              </NuxtLink>
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
              <NuxtLink to="/engineering">
                <h3>Engineering</h3>
                <div class="toc--panel--image image--engineering"></div>
              </NuxtLink>
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
              <NuxtLink to="/physiography">
                <h3>Physiography</h3>
                <div class="toc--panel--image image--physiography"></div>
              </NuxtLink>
              <ul>
                <li>
                  <NuxtLink to="/physiography/geology">Geology</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/physiography/permafrost">Permafrost</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/physiography/physiography"
                    >Physiographic Provinces</NuxtLink
                  >
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
    background-color: #4b8cc5;
    border: none;
    font-weight: 600;
  }
}
.toc--wrapper {
  margin-bottom: 6rem;

  .blurb h2.title {
    padding-bottom: 0.3rem;
    border-bottom: 0.3rem solid #4b8cc5;
  }
  .toc--panel {
    h3 {
      color: #d43f16;
      font-size: 1.75rem;
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
