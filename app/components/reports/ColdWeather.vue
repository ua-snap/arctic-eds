<template>
  <ReportSection id="cold-weather" title="Cold-Weather Operations">
    <template #lede>{{ lede }}</template>

    <!-- TODO: Remove this when the API endpoint is generated. -->
    <p v-if="meta.mock" class="azcot-notice">
      <strong>Preview.</strong> These are sample values for
      {{ meta.query.name }} from a mock AZCOT API response, shown on every
      report until the API is available.
    </p>

    <div class="grid-cell">
      <ClientOnly>
        <GridCellMap
          :label="`Map of the ${grid.cell.ns} × ${grid.cell.ew} km grid cell around ${meta.query.name}`"
          :point="meta.query"
          :point-label="meta.query.name"
          :cells="[
            {
              ...meta.grid_cell,
              degrees: gridDegrees(meta.grid_cell),
              label: 'ERA5 cell',
              color: '#1f1d1b',
            },
            {
              ...meta.snow_depth_grid_cell,
              degrees: gridDegrees(meta.snow_depth_grid_cell),
              label: 'Snow depth cell',
              color: '#0072b2',
              dashed: true,
            },
          ]"
        />
      </ClientOnly>
      <div class="grid-cell-note">
        <h3 class="chart-heading">Coarse, area-wide data</h3>
        <p v-for="paragraph in gridParagraphs" :key="paragraph">
          {{ paragraph }}
        </p>
      </div>
    </div>

    <div class="chart-controls">
      <SegmentedControl
        v-model="view"
        label="Show"
        hide-label
        :options="viewOptions"
      />
    </div>

    <!-- Climate-limit verdicts -->
    <template v-if="view == 'limits'">
      <h3 class="chart-heading">Climate limits, October&ndash;March</h3>
      <ul class="verdict-legend">
        <li v-for="(text, key) in verdicts.legend" :key="key">
          <span class="verdict" :class="verdictClass(key)">{{
            verdictLabel(key)
          }}</span>
          {{ verdictDefinitions[key] ?? tidyText(text) }}
        </li>
      </ul>
      <div class="table-container">
        <table class="table is-narrow is-fullwidth verdict-table">
          <caption class="is-sr-only">
            Climate-limit verdicts by month
          </caption>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Limit</th>
              <th v-for="month in seasonMonths" :key="month.key" scope="col">
                {{ month.label }}
              </th>
              <th scope="col">Season</th>
            </tr>
          </thead>
          <tbody v-for="group in verdictGroups" :key="group.category">
            <tr class="verdict-group">
              <th :colspan="seasonMonths.length + 3" scope="rowgroup">
                {{ group.category }}
              </th>
            </tr>
            <tr v-for="item in group.items" :key="item.id">
              <th scope="row">{{ itemName(item) }}</th>
              <td class="verdict-limit">
                {{ limitText(item) }}
                <span v-if="limitMeasure(item)" class="verdict-measure">{{
                  limitMeasure(item)
                }}</span>
              </td>
              <td v-for="month in seasonMonths" :key="month.key">
                <span
                  class="verdict"
                  :class="verdictClass(item.by_month?.[month.key])"
                  >{{ verdictLabel(item.by_month?.[month.key]) }}</span
                >
              </td>
              <td>
                <span
                  class="verdict is-strong"
                  :class="verdictClass(item.verdict)"
                  >{{ verdictLabel(item.verdict) }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="chart-note">{{ limitsNote }}</p>
    </template>

    <!-- Design cold and cold zones -->
    <template v-else-if="view == 'cold'">
      <dl class="stat-tiles">
        <div class="stat-tile">
          <dt>AR 70-38 design type</dt>
          <dd>{{ zones.ar70_38_design_type.value }}</dd>
        </div>
        <div class="stat-tile">
          <dt>1% design cold, {{ coldestMonthName }}</dt>
          <dd>{{ temp(zones.design_cold.coldest_month['1pct']) }}</dd>
        </div>
        <div class="stat-tile">
          <dt>Record low, 1991&ndash;2020</dt>
          <dd>
            {{ temp(zones.record_low.value) }}
            <span class="stat-detail">{{
              monthName(zones.record_low.month)
            }}</span>
          </dd>
        </div>
        <div class="stat-tile">
          <dt>ATP 3-90.96 cold zone</dt>
          <dd>
            {{ zones.atp_cold_zone.typical }}
            <span class="stat-detail"
              >typical &middot; {{ zones.atp_cold_zone.design }} design &middot;
              {{ zones.atp_cold_zone.record }} record</span
            >
          </dd>
        </div>
      </dl>

      <SeasonTable
        caption="Design cold: the coldest 1% of hours are below this, °F"
        :rows="[
          {
            label: '1% design cold',
            monthly: zones.design_cold.monthly['1pct'],
          },
        ]"
        :digits="0"
      />
      <SeasonTable
        caption="Share of hours at or below each air temperature, %"
        row-heading="At or below"
        :rows="
          thresholdRows(exceedance.air_temperature_at_or_below, '°F', 'below')
        "
      />
      <SeasonTable
        caption="Freeze–thaw days (above and below 32°F on the same day), days per year"
        :rows="[{ label: 'Freeze–thaw days', ...freezeThaw, digits: 0 }]"
      />
      <p class="chart-note">{{ designColdNote }}</p>
      <p class="chart-note">References: {{ designColdReferences }}</p>
    </template>

    <!-- Daily climatology -->
    <template v-else-if="view == 'daily'">
      <div class="chart-controls">
        <label class="chart-select">
          Variable
          <select v-model="variable">
            <option
              v-for="option in dailyVariables"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }} ({{
                unitSymbol(climatology[option.value].units)
              }})
            </option>
          </select>
        </label>
      </div>
      <h3 class="chart-heading">{{ dailyVariable.title }} ({{ dailyUnit }})</h3>
      <div class="chart-legend" aria-hidden="true">
        <span
          ><span class="swatch" :style="{ background: palette.cool }" />Mean for
          the day</span
        >
        <span
          ><span
            class="swatch is-square"
            :style="{ background: palette.coolBand }"
          />Lowest to highest hour in 30 years</span
        >
      </div>
      <SeasonChart
        :title="`${dailyVariable.title}, ${dailyUnit}, by day, 1991–2020`"
        :line="{
          label: 'Mean for the day',
          values: dailyValues(daily.mean.daily),
          color: palette.cool,
        }"
        :band="{
          label: 'Lowest to highest hour in 30 years',
          lower: dailyValues(daily.min.daily),
          upper: dailyValues(daily.max.daily),
          color: palette.coolBand,
        }"
        :references="dailyReferences"
        :unit="dailyUnit.startsWith('°') ? dailyUnit : ` ${dailyUnit}`"
      />
      <p class="chart-note">
        Each day pools 720 hourly values (30 years &times; 24 hours).
        {{ dailyVariable.note }}
      </p>
      <SeasonTable
        v-if="variable == 'wind_speed'"
        caption="Share of hours with hourly-mean 10 m wind above each speed, %"
        row-heading="Above"
        :rows="thresholdRows(exceedance.wind_speed_above, ' kn', 'above')"
      />
      <details class="chart-table">
        <summary>Show the monthly numbers</summary>
        <SeasonTable
          :caption="`${dailyVariable.title} by month, ${dailyUnit}`"
          :rows="[
            { label: 'Lowest', ...daily.min },
            { label: 'Mean', ...daily.mean },
            { label: 'Highest', ...daily.max },
          ]"
        />
      </details>
    </template>

    <!-- Wind chill and frostbite -->
    <template v-else-if="view == 'frostbite'">
      <h3 class="chart-heading">{{ frostbiteTitle }}, share of hours</h3>
      <div class="chart-legend">
        <span v-for="cls in frostbiteClasses" :key="cls.key"
          ><span
            class="swatch is-square"
            :style="{ background: cls.color }"
          />{{ cls.label }}
          <span class="has-text-grey">({{ cls.minutes }})</span></span
        >
      </div>
      <div
        class="frostbite-rows"
        role="img"
        :aria-label="`${frostbiteTitle}: share of hours in each danger level by month; see the table below for values`"
      >
        <div
          v-for="row in frostbiteRows"
          :key="row.label"
          class="frostbite-row"
        >
          <span class="frostbite-month">{{ row.label }}</span>
          <span class="frostbite-bar">
            <span
              v-for="cls in frostbiteClasses"
              :key="cls.key"
              class="frostbite-segment"
              :style="{
                width: `${row.shares[cls.key]}%`,
                background: cls.color,
              }"
            />
          </span>
        </div>
      </div>
      <p class="chart-note">{{ frostbiteNote }}</p>
      <SeasonTable
        caption="Share of hours in each frostbite danger level, %"
        row-heading="Danger level"
        :rows="
          frostbiteClasses.map(cls => ({
            label: cls.label,
            ...frostbite.share[cls.key],
          }))
        "
      />
      <SeasonTable
        caption="Share of hours with wind chill at or below each temperature, %"
        row-heading="At or below"
        :rows="thresholdRows(exceedance.wind_chill_at_or_below, '°F', 'below')"
      />
      <p class="chart-note">{{ windChillNote }}</p>
    </template>

    <!-- Snow loads -->
    <template v-else-if="view == 'snow'">
      <SeasonTable
        caption="Share of hours with snowpack load at or above each value, %"
        row-heading="At or above"
        :rows="
          thresholdRows(exceedance.snow_load_at_or_above, ' lb/ft²', 'above')
        "
      />
      <SeasonTable
        caption="Share of hours with snow depth above each value, %"
        row-heading="Above"
        :rows="thresholdRows(exceedance.snow_depth_above, ' in', 'above')"
      />
      <p class="chart-note">{{ snowLoadNote }}</p>
    </template>

    <template #panel>
      <DataPanel
        topic="cold-weather operations"
        note="AZCOT point data are not yet available to download. Values are in US customary units whatever the report's units setting."
        :made="[
          ['Data', 'ERA5 hourly reanalysis, reprocessed for AZCOT'],
          ['Period', meta.climatology_period],
          [
            'Grid',
            `ERA5 ${gridCellText(meta.grid_cell, grid.cell)}. ` +
              `Snow depth: ERA5-Land ${gridCellText(
                meta.snow_depth_grid_cell,
                grid.snowCell
              )}`,
          ],
          ['Method', 'ERDC/CRREL TR-26-5 and SR-25-2'],
        ]"
        :caveats="caveats"
        :sources="[
          {
            label: 'AZCOT data processing (GitHub)',
            href: 'https://github.com/ua-snap/AZCOT',
          },
        ]"
      />
    </template>
  </ReportSection>
