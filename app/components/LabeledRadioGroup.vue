<template>
  <!--
    A labeled group of radio buttons, e.g. "Model: 5 Model Average / GFDL CM3
    / NCAR CCSM4". Native radio buttons in a fieldset: the group is announced
    by its legend, it takes one tab stop, and the arrow keys move the
    selection. Bulma's .radios and .radio classes lay them out.
  -->
  <fieldset class="field">
    <legend class="label mt-4 mb-1" :class="{ 'is-sr-only': hideLabel }">
      {{ label }}
    </legend>
    <div class="radios">
      <label v-for="option in options" :key="option.value" class="radio">
        <input
          v-model="model"
          type="radio"
          :name="name"
          :value="option.value"
        />
        {{ option.label }}
      </label>
    </div>
  </fieldset>
</template>

<script setup>
import { useId } from 'vue'

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

const name = useId()
</script>
