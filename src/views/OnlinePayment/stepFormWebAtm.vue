<template lang="pug">
  div.web-atm
    div.web-atm__bank
      div.web-atm__bank__name 付款銀行：
      dropdown(placeholder="請選擇付款銀行" :options="bankList")
      ul.web-atm__bank__reminder
        li 請準備晶片經融卡 + 晶片讀卡機，我們將引導您至指定金融機構之網路ATM進行交易手續。
        li 持對應機構之金融卡可享免跨行轉帳手續費，若無以上金融機構發行之金融卡，可自由選擇其一金融機構進行後續交易流程。
    div.web-atm__email
      div.web-atm__email__name 付款人信箱：
      input(type="text" placeholder="請輸入電子信箱")
      div.web-atm__email__reminder 請再次確認「訂單資訊」與「付款資訊」，付款完成後將發送通知信至您的 E-mail 信箱。
    div.web-atm__privacy.checkbox
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
  data() {
    return {
      bankList: [
        { label: '004 臺灣銀行', value: '004' },
        { label: '005 臺灣土地銀行', value: '005' },
        { label: '006 合作金庫商業銀行', value: '006' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.web-atm {
  &__bank {
    &__name {
      margin-bottom: 5px;
    }
    &__reminder {
      margin: 20px 0;
      padding-left: 16px;
      li {
        list-style-type: decimal;
        margin: 10px 0;
        line-height: 1.6;
      }
    }
  }
  &__email {
    input {
      width: 100%;
    }
    &__name {
      margin-bottom: 5px;
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
