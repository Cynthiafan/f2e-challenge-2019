<template lang="pug">
  div.pomodoro-sidebar
    ul
      li(v-for="item in navList" :key="item.value" @click="toggle(item.value)")
        i(:class="[item.icon, selectedItem === item.value ? 'selected' : '' ]")
    div.pomodoro-sidebar__toggle-btn(@click="toggle('')")
      div.icon-tomato-red.tomato
        i.path1
        i.path2
      div.icon-arrow.arrow(:class="{ toggle: selectedItem }")
</template>
<script>
export default {
  data() {
    return {
      selectedItem: '',
      navList: [
        { icon: 'icon-add', value: 'newTask' },
        { icon: 'icon-list', value: 'list' },
        { icon: 'icon-analysis', value: 'analysis' },
        { icon: 'icon-ringtone', value: 'ringtone' },
      ],
    };
  },
  methods: {
    toggle(item) {
      if (!this.selectedItem && !item) {
        this.selectedItem = this.navList[0].value;
        this.$emit('input', this.selectedItem);
        return;
      }
      this.selectedItem = item;
      this.$emit('input', this.selectedItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.pomodoro-sidebar {
  height: 100vh;
  background-color: $p-black;
  position: absolute;
  right: 0;
  top: 0;
  transition: right 0.3s ease;
  i {
    color: $p-lightgray-100;
    font-size: 60px;
    cursor: pointer;
    transition: 0.2s;
    &.selected {
      color: $p-red;
    }
  }
  &__toggle-btn {
    background: $p-lightgray-100;
    position: absolute;
    bottom: 20px;
    left: -24px;
    padding: 10px;
    border-radius: 25px 5px 5px 25px;
    @include flex(center, center, row);
    .tomato > i {
      font-size: 20px;
    }
    .arrow {
      margin-left: 10px;
      transform: rotate(180deg);
      &.toggle {
        transform: rotate(0deg);
      }
    }
  }
}
</style>
