<template>
  <!--
    An inline definition, in place of a link out to the glossary. Reka UI's
    Popover opens on click, tap or Enter/Space, so it works on touch screens
    and from the keyboard, unlike a hover-only tooltip.
  -->
  <PopoverRoot>
    <PopoverTrigger class="definition-trigger">
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
        <PopoverArrow class="definition-arrow" :width="14" :height="7" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<script setup>
import {
  PopoverArrow,
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
// Not scoped: the content is portalled to the end of <body>.
.definition-trigger {
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  color: inherit;
  text-align: inherit;
  cursor: help;
  border-bottom: 2px dotted currentColor;
}
.definition-content {
  max-width: min(22rem, calc(100vw - 2rem));
  z-index: 120;
  font-size: 0.95rem;
  line-height: 1.45;
}
.definition-arrow {
  fill: #fff;
}
</style>
