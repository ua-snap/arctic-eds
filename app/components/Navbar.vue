<template>
  <nav class="navbar no-print" aria-label="Main">
    <div class="navbar-brand">
      <NuxtLink to="/" class="navbar-item brand">
        <span class="logo">Arctic-EDS</span>
        <span class="visually-hidden">
          Arctic Environmental and Engineering Data and Design Support System,
          home</span
        >
      </NuxtLink>
      <button
        type="button"
        class="navbar-burger"
        :class="{ 'is-active': isOpen }"
        :aria-expanded="isOpen ? 'true' : 'false'"
        aria-controls="main-menu"
        aria-label="Menu"
        @click="isOpen = !isOpen"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>
    <div id="main-menu" class="navbar-menu" :class="{ 'is-active': isOpen }">
      <div class="navbar-end">
        <NuxtLink to="/about" class="navbar-item">About</NuxtLink>
        <NuxtLink to="/guidance" class="navbar-item">Guidance</NuxtLink>
        <NuxtLink to="/data-sources" class="navbar-item">Data sources</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'

const route = useRoute()
const isOpen = ref(false)

// Close the mobile menu after navigating.
watch(
  () => route.path,
  () => {
    isOpen.value = false
  }
)
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0 1.5rem;
  background: transparent;
  border-bottom: 1px solid #dcd8d2;
}
.brand .logo {
  font-family: 'Acknowledgement', sans-serif;
  font-size: 32px;
  line-height: 1;
  color: #312e30;
}
.navbar-item {
  font-family: 'Barlow', sans-serif;
  font-weight: 900;
  font-size: 1.15rem;
  letter-spacing: 0.02em;
  color: #312e30;

  &.router-link-active:not(.brand) {
    box-shadow: inset 0 -4px 0 #312e30;
  }
}
</style>
