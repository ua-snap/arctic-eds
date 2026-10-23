<template>
  <!--
    A compact row of joined options, e.g. units or an era. Reka UI's
    RadioGroup provides the behavior: one tab stop, arrow keys move the
    selection, and the group is announced by its label.
  -->
  <div class="segmented-field">
    <span
      :id="labelId"
      class="segmented-label"
      :class="{ 'is-sr-only': hideLabel }"
      >{{ label }}</span
    >
    <RadioGroupRoot
      v-model="model"
      :aria-labelledby="labelId"
      orientation="horizontal"
      class="segmented"
    >
      <RadioGroupItem
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        class="segmented-option"
      >
        {{ option.label }}
      </RadioGroupItem>
    </RadioGroupRoot>
  </div>
</template>

<script setup>
import { useId } from 'vue'
import { RadioGroupItem, RadioGroupRoot } from 'reka-ui'

defineProps({
  // Names the group, e.g. "Era".
  label: String,
  // Hides the label visually; screen readers still announce it.
  hideLabel: Boolean,
  // The choices: [{ value, label }].
  options: Array,
})

const model = defineModel()
const labelId = useId()
</script>
