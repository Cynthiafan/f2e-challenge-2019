<template lang="pug">
  div.pomodoro
    div.pomodoro__left(:class="{ toggle: !!selectedFeature }")
      div.pomodoro__left__no-task(v-if="!doingTask")
        div.tomato
          div.tomato__title POMODORO
          div.icon-tomato-red
            i.path1
            i.path2
        div.description 
          p You don’t have any task now,
          p please add task first!
      div.pomodoro__left__doing-task(v-else)
        div.title {{ doingTask.name }}
        div.progress
          svg-circle(
            v-for="p in doingTask.progress.total" :key="p"
            class="circle"
            :id="`sector${p}`"
            :radius="5" 
            :borderWidth="1" 
            :progress="p <= doingTask.progress.finish ? 1 : p === doingTask.progress.finish + 1 ? doingTask.progress.doingProgress : 0")

        div.countdown
        div.btn-group
        div.complete

      div.pomodoro__left__name POMODORO
    navbar(:class="{ toggle: !!selectedFeature }" v-model="selectedFeature")
    transition(name="slide")
      div.pomodoro__right(v-show="selectedFeature"  :class="{open:selectedFeature}")
        transition(name="fade" mode="out-in")
          component(:is="selectedFeature")
</template>
<script>
import navbar from './navbar';
import newTask from './newTask';
import list from './list';
import analysis from './analysis';
import ringtone from './ringtone';
import SvgCircle from '@/components/pomodoro/SvgCircle';

export default {
  components: {
    SvgCircle,
    navbar,
    newTask,
    list,
    analysis,
    ringtone,
  },
  data() {
    return {
      selectedFeature: '',
      isUseTransition: false,
      doingTask: {
        id: '1',
        name: 'My First Task',
        isFinish: false,
        progress: {
          total: 5,
          finish: 2,
          doingProgress: 0.3,
        },
      },
    };
  },
  watch: {
    selectedFeature(val, oldVal) {
      this.isUseTransition = oldVal && val ? false : true;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/assets/css/pomodoro.css'; // font-icon

.pomodoro {
  .toggle {
    right: calc(50% - 60px);
    transition: right 0.3s ease;
  }
  &__left {
    @include flex(center, center, row);
    width: 100%;
    height: 100vh;
    padding-right: 60px;
    &.toggle {
      padding-right: 50%;
      .pomodoro__left__name {
        left: calc(25% + 30px);
      }
    }
    &__no-task {
      .tomato {
        position: relative;
        font-size: 300px;
        &__title {
          position: absolute;
          font-weight: 200;
          color: $p-lightgray-100;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          letter-spacing: 2px;
        }
      }
      .description {
        margin-top: 50px;
        font-size: 14px;
        color: $p-black;
        text-align: center;
        line-height: 1.5;
      }
    }
    &__doing-task {
      .title {
        font-size: 24px;
      }
      .progress {
        @include flex(center, center, row);
        svg {
          margin: 0 2px;
        }
      }
    }
    &__name {
      color: $p-black;
      font-size: 10px;
      font-weight: 300;
      position: absolute;
      bottom: 50px;
      left: 50%;
      transform: translateX(calc(-50% - 30px));
    }
  }
  &__right {
    background-color: $p-black;
    border-left: 1px solid $p-darkgray;
    position: absolute;
    right: calc(-50vw - 60px);
    top: 0;
    height: 100vh;
    width: calc(50vw - 60px);
    padding: 30px;
    &.open {
      right: 0;
    }
    /deep/ .title {
      color: $p-lightgray-100;
      font-weight: bold;
      font-size: 20px;
      letter-spacing: 2px;
      border-bottom: 1px solid $p-darkgray;
      padding-bottom: 25px;
      margin-bottom: 25px;
    }
  }
}
</style>
