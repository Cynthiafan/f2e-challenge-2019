<template lang="pug">
  div
    div.title ANALYSIS REPORT
    div.analysis
      div.analysis__overview
        div.analysis__overview__title TOMATO OF THIS WEEK
        div.analysis__overview__content
          div.analysis__overview__content__today
            div.count 8
            div.label TODAY
          div.analysis__overview__content__week
            div.count 20
            div.label 07/08-07/14
      div.analysis__chart
        div.analysis__chart__title 
          | CHART
          span 07/08-07/14
        div.analysis__chart__content
          div.analysis__chart__content__day(
            v-for="item in records"
            :key="item.date")
            div.total
              div.total__tomato(v-for="c in item.count" :key="c")
            div.label
              div.label__date {{ item.date }}
              div.label__weekday MON
      div.analysis__btn
        button PREV
        button(disabled) NEXT

</template>
<script>
export default {
  data() {
    return {
      records: [
        {
          date: '07/08',
          count: 12,
        },
        {
          date: '07/09',
          count: 8,
        },
        {
          date: '07/10',
          count: 0,
        },
        {
          date: '07/11',
          count: 0,
        },
        {
          date: '07/12',
          count: 0,
        },
        {
          date: '07/13',
          count: 0,
        },
        {
          date: '07/14',
          count: 0,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.analysis {
  color: $p-gray-500;
  font-size: 14px;
  & > div:first-child {
    margin-bottom: 15px;
  }
  &__overview {
    &__title {
      margin-bottom: 10px;
    }
    &__content {
      @include flex(center, center, row);
      background-color: $p-darkgray;
      border-radius: 2px;
      padding: 20px 0;
      & > div:first-child {
        border-right: 1px solid #606060;
      }
      &__today,
      &__week {
        flex: 1;
        text-align: center;
        padding: 5px 0;
        .count {
          font-size: 40px;
          font-weight: bold;
          color: $p-red;
        }
        .label {
          color: $p-lightgray-100;
          font-size: 12px;
          margin-top: 8px;
        }
      }
    }
  }
  &__chart {
    &__title {
      margin-bottom: 10px;
      span {
        color: $p-lightgray-100;
        font-size: 10px;
        margin-left: 5px;
      }
    }
    &__content {
      border-radius: 2px;
      width: 100%;
      background-color: $p-darkgray;
      min-height: 300px;
      padding: 0 20px;
      margin-bottom: 60px;
      @include flex(space-around, flex-end, row);
      &__day {
        transform: translateY(38px);
        @include flex(center, center, column);
        .total {
          &__tomato {
            width: 25px;
            height: 9px;
            border-radius: 5px;
            background-color: $p-red;
            margin-top: 1px;
          }
        }
        .label {
          text-align: center;
          margin-top: 10px;
          &__date {
            color: $p-lightgray-100;
            font-size: 12px;
          }
          &__weekday {
            font-size: 12px;
            margin-top: 4px;
          }
        }
      }
    }
  }
  &__btn {
    @include flex(space-between, center, row);
    button {
      border: 2px solid $p-red;
      color: $p-red;
      padding: 10px 25px;
      border-radius: 30px;
      background: inherit;
      font-size: 12px;
      font-weight: bold;
      cursor: pointer;
      &:disabled {
        border-color: #606060;
        color: #606060;
      }
    }
  }
}
</style>
