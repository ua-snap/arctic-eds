<template>
  <nav class="nav-wrapper no-print">
    <ol>
      <li>
        <NuxtLink to="/"> Home </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about"> About </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/maps"> Climate Maps </NuxtLink>
      </li>
      <li>
        <a href="http://earthmaps.io"> Data API </a>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  font-family: "Barlow", sans-serif;
  font-weight: 900;
  font-size: 1.35rem;
  text-align: center;
  ol li {
    display: inline-block;
    padding: 0.5rem 2rem;

    a {
      color: #312e30 !important;
      letter-spacing: 0.02em;
      &:hover {
        border-bottom: 4px solid #312e30;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'Navbar',
}
</script>
