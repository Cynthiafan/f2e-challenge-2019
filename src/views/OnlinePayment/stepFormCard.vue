<template lang="pug">
  div.method-card
    div.method-card__type
      div.method-card__type__option
        input(type="radio" value="once" id="once" name="type" v-model="type")
        label.circle(for="once")
        label(for="once") 一次付款
      div.method-card__type__option
        input(type="radio" value="seperate" id="seperate" name="type" v-model="type")
        label.circle(for="seperate")
        label(for="seperate") 分期付款
    div.method-card__item
      div.method-card__item__name 卡號：
      div.method-card__item__number 
        input(type="number")
        span －
        input(type="number")
        span －
        input(type="number")
        span －
        input(type="number")
    div.method-card__item
      div.method-card__item__name 有效日期：
    div.method-card__item
      div.method-card__item__name 安全碼：
    div.method-card__item
      div.method-card__item__name 付款人信箱：

</template>
<script>
export default {
  data() {
    return {
      type: '',
    };
  },
};
</script>

<style lang="scss" scoped>
.method-card {
  &__type {
    @include flex(flex-start, center, row);
    &__option {
      @include flex(center, center, row);
      &:not(:last-child) {
        margin-right: 15px;
      }
      input {
        display: none;
        &:checked + label.circle::before {
          opacity: 1;
          transition: 0.2s;
        }
      }
      label.circle {
        position: relative;
        width: 16px;
        height: 16px;
        border: 1px solid $op-darkgray-light;
        border-radius: 50%;
        margin-right: 8px;
        &:before {
          content: '';
          opacity: 0;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: $op-darkgreen;
          transition: 0.2s;
        }
      }
      label {
        cursor: pointer;
      }
    }
  }
  &__item {
    margin: 10px 0;
    &__number {
      @include flex(flex-start, center, row);
      input {
        width: 52px;
      }
      span {
        margin: 0 8px;
      }
    }
  }
}
</style>
