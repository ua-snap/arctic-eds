<template>
  <!--
    The report's lead: how far each design parameter shifts by mid-century,
    with the range across models. The home page shows a picture of this
    block for Fairbanks (assets/images/sample-report.png).
  -->
  <section id="summary" class="report-summary" aria-labelledby="summary-title">
    <p class="eyebrow">Summary</p>
    <h2
      id="summary-title"
      class="title is-4 is-size-5-mobile mb-4 has-text-weight-normal"
    >
      Mid-century (2040&ndash;2069) vs. 1980&ndash;2009 baseline
    </h2>

    <table class="shift-table">
      <caption class="is-sr-only">
        Mean projected shift from the 1980&ndash;2009 baseline, with the range
        across models and scenarios.
      </caption>
      <thead>
        <tr>
          <th scope="col"><span class="is-sr-only">Parameter</span></th>
          <th scope="col">Mean shift</th>
          <th scope="col" aria-hidden="true">
            <span class="scale-heading"
              ><span>&minus;{{ scale }}%</span><span>no change</span
              ><span>+{{ scale }}%</span></span
            >
          </th>
          <th scope="col">Range across models</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <th scope="row">
            <a :href="`#${row.section}`" class="name">{{ row.name }}</a>
            <span class="use">{{ row.use }}</span>
          </th>
          <td class="value" :class="`is-${row.tone}`">{{ row.shift }}</td>
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
            <span v-if="row.bar" class="note-label">Range across models: </span
            >{{ row.note }}
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="designStorm" class="design-storm">
      <a href="#precipitation-frequency" class="name">Design storm</a>
      (24-hour, 100-year, 2050&ndash;2079): {{ designStorm }} across the two
      models. No historical design storm is available to compare with.
    </p>

    <p v-if="rows.some(row => row.bar)" class="summary-footer">
      Each model and scenario&rsquo;s 2040&ndash;2069 average vs. the
      1980&ndash;2009 baseline &middot; bar = lowest to highest &middot; dot =
      mean
    </p>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { formatNumber, formatSigned } from '~/utils/chart'

const {
  results,
  isFreezingIndexPresent,
  isThawingIndexPresent,
  isHeatingDegreeDaysPresent,
  isPrecipitationPresent,
  isPrecipitationFrequencyPresent,
} = storeToRefs(useReportStore())
const unit = useUnitLabels()

const percent = value => formatSigned(value * 100) + '%'

// Every row uses one method: each model and scenario's 2040–2069 mean is
// compared with the 1980–2009 baseline mean. The dot is the average of those
// changes and the bar runs from the lowest to the highest. Without the API's
// per-model means (model_means), the row shows the pooled mean and no range.
function shiftRow(row, baseline, pooledMean, modelMeans) {
  const means = Object.values(modelMeans ?? {}).flatMap(scenarios =>
    Object.values(scenarios)
  )
  if (!means.length) {
    const mean = pooledMean / baseline - 1
    return { ...row, bar: false, shift: percent(mean), note: row.note ?? '—' }
  }
  const changes = means.map(value => value / baseline - 1)
  const mean = changes.reduce((sum, c) => sum + c, 0) / changes.length
  const [low, high] = [Math.min(...changes), Math.max(...changes)]
  return {
    ...row,
    bar: true,
    mean,
    low,
    high,
    shift: percent(mean),
    note: `${percent(low)} to ${percent(high)}`,
  }
}

function degreeDayRow(key, row) {
  const { summary, model_means } = results.value[key]
  return shiftRow(
    row,
    summary.modeled_baseline.ddmean,
    summary['2040-2069'].ddmean,
    model_means?.['2040-2069']
  )
}

function precipitationRow() {
  const { summary, model_means } = results.value.precipitation
  // The API's 1980–2009 summary matches the degree days' baseline years;
  // older responses only have the full 1901–2015 record.
  const baseline = summary['1980-2009'] ?? summary.historical
  return shiftRow(
    {
      name: 'Annual precipitation',
      use: 'drainage, water supply',
      section: 'annual-precipitation',
      tone: 'wet',
      ...(!summary['1980-2009'] && { note: 'vs. the 1901–2015 average' }),
    },
    baseline.prmean,
    summary['2040-2069'].prmean,
    model_means?.['2040-2069']
  )
}

