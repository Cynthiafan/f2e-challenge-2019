<template lang="pug">
  div.order-info
    div.order-info__detail
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

</template>
<style lang="scss" scoped>
.order-info {
  min-width: 240px;
  &__detail {
    width: 100%;
    background-color: $op-lightgray;
    border-radius: 10px 0 0 10px;
    padding: 25px;
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
}
</style>
