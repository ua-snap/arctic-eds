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
          <td class="value">{{ row.shift }}</td>
          <td class="range-cell" aria-hidden="true">
            <div v-if="row.bar" class="range">
              <span class="range-track"></span>
              <span class="range-zero"></span>
              <span
                class="range-bar"
                :style="{
                  left: position(row, row.low) + '%',
                  width: position(row, row.high) - position(row, row.low) + '%',
                }"
              ></span>
              <span
                class="range-mean"
                :style="{ left: `calc(${position(row, row.mean)}% - 7px)` }"
              ></span>
            </div>
            <span v-if="row.bar && row.scale" class="row-scale"
              ><span>{{ row.scale.low }}</span
              ><span>{{ row.scale.high }}</span></span
            >
          </td>
          <td class="note">
            <span v-if="row.bar" class="note-label">Range across models: </span
            >{{ row.note }}
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="rows.some(row => row.bar)" class="summary-footer">
      Each model and scenario&rsquo;s 2040&ndash;2069 average vs. the
      1980&ndash;2009 baseline &middot; bar = lowest to highest &middot; dot =
      mean<template v-if="rows.some(row => row.bar && row.scale)">
        &middot; air temperature changes in degrees, on its own scale</template
      >
    </p>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { formatSigned } from '~/utils/chart'

const {
  results,
  isTemperaturePresent,
  isFreezingIndexPresent,
  isThawingIndexPresent,
  isHeatingDegreeDaysPresent,
  isPrecipitationPresent,
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
      ...(!summary['1980-2009'] && { note: 'vs. the 1901–2015 average' }),
    },
    baseline.prmean,
    summary['2040-2069'].prmean,
    model_means?.['2040-2069']
  )
}

// Air temperature: a change in degrees rather than a percentage, which means
// little near 0°. The API summarizes each model by month, so a model's annual
// mean is the mean of its twelve monthly means; the 5-model average isn't a
// model and is left out. The bar has its own scale, ±5° or wider in 5° steps.
function temperatureRow() {
  const { summary } = results.value.temperature
  const recent = summary['1980-2009']?.Annual
  const baseline =
    recent?.tasmean ?? summary.historical['CRU-TS'].historical.Annual.tasmean
  const degrees = value => formatSigned(value, 1) + unit.value.temp
  const means = Object.entries(summary.projected)
    .filter(([model]) => model !== '5ModelAvg')
    .flatMap(([, scenarios]) => Object.values(scenarios))
    .map(months =>
      Object.entries(months)
        .filter(([month]) => month !== 'Annual')
        .map(([, eras]) => eras['2040-2069']?.tasmean)
    )
    .filter(values => values.length === 12 && values.every(Number.isFinite))
    .map(values => values.reduce((sum, v) => sum + v, 0) / 12)
  const row = {
    name: 'Air temperature',
    use: 'design temperatures, building energy',
    section: 'temperature',
  }
  if (!means.length) {
    return { ...row, bar: false, shift: '—', note: '—' }
  }
  const changes = means.map(value => value - baseline)
  const mean = changes.reduce((sum, c) => sum + c, 0) / changes.length
  const [low, high] = [Math.min(...changes), Math.max(...changes)]
  // Sized from the values as shown (to 0.1°), so +10.0° fits a ±10° scale.
  const extreme = Number(Math.max(Math.abs(low), Math.abs(high)).toFixed(1))
  const half = Math.max(5, Math.ceil(extreme / 5) * 5)
  return {
    ...row,
    bar: true,
    mean,
    low,
    high,
    scale: {
      half,
      low: `−${half}${unit.value.temp}`,
      high: `+${half}${unit.value.temp}`,
    },
    shift: degrees(mean),
    note: recent
      ? `${degrees(low)} to ${degrees(high)}`
      : `${degrees(low)} to ${degrees(high)} vs. the 1901–2015 average`,
  }
}

// A row whose data is missing or unexpected is left out rather than taking
// the whole summary down; its own section shows the error.
function safely(build) {
  try {
    return build()
  } catch (error) {
    console.error('Summary row failed', error)
    return null
  }
}

const rows = computed(() =>
  [
    isTemperaturePresent.value && safely(temperatureRow),
    isFreezingIndexPresent.value &&
      safely(() =>
        degreeDayRow('freezing_index', {
          name: 'Freezing index',
          use: 'roads, embankments, frost depth',
          section: 'freezing-index',
        })
      ),
    isThawingIndexPresent.value &&
      safely(() =>
        degreeDayRow('thawing_index', {
          name: 'Thawing index',
          use: 'permafrost, thaw settlement',
          section: 'thawing-index',
        })
      ),
    isHeatingDegreeDaysPresent.value &&
      safely(() =>
        degreeDayRow('heating_degree_days', {
          name: 'Heating degree days',
          use: 'building energy, fuel',
          section: 'heating-degree-days',
        })
      ),
    isPrecipitationPresent.value && safely(precipitationRow),
  ].filter(Boolean)
)

// The percentage bars run from −scale% to +scale%: 60%, or wider in steps of
// 20% when a range runs past it.
const scale = computed(() => {
  const extremes = rows.value
    .filter(row => row.bar && !row.scale)
    .flatMap(row => [row.low, row.high])
    .map(v => Math.abs(v * 100))
  return Math.max(60, Math.ceil(Math.max(0, ...extremes) / 20) * 20)
})

// Maps a change onto its row's bar, as a percent of the bar's width: 0.26
// for +26% on the shared scale, or degrees on a row's own scale.
function position(row, change) {
  if (row.scale) return ((change / row.scale.half + 1) / 2) * 100
  return ((change * 100 + scale.value) / (2 * scale.value)) * 100
}
</script>

<style lang="scss" scoped>
$muted: #5c5a58;
$bar: #4d4d4d;
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

// The ends of a row's own scale, under its bar.
.row-scale {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  line-height: 1;
  color: $muted;
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
    background: $bar;
    opacity: 0.28;
  }
  .range-mean {
    top: 6px;
    width: 14px;
    height: 14px;
    border: 2px solid #fff;
    border-radius: 7px;
    background: $bar;
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
