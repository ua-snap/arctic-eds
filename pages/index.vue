<template>
  <div>
    <div class="toc--wrapper">
      <div class="toc--panel">
        <NuxtLink to="/physiography">
          <h3>Physiography</h3>
          <div class="toc--panel--image image--physiography"></div>
        </NuxtLink>
        <ul>
          <li>Earthquakes</li>
          <li>Forest Types</li>
          <li><NuxtLink to="/physiography/geology">Geology</NuxtLink></li>
          <li>Glaciation</li>
          <li><NuxtLink to="/physiography/permafrost">Permafrost</NuxtLink></li>
          <li>Physiographic Provinces</li>
        </ul>
      </div>
      <div class="toc--panel">
        <h3>Water</h3>
        <div class="toc--panel--image image--water"></div>
        <ul>
          <li>Coastal Waters</li>
          <li>Sea Temperatures</li>
          <li>Sea Ice</li>
          <li>River and Coastal Ice</li>
          <li>Tides</li>
          <li>Water Crop</li>
        </ul>
      </div>
      <div class="toc--panel">
        <h3>Light</h3>
        <div class="toc--panel--image image--light"></div>
        <ul>
          <li>Sun Path Diagrams</li>
          <li>Sunlight</li>
          <li>Twilight</li>
          <li>Sunlight + Twilight</li>
        </ul>
      </div>
      <div class="toc--panel">
        <h3>Climate</h3>
        <div class="toc--panel--image image--climate"></div>
        <ul>
          <li>Climatic Zones</li>
          <li>Precipitation</li>
          <li>Wet Days per Year</li>
          <li>Snowfall</li>
          <li>Temperature</li>
        </ul>
      </div>
      <div class="toc--panel">
        <h3>Engineering</h3>
        <div class="toc--panel--image image--engineering"></div>
        <ul>
          <li>Freezing Index</li>
          <li>Design Freezing Index</li>
          <li>Thawing Index</li>
          <li>Design Thawing Index</li>
          <li>Heating Degree Days</li>
          <li>Building Design Criteria</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.toc--wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 6rem;

  .toc--panel {
    margin-right: 2vw;
    &:last-of-type {
      margin-right: 0;
    }

    h3 {
      color: #d43f16;
      font-size: 1.75rem;
      font-weight: 700;
      position: relative;
      top: 0.6rem;
      text-transform: uppercase;
    }

    ul {
      font-size: 1.1rem;
      margin-top: 1rem;
    }

    .toc--panel--image {
      width: 17vw;
      min-height: 12vw;
      background-size: cover;
      transition: background-image 0.2s ease-in-out;

      // The color background image is listed twice so it pre-loads
      // to prevent a flicker when the image is hovered.
      &.image--physiography {
        background-image: url("~/assets/images/PHYS_alaska_dem.jpg"),
          url("~/assets/images/PHYS_alaska_dem_COLOR.jpg");
        &:hover {
          background-image: url("~/assets/images/PHYS_alaska_dem_COLOR.jpg");
        }
      }

      &.image--water {
        background-image: url("~/assets/images/WATER_douglas-bagg-4rLs3n7CwFQ-unsplash.jpg"),
          url("~/assets/images/WATER_douglas-bagg-4rLs3n7CwFQ-unsplash_COLOR.jpg");
        &:hover {
          background-image: url("~/assets/images/WATER_douglas-bagg-4rLs3n7CwFQ-unsplash_COLOR.jpg");
        }
      }

      &.image--light {
        background-image: url("~/assets/images/LIGHT_suns_todd-paris.jpg"),
          url("~/assets/images/LIGHT_suns_todd-paris_COLOR.jpg");
        &:hover {
          background-image: url("~/assets/images/LIGHT_suns_todd-paris_COLOR.jpg");
        }
      }

      &.image--climate {
        background-image: url("~/assets/images/CLIM_simon-schoepf-fyqH3jQxl5Y-unsplash.jpg"),
          url("~/assets/images/CLIM_simon-schoepf-fyqH3jQxl5Y-unsplash_COLOR.jpg");
        &:hover {
          background-image: url("~/assets/images/CLIM_simon-schoepf-fyqH3jQxl5Y-unsplash_COLOR.jpg");
        }
      }

      &.image--engineering {
        background-image: url("~/assets/images/ENG_tanana-river-bridge.jpg"),
          url("~/assets/images/ENG_tanana-river-bridge_COLOR.jpg");
        &:hover {
          background-image: url("~/assets/images/ENG_tanana-river-bridge_COLOR.jpg");
        }
      }
    }
  }
}
</style>
<script>
export default {
  name: "HomePage",
  layout: "home"
};
</script>
