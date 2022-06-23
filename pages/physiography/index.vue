<template>
  <div class="container">
    <section class="section">
      <div class="columns">
        <div class="column is-one-quarter">
          <img src="~/assets/images/PHYS_alaska_dem.jpg" />
          <div class="content is-size-5">
            <ul>
              <li>
                <NuxtLink to="/physiography/ecoregions">Ecoregions</NuxtLink>
              </li>
              <li><NuxtLink to="/physiography/geology">Geology</NuxtLink></li>
              <li>
                <NuxtLink to="/physiography/permafrost">Permafrost</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <h3 class="title is-3">Physiography</h3>
          <div class="content is-size-5">
            <p>
              Physiography is the large-scale topography of an area. Alaska is
              divided into four major divisions from south to north: the Pacific
              Mountain System, the Intermontane Plateaus, the Rocky Mountain
              System, and the Interior Plains (Arctic Coastal Plain).
            </p>
            <p>
              The Pacific Mountain System consists of two arcs. The more
              northerly includes the Coast Mountains between southeastern Alaska
              and Canada, the Alaska Range, the Aleutian Range, and the Aleutian
              Islands. The southern arc consists of the island range of
              southeastern Alaska, the Fairweather Range, the St. Elias
              Mountains, the Kenai-Chugach Mountains and Kodiak Island. Between
              the two arcs is a trough composed of the Inland Passage, the
              Copper River Lowlands, the Cook Inlet&ndash;Susitna Lowlands and
              Shelikof Strait. This trough is broken by the Wrangell and
              Talkeetna Mountains.
            </p>
            <p>
              The Intermontane Plateaus lie north and west of the ·Alaska Range.
              They consist of dissected uplands, broad valleys, and lowland
              basins floored with alluvial deposits. The great river systems of
              the Yukon, Koyukuk, Porcupine, Tanana, and Kuskokwim Rivers flow
              through this area.
            </p>
            <p>
              The Brooks Range rises to over 9,000 feet in the east but is lower
              to the west. Glaciation during the Pleistocene carved this rugged
              landform, which persists with little change. The arctic foothills
              to the north consist of rolling plateaus and low mountains.
            </p>
            <p>
              The Arctic Coastal Plain, an extension of the Great Plains
              consists of a broad level plain underlain with permafrost and
              pockmarked by thousands of shallow lakes and swamps.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
export default {
  name: 'Physiography',
  layout: 'category',
  created: function () {},
}
</script>