</template>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import ReportSection from '~/components/report/ReportSection'
import DataPanel from '~/components/report/DataPanel'
import SegmentedControl from '~/components/report/SegmentedControl'
import SeasonTable from '~/components/report/SeasonTable'
import SeasonChart from '~/components/charts/SeasonChart'
import GridCellMap from '~/components/report/GridCellMap'
import { formatNumber, palette } from '~/utils/chart'
import {
  cellSize,
  dailyValues,
  gridDegrees,
  seasonMonths,
  tidyText,
  unitSymbol,
} from '~/utils/azcot'
import {
  caveats,
  dailyVariables,
  designColdNote,
  designColdReferences,
  frostbiteNote,
  frostbiteTimes,
  frostbiteTitle,
  gridNote,
  limitsNote,
  snowLoadNote,
  verdictDefinitions,
  windChillNote,
} from '~/data/azcot'

const { azcot } = storeToRefs(useReportStore())

const meta = computed(() => azcot.value.metadata)
const climatology = computed(() => azcot.value.climatology)
const zones = computed(() => azcot.value.design_and_zones)
const exceedance = computed(() => azcot.value.exceedance)
const frostbite = computed(() => azcot.value.frostbite)
const verdicts = computed(() => azcot.value.climate_limit_verdicts)

const viewOptions = [
  { value: 'limits', label: 'Climate limits' },
  { value: 'cold', label: 'Design cold' },
  { value: 'daily', label: 'Daily climate' },
  { value: 'frostbite', label: 'Wind chill & frostbite' },
  { value: 'snow', label: 'Snow loads' },
]
const view = ref('limits')

