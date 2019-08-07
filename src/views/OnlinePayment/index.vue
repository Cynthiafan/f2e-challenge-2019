<template lang="pug">
  div.online-payment
    div.online-payment__background
    div.online-payment__container
      orderInfo(:isDone="currentStep === allSteps.length - 1")
      div.online-payment__container__main
        step-circles.online-payment__container__main__steps(:currentStep="currentStep + 1")
        div.online-payment__container__main__content
          transition(name="fade" mode="out-in")
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
  computed: {
    allSteps() {
      return this.$router.options.routes
        .find(page => page.path === '/online-payment')
        .children.filter(child => child.path);
    },
    currentStep() {
      return this.allSteps.findIndex(step => step.name === this.$route.name);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/assets/css/payment.css'; // font-icon

.online-payment {
  &__container {
    width: 75%;
    @include flex(center, flex-start, row);
    @include respond-to(sm) {
      width: 100%;
    }
    &__main {
      background: #fff;
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
        height: calc(100vh - 114px);
        overflow-y: auto;
        @include respond-to(sm) {
          padding: 30px 25px;
          height: calc(90vh - 114px);
        }
      }
    }
  }
}
</style>
