<template lang="pug">
  div.c-store
    div.c-store__branch
      div.c-store__branch__name 付款超商：
      dropdown(placeholder="請選擇超商")
    div.c-store__email
      div.c-store__email__name 付款人信箱：
      input(type="text" placeholder="請輸入電子信箱")
      div.c-store__email__reminder 請再次確認「訂單資訊」與「付款資訊」，付款完成後將發送通知信至您的 E-mail 信箱。
    div.c-store__email__privacy.checkbox
      input(type="checkbox" id="privacy")
      label.rect(for="privacy")
      label(for="privacy") 我已閱讀並同意第三方支付金流平台服務條款
    div.step-btn 
      button.step-btn--prev(@click="$router.push({ name: 'onlinePayment' })") 上一步
      button.step-btn--next(@click="$router.push({ name: 'paymentFinish' })") 下一步
</template>
<script>
import dropdown from '@/components/Dropdown';
export default {
  components: {
    dropdown,
  },
};
</script>

<style lang="scss" scoped>
.c-store {
  &__branch {
    &__name {
      margin-bottom: 5px;
    }
  }
  &__email {
    margin: 30px 0 20px;
    &__name {
      margin-bottom: 5px;
    }
    input {
      width: 100%;
    }
    &__reminder {
      margin: 10px 0 20px;
    }
  }
  &__privacy {
  }
  .step-btn {
    margin-top: 30px;
    @include flex(space-between, center, row);
  }
}
</style>
