<template>
  <!--
    A labeled group of radio buttons, e.g. "Model: 5 Model Average / GFDL CM3
    / NCAR CCSM4". Reka UI's RadioGroup provides the behavior: one tab stop,
    arrow keys move the selection, and the group is announced by its label.
    The styles below draw the radio buttons the way the site always has.
  -->
  <div class="field">
    <div :id="labelId" class="label" :class="{ 'visually-hidden': hideLabel }">
      {{ label }}
    </div>
    <RadioGroupRoot
      v-model="model"
      :aria-labelledby="labelId"
      class="radio-options"
    >
      <span
        v-for="(option, index) in options"
        :key="option.value"
        class="radio-option"
      >
        <RadioGroupItem
          :id="`${labelId}-${index}`"
          :value="option.value"
          class="radio-circle"
        >
          <RadioGroupIndicator force-mount class="radio-dot" />
        </RadioGroupItem>
        <label :for="`${labelId}-${index}`" class="radio-label">
          {{ option.label }}
        </label>
      </span>
    </RadioGroupRoot>
  </div>
</template>

<style lang="scss" scoped>
.field .label {
  margin-top: 1rem;
  margin-bottom: 0.25rem;
}

// The options sit in a row and wrap onto more lines on narrow screens.
.radio-options {
  display: flex;
  flex-wrap: wrap;
}

.radio-option {
  display: inline-flex;
  align-items: center;
  margin-inline-end: 0.5em;
  line-height: var(--bulma-control-line-height);
  cursor: pointer;
  user-select: none;

  &:last-child {
    margin-inline-end: 0;
  }
}

// The circle. RadioGroupItem is a <button>, so reset its defaults.
.radio-circle {
  display: flex;
  flex-shrink: 0;
  position: relative;
  width: 1.25em;
  height: 1.25em;
  margin: 0;
  padding: 0;
  font: inherit;
  background: none;
  border: 2px solid var(--bulma-border);
  border-radius: 50%;
  cursor: pointer;

  &[data-state='checked'],
  .radio-option:hover & {
    border-color: var(--bulma-primary);
  }
}

// The dot inside a selected circle.
.radio-dot {
  position: absolute;
  inset-inline-start: 50%;
  inset-block-end: 50%;
  width: 1.25em;
  height: 1.25em;
  margin-inline-start: -0.625em;
  margin-block-end: -0.625em;
  background-color: var(--bulma-primary);
  border-radius: 50%;
  transform: scale(0);
  transition: transform var(--bulma-speed-slow) var(--bulma-easing);

  &[data-state='checked'] {
    transform: scale(0.5);
  }
}

.radio-label {
  position: relative;
  top: 0.115rem;
  margin-right: 1.5rem;
  padding-left: 0.4rem;
  cursor: pointer;
}
</style>

<script setup>
import { useId } from 'vue'
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from 'reka-ui'

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
