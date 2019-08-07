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
        div.types
          i.icon-visa(:class="{active: creditCardType === 1}")
          i.icon-mastercard(:class="{active: creditCardType === 2}")
          i.icon-jcb(:class="{active: creditCardType === 3}")
    div.method-card__item
      div.method-card__item__name 有效日期：
      div.method-card__item__date 
        dropdown(placeholder="MM" :options="months")
        span /
        dropdown(placeholder="YY" :options="years")
    div.method-card__item
      div.method-card__item__name 安全碼：
      div.method-card__item__ccv
        input(type="number")
        img(src="~@/assets/images/online-payment/back-three.svg")
    div.method-card__item
      div.method-card__item__name 付款人信箱：
      div.method-card__item__email
        input(type="text")
    div.method-card__reminder
      | 請再次確認「訂單資訊」與「付款資訊」，付款完成後將發送通知信至您的 E-mail 信箱。
    div.method-card__privacy
      input(type="checkbox" id="privacy")
      label.rect(for="privacy")
      label(for="privacy") 我已閱讀並同意第三方支付金流平台服務條款
    div.step-btn 
      button.step-btn--prev(@click="$router.push({ name: 'onlinePayment' })") 上一步
      button.step-btn--next(@click="$router.push({ name: 'paymentFinish' })") 下一步

</template>
<script>
import Dropdown from '@/components/Dropdown';
export default {
  components: {
    Dropdown,
  },
  data() {
    return {
      type: '',
      cardNumber: ['', '', '', ''],
      creditCardType: 1,
    };
  },
  computed: {
    months() {
      let months = [];
      for (let i = 1; i <= 12; i++) {
        let text = i.toString().padStart(2, '0');
        months.push({ value: i, label: text });
      }
      return months;
    },
    years() {
      let years = [];
      let currentYear = new Date().getFullYear();
      for (let i = currentYear; i <= currentYear + 20; i++) {
        let text = i.toString().substr(2, 3);
        years.push({ value: i, label: text });
      }
      return years;
    },
  },
  methods: {
    autoBlurToNext(val) {
      console.log(val);
    },
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
    &__name {
      margin-bottom: 5px;
    }
    &__number {
      @include flex(flex-start, center, row);
      input {
        max-width: 55px;
      }
      span {
        margin: 0 8px;
      }
    }
    &__date {
      @include flex(flex-start, center, row);
      span {
        margin: 0 8px;
      }
    }
    &__ccv {
      @include flex(flex-start, center, row);
      input {
        max-width: 75px;
      }
      img {
        width: 40px;
        margin-left: 5px;
      }
    }
    &__email > input {
      min-width: 250px;
    }
    .types {
      margin-left: 15px;
      font-size: 35px;
      line-height: 1;
      @include flex(center, center, row);
      i:not(:last-child) {
        margin-right: 5px;
      }
      i.active {
        color: $op-darkgreen;
      }
    }
  }
  &__reminder {
    margin-bottom: 10px;
  }
  &__privacy {
    @include flex(flex-start, center, row);
    position: relative;
    input[type='checkbox'] {
      display: none;
      &:checked {
        & + label.rect:before {
          opacity: 1;
          background-color: $op-darkgreen;
        }
      }
    }
    label.rect {
      border: 1px solid $op-darkgray-light;
      border-radius: 4px;
      width: 14px;
      height: 14px;
      margin-right: 5px;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 1px;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        border-radius: 2px;
        opacity: 0;
        transition: 0.2s;
      }
    }
  }
  .step-btn {
    margin-top: 30px;
    @include flex(space-between, center, row);
  }
}
</style>
