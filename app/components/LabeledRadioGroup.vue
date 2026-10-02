<template>
  <!--
    A labeled group of radio buttons, e.g. "Model: 5 Model Average / GFDL CM3
    / NCAR CCSM4". Reka UI's RadioGroup provides the behavior: one tab stop,
    arrow keys move the selection, and the group is announced by its label.
    Bulma draws the options as a row of joined buttons, the selected one in
    the primary color.
  -->
  <div class="field">
    <div
      :id="labelId"
      class="label mt-4 mb-1"
      :class="{ 'is-sr-only': hideLabel }"
    >
      {{ label }}
    </div>
    <RadioGroupRoot
      v-model="model"
      :aria-labelledby="labelId"
      class="buttons has-addons"
    >
      <RadioGroupItem
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        class="button"
        :class="{ 'is-primary is-selected': option.value === model }"
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
  // Names the group, e.g. "Model".
  label: String,
  // Hides the label visually; screen readers still announce it.
  hideLabel: Boolean,
  // The choices: [{ value, label }].
  options: Array,
})

// The selected option's value.
const model = defineModel()

const labelId = useId()
</script>
