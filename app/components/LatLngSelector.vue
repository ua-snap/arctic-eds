<template>
  <div class="content is-size-5">
    <label :for="inputId" class="search-label"
      >OR Latitude/longitude point</label
    >
    <div class="columns">
      <div class="column is-two-thirds">
        <b-field :type="getFieldStatus">
          <!-- compat-fallthrough off puts the id on the <input> itself, not
               on Buefy's wrapper, so the label's `for` points at it. -->
          <b-input
            :compat-fallthrough="false"
            :id="inputId"
            v-model="latlngInput"
            placeholder="64.8436, -147.7230"
            :aria-invalid="getFieldMessage ? 'true' : undefined"
            :aria-describedby="messageId"
            @keydown.enter="process"
          ></b-input>
        </b-field>
        <!-- Rendered here rather than through b-field's message prop so the
             input can point at it with aria-describedby. -->
        <p :id="messageId" class="help is-danger" aria-live="polite">
          {{ getFieldMessage }}
        </p>
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
.search-label {
  display: block;
  font-weight: 700;
}
:deep(input.input) {
  box-shadow: none;
  border: 3px solid #8ba09a;
  border-radius: 0;
  max-width: 30rem;
}
:deep(button.button) {
  font-weight: bold;
  &:hover {
    background-color: #312e30;
    color: white;
    font-weight: bold;
  }
}
</style>
<script setup>
import { computed, ref, useId } from 'vue'
import parseDMS from 'parse-dms'

const router = useRouter()
const route = useRoute()

const inputId = `${useId()}-latlng`
const messageId = `${inputId}-message`

const latLng = ref(undefined)
const latlngInput = ref('')
const fieldMessage = ref('')
const unparseableMessage =
  "Input can't be turned into lat/lng.  Accepted formats are decimal degrees and DMS, i.e. 65.24, -142.22 or 58º 18' 0'' N, 134º 24' 57.6'' W"

function invalidLatLng(message) {
  fieldMessage.value = message
  latLng.value = {}
  return false
}

function validLatLng(lat, lng) {
  fieldMessage.value = ''
  latLng.value = { lat: lat, lng: lng }
  return true
}

function validate() {
  if (!latlngInput.value) {
    return false // do nothing if it's empty
  }

  let lat, lon

  try {
    let parsedDms = parseDMS(latlngInput.value)
    if (parsedDms && parsedDms.lat && parsedDms.lon) {
      lat = parsedDms.lat
      lon = parsedDms.lon
    } else {
      fieldMessage.value = ''
      return invalidLatLng(unparseableMessage)
    }
  } catch (e) {
    return invalidLatLng(unparseableMessage)
  }

  // test BBOX
  if (lat >= 51.229 && lat <= 71.3526 && lon >= -179.1506 && lon <= -129.9795) {
    return validLatLng(lat, lon)
  } else {
    return invalidLatLng(
      'This point is outside the bounding box of data: latitude between 51.229–71.3526, longitude between -179.1506–129.9795'
    )
  }
}

const isValid = computed(() => validate())

const getFieldStatus = computed(() => {
  if (latlngInput.value.length < 6 || isValid.value) {
    return '' // OK
  } else {
    return 'is-danger' // not OK
  }
})

const getFieldMessage = computed(() => {
  if (latlngInput.value.length < 6 || isValid.value) {
    return ''
  } else {
    return fieldMessage.value
  }
})

function process() {
  if (isValid.value) {
    router.push({
      path:
        route.path +
        'report/' +
        latLng.value.lat.toFixed(4) +
        '/' +
        latLng.value.lng.toFixed(4) +
        '#results',
    })
  }
}
</script>
