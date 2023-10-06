<template>
  <div
    @click="toggleLayer"
    class="layer tile is-ancestor is-parent"
    :class="{ active: active }"
  >
    <span class="tile is-child description">
      <div class="layer-title">
        <slot name="title">{{ layer.title }}</slot>
      </div>
      <div class="subtext"><slot name="subtext"></slot></div>
    </span>
    <span class="tile is-child is-1 if-active">
      <div v-if="active">&#x25b6;</div>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.layer {
  line-height: 1.2;
  font-size: 1.25rem;
  cursor: pointer;
  padding-right: 0;

  &.active {
    font-weight: 600;
    background-color: #f2c716;
  }

  .if-active {
    display: flex;
    align-items: center;
    font-size: 125%;
  }

  .subtext {
    display: block;
    margin-top: 0;
    padding-top: 0;

    font-weight: 300;
  }
}
</style>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default {
  name: 'MapLayer',
  props: ['layer', 'mapName'],
  computed: {
    active() {
      // Get all layers + then the active layer for this map.
      // Need to get all layers so that reactivity works.
      if (this.activeLayers) {
        return this.activeLayers[this.mapName] === this.layer.id
      }
      // Otherwise, make it active if it's defaulted to be active.
      return this.layer.default
    },
    ...mapGetters({ activeLayers: 'map/getSelectedLayers' }),
  },
  mounted() {
    if (this.layer.default) {
      // We need to wait for Vue to render the full DOM which
      // includes the Leaflet elements before we can trigger this.
      Vue.nextTick(this.toggleLayer)
    }
  },
  methods: {
    toggleLayer() {
      this.$store.commit('map/toggleLayer', {
        layer: this.layer,
        mapId: this.mapName,
      })
    },
  },
}
</script>
