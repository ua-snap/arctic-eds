<template>
  <div>
    <span v-if="active">&#10003;&nbsp;</span>
    <span class="map--layer" :class="{ active: active }" @click="toggleLayer">
      {{ layer.title }}
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
export default {
  name: "MapLayer",
  props: ["layer"],
  data() {
    return {
      active: false
    };
  },
  created() {
    if (this.layer.active) {
      this.active = true;
    }
  },
  methods: {
    toggleLayer() {
      this.active = !this.active;
      this.$store.commit("map/toggleLayer", this.layer);
    }
  }
};
</script>
