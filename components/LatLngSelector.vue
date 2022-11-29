<template>
  <div>
    <div class="content">
      <h4 class="title is-5">Find a place by latitude &amp; longitude</h4>
      <p>
        Enter a specific lat/lon combo below. Decimal degrees or DMS formats are
        accepted, i.e. <code>65.24, -142.22</code> or
        <code>58&deg; 18' 0" N, 134&deg; 24' 57.6" W</code>.
      </p>

      <div class="columns">
        <div class="column is-two-thirds">
          <b-field :type="getFieldStatus" :message="getFieldMessage">
            <b-input
              v-model="latlngInput"
              placeholder="64.8436, -147.7230"
              @keydown.native.enter="process"
            ></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-button :type="type" :disabled="!isValid" @click="process"
            >Get point data</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import parseDMS from 'parse-dms'

export default {
  name: 'LatLngSelector',
  data() {
    return {
      type: 'is-light',
      latLng: undefined,
      latlngInput: '',
      fieldMessage: '',
    }
  },
  computed: {
    isValid() {
      return this.validate()
    },
    getFieldStatus() {
      if (this.latlngInput.length < 8 || this.isValid) {
        return '' // OK
      } else {
        return 'is-danger' // not OK
      }
    },
    getFieldMessage() {
      if (this.latlngInput.length < 8 || this.isValid) {
        return ''
      } else {
        return this.fieldMessage
      }
    },
  },
  methods: {
    process() {
      if (this.isValid) {
        this.$router.push({
          path:
            this.$route.path +
            'report/' +
            this.latLng.lat.toFixed(4) +
            '/' +
            this.latLng.lng.toFixed(4),
        })
      }
    },
    invalidLatLng() {
      this.fieldMessage = "I can't figure out how to make that a point."
      this.type = 'is-light'
      this.latLng = {}
      return false
    },
    validLatLng(lat, lng) {
      this.fieldMessage = ''
      this.type = 'is-success'
      this.latLng = { lat: lat, lng: lng }
      return true
    },
    validate() {
      if (!this.latlngInput) {
        return false // do nothing if it's empty
      }

      try {
        let parsedDms = parseDMS(this.latlngInput)
        if (parsedDms && parsedDms.lat && parsedDms.lon) {
          let lat = parsedDms.lat
          let lon = parsedDms.lon
          if (
            lat >= 51.229 &&
            lat <= 71.3526 &&
            lon >= -179.1506 &&
            lon <= -129.9795
          ) {
            return this.validLatLng(lat, lon)
          }
        }
      } catch (e) {
        return this.invalidLatLng()
      }
      return this.invalidLatLng()
    },
  },
}
</script>
