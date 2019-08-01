<template lang="pug">
  div.step-method
    div.step-title 
      div.step-title__main STEP1. 選擇付款方式
    div.step-method__options
      div.step-method__options__opt(v-for="opt in paymentMethods" :key="opt.value")
        input(type="radio" name="method" :id="opt.value" :value="opt.value" v-model="selectedMethod")
        label(:for="opt.value") {{ opt.label }}
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
        },
        {
          label: '銀聯卡',
          value: 'unionPay',
        },
        {
          label: '超商付款',
          value: 'cStore',
        },
        {
          label: 'Web ATM',
          value: 'webAtm',
        },
        {
          label: 'ATM 轉帳',
          value: 'transfer',
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
        }
      }
      label {
        @include flex(center, center, row);
        background-color: $op-lightgray-bold;
        border-radius: 5px;
        width: 150px;
        height: 150px;
        margin: 10px 10px;
        transition: 0.2s;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
  .step-btn {
    margin-top: 30px;
    @include flex(flex-end, center, row);
  }
}
</style>

