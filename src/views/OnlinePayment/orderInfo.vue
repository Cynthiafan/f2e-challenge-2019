<template lang="pug">
  div.order-info
    transition(name="slide-right")
      div.order-info__success(v-if="isDone") Finish
    div.order-info__title(@click="isShowOrder = !isShowOrder") 訂單資訊
    div.order-info__detail(:class="{ done: isDone, expand: isShowOrder }")
      div.order-info__detail__title 訂單資訊
      div.order-info__detail__item
        div.label 商品名稱：
        div.value iPhone XR 手機殼 x 1
      div.order-info__detail__item
        div.label 訂單編號：
        div.value 17485739
      div.order-info__detail__item
        div.label 訂單金額：
        div.value NT$ 600
    button.order-info__back 回到訂單

</template>
<script>
export default {
  data() {
    return {
      isShowOrder: false,
    };
  },
  props: {
    isDone: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.order-info {
  min-width: 240px;
  min-height: 240px;
  position: relative;
  @include respond-to(sm) {
    min-width: fit-content;
    min-height: fit-content;
    position: static;
  }
  &__title {
    display: none;
    @include respond-to(sm) {
      display: block;
      position: fixed;
      left: 0;
      top: 14vh;
      writing-mode: vertical-lr;
      z-index: 5;
      background-color: $op-lightgray;
      padding: 20px 15px 15px;
      border-radius: 0 5px 5px 0;
      box-shadow: 2px 2px 3px 2px rgba($op-black, 0.2);
      line-height: 1;
      letter-spacing: 5px;
      cursor: pointer;
    }
  }
  &__success {
    position: absolute;
    font-weight: bold;
    font-size: 20px;
    left: 50%;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
    &:before {
      content: '';
      position: absolute;
      width: 20px;
      height: 2px;
      background-color: #000;
      top: -20px;
      right: 0;
      transform: rotate(45deg);
    }
    &:after {
      content: '';
      position: absolute;
      width: 20px;
      height: 2px;
      background-color: #000;
      bottom: -20px;
      right: 0;
      transform: rotate(-45deg);
    }
  }
  &__detail {
    width: 100%;
    background-color: $op-lightgray;
    border-radius: 10px 0 0 10px;
    padding: 25px;
    @include respond-to(sm) {
      position: fixed;
      left: -100%;
    }
    &.done {
      position: absolute;
      left: 85%;
      padding-left: 50px;
      animation: slide-left 0.5s;
    }
    &__title {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 20px;
    }
    &__item {
      &:not(:last-child) {
        margin-bottom: 15px;
      }
      .label {
        color: $op-darkgray-bold;
      }
    }
  }
  &__back {
    position: absolute;
    bottom: -20px;
    left: 0;
    background-color: $op-black;
    color: #fff;
    padding: 8px 12px;
    border-radius: 5px;
    @include respond-to(sm) {
      bottom: 2.2vh;
      left: 20px;
    }
  }
  @keyframes slide-left {
    0% {
      left: 0;
    }
    100% {
      left: 85%;
    }
  }
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all 0.5s ease 0.5s;
  }

  .slide-right-enter,
  .slide-right-leave-to {
    left: 100%;
  }

  .slide-right-enter-to,
  .slide-right-leave {
    left: 50%;
  }
}
</style>
