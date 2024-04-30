<template>
  <div v-if="Object.keys(results.precipitation.summary).length != 0">
    <div class="block content is-size-5">
      <p>
        The following results are total annual precipitation values computed by
        summing monthly values from downscaled climate simulations representing
        five different models (NCAR CCSM4, GFDL CM3, GISS E2-R, MRI CGCM3, and
        IPSL CM5A-LR) and three emissions scenarios (RCP 4.5, 6.0 and 8.5).
        Model selection was based on the models&rsquo; superior historical
        performance for the Alaska region for three variables: surface air
        temperature, precipitation, and sea level pressure.
      </p>

      <p>
        These data are statistically downscaled and bias corrected via the delta
        method in which a model&rsquo;s future change at a particular location and
        time is added to the respective baseline mean value. This delta value is
        then added to a higher-resolution observationally-based climatology.
      </p>

      <p>
        The modeled baseline for these data is the 1901–2015 Climatic Research
        Unit Time Series (CRU TS) dataset (version 4.0). CRU TS is a continuous,
        gridded dataset created through interpolation of point measurements
        based on assumptions about the spatial correlation of climate variables.
        CRU TS is a widely used climate dataset and product of the Climate
        Research Unit at the University of East Anglia. CRU-TS data were
        downscaled to a 1961-1990 climatology produced by the PRISM
        (Parameter-elevation Regressions on Independent Slopes Model) Climate
        Group with the Northwest Alliance for Computational Science &
        Engineering at Oregon State University.
      </p>

      <p>
        The available data extent is the terrestrial area of Alaska. The spatial
        resolution (grid cell size) of all data is 2 by 2 km.
      </p>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">Data Summary</h4>
      <div class="content is-size-5">
        The summary table below shows the minimum, mean and maximum values
        across three scenarios (RCP 4.5, RCP 6.0 and RCP 8.5) and five models
        (NCAR CCSM4, GFDL CM3, GISS E2-R, MRI CGCM3, and IPSL CM5A-LR), rounded
        to two (Imperial units) or three (metric) significant digits. The
        difference compared to the modeled baseline (1901-2015) is shown below.
      </div>
    </div>

    <div class="block">
      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Min</th>
            <th scope="col">Mean</th>
            <th scope="col">Max</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Early Century (2010&ndash;2039)</th>
            <td>
              {{
                round(
                  results.precipitation['summary']['2010-2039']['prmin'],
                  precision
                )
              }}<UnitWidget unitType="mm_in" /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="results.precipitation['summary']['historical']['prmin']"
                :future="results.precipitation['summary']['2010-2039']['prmin']"
              />
            </td>
            <td>
              {{
                round(
                  results.precipitation['summary']['2010-2039']['prmean'],
                  precision
                )
              }}<UnitWidget unitType="mm_in" /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="results.precipitation['summary']['historical']['prmean']"
                :future="
                  results.precipitation['summary']['2010-2039']['prmean']
                "
              />
            </td>
            <td>
              {{
                round(
                  results.precipitation['summary']['2010-2039']['prmax'],
                  precision
                )
              }}<UnitWidget unitType="mm_in" /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="results.precipitation['summary']['historical']['prmax']"
                :future="results.precipitation['summary']['2010-2039']['prmax']"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040&ndash;2069)</th>
            <td>
              {{
                round(
                  results.precipitation['summary']['2040-2069']['prmin'],
                  precision
                )
              }}<UnitWidget unitType="mm_in" /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="results.precipitation['summary']['historical']['prmin']"
                :future="results.precipitation['summary']['2040-2069']['prmin']"
              />
            </td>
            <td>
              {{
                round(
                  results.precipitation['summary']['2040-2069']['prmean'],
                  precision
                )
              }}<UnitWidget unitType="mm_in" /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="results.precipitation['summary']['historical']['prmean']"
                :future="
                  results.precipitation['summary']['2040-2069']['prmean']
                "
              />
            </td>
            <td>
              {{
                round(
                  results.precipitation['summary']['2040-2069']['prmax'],
                  precision
                )
              }}<UnitWidget unitType="mm_in" /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="results.precipitation['summary']['historical']['prmax']"
                :future="results.precipitation['summary']['2040-2069']['prmax']"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070&ndash;2099)</th>
            <td>
              {{
                round(
                  results.precipitation.summary['2070-2099'].prmin,
                  precision
                )
              }}<UnitWidget unitType="mm_in" /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="results.precipitation['summary']['historical']['prmin']"
                :future="results.precipitation['summary']['2070-2099']['prmin']"
              />
            </td>
            <td>
              {{
                round(
                  results.precipitation.summary['2070-2099'].prmean,
                  precision
                )
              }}<UnitWidget unitType="mm_in" /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="results.precipitation['summary']['historical']['prmean']"
                :future="
                  results.precipitation['summary']['2070-2099']['prmean']
                "
              />
            </td>
            <td>
              {{
                round(
                  results.precipitation.summary['2070-2099'].prmax,
                  precision
                )
              }}<UnitWidget unitType="mm_in" /><br /><Diff
                kind="abs"
                :precision="deltaPrecision"
                :past="results.precipitation['summary']['historical']['prmax']"
                :future="results.precipitation['summary']['2070-2099']['prmax']"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">Data preview</h4>

      <p class="content is-size-5 mb-1">
        CSV download includes annual values for both model baseline CRU TS 4.0
        (1901&ndash;2015) and modeled projected (2010&ndash;2099) datasets. Data
        are provided in metric units.
      </p>
      <PreviewTable
        :csvString="results.precipitation.preview"
        sizeBlurb="~1525 rows, 4 columns, ~42kb"
      />
    </div>

    <div class="block data-outro content is-size-5 no-print">
      <h4 class="title is-5 no-print">
        Data access &amp; additional information
      </h4>

      <ul>
        <li>
          <DownloadCsvButton
            text="Download this data as CSV"
            endpoint="precipitation"
          />
        </li>
        <li>
          Source datasets and metadata:
          <ul>
            <li>
              <a
                href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/9eeef879-42ee-4bbe-a54e-435716ad0c90"
                >Historical Monthly and Derived Precipitation Products</a
              >
            </li>
            <li>
              <a
                href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/f44595c8-5384-4c02-9ab4-f7a9c43e92eb"
                >Projected Monthly and Derived Precipitation Products</a
              >
            </li>
          </ul>
        </li>
        <li>
          Academic reference:
          <blockquote>
            Walsh J.E., Bhatt U.S., Littell J. S., Leonawicz M., Lindgren M.,
            Kurkowski T. A., Bieniek P. A., Gray S., &amp; Rupp T. S. (2018).
            Downscaling of climate model output for Alaskan stakeholders,
            <i>Environmental Modelling &amp; Software, 110</i>, 38–51. DOI
            <a href="https://doi.org/10.1016/j.envsoft.2018.03.021"
              >10.1016/j.envsoft.2018.03.021</a
            >
          </blockquote>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DownloadCsvButton from '~/components/DownloadCsvButton'
import UnitWidget from '~/components/UnitWidget'
import PreviewTable from '~/components/PreviewTable'
import { numeric } from '~/mixins/numeric.js'

export default {
  name: 'PrecipitationReport',
  mixins: [numeric],
  components: {
    DownloadCsvButton,
    UnitWidget,
    PreviewTable,
  },
  computed: {
    precision() {
      if (this.units == 'metric') {
        return 2
      }
      return 3
    },
    deltaPrecision() {
      if (this.units == 'metric') {
        return 1
      }
      return 2
    },
    ...mapGetters({
      units: 'report/units',
      results: 'report/results',
      placeName: 'report/placeName',
      isPlaceDefined: 'report/isPlaceDefined',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
