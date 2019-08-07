<template lang="pug">
  div.finish
    div.finish__complete
      div.step-title
        div.step-title__main 您的訂單已完成付款！
      div.finish__complete__img
        i.icon-finish.animated.bounceIn
      div.finish__complete__text
        | 稍後將寄送訂單詳細資訊至您的 E-mail
      div.step-btn
        button.step-btn--next 回到首頁
</template>
<script>
export default {};
</script>

<style lang="scss" scoped>
.finish {
  &__complete {
    &__img {
      width: 145px;
      height: 145px;
      border-radius: 50%;
      background: $op-green-lighter;
      margin: 60px auto;
      @include flex(center, center, row);
      font-size: 160px;
    }
    &__text {
      text-align: center;
    }
    .step-btn {
      margin-top: 30px;
      @include flex(center, center, row);
    }
  }
}
</style>
