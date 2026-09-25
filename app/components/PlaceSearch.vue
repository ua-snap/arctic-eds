<template>
  <form class="place-search" novalidate @submit.prevent="submit">
    <label :for="inputId" class="visually-hidden"
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
            <i class="mdi mdi-magnify mdi-24px"></i>
          </span>
        </ComboboxAnchor>

        <ComboboxContent
          position="popper"
          side="bottom"
          :side-offset="4"
          class="dropdown-content search-results"
        >
          <ComboboxViewport class="search-viewport">
            <ComboboxItem
              v-for="option in options"
              :key="option.key"
              :value="option"
              :text-value="option.label"
              class="dropdown-item"
            >
              <div class="search-item">
                {{ option.label }}
                <span class="alt-name" v-if="option.altName"
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
        <button class="button is-primary is-large" type="submit">
          Show the shift
        </button>
      </div>
    </div>
    <span :id="hintId" class="visually-hidden"
      >Type a place name and use the up and down arrow keys to choose one, or
      type a latitude and longitude and press Enter.</span
    >
    <p :id="messageId" class="help is-danger is-size-6" aria-live="polite">
      {{ message }}
    </p>
    <div class="visually-hidden" role="status" aria-live="polite">
      {{ statusMessage }}
    </div>
  </form>
</template>

<style lang="scss" scoped>
.place-search {
  text-align: left;
}
.help:empty {
  display: none;
}

// Phones: stack the button under the input, both full width.
@media (max-width: 768px) {
  .field.has-addons {
    flex-direction: column;
    gap: 0.5rem;

    .control {
      width: 100%;
    }
    .input,
    .button {
      border-radius: var(--bulma-radius);
    }
    .button {
      width: 100%;
    }
  }
}
</style>

<style lang="scss">
// Not scoped: Reka renders the popup content inside its own wrapper element.
// Bulma only defines its dropdown CSS variables inside .dropdown, so the list
// look is spelled out here.
.search-results {
  width: var(--reka-combobox-trigger-width);
  max-width: 100vw;
  z-index: 110;
  padding: 0.5rem 0;
  background-color: #fff;
  border-radius: var(--bulma-radius);
  box-shadow: var(--bulma-shadow);

  .search-viewport {
    max-height: min(280px, var(--reka-combobox-content-available-height));
  }
  .dropdown-item {
    display: block;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #312e30;
    cursor: pointer;
    white-space: normal;

    &.is-disabled {
      cursor: default;
    }

    // Visible "current option" marker for keyboard and mouse users.
    &[data-highlighted] {
      background-color: #d3dcd9;
      box-shadow: inset 4px 0 0 #312e30;
    }
  }
  .search-item {
    font-weight: 600;
  }
  .alt-name {
    font-weight: 400;
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
