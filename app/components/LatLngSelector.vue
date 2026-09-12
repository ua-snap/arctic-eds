<template>
  <div class="content is-size-5">
    <b>OR Latitude/longitude point</b>
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
      <div v-if="isValid" class="column">
        <b-button type="is-primary" :disabled="!isValid" @click="process"
          >Get point data</b-button
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
::v-deep input.input {
  box-shadow: none;
  border: 3px solid #8ba09a;
  border-radius: 0;
  max-width: 30rem;
}
::v-deep button.button {
  font-weight: bold;
  &:hover {
    background-color: #312e30;
    color: white;
    font-weight: bold;
  }
}
</style>
<script>
import parseDMS from 'parse-dms'

export default {
  name: 'LatLngSelector',
  data() {
    return {
      latLng: undefined,
      latlngInput: '',
      fieldMessage: '',
      unparseableMessage:
        "Input can't be turned into lat/lng.  Accepted formats are decimal degrees and DMS, i.e. 65.24, -142.22 or 58º 18' 0'' N, 134º 24' 57.6'' W",
    }
  },
  computed: {
    isValid() {
      return this.validate()
    },
    getFieldStatus() {
      if (this.latlngInput.length < 6 || this.isValid) {
        return '' // OK
      } else {
        return 'is-danger' // not OK
      }
    },
    getFieldMessage() {
      if (this.latlngInput.length < 6 || this.isValid) {
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
            this.latLng.lng.toFixed(4) +
            '#results',
        })
      }
    },
    invalidLatLng(message) {
      this.fieldMessage = message
      this.latLng = {}
      return false
    },
    validLatLng(lat, lng) {
      this.fieldMessage = ''
      this.latLng = { lat: lat, lng: lng }
      return true
    },
    validate() {
      if (!this.latlngInput) {
        return false // do nothing if it's empty
      }

      let lat, lon

      try {
        let parsedDms = parseDMS(this.latlngInput)
        if (parsedDms && parsedDms.lat && parsedDms.lon) {
          lat = parsedDms.lat
          lon = parsedDms.lon
        } else {
          this.fieldMessage = ''
          return this.invalidLatLng(this.unparseableMessage)
        }
      } catch (e) {
        return this.invalidLatLng(this.unparseableMessage)
      }

      // test BBOX
      if (
        lat >= 51.229 &&
        lat <= 71.3526 &&
        lon >= -179.1506 &&
        lon <= -129.9795
      ) {
        return this.validLatLng(lat, lon)
      } else {
        return this.invalidLatLng(
          'This point is outside the bounding box of data: latitude between 51.229–71.3526, longitude between -179.1506–129.9795'
        )
      }
    },
  },
}
</script>
