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
export default {
  name: "Breadcrumbs",
  computed: {
    category: function() {
      return this.$route.name.split("-")[0];
    },
    plate: function() {
      return this.$route.name.split("-")[1]
    }
  }
};
</script>
