<template>
  <form class="place-search has-text-left" novalidate @submit.prevent="submit">
    <label :for="inputId" class="is-sr-only"
      >Installation, community, or latitude and longitude</label
    >
    <div class="field has-addons">
      <!--
        Reka UI's Combobox implements the ARIA 1.2 combobox pattern (combobox
        input, listbox popup, options, aria-activedescendant and keyboard
        support). Reka components are unstyled, so Bulma classes give the look.
      -->
      <ComboboxRoot
        v-model="selected"
        v-model:open="isOpen"
        by="key"
        ignore-filter
        :reset-search-term-on-blur="false"
        class="control is-expanded"
      >
        <ComboboxAnchor class="control has-icons-left">
          <ComboboxInput
            :id="inputId"
            v-model="searchTerm"
            class="input is-large"
            placeholder="Installation, community, or lat, lon"
            autocomplete="off"
            :display-value="() => searchTerm"
            :aria-describedby="`${hintId} ${messageId}`"
            :aria-invalid="message ? 'true' : undefined"
          />
          <span class="icon is-left is-large" aria-hidden="true">
            <!-- "magnify" from Material Design Icons -->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
              />
            </svg>
          </span>
        </ComboboxAnchor>

        <ComboboxContent
          position="popper"
          side="bottom"
          :side-offset="4"
          class="dropdown is-flex-direction-column search-results"
        >
          <ComboboxViewport class="dropdown-content">
            <ComboboxItem
              v-for="option in options"
              :key="option.key"
              :value="option"
              :text-value="option.label"
              class="dropdown-item"
            >
              <div class="search-item has-text-weight-semibold">
                {{ option.label }}
                <span class="has-text-weight-normal" v-if="option.altName"
                  >({{ option.altName }})</span
                >
              </div>
            </ComboboxItem>
            <ComboboxEmpty class="dropdown-item is-disabled">
              {{ emptyText }}
            </ComboboxEmpty>
          </ComboboxViewport>
        </ComboboxContent>
      </ComboboxRoot>
      <div class="control">
        <button class="button is-primary is-large is-fullwidth" type="submit">
          Show the shift
        </button>
      </div>
    </div>
    <span :id="hintId" class="is-sr-only"
      >Type a place name and use the up and down arrow keys to choose one, or
      type a latitude and longitude and press Enter.</span
    >
    <p :id="messageId" class="help is-danger is-size-6" aria-live="polite">
      {{ message }}
    </p>
    <div class="is-sr-only" role="status" aria-live="polite">
      {{ statusMessage }}
    </div>
  </form>
</template>

<style lang="scss" scoped>
// Phones: stack the button under the input, each with four rounded corners.
// Bulma's addons stay side by side at every width, which leaves the input too
// narrow to read, and square off the inner corners with more specific rules
// (hence !important).
@media screen and (max-width: 768px) {
  .field.has-addons {
    flex-direction: column;
    gap: 0.5rem;

    .input,
    .button {
      border-radius: var(--bulma-radius) !important;
    }
  }
}
</style>

<style lang="scss">
// Not scoped: Reka renders the list at the end of <body>. It takes the search
// box's width, scrolls within the room below it, and marks the option the
// arrow keys are on (Bulma only styles hovered links in a dropdown).
.search-results {
  width: var(--reka-combobox-trigger-width);
  z-index: 110;

  .dropdown-content {
    max-height: min(280px, var(--reka-combobox-content-available-height));
  }
  .dropdown-item[data-highlighted] {
    background-color: var(--bulma-primary-light);
    box-shadow: inset 4px 0 0 var(--bulma-text);
  }
}
</style>

<script setup>
import { computed, onMounted, ref, useId, watch } from 'vue'
import { storeToRefs } from 'pinia'
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
  ComboboxViewport,
} from 'reka-ui'
import { placeAliases } from '~/data/home'

const props = defineProps({
  // A topic slug (see data/topics.js). The report opens with that topic's
  // sections suggested first.
  lens: { type: String, default: undefined },
})

const router = useRouter()
const store = useReportStore()
const { places } = storeToRefs(store)

const selected = ref(undefined)
const searchTerm = ref('')
const isOpen = ref(false)
const message = ref('')

const inputId = `${useId()}-place`
const hintId = `${inputId}-hint`
const messageId = `${inputId}-message`

// Fetch the community list in the browser only. Fetching during SSR would
// run at `nuxt generate` time and bake a stale snapshot of the Data API's
// places into the static payload (see issue #452).
onMounted(async () => {
  try {
    await store.fetchPlaces()
  } catch (error) {
    console.error('Failed to fetch places', error)
  }
})

const point = computed(() => parseLatLng(searchTerm.value))

// Communities whose name, alternate (e.g. Indigenous) name, or alias contains
// the search text. Reka's own filter only looks at one text value, so it is
// turned off.
const communities = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()
  if (!places.value || !query || point.value) {
    return []
  }
  const aliased = Object.entries(placeAliases)
    .filter(([alias]) => alias.includes(query))
    .map(([, id]) => id)
  // Best match first, so the button can open options[0]: aliases and exact
  // names, then names that start with the text, then the rest.
  const rank = place => {
    const name = place.name.toLowerCase()
    if (aliased.includes(place.id) || name === query) return 0
    return name.startsWith(query) ? 1 : 2
  }
  return places.value
    .filter(
      place =>
        place.name.toLowerCase().includes(query) ||
        (place.alt_name && place.alt_name.toLowerCase().includes(query)) ||
        aliased.includes(place.id)
    )
    .sort((a, b) => rank(a) - rank(b))
    .map(place => ({
      key: place.id,
      label: place.name,
      altName: place.alt_name,
      path: `/report/community/${place.id}`,
    }))
})

const options = computed(() => {
  if (point.value && !point.value.error) {
    return [
      {
        key: 'point',
        label: `Point ${point.value.lat.toFixed(4)}, ${point.value.lng.toFixed(
          4
        )}`,
        path: latLngReportPath(point.value),
      },
    ]
  }
  return communities.value
})

const emptyText = computed(() =>
  point.value && point.value.error
    ? 'Not a usable point yet. Keep typing, or press Enter for details.'
    : 'No matching places.'
)

const statusMessage = computed(() => {
  if (!isOpen.value) {
    return ''
  }
  const count = options.value.length
  if (count === 0) {
    return emptyText.value
  }
  return count === 1 ? '1 result available.' : `${count} results available.`
})

// Only show the list once something has been typed, and clear any old
// message as soon as the text changes.
watch(searchTerm, term => {
  message.value = ''
  if (!term) {
    isOpen.value = false
  }
})
watch(isOpen, open => {
  if (open && !searchTerm.value) {
    isOpen.value = false
  }
})

function go(option) {
  router.push({
    path: option.path,
    query: props.lens ? { for: props.lens } : undefined,
    hash: '#results',
  })
}

watch(selected, option => {
  if (option) {
    go(option)
  }
})

// The button, or Enter with no option highlighted: open the point or the
// best community match rather than making people pick from the list.
function submit() {
  // Close the list so it doesn't cover the message below the input.
  isOpen.value = false
  if (!searchTerm.value.trim()) {
    message.value = 'Enter an installation, community, or lat, lon.'
    return
  }
  if (point.value && point.value.error) {
    message.value = point.value.error
    return
  }
  if (options.value.length > 0) {
    go(options.value[0])
    return
  }
  message.value = places.value
    ? `No Alaska community matches “${searchTerm.value.trim()}”. Try another name, or a latitude and longitude.`
    : 'The community list is still loading. Try again in a moment.'
}
</script>
