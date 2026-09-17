<template>
  <div class="content is-size-5 wrapper">
    <!--
      Reka UI's Combobox implements the ARIA 1.2 combobox pattern (combobox
      input, listbox popup, options, aria-activedescendant and keyboard
      support). Buefy's b-autocomplete renders its options as role="button"
      links and has no way to change that. Reka components are unstyled, so
      the Bulma classes below keep the previous look.
    -->
    <label :for="inputId" class="search-label">Alaska community name</label>
    <ComboboxRoot
      v-model="selected"
      v-model:open="isOpen"
      by="id"
      ignore-filter
      :reset-search-term-on-blur="false"
      class="field"
    >
      <ComboboxAnchor
        class="control has-icons-left has-icons-right is-clearfix"
      >
        <ComboboxInput
          :id="inputId"
          v-model="searchTerm"
          class="input"
          placeholder="e.g. Fairbanks"
          :display-value="() => ''"
          :aria-describedby="hintId"
        />
        <span class="icon is-left" aria-hidden="true">
          <i class="mdi mdi-magnify mdi-24px"></i>
        </span>
        <ComboboxCancel
          v-if="searchTerm"
          class="icon is-right is-clickable clear-button"
          aria-label="Clear community name"
        >
          <i class="mdi mdi-close-circle mdi-24px" aria-hidden="true"></i>
        </ComboboxCancel>
      </ComboboxAnchor>

      <!-- The search controls are sticky at the bottom of the window, so
           the popper flips the list above the input when there's no room. -->
      <ComboboxContent
        position="popper"
        side="bottom"
        :side-offset="4"
        class="dropdown-content search-results"
      >
        <ComboboxViewport class="search-viewport">
          <ComboboxItem
            v-for="option in filteredDataObj"
            :key="option.id"
            :value="option"
            :text-value="option.name"
            class="dropdown-item"
          >
            <div class="search-item">
              {{ option.name }}
              <span class="alt-name" v-if="option.alt_name"
                >({{ option.alt_name }})</span
              >
            </div>
          </ComboboxItem>
          <ComboboxEmpty class="dropdown-item is-disabled">
            No results found!
          </ComboboxEmpty>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxRoot>
    <span :id="hintId" class="visually-hidden"
      >Type to search, then use the up and down arrow keys to choose a community
      and Enter to open its report.</span
    >
    <div class="visually-hidden" role="status" aria-live="polite">
      {{ statusMessage }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  text-align: left;
  width: 30rem;
  max-width: 100%;
}
.search-label {
  display: block;
  font-weight: 700;
}
.clear-button {
  // Reset the native button look so it matches Buefy's clickable icon.
  background: none;
  border: 0;
  padding: 0;
  color: inherit;
  pointer-events: auto;
}
:deep(input.input) {
  box-shadow: none;
  border: 3px solid #8ba09a;
  border-radius: 0;
}
</style>
<style lang="scss">
// Not scoped: Reka renders the popup content inside its own wrapper element.
// Bulma only defines its dropdown CSS variables inside .dropdown, so the
// look of the Buefy autocomplete list is spelled out here.
.search-results {
  width: var(--reka-combobox-trigger-width);
  max-width: 100vw;
  z-index: 110; // above the sticky search controls
  padding: 0.5rem 0;
  background-color: #fff;
  border-radius: var(--bulma-radius);
  box-shadow: var(--bulma-shadow);

  .search-viewport {
    max-height: min(200px, var(--reka-combobox-content-available-height));
  }
  .dropdown-item {
    display: block;
    padding: 0.375rem 1rem;
    font-size: 0.875rem;
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
}
</style>
<script setup>
import { computed, ref, useId, watch } from 'vue'
import { storeToRefs } from 'pinia'
import {
  ComboboxAnchor,
  ComboboxCancel,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
  ComboboxViewport,
} from 'reka-ui'

const router = useRouter()
const route = useRoute()

const { places } = storeToRefs(useReportStore())

const selected = ref(undefined) // the actual selected place
const searchTerm = ref('') // the temporary search fragment
const isOpen = ref(false)

const inputId = `${useId()}-community`
const hintId = `${inputId}-hint`

// Matches the name or the alternate (e.g. Indigenous) name, so Reka's own
// filter, which only looks at one text value, is turned off.
const filteredDataObj = computed(() => {
  // Guard in case the async loading of places isn't done yet.
  if (!places.value) {
    return []
  }
  const query = searchTerm.value.toLowerCase()
  return places.value.filter(option => {
    return (
      option.name.toString().toLowerCase().indexOf(query) >= 0 ||
      (option.alt_name &&
        option.alt_name.toString().toLowerCase().indexOf(query) >= 0)
    )
  })
})

const statusMessage = computed(() => {
  if (!isOpen.value) {
    return ''
  }
  const count = filteredDataObj.value.length
  if (count === 0) {
    return 'No results found.'
  }
  return count === 1 ? '1 result available.' : `${count} results available.`
})

// Only show the list once something has been typed, as before.
watch([searchTerm, isOpen], ([term, open]) => {
  if (open && !term) {
    isOpen.value = false
  }
})

watch(selected, newSelected => {
  if (newSelected) {
    router.push({
      path: route.path + 'report/community/' + newSelected.id + '#results',
    })
  }
})
</script>
