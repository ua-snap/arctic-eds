<template>
  <div v-if="isPermafrostPresent">
    <div class="block">
      <h2 id="permafrost" class="title is-2">Permafrost</h2>
      <div class="content is-size-5">
        <p>
          Annual projections of permafrost top and base depths, talik thickness,
          and mean annual ground temperature at seven different depths are
          provided by the GIPL 2.0 model for years 2021&ndash;2120. These
          projections are provided for GFDL CM3 and NCAR CCSM4 model outputs, as
          well as a 5-model average (GFDL CM3, NCAR CCSM4, GISS E2-R, IPSL
          CM5A-LR, MRI CGCM3), under the RCP 4.5 and RCP 8.5 emissions
          scenarios. Spatial resolution: 1&#8239;km.
        </p>
      </div>
    </div>
    <div class="block">
      <h4 class="title is-5 mb-1">Data summary</h4>
      <p class="content is-size-5">
        The summary tables below shows the minimum, mean and maximum values
        across two scenarios (RCP 4.5 and RCP 8.5) and three models (NCAR CCSM4,
        GFDL CM3, and a 5-model average: GFDL-CM3, NCAR-CCSM4, GISS-E2-R,
        IPSL-CM5A-LR, MRI-CGCM3).
      </p>
      <table class="table">
        <caption>
          Mean annual ground temperature, 1&#8239;m depth
        </caption>
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
                results.permafrost['summary']['2021-2039']['gipl1kmmin'][
                  'magt1m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2021-2039']['gipl1kmmean'][
                  'magt1m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2021-2039']['gipl1kmmax'][
                  'magt1m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040&ndash;2069)</th>
            <td>
              {{
                results.permafrost['summary']['2040-2069']['gipl1kmmin'][
                  'magt1m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2040-2069']['gipl1kmmean'][
                  'magt1m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2040-2069']['gipl1kmmax'][
                  'magt1m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070&ndash;2099)</th>
            <td>
              {{
                results.permafrost['summary']['2070-2099']['gipl1kmmin'][
                  'magt1m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2070-2099']['gipl1kmmean'][
                  'magt1m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2070-2099']['gipl1kmmax'][
                  'magt1m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
          </tr>
        </tbody>
      </table>

      <table class="table">
        <caption>
          Mean annual ground temperature, 5&#8239;m depth
        </caption>
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
                results.permafrost['summary']['2021-2039']['gipl1kmmin'][
                  'magt5m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2021-2039']['gipl1kmmean'][
                  'magt5m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2021-2039']['gipl1kmmax'][
                  'magt5m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040&ndash;2069)</th>
            <td>
              {{
                results.permafrost['summary']['2040-2069']['gipl1kmmin'][
                  'magt5m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2040-2069']['gipl1kmmean'][
                  'magt5m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2040-2069']['gipl1kmmax'][
                  'magt5m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070&ndash;2099)</th>
            <td>
              {{
                results.permafrost['summary']['2070-2099']['gipl1kmmin'][
                  'magt5m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2070-2099']['gipl1kmmean'][
                  'magt5m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2070-2099']['gipl1kmmax'][
                  'magt5m'
                ]
              }}<UnitWidget unitType="temp" />
            </td>
          </tr>
        </tbody>
      </table>

      <table class="table">
        <caption>
          Depth to top of permafrost
        </caption>
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
                results.permafrost['summary']['2021-2039']['gipl1kmmin'][
                  'permafrosttop'
                ]
              }}<UnitWidget unitType="m_in" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2021-2039']['gipl1kmmean'][
                  'permafrosttop'
                ]
              }}<UnitWidget unitType="m_in" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2021-2039']['gipl1kmmax'][
                  'permafrosttop'
                ]
              }}<UnitWidget unitType="m_in" />
            </td>
          </tr>
          <tr>
            <th scope="row">Mid Century (2040&ndash;2069)</th>
            <td>
              {{
                results.permafrost['summary']['2040-2069']['gipl1kmmin'][
                  'permafrosttop'
                ]
              }}<UnitWidget unitType="m_in" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2040-2069']['gipl1kmmean'][
                  'permafrosttop'
                ]
              }}<UnitWidget unitType="m_in" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2040-2069']['gipl1kmmax'][
                  'permafrosttop'
                ]
              }}<UnitWidget unitType="m_in" />
            </td>
          </tr>
          <tr>
            <th scope="row">Late Century (2070&ndash;2099)</th>
            <td>
              {{
                results.permafrost['summary']['2070-2099']['gipl1kmmin'][
                  'permafrosttop'
                ]
              }}<UnitWidget unitType="m_in" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2070-2099']['gipl1kmmean'][
                  'permafrosttop'
                ]
              }}<UnitWidget unitType="m_in" />
            </td>
            <td>
              {{
                results.permafrost['summary']['2070-2099']['gipl1kmmax'][
                  'permafrosttop'
                ]
              }}<UnitWidget unitType="m_in" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="block">
      <h4 class="title is-5 mb-1">Data preview</h4>
      <p class="content is-size-5 mb-1">
        CSV download includes annual values for the modeled projected
        (2021&ndash;2100) dataset. Data are provided in metric units.
      </p>
      <PreviewTable
        :csvString="results.permafrost.preview"
        sizeBlurb="~601 rows, 13 columns, ~42kb"
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
            endpoint="permafrost/point"
          />
        </li>
        <li>
          Source dataset and metadata:
          <a
            href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/c24a957b-8a56-40bf-bc09-43a567182d36"
            >GIPL Permafrost Model Output</a
          >
        </li>
        <li>
          Academic reference:
          <blockquote>
            Marchenko, S., Romanovsky, V., &amp; Tipenko, G. (2008). Numerical
            modeling of spatial permafrost dynamics in Alaska.
            <i
              >Ninth International Conference on Permafrost, Online Proceedings,
              Volume 2</i
            >, 1125–1130. Accessed 2023-09-08 from
            <a href="https://www.permafrost.org/event/icop9/"
              >https://www.permafrost.org/event/icop9/</a
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

export default {
  name: 'PermafrostReport',
  components: {
    DownloadCsvButton,
    UnitWidget,
    PreviewTable,
  },
  computed: {
    ...mapGetters({
      results: 'report/results',
      placeName: 'report/placeName',
      isPlaceDefined: 'report/isPlaceDefined',
      isPermafrostPresent: 'report/isPermafrostPresent',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
