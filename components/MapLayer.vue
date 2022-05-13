<template>
  <div>
    <span v-if="active">&#10003;&nbsp;</span>
    <span
      class="map--layer"
      :class="{ active: active }"
      @click="toggleLayer"
      v-html="layer.title"
    >
    </span>
  </div>
</template>

<style lang="scss" scoped>
.map--layer {
  cursor: pointer;

  &.active {
    font-weight: 700;
  }
}
</style>

<script>
import Vue from "vue";

export default {
  name: "MapLayer",
  props: ["layer"],
  computed: {
    active() {
      // Check if the layer is active in the store
      let activeLayer = this.$store.getters["map/getActiveLayer"];
      if (activeLayer) {
        return activeLayer.id === this.layer.id;
      }
      // Otherwise, make it active if it's defaulted to be active.
      return this.layer.default;
    },
  },
  created() {
    if (this.layer.default) {
      // We need to wait for Vue to render the full DOM which
      // includes the `#map` element before we can trigger this.
      Vue.nextTick(this.toggleLayer);
    }
  },
  methods: {
    toggleLayer() {
      this.$store.commit("map/toggleLayer", this.layer);
    },
  },
};
</script>