// Design storm: the 24-hour, 100-year depth from each model, 2050–2079. The
// API has no historical design storm to compare with, so this sits under the
// table rather than in it.
const designStorm = computed(() => {
  if (!isPrecipitationFrequencyPresent.value) return null
  const models = results.value.precip_frequency['100']['24h']
  const depths = Object.values(models)
    .map(eras => eras['2050-2079'].pf)
    .sort((a, b) => a - b)
  const digits = unit.value.metric ? 0 : 1
  const range = depths.map(d => formatNumber(d, digits)).join('–')
  return `${range} ${unit.value.depth}`
})

const rows = computed(() =>
  [
    isFreezingIndexPresent.value &&
      degreeDayRow('freezing_index', {
        name: 'Freezing index',
        use: 'roads, embankments, frost depth',
        section: 'freezing-index',
        tone: 'cold',
      }),
    isThawingIndexPresent.value &&
      degreeDayRow('thawing_index', {
        name: 'Thawing index',
        use: 'permafrost, thaw settlement',
        section: 'thawing-index',
        tone: 'warm',
      }),
    isHeatingDegreeDaysPresent.value &&
      degreeDayRow('heating_degree_days', {
        name: 'Heating degree days',
        use: 'building energy, fuel',
        section: 'heating-degree-days',
        tone: 'warm',
      }),
    isPrecipitationPresent.value && precipitationRow(),
  ].filter(Boolean)
)

// The bars run from −scale% to +scale%: 60%, or wider in steps of 20% when a
// range runs past it.
const scale = computed(() => {
  const extremes = rows.value
    .filter(row => row.bar)
    .flatMap(row => [row.low, row.high])
    .map(v => Math.abs(v * 100))
  return Math.max(60, Math.ceil(Math.max(0, ...extremes) / 20) * 20)
})

// Maps a change (0.26 for +26%) onto the bar, as a percent of its width.
const position = change =>
  ((change * 100 + scale.value) / (2 * scale.value)) * 100
</script>

<style lang="scss" scoped>
$cold: #2f5f8a;
$warm: #b4532a;
$wet: #2f64a0;
$muted: #5c5a58;
$rule: #ebe8e3;

.report-summary {
  margin: 2rem 0 0.5rem;
  padding: 1.75rem 2.25rem 1rem;
  border: 1px solid #dcd8d2;
  border-radius: 10px;
  background: #fff;
  scroll-margin-top: 1rem;
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
    padding: 0 1.5rem 0.4rem 0;
    font-size: 0.75rem;
    font-weight: 400;
    color: $muted;
    text-align: left;
  }
  tbody th,
  tbody td {
    padding: 0.9rem 1.5rem 0.9rem 0;
    border-top: 1px solid $rule;
    vertical-align: middle;
    text-align: left;
  }
  tbody th {
    width: 30%;
    font-weight: 400;
  }
  .name {
    font-size: 1.25rem;
    font-weight: 600;
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
  .use {
    display: block;
    font-size: 0.75rem;
    color: $muted;
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
    color: $muted;
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
    border: 2px solid #fff;
    border-radius: 7px;
    background: var(--tone);
  }
}

.design-storm {
  padding: 0.9rem 0;
  border-top: 1px solid $rule;
  font-size: 0.875rem;

  .name {
    font-weight: 600;
  }
}

.summary-footer {
  padding-top: 0.9rem;
  border-top: 1px solid $rule;
  font-size: 0.8rem;
  color: $muted;
}

// Phones: stack each row, keep the bar full width under the value.
@media (max-width: 768px) {
  .report-summary {
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
      border-top: 1px solid $rule;
    }
    tbody th,
    tbody td {
      width: auto;
      padding: 0;
      border: 0;
    }
    .range-cell,
    .note {
      grid-column: 1 / -1;
    }
    .value,
    .note {
      width: auto;
    }
    .note-label {
      display: inline;
    }
  }
}
</style>
