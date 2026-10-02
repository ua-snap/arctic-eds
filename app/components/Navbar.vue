<template>
  <nav class="navbar has-shadow no-print" aria-label="Main">
    <div class="container is-fluid">
      <div class="navbar-brand">
        <NuxtLink
          to="/"
          class="navbar-item is-size-3 is-family-secondary has-text-weight-extrabold"
        >
          Arctic-EDS
          <span class="is-sr-only">
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
          <NuxtLink
            to="/about"
            class="navbar-item is-tab is-size-5 is-family-secondary has-text-weight-extrabold"
            active-class="is-active"
            >About</NuxtLink
          >
          <NuxtLink
            to="/guidance"
            class="navbar-item is-tab is-size-5 is-family-secondary has-text-weight-extrabold"
            active-class="is-active"
            >Guidance</NuxtLink
          >
          <NuxtLink
            to="/data-sources"
            class="navbar-item is-tab is-size-5 is-family-secondary has-text-weight-extrabold"
            active-class="is-active"
            >Data sources</NuxtLink
          >
        </div>
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
