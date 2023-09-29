<template>
  <div>
    <div class="block content is-size-5">
      <p>
        The results in the sections below come from two types of data sources:
        historical modeled data (ERA-Interim) and projected climate conditions
        using two climate models (NCAR CCSM4 and GFDL CM3) and one emissions
        scenario (RCP 8.5).
      </p>
      <p>
        Both historical and projected data are downscaled from their native
        resolutions using the WRF model. Data are at 20&#x202f;km resolution.
      </p>
    </div>
    <div class="ml-5 mb-5">
      <div class="block">
        <h3 id="heating-degree-days" class="title is-4 mb-3">
          Heating Degree Days
        </h3>
        <HeatingDegreeDaysReport />
      </div>
      <div class="block mt-6">
        <h3 id="freezing-index" class="title is-4">Freezing Index</h3>
        <FreezingIndexReport />
      </div>
      <div class="block mt-6">
        <h3 id="thawing-index" class="title is-4">Thawing Index</h3>
        <ThawingIndexReport />
      </div>
    </div>
    <div class="block">
      <div class="content is-size-5 data-outro content no-print">
        <h4 class="title is-4 no-print">
          Data access &amp; additional information
        </h4>
        <p>
          The dataset and academic reference below apply to heating degree days,
          freezing index and thawing index.
        </p>
        <ul>
          <li>
            Source dataset and metadata:
            <a
              href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/3d4cc2e2-5cfb-4fed-b397-06854edb747f"
              >20km annual degree day totals at multiple thresholds for Alaska,
              1980&ndash;2100</a
            >
          </li>
          <li>
            Academic reference:
            <blockquote>
              Bieniek, P. A., Bhatt, U. S., Walsh, J. E., Rupp, T. S., Zhang,
              J., Krieger, J. R. &amp; Lader, R. (2016). Dynamical Downscaling
              of ERA-Interim Temperature and Precipitation for Alaska.
              <i>Journal of Applied Meteorology and Climatology, 55</i>(03),
              635–654.
              <a href="https://doi.org/10.1175/JAMC-D-15-0153.1"
                >https://doi.org/10.1175/JAMC-D-15-0153.1</a
              >
            </blockquote>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import HeatingDegreeDaysReport from '~/components/reports/HeatingDegreeDays'
import FreezingIndexReport from '~/components/reports/FreezingIndex'
import ThawingIndexReport from '~/components/reports/ThawingIndex'

export default {
  name: 'TemperatureIndices',
  components: {
    HeatingDegreeDaysReport,
    FreezingIndexReport,
    ThawingIndexReport,
  },
}
</script>

<style lang="scss" scoped></style>
