<template>
  <span class="term">
    <NuxtLink :to="href"><slot></slot></NuxtLink>
  </span>
</template>
<script>
export default {
  name: 'Term',
  props: ['target'],
  computed: {
    href() {
      return {
        path: '/glossary#' + this.target
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.term {
  display: inline-block;
  cursor: help;
  border-bottom: 1px dashed black;
}
::v-deep {
  a {

      cursor: help;
  }
}
</style>
