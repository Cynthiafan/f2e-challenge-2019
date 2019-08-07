<template lang="pug">
  div.step-information
    div.step-title 
      div.step-title__main STEP2. 填寫付款資訊
      div.step-title__sub {{ subtitle[method] }}
    components(:is="method")

</template>
<script>
import card from './stepFormCard';
import webAtm from './stepFormWebAtm';
import cStore from './stepFormCStore';

export default {
  components: {
    card,
    webAtm,
    cStore,
  },
  data() {
    return {
      subtitle: {
        card: '信用卡/金融卡',
        webAtm: 'Web ATM',
        cStore: '超商付款',
      },
    };
  },
  computed: {
    method() {
      let ret = this.$route.params.method;
      return ret === 'transfer' ? 'web-atm' : ret;
    },
  },
};
</script>
