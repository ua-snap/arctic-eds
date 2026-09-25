<template>
  <section class="box shift-example" aria-labelledby="shift-example-title">
    <div class="shift-example-header">
      <div>
        <p class="eyebrow">What your report leads with · example</p>
        <h2 id="shift-example-title" class="title is-3 mb-1">
          {{ exampleSite.name }}
        </h2>
        <p class="has-text-grey-dark">{{ exampleSite.period }}</p>
      </div>
      <div class="buttons has-addons mb-0" role="group" aria-label="Show">
        <button
          type="button"
          class="button"
          :class="{ 'is-dark is-selected': !showValues }"
          :aria-pressed="!showValues"
          @click="showValues = false"
        >
          Shift
        </button>
        <button
          type="button"
          class="button"
          :class="{ 'is-dark is-selected': showValues }"
          :aria-pressed="showValues"
          @click="showValues = true"
        >
          Values
        </button>
      </div>
    </div>

    <table class="shift-table">
      <caption class="visually-hidden">
        {{
          caption
        }}
      </caption>
      <thead>
        <tr>
          <th scope="col"><span class="visually-hidden">Variable</span></th>
          <th scope="col">
            {{ showValues ? 'Historical → mid-century' : 'Mean shift' }}
          </th>
          <th scope="col" aria-hidden="true">
            <span class="scale-heading"
              ><span>−60%</span><span>no change</span><span>+60%</span></span
            >
          </th>
          <th scope="col">Range across models</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in exampleRows" :key="row.name">
          <th scope="row">
            <span class="is-size-5 has-text-weight-semibold">
              <DefinitionTip
                v-if="row.definition"
                :term="row.name"
                :definition="row.definition"
              />
              <template v-else>{{ row.name }}</template>
            </span>
            <span class="use">{{ row.use }}</span>
          </th>
          <td class="value" :class="`is-${row.tone}`">
            {{ showValues ? row.values : row.shift }}
          </td>
          <td class="range-cell" aria-hidden="true">
            <div v-if="row.bar" class="range">
              <span class="range-track"></span>
              <span class="range-zero"></span>
              <span
                class="range-bar"
                :class="`is-${row.tone}`"
                :style="{
                  left: position(row.low) + '%',
                  width: position(row.high) - position(row.low) + '%',
                }"
              ></span>
              <span
                class="range-mean"
                :class="`is-${row.tone}`"
                :style="{ left: `calc(${position(row.mean)}% - 7px)` }"
              ></span>
            </div>
          </td>
          <td class="note">
            <span class="note-label">Range across models: </span>{{ row.note }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="shift-example-footer">
      <span>Bar = low to high across models and scenarios · dot = mean</span>
      <NuxtLink :to="exampleSite.path"
        >See the full {{ exampleSite.name }} report →</NuxtLink
      >
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import DefinitionTip from '~/components/DefinitionTip'
import { exampleRows, exampleSite } from '~/data/home'

const showValues = ref(false)

const caption = computed(
  () =>
    `${
      showValues.value
        ? 'Historical and mid-century values'
        : 'Mean projected shift from the historical baseline'
    } for ${exampleSite.name}, with the range across models.`
)

// Map a percent change onto the -60%…+60% scale of the range bars.
const position = percent => ((percent + 60) / 120) * 100
</script>

<style lang="scss" scoped>
$cold: #2f5f8a;
$warm: #b4532a;
$wet: #2f64a0;

.shift-example {
  max-width: 1180px;
  margin: 0 auto;
  padding: 1.75rem 2.25rem 1rem;
  box-shadow: none;
  border: 1px solid #dcd8d2;
}
.shift-example-header {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #5c5a58;
}

.shift-table {
  width: 100%;
  border-collapse: collapse;
  // The site-wide table rules set data cells in a monospace face; this table
  // reads as prose.
  font-family: inherit;
  line-height: 1.4;

  th,
  td {
    font-family: inherit;
  }
  thead th {
    font-size: 0.75rem;
    font-weight: 400;
    color: #5c5a58;
    text-align: left;
    padding: 0 1.5rem 0.4rem 0;
  }
  tbody th,
  tbody td {
    padding: 0.9rem 1.5rem 0.9rem 0;
    border-top: 1px solid #ebe8e3;
    vertical-align: middle;
    text-align: left;
  }
  tbody th {
    width: 30%;
    font-weight: 400;
  }
  .use {
    display: block;
    font-size: 0.75rem;
    color: #5c5a58;
  }
  .value {
    width: 18%;
    font-size: 1.25rem;
    font-weight: 600;
    white-space: nowrap;
  }
  .note {
    width: 16%;
    font-size: 0.75rem;
    color: #5c5a58;
  }
  // Shown on phones, where the column headings are hidden.
  .note-label {
    display: none;
  }
}
.scale-heading {
  display: flex;
  justify-content: space-between;
}

.is-cold {
  color: $cold;
  --tone: #{$cold};
}
.is-warm {
  color: $warm;
  --tone: #{$warm};
}
.is-wet {
  color: $wet;
  --tone: #{$wet};
}

.range {
  position: relative;
  height: 26px;

  span {
    position: absolute;
  }
  .range-track {
    left: 0;
    right: 0;
    top: 12px;
    height: 2px;
    background: #e4e1dc;
  }
  .range-zero {
    left: 50%;
    top: 2px;
    width: 2px;
    height: 22px;
    background: #8a847c;
  }
  .range-bar {
    top: 7px;
    height: 12px;
    border-radius: 6px;
    background: var(--tone);
    opacity: 0.28;
  }
  .range-mean {
    top: 6px;
    width: 14px;
    height: 14px;
    border-radius: 7px;
    background: var(--tone);
    border: 2px solid #fff;
  }
}

.shift-example-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  justify-content: space-between;
  border-top: 1px solid #ebe8e3;
  padding-top: 0.9rem;
  font-size: 0.8rem;
  color: #5c5a58;
}

// Phones: stack each row, keep the bar full width under the value.
@media (max-width: 768px) {
  .shift-example {
    padding: 1.25rem 1rem 0.75rem;
  }
  .shift-table {
    thead {
      display: none;
    }
    tbody tr {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0.25rem 1rem;
      padding: 0.9rem 0;
      border-top: 1px solid #ebe8e3;
    }
    tbody th,
    tbody td {
      width: auto;
      padding: 0;
      border: 0;
    }
    .range-cell {
      grid-column: 1 / -1;
    }
    .value,
    .note {
      width: auto;
    }
    .note {
      grid-column: 1 / -1;
    }
    .note-label {
      display: inline;
    }
  }
}
</style>