const monthName = key => seasonMonths.find(m => m.key == key)?.name ?? key
const temp = value => `${formatNumber(value, 0)}°F`
const coldestMonthName = computed(() =>
  monthName(zones.value.coldest_month.month)
)

const verdictNames = { OK: 'OK', CAUTION: 'Caution', NO: 'No', 'N/A': 'N/A' }
const verdictLabel = verdict => verdictNames[verdict] ?? '—'
const verdictClass = verdict =>
  ({
    OK: 'is-ok',
    CAUTION: 'is-caution',
    NO: 'is-no',
  }[verdict] ?? 'is-na')

const verdictGroups = computed(() => {
  const groups = []
  for (const item of verdicts.value.items) {
    let group = groups.find(g => g.category == item.category)
    if (!group) {
      group = { category: item.category, items: [] }
      groups.push(group)
    }
    group.items.push(item)
  }
  return groups
})

function limitText(item) {
  if (item.limit.value == null) return 'No limit'
  return `${formatNumber(item.limit.value, 0)} ${unitSymbol(item.limit.units)}`
}

// Item names without the limit in parentheses, which the Limit column
// already shows, e.g. "Life-sustaining structures (25 lbf/ft2)".
const itemName = item => item.item.replace(/\s*\([^)]*\)\s*$/, '')

