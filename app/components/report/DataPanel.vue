<template>
  <!-- The card beside each report section: download, tools, method, sources. -->
  <aside class="data-panel" :aria-label="`About the ${topic} data`">
    <h3 class="panel-heading">Get the data</h3>
    <a
      v-for="download in downloads"
      :key="download.endpoint"
      class="button is-primary is-fullwidth download-button no-print"
      :href="csvUrl(download.endpoint)"
    >
      <span>{{ download.label || 'Download CSV' }}</span>
      <span aria-hidden="true">&darr;</span>
    </a>
    <p class="panel-note">{{ note }}</p>

    <template v-if="calculations && calculations.length">
      <h3 class="panel-heading">Use it in a calculation</h3>
      <ul class="calc-links">
        <li v-for="calc in calculations" :key="calc.href">
          <a :href="calc.href" target="_blank" rel="noopener">
            <span>{{ calc.label }}</span>
            <span aria-hidden="true">&nearr;</span>
            <span class="is-sr-only">(opens in a new tab)</span>
          </a>
        </li>
      </ul>
    </template>

    <hr />
    <h3 class="panel-heading">How it was made</h3>
    <dl class="made">
      <template v-for="[term, detail] in made" :key="term">
        <dt>{{ term }}</dt>
        <dd>{{ detail }}</dd>
      </template>
    </dl>

    <hr />
    <h3 class="panel-heading">Sources</h3>
    <ul class="sources">
      <li v-for="source in sources" :key="source.href">
        <a :href="source.href"
          >{{ source.label }}&nbsp;<span aria-hidden="true">&nearr;</span></a
        >
      </li>
    </ul>
    <p v-for="reference in references" :key="reference.href" class="citation">
      <span :title="reference.full">{{ reference.text }}</span
      >.
      <a :href="reference.href">{{ reference.linkText || 'DOI' }}</a>
    </p>
  </aside>
</template>

<script setup>
const props = defineProps({
  // Names the panel for screen readers, e.g. "air temperature".
  topic: String,
  // [{ endpoint, label }]: CSV downloads from the API.
  downloads: Array,
  // What the download holds, e.g. "Monthly min / mean / max · CSV, ~363 kB".
  note: String,
  // [{ label, href }]: ARDAC notebooks that use this data.
  calculations: Array,
  // [[term, detail]]: models, scenarios, baseline, grid, method.
  made: Array,
  // [{ label, href }]: catalog records and reports.
  sources: Array,
  // [{ text, full, href, linkText }]: a short citation, the full one, and
  // its DOI (or other link, named by linkText).
  references: Array,
})

const csvUrl = useCsvUrl()
</script>
