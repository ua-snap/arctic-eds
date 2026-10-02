<template>
  <!--
    An inline definition, in place of a link out to the glossary. Reka UI's
    Popover opens on click, tap or Enter/Space, so it works on touch screens
    and from the keyboard, unlike a hover-only tooltip.
  -->
  <PopoverRoot>
    <PopoverTrigger class="button is-primary is-light is-rounded">
      <slot>{{ term }}</slot>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        class="box definition-content"
        side="bottom"
        align="start"
        :side-offset="6"
        :collision-padding="16"
      >
        <p>
          <strong>{{ term }}:</strong> {{ definition }}
        </p>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<script setup>
import {
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from 'reka-ui'

defineProps({
  term: { type: String, required: true },
  definition: { type: String, required: true },
})
</script>

<style lang="scss">
// Not scoped: Reka renders the popup at the end of <body>. A Bulma box is as
// wide as its text; keep long definitions to a readable width.
.definition-content {
  max-width: min(22rem, calc(100vw - 2rem));
  z-index: 120;
}
</style>
