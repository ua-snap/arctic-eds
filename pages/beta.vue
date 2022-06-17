<template>
  <section class="section">
    <div class="container">
      <div class="content centered is-size-5">
        <img src="~/assets/images/construction.png" alt="" />

        <h2 class="title is-3">About the public beta test</h2>
        <p>
          This is a preliminary, beta (pre&ndash;release) version of this tool.
          Not all data or functionality that will be included are ready yet, and
          the data presented through this tool are still being validated.
        </p>
        <p>
          Data from this tool should not yet be used for engineering or
          decision&ndash;making purposes. However, &ldquo;test driving&rdquo;
          the tool by exploring layers and extracting data can be useful for
          project overviews and &ldquo;ballpark&rdquo; estimates.
        </p>
        <h3 class="title is-4">
          We want to make this tool relevant to your work
        </h3>
        <p>
          With your feedback, we can make this tool more useful. As you use the
          tool, please consider:
        </p>
        <ul>
          <li>
            Does this tool make relevant engineering data more accessible?
          </li>
          <li>Are the explanations about the datasets and sources useful?</li>
          <li>
            What additional built–in tools or calculators would be helpful?
          </li>
          <li>Other questions or concerns?</li>
        </ul>
        <p>
          Please email us at
          <a href="mailto:uaf-snap-data-tools@alaska.edu"
            >uaf-snap-data-tools@alaska.edu</a
          >
          if you have a question, encounter a problem, or would like to connect
          with us directly about this tool or the underlying datasets. You can
          also
          <a
            href="https://www.google.com/url?q=https://uaf-iarc.typeform.com/to/MLS1dDf9&sa=D&source=docs&ust=1655491731883237&usg=AOvVaw37tuoJ7AkX5O4Yupl5a15T"
            >fill out our feedback form</a
          >
          to share your thoughts or
          <a
            href="https://uaf.us10.list-manage.com/subscribe?u=e42f589030a3adcaddd9b3304&id=a7b255fdd5"
            >sign up for our occasional newsletter</a
          >
          to be notified when new datasets and functionality are added, and when
          this tool is launched.
        </p>
        <h3 class="title is-4">Data layers in development</h3>
        <p>
          The tool currently shows several data layers related to Alaska
          physiography, climate, and engineering. But there’s more in the
          works&mdash;we plan to add data related to:
        </p>
        <ul>
          <li>
            Water (sea temperatures, sea ice, river &amp; coastal ice, tides,
            and more)
          </li>
          <li>Light (sunlight and twilight)</li>
          <li>
            Physiography &amp; Climate (earthquakes, forest types, glaciation,
            climatic zones)
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.centered {
  max-width: 50rem;
  margin: 0 auto;
}
img {
  width: 20vw;
  float: left;
  display: inline-block;
  margin: 2rem;
}
</style>
<script>
export default {
  layout: 'content',
}
</script>
