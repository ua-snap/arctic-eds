<template>
  <div>
    <CloseReportButton />
    <hr />
    <LoadingStatus :state="state" />

    <div v-if="!$fetchState.pending && !$fetchState.error">
      <h3 class="title is-3">Permafrost data for {{ results.place }}</h3>

      <MiniMap />

      <h4 class="title is-4">
        GIPL Mean Annual Ground Temperature (<UnitWidget />)
      </h4>

      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">MAGT</th>
            <th scope="col">Change from Historical</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Historical (1995)</th>
            <td>{{ results.gipl_magt_1995 }} </td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">2011 - 2040</th>
            <td>{{ results.gipl_magt_2025 }}</td>
            <td>
              {{ signedDiff(results.gipl_magt_1995, results.gipl_magt_2025) }}
            </td>
          </tr>
          <tr>
            <th scope="row">2036 - 2065</th>
            <td>{{ results.gipl_magt_2050 }}</td>
            <td>
              {{ signedDiff(results.gipl_magt_1995, results.gipl_magt_2050) }}
            </td>
          </tr>
          <tr>
            <th scope="row">2061 – 2090</th>
            <td>{{ results.gipl_magt_2075 }}</td>
            <td>
              {{ signedDiff(results.gipl_magt_1995, results.gipl_magt_2075) }}
            </td>
          </tr>
          <tr>
            <th scope="row">2086 – 2100</th>
            <td>{{ results.gipl_magt_2095 }}</td>
            <td>
              {{ signedDiff(results.gipl_magt_1995, results.gipl_magt_2095) }}
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="results.gipl_alt_1995">
        <h4 class="title is-4">GIPL Active Layer Thickness (m)</h4>
        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">ALT</th>
              <th scope="col">Change from Historical</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Historical (1995)</th>
              <td>{{ results.gipl_alt_1995 }}</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">2011 - 2040</th>
              <td>{{ results.gipl_alt_2025 }}</td>
              <td>
                {{ signedDiff(results.gipl_alt_1995, results.gipl_alt_2025) }}
              </td>
            </tr>
            <tr>
              <th scope="row">2036 - 2065</th>
              <td>{{ results.gipl_alt_2050 }}</td>
              <td>
                {{ signedDiff(results.gipl_alt_1995, results.gipl_alt_2050) }}
              </td>
            </tr>
            <tr>
              <th scope="row">2061 – 2090</th>
              <td>{{ results.gipl_alt_2075 }}</td>
              <td>
                {{ signedDiff(results.gipl_alt_1995, results.gipl_alt_2075) }}
              </td>
            </tr>
            <tr>
              <th scope="row">2086 – 2100</th>
              <td>{{ results.gipl_alt_2095 }}</td>
              <td>
                {{ signedDiff(results.gipl_alt_1995, results.gipl_alt_2095) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="title is-6 mt-5">Additional data</h4>
      <div class="content">
        <ul>
          <li v-if="results.magt_2018">
            Obu et al. (2018) Mean Annual Ground Temperature (deg. C) at Top of
            Permafrost:
            <strong>{{ results.magt_2018 }}</strong>
          </li>
          <li v-if="results.giv_2008">
            Jorgenson et al. (2008) Ground Ice Volume:
            <strong>{{ results.giv_2008 }}</strong>
          </li>
          <li v-if="results.pe_2008">
            Jorgenson et al. (2008) Permafrost Extent:
            <strong>{{ results.pe_2008 }}</strong>
          </li>
          <li v-if="results.pe_2018">
            Obu et al. (2018) Permafrost Extent:
            <strong>{{ results.pe_2018 }}</strong>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MiniMap from "~/components/MiniMap";
import LoadingStatus from "~/components/LoadingStatus";
import UnitWidget from "~/components/UnitWidget";

export default {
  name: "PermafrostReport",
  components: {
    MiniMap,
    LoadingStatus,
    UnitWidget
  },
  data() {
    return {
      radioUnits: 'metric'
    };
  },

  computed: {
    state: function() {
      return this.$fetchState;
    },
    ...mapGetters({
      units: "report/units",
			results: "report/results",
      placeName: "report/placeName",
      latLng: "report/latLng"
    })
  },
  methods: {
    signedDiff(historical, projected) {
      let rawDiff = (projected - historical).toFixed(2);
      if (rawDiff > 0) {
        return "+" + rawDiff;
      } else {
        return rawDiff;
      }
    }
  },
  watch: {
    latLng: function() {
      this.$fetch();
    }
  },

  fetchOnServer: false,
  async fetch() {
    if (this.latLng.lat && this.latLng.lng) {
      let res = await this.$axios.$get(
        process.env.apiUrl +
          "/permafrost/point/" +
          this.latLng.lat +
          "/" +
          this.latLng.lng
      );

      let place = this.latLng.lat + ", " + this.latLng.lng;
      if (this.placeName) {
        place = this.placeName;
      }

      let plateResults = {
        place: place,
        gipl_alt_1995: res["gipl"]["1995"]["cruts31"]["historical"]["alt"],
        gipl_alt_2025: res["gipl"]["2025"]["ncarccsm4"]["rcp85"]["alt"],
        gipl_alt_2050: res["gipl"]["2050"]["ncarccsm4"]["rcp85"]["alt"],
        gipl_alt_2075: res["gipl"]["2075"]["ncarccsm4"]["rcp85"]["alt"],
        gipl_alt_2095: res["gipl"]["2095"]["ncarccsm4"]["rcp85"]["alt"],
        gipl_magt_1995: res["gipl"]["1995"]["cruts31"]["historical"]["magt"],
        gipl_magt_2025: res["gipl"]["2025"]["ncarccsm4"]["rcp85"]["magt"],
        gipl_magt_2050: res["gipl"]["2050"]["ncarccsm4"]["rcp85"]["magt"],
        gipl_magt_2075: res["gipl"]["2075"]["ncarccsm4"]["rcp85"]["magt"],
        gipl_magt_2095: res["gipl"]["2095"]["ncarccsm4"]["rcp85"]["magt"]
      };

      if (res["jorg"] != null) {
        plateResults["giv_2008"] = res["jorg"]["ice"];
        plateResults["pe_2008"] = res["jorg"]["pfx"];
      }

      if (res["obu_magt"] != null) {
        plateResults["magt_2018"] = res["obu_magt"]["temp"];
      }

      if (res["obupfx"] != null) {
        plateResults["pe_2018"] = res["obupfx"]["pfx"];
      }

      this.$store.commit('report/setResults', plateResults);
    }
  }
};
</script>

<style lang="scss" scoped></style>
