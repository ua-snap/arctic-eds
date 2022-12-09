<template>
  <div>
    <h2 class="title is-3">Table of Contents</h2>
    <ul class="toc-top-level">
      <li>
        <a href="#precipitation">Precipitation</a>
      </li>
      <ul class="toc-sub-level">
        <li>
          <a href="#annual-precipitation">Annual Total Precipitation</a>
        </li>
        <li>
          <a href="#snowfall">Snowfall</a>
        </li>
      </ul>
      <li><a href="#temperature">Temperature</a></li>
      <li><a href="#temperature-indices">Temperature Indices</a></li>
      <ul class="toc-sub-level">
        <li><a href="#heating-degree-days">Heating Degree Days</a></li>
        <li><a href="#freezing-index">Freezing Index</a></li>
        <li>
          <a href="#design-freezing-index">Design Freezing Index</a>
        </li>
        <li><a href="#thawing-index">Thawing Index</a></li>
        <li>
          <a href="#design-thawing-index">Design Thawing Index</a>
        </li>
      </ul>
      <li><a href="#permafrost">Permafrost</a></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  padding-top: 3rem;
}
.toc-top-level {
  padding-left: 1rem;
  list-style-type: square;
  a {
    font-size: 24px;
  }
}

.toc-sub-level {
  padding-left: 2rem;
  list-style-type: circle;
  a {
    font-size: 20px;
  }
}
</style>

<script>
export default {
  name: 'TableOfContents',
}
</script>
