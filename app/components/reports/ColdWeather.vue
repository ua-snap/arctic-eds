<template>
  <ReportSection id="cold-weather" title="Cold-Weather Operations">
    <template #lede>{{ lede }}</template>

    <!-- TODO: Remove this when the API endpoint is generated. -->
    <p v-if="meta.mock" class="azcot-notice">
      <strong>Preview.</strong> These are sample values for
      {{ meta.query.name }} from a mock AZCOT API response, shown on every
      report until the API is available.
    </p>

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
      <h3 class="chart-heading">{{ verdicts.title }}, October&ndash;March</h3>
      <ul class="verdict-legend">
        <li v-for="(text, key) in verdicts.legend" :key="key">
          <span class="verdict" :class="verdictClass(key)">{{
            verdictLabel(key)
          }}</span>
          {{ text }}
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
              <th scope="row">{{ item.item }}</th>
              <td class="verdict-limit">{{ limitText(item) }}</td>
              <td
                v-for="month in seasonMonths"
                :key="month.key"
                :title="evidenceText(item, month)"
              >
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
      <p class="chart-note">
        {{ verdicts.description }} Hover a month for the 30-year record and how
        often the limit was reached.
      </p>
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
        caption="Design cold: air temperature colder than this for 1%, 5% and 10% of hours, °F"
        row-heading="Hours colder"
        :rows="designColdRows"
        :digits="0"
      />
      <SeasonTable
        caption="Share of hours at or below each air temperature, %"
        row-heading="At or below"
        :rows="thresholdRows(exceedance.air_temperature_at_or_below, '°F')"
      />
      <SeasonTable
        caption="Freeze–thaw days (above and below 32°F on the same day), days per year"
        :rows="[{ label: 'Freeze–thaw days', ...freezeThaw }]"
      />
      <p class="chart-note">
        Design cold follows MIL-HDBK-310: the temperature that only 1%, 5% or
        10% of the month&rsquo;s hours are colder than. Design type:
        {{ zones.ar70_38_design_type.basis }}. Cold zone:
        {{ zones.atp_cold_zone.basis }}.
      </p>
    </template>

    <!-- Daily climatology -->
    <template v-else-if="view == 'daily'">
      <div class="chart-controls">
        <label class="chart-select">
          Variable
          <select v-model="variable">
            <option
              v-for="option in variableOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </label>
      </div>
      <h3 class="chart-heading">{{ daily.title }}</h3>
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
        :title="`${daily.title}, ${dailyUnit}, by day, 1991–2020`"
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
        :unit="dailyUnit"
      />
      <p class="chart-note">
        Each day pools 720 hourly values (30 years &times; 24 hours).
        <template v-if="daily.caveat">{{ daily.caveat }}</template>
      </p>
      <details class="chart-table">
        <summary>Show the monthly numbers</summary>
        <SeasonTable
          :caption="`${daily.title}, ${dailyUnit}, by month`"
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
      <h3 class="chart-heading">{{ frostbite.title }}, share of hours</h3>
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
        :aria-label="`${frostbite.title}: share of hours in each danger level by month; see the table below for values`"
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
              :title="`${cls.label}: ${formatNumber(
                row.shares[cls.key],
                1
              )}% of hours`"
            />
          </span>
          <span class="frostbite-time"
            >{{ formatNumber(row.shortest, 1) }} min</span
          >
        </div>
      </div>
      <p class="chart-note">
        Right: shortest time to frostbite in any hour of 30 years.
        {{ frostbite.description }}
      </p>
      <details class="chart-table">
        <summary>Show the numbers</summary>
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
          caption="Shortest time to frostbite, minutes"
          :rows="[
            {
              label: 'Shortest time',
              ...frostbite.shortest_time_to_frostbite.value,
            },
          ]"
        />
      </details>
      <SeasonTable
        caption="Share of hours with wind chill at or below each temperature, %"
        row-heading="At or below"
        :rows="thresholdRows(exceedance.wind_chill_at_or_below, '°F')"
      />
      <p class="chart-note">{{ exceedance.wind_chill_at_or_below.caveat }}</p>
    </template>

    <!-- Snow and wind loads -->
    <template v-else-if="view == 'snow'">
      <SeasonTable
        caption="Snowfall design loads, lb/ft²"
        row-heading="Load"
        :rows="snowfallRows"
      />
      <p class="chart-note">
        {{ snowfall.description }} Storms: {{ snowfall.storm_definition }}
      </p>
      <SeasonTable
        caption="Share of hours with snowpack load at or above each value, %"
        row-heading="At or above"
        :rows="thresholdRows(exceedance.snow_load_at_or_above, ' lb/ft²')"
      />
      <SeasonTable
        caption="Share of hours with snow depth above each value, %"
        row-heading="Above"
        :rows="thresholdRows(exceedance.snow_depth_above, ' in')"
      />
      <SeasonTable
        caption="Share of hours with hourly-mean 10 m wind above each speed, %"
        row-heading="Above"
        :rows="thresholdRows(exceedance.wind_speed_above, ' kn')"
      />
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
            `ERA5 0.25° (~28 km); cell centre ${gridCellText(
              meta.grid_cell
            )}. Snow depth: ERA5-Land 0.1°, ${gridCellText(
              meta.snow_depth_grid_cell
            )}`,
          ],
          ['Method', 'ERDC/CRREL TR-26-5 and SR-25-2'],
        ]"
        :caveats="meta.caveats"
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
import { formatNumber, palette } from '~/utils/chart'
import { dailyValues, seasonMonths, unitSymbol } from '~/utils/azcot'

const { azcot } = storeToRefs(useReportStore())

const meta = computed(() => azcot.value.metadata)
const climatology = computed(() => azcot.value.climatology)
const zones = computed(() => azcot.value.design_and_zones)
const exceedance = computed(() => azcot.value.exceedance)
const frostbite = computed(() => azcot.value.frostbite)
const snowfall = computed(() => azcot.value.snowfall_loads)
const verdicts = computed(() => azcot.value.climate_limit_verdicts)

const viewOptions = [
  { value: 'limits', label: 'Climate limits' },
  { value: 'cold', label: 'Design cold' },
  { value: 'daily', label: 'Daily climate' },
  { value: 'frostbite', label: 'Wind chill & frostbite' },
  { value: 'snow', label: 'Snow & wind loads' },
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

function evidenceText(item, month) {
  const evidence = item.evidence
  if (!evidence) return item.basis ?? ''
  const units = unitSymbol(item.limit.units)
  const record = evidence.record_by_month[month.key]
  const share = evidence.share_by_month[month.key]
  return (
    `${month.name}: 30-year record ${formatNumber(record, 1)} ${units}; ` +
    `${formatNumber(share, 2)}${evidence.share_definition.slice(1)}`
  )
}

const designColdRows = computed(() =>
  ['1pct', '5pct', '10pct'].map(key => ({
    label: `${key.replace('pct', '')}% of hours`,
    monthly: zones.value.design_cold.monthly[key],
  }))
)
const freezeThaw = computed(() => climatology.value.freeze_thaw_days.value)

// Rows for an exceedance table, coldest or largest threshold last.
function thresholdRows(block, suffix) {
  return Object.entries(block.thresholds).map(([threshold, values]) => ({
    label: `${formatNumber(Number(threshold), 0)}${suffix}`,
    monthly: values.monthly,
    seasonal: values.seasonal,
  }))
}

const variableOptions = [
  { value: 'air_temperature', label: 'Air temperature' },
  { value: 'wind_chill', label: 'Wind chill' },
  { value: 'wind_speed', label: 'Wind speed' },
  { value: 'snow_depth', label: 'Snow depth' },
  { value: 'snow_load', label: 'Snowpack load' },
]
const variable = ref('air_temperature')
const daily = computed(() => climatology.value[variable.value])
const dailyUnit = computed(() => unitSymbol(daily.value.units))
const dailyReferences = computed(() =>
  ['air_temperature', 'wind_chill'].includes(variable.value)
    ? [{ value: 32, label: '32°F' }]
    : []
)

const frostbiteColors = {
  red: '#b8322a',
  amber: '#e08a1e',
  green: '#5a9a4a',
  none: '#e3dfd8',
}
const frostbiteClasses = computed(() =>
  ['red', 'amber', 'green', 'none'].map(key => ({
    key,
    label: frostbite.value.classes[key].label,
    minutes: frostbite.value.classes[key].minutes.replace(
      /FT/g,
      'minutes to frostbite'
    ),
    color: frostbiteColors[key],
  }))
)
const frostbiteRows = computed(() => {
  const share = frostbite.value.share
  const shortest = frostbite.value.shortest_time_to_frostbite.value
  const row = (label, get) => ({
    label,
    shares: Object.fromEntries(
      ['red', 'amber', 'green', 'none'].map(key => [key, get(share[key])])
    ),
    shortest: get(shortest),
  })
  return [
    ...seasonMonths.map(month =>
      row(month.label, values => values.monthly[month.key])
    ),
    row('Season', values => values.seasonal),
  ]
})

const snowfallLabels = {
  sf24_max: '24-hour snowfall, record',
  sf24_mean_annual_max: '24-hour snowfall, typical yearly max',
  sf72_max: '72-hour snowfall, record',
  sf72_mean_annual_max: '72-hour snowfall, typical yearly max',
  storm_max: 'Storm total, record',
  storm_mean_annual_max: 'Storm total, typical yearly max',
}
const snowfallRows = computed(() =>
  Object.entries(snowfallLabels).map(([key, label]) => {
    const variable = snowfall.value.variables[key]
    return {
      label,
      title: variable.title,
      monthly: variable.value.monthly,
      seasonal: variable.value.seasonal,
    }
  })
)

function gridCellText(cell) {
  return (
    `${formatNumber(cell.lat, 2)}° N, ${formatNumber(
      Math.abs(cell.lon),
      2
    )}° W, ` + `${formatNumber(cell.distance_km, 1)} km away`
  )
}

// How many limits the season reaches, and how cold the design hour is.
const lede = computed(() => {
  const items = verdicts.value.items
  const failing = items.filter(i => i.verdict == 'NO').length
  const caution = items.filter(i => i.verdict == 'CAUTION').length
  const designCold = temp(zones.value.design_cold.coldest_month['1pct'])
  const limits =
    `${failing} of ${items.length} equipment and shelter limits are exceeded` +
    (caution ? ` and ${caution} more need caution` : '') +
    ' in at least one month'
  return (
    `${coldestMonthName.value} is coldest, with a 1% design temperature of ` +
    `${designCold} (${zones.value.ar70_38_design_type.value}); ` +
    `${limits}, October–March 1991–2020.`
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

  &.is-ok {
    background: #e2efdc;
  }
  &.is-caution {
    background: #fbe6bd;
  }
  &.is-no {
    background: #f5cfc8;
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
  grid-template-columns: 3.5rem minmax(0, 1fr) 4.5rem;
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
.frostbite-time {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
</style>
