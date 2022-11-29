<template>
  <div>
    <span class="map--layer" :class="{ active: active }">
      <span v-if="active">&#10003;&nbsp;</span>
      <span @click="toggleLayer" v-html="layer.title"> </span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.map--layer {
  display: inline-block;
  line-height: 1;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.25rem;

  &:hover {
    text-decoration: underline;
  }

  &.active {
    font-weight: 900;
    background-color: #fcfa88;
  }
}
</style>

<script>
import Vue from 'vue'

export default {
  name: 'MapLayer',
  props: ['layer'],
  computed: {
    active() {
      // Check if the layer is active in the store
      let activeLayer = this.$store.getters['map/selectedLayer']
      if (activeLayer) {
        return activeLayer.id === this.layer.id
      }
      // Otherwise, make it active if it's defaulted to be active.
      return this.layer.default
    },
  },
  mounted() {
    if (this.layer.default) {
      // We need to wait for Vue to render the full DOM which
      // includes the `#map` element before we can trigger this.
      Vue.nextTick(this.toggleLayer)
    }
  },
  methods: {
    toggleLayer() {
      this.$store.commit('map/toggleLayer', this.layer)
    },
  },
}
</script>
