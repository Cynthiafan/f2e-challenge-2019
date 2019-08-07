<template lang="pug">
  div.dropdown
    div.dropdown__display(
      :class="[customClass, {placeholder: !selectedItem.label}]"
      @click="isShowOptions = !isShowOptions") 
      | {{ selectedItem.label || placeholder }}
      i.common-angle-down
    transition(name="fade")
      ul.dropdown__options(v-if="isShowOptions")
        li.dropdown__options__opt(
          v-for="opt in options" 
          :key="opt.value"
          @click="selectedItem = opt; isShowOptions = false") 
          | {{ opt.label }}
    
</template>
<script>
export default {
  data() {
    return {
      isShowOptions: false,
      selectedItem: {
        label: '',
        value: '',
      },
    };
  },
  props: {
    placeholder: {
      type: String,
      default: '選擇',
    },
    customClass: {
      type: String,
    },
    options: {
      type: Array,
      default: () => {
        return [{ value: 1, label: 1 }, { value: 2, label: 2 }];
      },
    },
  },
  mounted() {
    window.addEventListener('touchstart', this.onClickOrTouchStart);
    window.addEventListener('click', this.onClickOrTouchStart);
  },
  beforeDestroy() {
    window.removeEventListener('touchstart', this.onClickOrTouchStart);
    window.removeEventListener('click', this.onClickOrTouchStart);
  },
  methods: {
    onClickOrTouchStart(e) {
      if (this.isShowOptions && !this.$el.contains(e.target)) this.closeOptions();
    },
    closeOptions() {
      setTimeout(() => {
        this.isShowOptions = false;
      }, 30);
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  -webkit-user-select: none;
}
.dropdown {
  position: relative;
  &__display {
    padding: 8px 30px 8px 10px;
    border: 1px solid $op-darkgray-light;
    border-radius: 5px;
    position: relative;
    min-width: 75px;
    font-size: 12px;
    cursor: pointer;
    &.placeholder {
      color: $p-gray-800;
    }
    i {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      color: #222;
    }
  }
  &__options {
    position: absolute;
    padding: 5px 0;
    top: 100%;
    background: #fff;
    width: 100%;
    border: 1px solid $op-darkgray-light;
    border-radius: 0 0 5px 5px;
    transition: 0.2s;
    max-height: 200px;
    overflow: auto;

    &__opt {
      padding: 5px 10px;
      font-size: 12px;
      &:hover {
        background-color: $op-lightgreen;
        transition: 0.2s;
        cursor: pointer;
      }
    }
  }
}
</style>
