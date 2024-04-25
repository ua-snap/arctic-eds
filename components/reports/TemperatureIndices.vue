<template>
  <div>
    <div class="block content is-size-5 mb-6">
      <p>
        The following results include three cumulative degree day metrics
        (heating degree days, air freezing index, air thawing index) computed
        from the NCAR 12 km Alaska Near Surface Meteorology Daily Averages
        (1950-2099) dataset and the associated modeled downscaling baseline
        (Daymet 12 km). The climate simulation data represent CMIP5 models
        chosen to bracket a range of temperature (cooler and hotter) and
        precipitation (dryer and wetter) futures. These models have been
        statistically downscaled using the bias corrected spatial disaggregation
        (BCSD) method. The available data extent is the terrestrial area of
        Alaska excluding the Western Aleutians. Models included are 
        ACCESS1-3, CanESM2, CCSM4, CSIRO-Mk3-6-0, GFDL ESM2, inmcm4, MIROC5,
        MPI-ESM-MR, and MRI CGCM3 driven by RCP 4.5 and RCP 8.5 emissions
        scenarios. The spatial resolution (grid cell size) of all data is 12 by
        12 km.
      </p>

      <p>
        The modeled baseline Daymet (1980&ndash;2017) dataset is a continuous,
        gridded dataset created through interpolation of point measurements
        based on assumptions about the spatial correlation of temperature point
        measurements. Daymet provides long-term, continuous, gridded estimates
        of daily weather and climatology variables by interpolating and
        extrapolating ground-based observations through statistical modeling
        techniques and is a research product of the Environmental Sciences
        Division at Oak Ridge National Laboratory. In this use case the 1 km x 1
        km spatial resolution Daymet dataset (version 3) was aggregated to 12 km
        resolution for the purposes of downscaling climate models from their
        coarser native resolutions.
      </p>
      <p>
        As noted in the introduction, modeled baseline data will not precisely
        match historical station data for a given point location. Small
        differences in mean values may become magnified in degree day metrics,
        especially in use cases where values are close to a threshold. For
        further information on how best to interpret and use these indices,
        please refer to the <NuxtLink to="/guidance">Guidance</NuxtLink> page.
      </p>
    </div>
    <div class="ml-5 mb-5">
      <div class="block" v-if="isHeatingDegreeDaysPresent">
        <h3 id="heating-degree-days" class="title is-4 mb-3">
          Heating Degree Days
        </h3>
        <HeatingDegreeDaysReport />
      </div>
      <div class="block mt-6" v-if="isFreezingIndexPresent">
        <h3 id="freezing-index" class="title is-4">Freezing Index</h3>
        <FreezingIndexReport />
      </div>
      <div class="block mt-6" v-if="isThawingIndexPresent">
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
            Academic references:
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
            <blockquote>
              Lader, R., Walsh, J. E., Bhatt, U. S., & Bieniek, P. A. (2017).
              Projections of twenty-first-century climate extremes for Alaska
              via dynamical downscaling and quantile mapping.
              <i>Journal of Applied Meteorology and Climatology, 56</i>(9),
              2393&ndash;2409.
              <a href="https://doi.org/10.1175/JAMC-D-16-0415.1"
                >https://doi.org/10.1175/JAMC-D-16-0415.1</a
              >
            </blockquote>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters({
      isHeatingDegreeDaysPresent: 'report/isHeatingDegreeDaysPresent',
      isFreezingIndexPresent: 'report/isFreezingIndexPresent',
      isThawingIndexPresent: 'report/isThawingIndexPresent',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
