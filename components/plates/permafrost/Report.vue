<template>
  <div>
    <CloseReportButton />
    <hr />
    <LoadingStatus :state="state" />

    <div v-if="!$fetchState.pending && !$fetchState.error">
      <h3 class="title is-3">Permafrost data for {{ results.place }}</h3>

      <MiniMap />

      <h4 class="title is-4">
        GIPL Mean Annual Ground Temperature (&deg;C)
      </h4>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">1995</th>
            <th scope="col">2086 – 2100</th>
            <th scope="col">Change</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ results.gipl_magt_1995 }}</td>
            <td>{{ results.gipl_magt_2095 }}</td>
            <td>
              {{ magtDiff }}
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="results.gipl_alt_1995">
        <h4 class="title is-4">GIPL Active Layer Thickness (m)</h4>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">1995</th>
              <th scope="col">2086 - 2100</th>
              <th scope="col">Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ results.gipl_alt_1995 }}</td>
              <td>{{ results.gipl_alt_2095 }}</td>
              <td>
                {{ altDiff }}
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

export default {
  name: "PermafrostReport",
  components: {
    MiniMap,
    LoadingStatus
  },
  data() {
    return {
      // Will have the results of the data fetch.
      results: {}
    };
  },

  computed: {
    state: function() {
      return this.$fetchState;
    },
    ...mapGetters({
      placeName: "map/placeName",
      latLng: "map/latLng"
    }),
    altDiff: function() {
      return this.signedDiff(
        this.results.gipl_alt_1995,
        this.results.gipl_alt_2095
      );
    },
    magtDiff: function() {
      return this.signedDiff(
        this.results.gipl_magt_1995,
        this.results.gipl_magt_2095
      );
    }
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

      this.results = {
        place: place,
        gipl_alt_1995: res["gipl"]["1995"]["cruts31"]["historical"]["alt"],
        gipl_alt_2095: res["gipl"]["2095"]["ncarccsm4"]["rcp85"]["alt"],
        gipl_magt_1995: res["gipl"]["1995"]["cruts31"]["historical"]["magt"],
        gipl_magt_2095: res["gipl"]["2095"]["ncarccsm4"]["rcp85"]["magt"]
      };

      if (res["jorg"] != null) {
        this.results["giv_2008"] = res["jorg"]["ice"];
        this.results["pe_2008"] = res["jorg"]["pfx"];
      }

      if (res["obu_magt"] != null) {
        this.results["magt_2018"] = res["obu_magt"]["temp"];
      }

      if (res["obupfx"] != null) {
        this.results["pe_2018"] = res["obupfx"]["pfx"];
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
