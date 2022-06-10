<template>
  <div class="breadcrumbs">
    <ul>
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <template v-if="plate">
        <li>
          <NuxtLink :to="'/' + category">{{ category }}</NuxtLink>
        </li>
        <li>{{ plate }}</li>
      </template>
      <template v-else>
        <li>
          {{ category }}
        </li>
      </template>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.breadcrumbs {
  ul {
    margin: 1rem;
    font-size: 1.25rem;
    li {
      text-transform: capitalize;
      display: inline-block;
      &::after {
        content: " / ";
      }
      &:last-of-type::after {
        content: "";
      }
    }
  }
}
</style>
<script>
import _ from "lodash";

export default {
  name: "Breadcrumbs",
  computed: {
    category: function() {
      return this.$route.name.split("-")[0];
    },
    plate: function() {
      // Handle custom names independent of route
      let plate = _.slice(this.$route.path.split("/"), -1)[0];
      plate = plate.replace(/-/g, " ");
      switch (plate) {
        case "physiography":
          return "Physiographic Provinces";
        case "beta":
          return false;
        default:
          if (plate) return plate;
      }
    },
  },
};
</script>
