<template>
  <div class="container">
    <div class="content is-size-5">
      <h1>Data sources</h1>
      <p>
        Every Arctic-EDS report draws on the datasets below. Each report section
        also links to its own sources, academic references and a CSV download.
      </p>

      <h2>Data API</h2>
      <p>
        The data in every report is also available as JSON or CSV from the
        <a href="https://earthmaps.io">SNAP Data API</a>, for use in your own
        scripts and models.
      </p>

      <h2>Source datasets</h2>
      <ul>
        <li v-for="dataset in datasets" :key="dataset.url">
          <strong>{{ dataset.topic }}:</strong>
          <a :href="dataset.url">{{ dataset.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const catalog =
  'https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/'

// The same catalog records the report sections link to.
const datasets = [
  {
    topic: 'Temperature',
    name: 'Historical Monthly and Derived Temperature Products',
    url: catalog + '3b2b24ff-4916-4d92-95b7-c6b2fcefd381',
  },
  {
    topic: 'Temperature',
    name: 'Projected Monthly and Derived Temperature Products',
    url: catalog + 'ba834996-ad15-4785-9b43-ef2af86a5ad9',
  },
  {
    topic: 'Degree days',
    name: 'Degree Days: Freezing Index, Thawing Index, Heating Degree Days, and Degree Days Below 0°F',
    url: catalog + 'f9831074-cd3f-4c06-8601-687bd2911b7e',
  },
  {
    topic: 'Precipitation',
    name: 'Historical Monthly and Derived Precipitation Products',
    url: catalog + '9eeef879-42ee-4bbe-a54e-435716ad0c90',
  },
  {
    topic: 'Precipitation',
    name: 'Projected Monthly and Derived Precipitation Products',
    url: catalog + 'f44595c8-5384-4c02-9ab4-f7a9c43e92eb',
  },
  {
    topic: 'Design storms',
    name: 'Annual maximum precipitation projections for Alaska',
    url: catalog + '304b6d89-961e-417d-b6ba-4139c7fe5ff6',
  },
  {
    topic: 'Snowfall',
    name: 'Historical Decadal Averages of Monthly Snowfall Equivalent 771m CRU TS3.0/TS3.1',
    url: catalog + '557db5d5-dbeb-470a-a9c4-b80d78aa8668',
  },
  {
    topic: 'Snowfall',
    name: 'Projected Decadal Averages of Monthly Snowfall Equivalent 771m CMIP5/AR5',
    url: catalog + '7c0c1a65-794e-4770-aa72-4628d357808e',
  },
  {
    topic: 'Hydrology',
    name: 'Alaska VIC Hydrologic Model Output (1950-2099): Decadal Averages of Monthly Summaries',
    url: catalog + '2610188c-aa38-4f47-8987-b36ec72cdd0d',
  },
  {
    topic: 'Permafrost',
    name: 'GIPL Permafrost Model Output',
    url: catalog + 'c24a957b-8a56-40bf-bc09-43a567182d36',
  },
]
</script>
