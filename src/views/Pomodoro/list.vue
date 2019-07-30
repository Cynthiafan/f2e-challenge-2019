<template lang="pug">
  div.todo-list
    div.title TASK LISTS
    div.tabs
      div.tabs__tab 
        input(type="radio" name="tab" id="todo" value="todo" v-model="tab")
        label(for="todo") TO DO
      div.tabs__tab
        input(type="radio" name="tab" id="done" value="done" v-model="tab")
        label(for="done") DONE
      div.tabs__tab
        input(type="radio" name="tab" id="archive" value="archive" v-model="tab")
        label(for="archive") ARCHIVE

    ul.todo-list__content(v-if="tab === 'todo'" key="todo")
      li.todo-list__content__item(v-for="(item, i) in todoList" :key="item.id")
        div.todo-list__content__item__top(@click="isDoing = item.id")
          div.status(:class="{'icon-tomato-red': isDoing === item.id}")
            i.path1 
            i.path2 
          div.info
            div
              div.info__name {{ item.name }}
              div.info__progress
                svg-circle(
                  v-for="p in item.progress.total" :key="p"
                  class="circle"
                  :id="`sector${p}`"
                  :radius="circleSetting.radius" 
                  :borderWidth="circleSetting.borderWidth" 
                  :progress="p <= item.progress.finish ? 1 : p === item.progress.finish + 1 ? item.progress.doingProgress : 0")
          div.more.icon-more(
            :class="{ open: showEditBlockId && showEditBlockId === item.id }" 
            @click="toggleEditBlock(item.id)")
        transition(name="expand")
          div.todo-list__content__item__bottom(v-show="showEditBlockId === item.id")
            div.edit__title
              div TASK TITLE
              input(type="text" v-model="editTask.name")
            div.edit__estimated
              div ESTIMATED TOMATO
              div.tomato
                div(v-for="tomato in 10" 
                  :key="tomato" 
                  @click="editTask.total = tomato"
                  :class="tomato <= item.progress.total ? 'icon-tomato-red' : 'icon-tomato-gray'")
                  i.path1
                  i.path2
            div.edit__btn
              button.edit__btn__sub ARCHIVE
              button.edit__btn__main SAVE

    ul.todo-list__content(v-if="tab === 'done'" key="done")
      li.todo-list__content__item(v-for="(item, i) in doneList" :key="item.id")
        div.todo-list__content__item__top(@click="isDoing = item.id")
          div.complete.icon-complete
            i.path1 
            i.path2 
          div.info
            div
              div.info__name {{ item.name }}
              div.info__progress
                svg-circle(
                  v-for="p in item.progress.total" :key="p"
                  class="circle"
                  :id="`sector${p}`"
                  :radius="circleSetting.radius" 
                  :borderWidth="circleSetting.borderWidth" 
                  :progress="p <= item.progress.finish ? 1 : p === item.progress.finish + 1 ? item.progress.doingProgress : 0")
          div.more.icon-more(
            :class="{ open: showEditBlockId === item.id }" 
            @click="toggleEditBlock(item.id)")
        div.todo-list__content__item__bottom(v-show="showEditBlockId === item.id")
          div.edit__btn
            button.edit__btn__sub ARCHIVE
            button.edit__btn__main REDO
</template>
<script>
import SvgCircle from '@/components/pomodoro/SvgCircle';

export default {
  components: {
    SvgCircle,
  },
  data() {
    return {
      tab: 'todo',
      list: [
        {
          id: '1',
          name: 'My First Task',
          isFinish: false,
          progress: {
            total: 5,
            finish: 2,
            doingProgress: 0.3,
          },
        },
        {
          id: '2',
          name: 'My Second Task',
          isFinish: false,
          progress: {
            total: 2,
            finish: 0,
            doingProgress: 0.9,
          },
        },
        {
          id: '3',
          name: 'My Second Task',
          isFinish: true,
          progress: {
            total: 2,
            finish: 0,
            doingProgress: 0.9,
          },
        },
      ],
      isDoing: '1',
      showEditBlockId: '',
      circleSetting: {
        borderWidth: 1,
        radius: 4,
      },
    };
  },
  computed: {
    todoList() {
      return this.list.filter(item => !item.isFinish);
    },
    doneList() {
      return this.list.filter(item => item.isFinish);
    },
    editTask: {
      get() {
        let task = this.todoList.find(item => item.id === this.showEditBlockId);
        return {
          name: task ? task.name : '',
          total: task ? task.progress.total : 0,
        };
      },
      set(val) {
        console.log(val);
      },
    },
  },
  methods: {
    toggleEditBlock(id) {
      this.showEditBlockId = this.showEditBlockId === id ? '' : id;
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-list {
  &__tabs {
    @include flex(flex-start, center, row);
    &__tab {
      input {
        display: none;
        &:checked {
          & + label {
            background-color: $p-red;
            color: $p-lightgray-100;
          }
        }
      }
      label {
        padding: 8px 22px;
        border-radius: 8px 8px 0px 0px;
        background: #606060;
        color: $p-gray-500;
        display: block;
        font-weight: bold;
        font-size: 12px;
        cursor: pointer;
        transition: 0.2s;
      }
      &:first-child {
        margin-right: 8px;
      }
    }
  }
  &__content {
    margin: 2px 0;
    &__item {
      padding: 10px 40px;
      border-radius: 2px;
      background-color: $p-darkgray;
      color: $p-lightgray-100;
      margin-bottom: 2px;
      &:last-child {
        margin-bottom: 0px;
      }
      &__top {
        cursor: pointer;
        position: relative;
        @include flex(space-between, center, row);
        .status {
          position: absolute;
          left: -26px;
          font-size: 15px;
        }
        .complete {
          position: absolute;
          left: -28px;
          font-size: 18px;
        }

        .info {
          @include flex(flex-start, center, row);
          &__progress {
            margin-top: 8px;
            @include flex(flex-start, center, row);
            .circle {
              margin-right: 5px;
            }
          }
        }
        .more {
          color: $p-gray-500;
          position: absolute;
          right: -26px;
          cursor: pointer;
          &.open {
            transform: rotate(90deg);
          }
        }
      }
      &__bottom {
        border-top: 1px solid $p-black;
        margin: 10px 0px;
        color: $p-gray-500;
        font-size: 12px;
        padding: 12px 0 0px;
        .edit {
          &__title {
            margin-bottom: 15px;
          }
          &__estimated {
            .tomato {
              display: flex;
              font-size: 20px;
              margin: 10px 0 15px;
              & > div {
                margin-right: 10px;
              }
            }
          }
          &__btn {
            display: flex;
            button {
              padding: 12px;
              border-radius: 30px;
              color: $p-lightgray-100;
              font-size: 12px;
              font-weight: bold;
            }
            &__sub {
              background-color: #606060;
              width: 30%;
              margin-right: 15px;
            }
            &__main {
              background-color: $p-red;
              width: 70%;
            }
          }
        }
      }
    }
  }
}
</style>
