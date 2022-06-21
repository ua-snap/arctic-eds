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
        content: ' / ';
      }
      &:last-of-type::after {
        content: '';
      }
    }
  }
}
</style>
<script>
import _ from 'lodash'

export default {
  name: 'Breadcrumbs',
  computed: {
    category: function () {
      return this.$route.path.split('/')[1].replace(/-/, ' ')
    },
    plate: function () {
      // Handle custom names independent of route
      if (this.$route.path.split('/').length > 2) {
        let plate = _.slice(this.$route.path.split('/'), 2)[0]
        plate = plate.replace(/-/g, ' ')
        switch (plate) {
          case 'beta':
            return false
          default:
            if (plate) return plate
        }
      } else {
        return false
      }
    },
  },
}
</script>
