<template lang="pug">
  div.step-method
    div.step-title 
      div.step-title__main STEP1. 選擇付款方式
    div.step-method__options
      div.step-method__options__opt(v-for="opt in paymentMethods" :key="opt.value")
        input(type="radio" name="method" :id="opt.value" :value="opt.value" v-model="selectedMethod")
        label(:for="opt.value") 
          i(:class="`icon-${opt.icon}`")
          | {{ opt.label }}
    div.step-btn 
      button.step-btn--next(@click="$router.push({ name: 'paymentInformation', params: { method: selectedMethod } })") 下一步
</template>
<script>
export default {
  data() {
    return {
      selectedMethod: '',
      paymentMethods: [
        {
          label: '信用卡/金融卡',
          value: 'card',
          icon: 'credit-card',
        },
        {
          label: '銀聯卡',
          value: 'unionPay',
          icon: 'unionpay',
        },
        {
          label: '超商付款',
          value: 'cStore',
          icon: 'shop',
        },
        {
          label: 'Web ATM',
          value: 'webAtm',
          icon: 'web-atm',
        },
        {
          label: 'ATM 轉帳',
          value: 'transfer',
          icon: 'atm',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.step-method {
  text-align: center;
  &__options {
    @include flex(center, center, row);
    flex-wrap: wrap;
    &__opt {
      input {
        display: none;
        &:checked + label {
          background-color: $op-darkgreen;
          color: $op-white;
          img {
            fill: white;
          }
        }
      }
      label {
        @include flex(center, center, column);
        background-color: $op-lightgray-bold;
        border-radius: 5px;
        width: 150px;
        height: 150px;
        margin: 10px 10px;
        transition: 0.2s;
        font-size: 14px;
        cursor: pointer;
        @include respond-to(sm) {
          width: 130px;
          height: 130px;
        }
        i {
          font-size: 50px;
          line-height: 1;
          margin-bottom: 10px;
          @include respond-to(sm) {
            font-size: 40px;
          }
          &.icon-unionpay {
            font-size: 70px;
            margin-bottom: 0px;
            @include respond-to(sm) {
              font-size: 50px;
            }
          }
        }
      }
    }
  }
  .step-btn {
    margin-top: 30px;
    @include flex(flex-end, center, row);
  }
}
</style>
