<template lang="pug">
  div.online-payment
    div.online-payment__container
      orderInfo
      div.online-payment__container__main
        step-circles.online-payment__container__main__steps
        div.online-payment__container__main__content
          transition(name="fade")
            router-view
</template>
<script>
import orderInfo from './orderInfo';
import stepCircles from './stepCircles';

export default {
  components: {
    orderInfo,
    stepCircles,
  },
};
</script>
<style lang="scss" scoped>
.online-payment {
  &__container {
    width: 75%;
    @include flex(center, flex-start, row);
    &__main {
      width: 100%;
      position: relative;
      &__steps {
        position: absolute;
        left: 50%;
        top: -74px;
        transform: translateX(-50%);
      }
      &__content {
        box-shadow: 0 2px 13px 0 rgba($op-black, 0.08);
        border-radius: 0 10px 0 0;
        padding: 40px 50px;
        width: 100%;
        min-height: 100vh;
      }
    }
  }
}
</style>
