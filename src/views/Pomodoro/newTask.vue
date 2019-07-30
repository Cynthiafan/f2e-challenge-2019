<template lang="pug">
  div.new-task
    div.title ADD NEW TASK
    div.new-task__content
      div.new-task__content__name
        div TASK TITLE
        input(type="text")
      div.new-task__content__estimated
        div ESTIMATED TOMATO
        div.tomato
          div(v-for="tomato in 10" 
            :key="tomato" 
            :class="tomato <= estimatedTomatoCount ? 'icon-tomato-red' : 'icon-tomato-gray'"
            @click="estimatedTomatoCount = tomato")
            i.path1
            i.path2
    button.new-task__btn ADD TASK
</template>
<script>
export default {
  data() {
    return {
      estimatedTomatoCount: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.new-task {
  &__title {
    color: $p-lightgray-100;
    font-weight: 400;
    font-size: 20px;
    letter-spacing: 2px;
  }
  &__content {
    color: $p-gray-500;
    font-size: 14px;
    margin-bottom: 50px;
    &__estimated {
      margin-top: 20px;
      .tomato {
        margin-top: 15px;
        @include flex(flex-start, center, row);
        & > div {
          margin: 0 5px;
          font-size: 24px;
          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
  }
  &__btn {
    background-color: $p-red;
    border-radius: 30px;
    color: $p-lightgray-100;
    text-align: center;
    width: 100%;
    padding: 15px;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
