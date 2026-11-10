<template>
  <!-- Rows of October–March values with a whole-season column. -->
  <div class="table-container season-table-wrap">
    <table class="table is-narrow is-fullwidth season-table">
      <caption>
        {{
          caption
        }}
      </caption>
      <thead>
        <tr>
          <th scope="col">{{ rowHeading }}</th>
          <th v-for="month in seasonMonths" :key="month.key" scope="col">
            {{ month.label }}
          </th>
          <th v-if="hasSeasonal" scope="col">Season</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.label">
          <th scope="row">{{ row.label }}</th>
          <td
            v-for="month in seasonMonths"
            :key="month.key"
            :class="{ 'is-zero': row.monthly?.[month.key] === 0 }"
          >
            {{ show(row.monthly?.[month.key], row) }}
          </td>
          <td v-if="hasSeasonal" class="season-cell">
            {{ show(row.seasonal, row) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatNumber } from '~/utils/chart'
import { seasonMonths } from '~/utils/azcot'

const props = defineProps({
  caption: String,
  // Heading over the row labels, e.g. "Threshold".
  rowHeading: { type: String, default: '' },
  // [{ label, monthly: { oct, ..., mar }, seasonal, digits }]
  rows: Array,
  // Decimal places, unless a row sets its own.
  digits: { type: Number, default: 1 },
})

const hasSeasonal = computed(() =>
  props.rows.some(row => row.seasonal !== undefined)
)

function show(value, row) {
  if (!Number.isFinite(value)) return '—'
  return formatNumber(value, row.digits ?? props.digits)
}
</script>

<style lang="scss">
.season-table-wrap {
  margin-top: 1.25rem;
}
.season-table {
  font-size: 0.85rem;

  // Tables are set to line-height 1 site-wide, which clips the degree sign
  // on the first line of a wrapped caption.
  caption {
    line-height: 1.35;
  }

  th[scope='row'] {
    line-height: 1.25;
  }
  td {
    text-align: right;
  }
  td.is-zero {
    color: #a8a4a0;
  }
  .season-cell {
    font-weight: 700;
  }
}
</style>