// What the limit is compared with, from its test, e.g. "one storm total at
// or above the limit" becomes "storm total".
function limitMeasure(item) {
  if (item.limit.value == null || !item.limit.test) return ''
  return item.limit.test
    .replace(/^one /, '')
    .replace(/ (at or )?above the limit$/, '')
}

const freezeThaw = computed(() => climatology.value.freeze_thaw_days.value)

// Rows for an exceedance table, sorted by threshold rather than key order:
// JavaScript lists keys like "0" and "32" before "-20", whatever the API's
// order. 'below' runs warmest first, 'above' smallest first, so the shares
// shrink down the table either way.
function thresholdRows(block, suffix, direction) {
  const sign = direction == 'below' ? -1 : 1
  return Object.entries(block.thresholds)
    .map(([threshold, values]) => ({ threshold: Number(threshold), values }))
    .sort((a, b) => sign * (a.threshold - b.threshold))
    .map(({ threshold, values }) => ({
      label: `${formatNumber(threshold, 0)}${suffix}`,
      monthly: values.monthly,
      seasonal: values.seasonal,
    }))
}

const variable = ref('air_temperature')
const daily = computed(() => climatology.value[variable.value])
const dailyVariable = computed(() =>
  dailyVariables.find(v => v.value == variable.value)
)
const dailyUnit = computed(() => unitSymbol(daily.value.units))
const dailyReferences = computed(() =>
  ['air_temperature', 'wind_chill'].includes(variable.value)
    ? [{ value: 32, label: '32°F' }]
    : []
)

// The Climate limits colors (No, Caution, OK), which are colorblind safe.
const frostbiteColors = {
  red: '#d55e00',
  amber: '#f0e442',
  green: '#0072b2',
  none: '#e3dfd8',
}
const frostbiteClasses = computed(() =>
  ['red', 'amber', 'green', 'none'].map(key => ({
    key,
    label: frostbite.value.classes[key].label,
    minutes:
      frostbiteTimes[key] ?? tidyText(frostbite.value.classes[key].minutes),
    color: frostbiteColors[key],
  }))
)
const frostbiteRows = computed(() => {
  const share = frostbite.value.share
  const row = (label, get) => ({
    label,
    shares: Object.fromEntries(
      ['red', 'amber', 'green', 'none'].map(key => [key, get(share[key])])
    ),
  })
  return [
    ...seasonMonths.map(month =>
      row(month.label, values => values.monthly[month.key])
    ),
    row('Season', values => values.seasonal),
  ]
})

// The size of the ERA5 cell and the finer snow-depth cell, formatted for
// text: whole km, or one decimal under 10 km; area to two significant
// figures.
function sizeText(cell) {
  const size = cellSize(cell.lat, gridDegrees(cell))
  const km = value => formatNumber(value, value < 10 ? 1 : 0)
  const area = Number(size.area.toPrecision(2))
  return { ns: km(size.ns), ew: km(size.ew), area: formatNumber(area, 0) }
}
const grid = computed(() => ({
  cell: sizeText(meta.value.grid_cell),
  snowCell: sizeText(meta.value.snow_depth_grid_cell),
}))
const gridParagraphs = computed(() =>
  gridNote(grid.value.cell, grid.value.snowCell)
)

