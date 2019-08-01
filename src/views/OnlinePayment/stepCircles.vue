<template lang="pug">
  div.step-circles
    div.step-circles__group(
      v-for="step in totalSteps"
      :key="step"
      :class="[{ active: step === currentStep }, {done: step < currentStep}]")
      div.step-circles__group__circle {{ step }}
      div.step-circles__group__line(v-if="step !== totalSteps")
</template>
<script>
export default {
  props: {
    currentStep: {
      type: Number,
      default: 1,
    },
    totalSteps: {
      type: Number,
      default: 3,
    },
  },
};
</script>
<style lang="scss" scoped>
.step-circles {
  @include flex(center, center, row);
  &__group {
    @include flex(center, center, row);
    &__circle {
      @include flex(center, center, row);
      font-family: 'Lato';
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background-color: $op-gray;
      color: $op-white;
    }
    &__line {
      height: 2px;
      width: 70px;
      background-color: $op-gray;
    }
    &.active > .step-circles__group__circle {
      background-color: $op-green;
    }
    &.active > .step-circles__group__line {
      @include bg-gradient($op-green, $op-gray, 90deg);
    }
    &.done > .step-circles__group__circle {
      background-color: $op-green;
    }
    &.done > .step-circles__group__line {
      background-color: $op-green;
    }
  }
}
</style>