// The panel's description of a cell: its spacing, size and centre.
function gridCellText(cell, size) {
  return (
    `${gridDegrees(cell)}° cell, about ${size.ns} × ${size.ew} km ` +
    `(${size.area} km²), centred at ${formatNumber(cell.lat, 2)}° N, ` +
    `${formatNumber(Math.abs(cell.lon), 2)}° W`
  )
}

// How many limits the season reaches and how cold the design hour is, with
// the grid cell's size up front: these data are coarse.
const lede = computed(() => {
  const items = verdicts.value.items
  const failing = items.filter(i => i.verdict == 'NO').length
  const caution = items.filter(i => i.verdict == 'CAUTION').length
  const size = grid.value.cell
  const designCold = temp(zones.value.design_cold.coldest_month['1pct'])
  return (
    `At this ~${size.ns} × ${size.ew} km ` +
    `grid cell, ${failing} of ${items.length} equipment and shelter limits ` +
    `are exceeded in at least one month` +
    (caution ? ` (${caution} more need caution)` : '') +
    ` and the 1% design temperature is ${designCold}.`
  )
})
</script>

<style lang="scss" scoped>
$line: #e3dfd8;
$muted: #6b6866;

.azcot-notice {
  margin-bottom: 1rem;
  padding: 0.6rem 0.9rem;
  border-left: 4px solid #f0a830;
  background: #fdf6e7;
  font-size: 0.9rem;
}

.grid-cell {
  display: grid;
  grid-template-columns: minmax(0, 18rem) minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;
  margin-bottom: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
  }
}
.grid-cell-note {
  font-size: 0.9rem;

  p + p {
    margin-top: 0.5rem;
  }
}

.verdict-legend {
  display: grid;
  gap: 0.35rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: $muted;
}
.verdict {
  display: inline-block;
  min-width: 2.6rem;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  color: #312e30;

  // Okabe–Ito colorblind-safe colors. Text is whichever of white or ink
  // contrasts more: white on blue 5.2:1, ink on yellow 10.2:1, white on
  // vermillion 3.9:1.
  &.is-ok {
    background: #0072b2;
    color: #fff;
  }
  &.is-caution {
    background: #f0e442;
  }
  &.is-no {
    background: #d55e00;
    color: #fff;
  }
  &.is-na {
    background: #efedea;
  }
  &.is-strong {
    font-weight: 700;
  }
}
.verdict-legend .verdict {
  margin-right: 0.4rem;
}
.verdict-table {
  font-size: 0.85rem;

  th[scope='row'] {
    min-width: 11rem;
    line-height: 1.25;
  }
  td {
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }

  td {
    vertical-align: middle;
  }
  .verdict-group th {
    padding-top: 0.9rem;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $muted;
  }
}
.verdict-limit {
  white-space: nowrap;
}
.verdict-measure {
  display: block;
  margin-top: 0.2rem;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.72rem;
  color: $muted;
}

.stat-tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.stat-tile {
  padding: 0.75rem 1rem;
  border: 1px solid $line;
  border-radius: 8px;

  dt {
    font-size: 0.75rem;
    color: $muted;
  }
  dd {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.3;
  }
}
.stat-detail {
  display: block;
  font-size: 0.78rem;
  font-weight: 400;
  color: $muted;
}

.chart-legend .swatch.is-square {
  height: 0.7rem;
  width: 0.7rem;
}

.frostbite-rows {
  display: grid;
  gap: 0.4rem;
}
.frostbite-row {
  display: grid;
  grid-template-columns: 3.5rem minmax(0, 1fr);
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
}
.frostbite-month {
  color: $muted;
}
.frostbite-bar {
  display: flex;
  gap: 2px;
  height: 1.1rem;
}
.frostbite-segment {
  border-radius: 2px;

  &[style*='width: 0%'] {
    display: none;
  }
}
</style>
