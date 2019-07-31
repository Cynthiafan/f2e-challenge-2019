<template lang="pug">
  div.free-cell(@mouseup="dragEnd")
    div.free-cell__top

      div.free-cell__top__free-area
        div.free-area.free(v-for="(card, i) in freeCards" :key="i" :id="`free-${i}`")
          img.free(
            v-if="card"
            :src="cards[card]"
            :id="card"
            draggable="false"
            @mousedown="dragStart"
            @dblclick="autoGetHome")

      div.free-cell__top__logo
        img.image(src="@/assets/images/free-cell/king_happy.png")
        div.text FREECELL

      div.free-cell__top__home-area
        div.home-area.home(
          v-for="group in homeCards"
          :key="group.type"
          :class="group.type"
          :id="`${group.type}-0`")
          img.home(
            v-for="(card,i) in group.cards"
            :key="card"
            :id="card"
            :src="cards[card]"
            :style="`z-index: ${i + 1}`"
            draggable="false"
            @mousedown="dragStart")

    div.free-cell__bottom
      div.free-cell__bottom__column(
        v-for="(group, i) in newCards" 
        :key="`group-${i + 1}`"
        :id="`column-${i}`")
        div.empty(v-if="!group.length")
        img.card(
          v-for="(card, j) in group"
          draggable="false"
          :id="card"
          :key="card"
          :src="cards[card]"
          :class="group.length > 12 ? `narrow-card-${j}` : `card-${j}`"
          @mousedown="dragStart"
          @dblclick="autoGetHome")

    footer-nav(
      ref="footer"
      @action="fireAction"
      :btnDisabled="btnDisabled"
      :isStartTimer="isMoved")
    transition(name="fade")
      Popup(
        v-show="isShowPopup" 
        :config="popupConfig" 
        @close="isShowPopup = false"
        @init="initGame"
        @restart="resetCards")
</template>
<script>
import FooterNav from './footer';
import Popup from './popup';
import popupTypes from './popup-types';
import { cards } from './image-binary';

export default {
  components: {
    FooterNav,
    Popup,
  },
  data() {
    return {
      cards,
      oldCards: [],
      newCards: [],
      freeCards: ['', '', '', ''],
      homeCards: [
        { type: 'S', cards: [] },
        { type: 'H', cards: [] },
        { type: 'D', cards: [] },
        { type: 'C', cards: [] },
      ],
      popupTypes,
      popupConfig: undefined,
      isShowPopup: false,
      clickOffset: {
        x: 0,
        y: 0,
      },
      draggingCards: [],
      isCardsMovable: false,
      movement: [],
      isMoved: false,
    };
  },
  computed: {
    allCards() {
      let cardType = ['S', 'H', 'D', 'C'];
      let cardMaxNum = 13;
      let cards = [];

      cardType.forEach(type => {
        for (let i = 1; i <= cardMaxNum; i++) {
          cards.push(`${type}-${i}`);
        }
      });

      return cards;
    },
    btnDisabled() {
      let restart = !this.isMoved;
      let undo = !this.movement.length;

      return { restart, undo };
    },
    hintCardToSort() {
      let target = this.newCards.map(column => column[column.length - 1]);

      /* TODO:
        1. CARD to SORT
        2. CARD to CARD
        3. CARD to TEMP
        4. TEMP to SORT
        5. TEMP to CARD
      */

      return target;
    },
  },
  created() {
    if (localStorage.getItem('fc')) {
      this.restoreGame();
    } else {
      this.initGame();
      this.showRules();
    }
  },
  updated() {
    this.checkIsWin();
    this.saveGame();
  },
  methods: {
    showRules() {
      this.popupConfig = this.popupTypes.rule;
      this.isShowPopup = true;
    },
    changeCardPlace(movingCard, targetPlace, isUndo = false) {
      if (
        !this.isCardsMovable ||
        movingCard[0] === targetPlace ||
        !(
          targetPlace.classList.contains('home') ||
          targetPlace.classList.contains('free') ||
          targetPlace.classList.contains('card') ||
          targetPlace.classList.contains('empty')
        )
      )
        return;

      let colorGroupRed = ['H', 'D'];
      let [targetType, targetNum] = targetPlace.id.split('-');
      let [type, num] = movingCard[0].id.split('-');
      let movingCardId = Array.apply(null, movingCard).map(card => card.id);

      let movement = {
        cards: movingCardId,
        from: { place: '', index: 0 },
      };

      // 同樣地方就不動

      // 目標：放到整理牌堆中
      if (targetPlace.classList.contains('home')) {
        /* 限制：
          1. 只能放一張
          2. 要放在同花色
          3. 目標牌堆的最上面一張卡數字 === 移動中的牌數字 - 1
        */

        if (movingCard[0].classList.contains('home')) return;

        let isOnlyOneCard = movingCard.length === 1;
        let isContinuousNum = Number(num) === Number(targetNum) + 1;
        let hasSameType = type === targetType;

        if ((!isOnlyOneCard || !isContinuousNum || !hasSameType) && !isUndo) return;

        let targetGroupIndex = this.homeCards.findIndex(group => group.type === targetType);
        this.homeCards[targetGroupIndex].cards.push(movingCard[0].id);

        this.$refs.footer.addScore(250);
      }

      // 目標：放到暫放區
      if (targetPlace.classList.contains('free')) {
        /* 限制：
          1. 只能放一張
          2. 目標位置不能有牌
        */

        let targetIndex = Number(targetNum);
        let isTargetPlaceEmpty = !this.freeCards[targetIndex];
        let isOnlyOneCard = movingCard.length === 1;

        if ((!isOnlyOneCard || !isTargetPlaceEmpty) && !isUndo) return;

        this.$set(this.freeCards, targetIndex, movingCard[0].id);
      }

      // 目標：放到下方牌堆中
      if (targetPlace.classList.contains('card')) {
        /* 限制：
          1. 要不同顏色
          2. 目標位置的數字要比拖曳的第一張數字大 1
        */

        let isContinuousNum = Number(num) === Number(targetNum) - 1;
        let isDifferentColor = colorGroupRed.includes(type) !== colorGroupRed.includes(targetType);

        if ((!isContinuousNum || !isDifferentColor) && !isUndo) return;

        let targetIndex = Number(targetPlace.parentElement.id.split('-')[1]);
        this.$set(this.newCards, targetIndex, [...this.newCards[targetIndex], ...movingCardId]);
      }

      if (targetPlace.classList.contains('empty')) {
        let columnIndex = Number(targetPlace.parentElement.id.split('-')[1]);
        this.$set(this.newCards, columnIndex, movingCardId);
      }

      if (movingCard[0].classList.contains('free')) {
        let movingIndex = Number(movingCard[0].parentElement.id.split('-')[1]);
        this.$set(this.freeCards, movingIndex, '');

        movement.from.place = 'free';
        movement.from.index = movingIndex;
      }

      if (movingCard[0].classList.contains('home')) {
        let groupIndex = this.homeCards.findIndex(group => group.type === type);
        this.homeCards[groupIndex].cards.pop();

        movement.from.place = 'home';
        movement.from.index = groupIndex;
      }

      if (movingCard[0].classList.contains('card')) {
        let columnIndex = Number(movingCard[0].parentElement.id.split('-')[1]);
        let startIndex = this.newCards[columnIndex].findIndex(card => card === movingCard[0].id);
        this.newCards[columnIndex].splice(startIndex);

        movement.from.place = 'card';
        movement.from.index = columnIndex;
      }

      if (!isUndo) {
        this.saveMovement(movement);
        this.isMoved = true;
      }
    },
    saveGame() {
      let all = {
        free: this.freeCards,
        home: this.homeCards,
        card: this.newCards,
        movement: this.movement,
        oriCard: JSON.parse(JSON.stringify(this.oldCards)),
      };
      localStorage.setItem('fc', JSON.stringify(all));
    },
    saveMovement(m) {
      this.movement.push(m);
      if (this.movement.length > 3) this.movement.shift();
    },
    undoMovement() {
      if (!this.movement.length) return;

      let movement = this.movement.pop();
      let movingCard = movement.cards.map(card => {
        return document.getElementById(card);
      });
      let { cards, from } = movement;
      let targetPlace;

      switch (from.place) {
        case 'free': {
          targetPlace = document.getElementById(`free-${from.index}`);
          break;
        }
        case 'sort': {
          let type = cards[0].split('-')[0];
          targetPlace = document.getElementById(`${type}-${from.index}`);
          break;
        }
        case 'card': {
          targetPlace =
            document.getElementById(`column-${from.index}`).lastChild ||
            document.getElementById(`column-${from.index}`);
        }
      }

      this.changeCardPlace(movingCard, targetPlace, true);
      this.$refs.footer.minusScore(100);
    },
    removeAllHintBox() {
      let boxes = document.getElementsByClassName('hint-box');

      while (boxes.length > 0) {
        boxes[0].parentNode.removeChild(boxes[0]);
      }
    },
    giveHint() {
      let column = Array.apply(null, document.getElementById('column-0').childNodes);
      let cards = column.splice(4);

      let { left, top } = cards[0].getBoundingClientRect();
      let { bottom } = cards[cards.length - 1].getBoundingClientRect();
      let height = bottom - top;
      let hintBox = document.createElement('div');

      hintBox.classList.add('hint-box');
      hintBox.style.left = `${left}px`;
      hintBox.style.top = `${top}px`;
      hintBox.style.height = `${height}px`;
      hintBox.style.opacity = '1';

      document.getElementById('app').appendChild(hintBox);

      setTimeout(() => {
        this.removeAllHintBox();
      }, 2000);
    },
    dragEnd(e) {
      if (!this.draggingCards.length) return;

      this.removeListenMousemove();
      this.changeCardPlace(this.draggingCards, e.target);

      this.draggingCards = [];
    },
    getMousePosition(e) {
      if (!this.isCardsMovable) return;

      let x = e.clientX - this.clickOffset.x;
      let y = e.clientY - this.clickOffset.y;

      this.draggingCards.forEach((card, i) => {
        card.classList.add('dragging');
        card.style.left = `${x}px`;
        card.style.top = `${i > 0 ? y + 25 * i : y}px`;
      });
    },
    removeListenMousemove() {
      document.removeEventListener('mousemove', this.getMousePosition);
      this.draggingCards.forEach(card => {
        card.classList.remove('dragging');
      });
    },
    autoGetHome(e) {
      let movingCard = e.target.id;
      let [type, num] = movingCard.split('-');

      let sameTypeGroup = this.homeCards.find(group => group.type === type);
      let lastCard = sameTypeGroup.cards[sameTypeGroup.cards.length - 1] || `${type}-0`;
      let targetNum = lastCard.split('-')[1];
      let freeEmptyIndex = this.freeCards.findIndex(card => !card);
      let targetEl;

      if (Number(targetNum) === Number(num) - 1) {
        targetEl = document.getElementById(lastCard);
      } else if (freeEmptyIndex >= 0) {
        targetEl = document.getElementById(`free-${freeEmptyIndex}`);
      }

      if (!targetEl) return;

      this.changeCardPlace([e.target], targetEl);
    },
    dragStart(e) {
      let targetSiblings = Array.apply(null, e.target.parentElement.childNodes);
      let targetIndex = targetSiblings.findIndex(el => el === e.target);

      if (targetIndex !== targetSiblings.length - 1) {
        this.draggingCards = targetSiblings.slice(targetIndex);
      } else {
        this.draggingCards = [e.target];
      }

      this.checkIsDraggable();

      if (!this.isCardsMovable) return;

      document.addEventListener('mousemove', this.getMousePosition);

      const { left, top } = e.target.getBoundingClientRect();

      this.clickOffset.x = e.clientX - left;
      this.clickOffset.y = e.clientY - top;
    },
    checkIsWin() {
      let isWin = this.homeCards.every(type => type.cards.length === 13);

      if (isWin) {
        this.$refs.footer.pauseTimer();
        this.popupConfig = this.popupTypes.complete;
        this.isShowPopup = true;
      }
    },
    checkIsDraggable() {
      let colorGroupRed = ['H', 'D'];
      let hasWrong = false;

      this.draggingCards.forEach((card, i) => {
        let [type, num] = card.id.split('-');

        if (i !== this.draggingCards.length - 1) {
          let [nextType, nextNum] = this.draggingCards[i + 1].id.split('-');

          // 不是連續數字無法移動
          if (Number(nextNum) !== Number(num) - 1) {
            hasWrong = true;
            return;
          }

          // 相同顏色無法移動
          if (colorGroupRed.includes(type) === colorGroupRed.includes(nextType)) {
            hasWrong = true;
            return;
          }
        }
      });

      this.isCardsMovable = hasWrong ? false : true;
    },
    fireAction(type) {
      if (type === 'init' || type === 'restart') {
        this.popupConfig = this.popupTypes[type];
        this.isShowPopup = true;
      }
      if (type === 'hint') this.giveHint();
      if (type === 'undo') this.undoMovement();
    },
    resetCards() {
      let copy = JSON.parse(JSON.stringify(this.oldCards));
      copy.forEach((column, i) => {
        this.$set(this.newCards, i, column);
      });
      this.freeCards = ['', '', '', ''];
      this.homeCards = [
        { type: 'S', cards: [] },
        { type: 'H', cards: [] },
        { type: 'D', cards: [] },
        { type: 'C', cards: [] },
      ];
      this.isMoved = false;
      this.movement = [];

      this.isShowPopup = false;
    },
    restoreGame() {
      let { free, home, card, movement, oriCard } = JSON.parse(localStorage.getItem('fc'));

      this.freeCards = [...free];
      this.homeCards = [...home];
      this.movement = [...movement];
      this.oldCards = JSON.parse(JSON.stringify(oriCard));
      this.isMoved = true;

      card.forEach((column, i) => {
        this.$set(this.newCards, i, column);
      });

      this.$nextTick(() => this.checkIsWin());
    },
    initGame() {
      let cards = [...this.allCards];

      cards = this.shuffle(cards);
      cards = this.groupBy(cards);
      this.newCards = cards;
      this.oldCards = JSON.parse(JSON.stringify(cards));
      this.freeCards = ['', '', '', ''];
      this.homeCards = [
        { type: 'S', cards: [] },
        { type: 'H', cards: [] },
        { type: 'D', cards: [] },
        { type: 'C', cards: [] },
      ];
      this.isMoved = false;
      this.isShowPopup = false;

      this.saveGame();
    },
    shuffle(cards) {
      for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      return cards;
    },
    groupBy(cards) {
      let targetCount = [7, 7, 7, 7, 6, 6, 6, 6];
      let groupedCards = [];

      targetCount.forEach(count => {
        groupedCards.push(cards.splice(0, count));
      });

      return groupedCards;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  -webkit-user-select: none;
}
.free-cell {
  img {
    width: 95px;
    &.dragging {
      position: absolute;
      transform: translate(0, 0) !important;
      z-index: 10;
      pointer-events: none;
    }
  }
  &__top {
    width: 85%;
    max-width: 1000px;
    margin: 0 auto;
    @include flex(space-between, center, row);
    &__free-area {
      @include flex(center, center, row);
      .free-area {
        margin-right: 15px;
        border: 2px solid $fc-lightgray;
        border-radius: 5px;
        width: 95px;
        height: 145px;

        &:last-child {
          margin-right: 0;
        }
        img {
          transform: translate(-2px, -2px);
        }
      }
    }
    &__logo {
      @include flex(center, center, column);
      margin: 0 20px;
      .image {
        width: 60px;
      }
      .text {
        font-size: 14px;
        font-weight: bold;
        margin-top: 5px;
        letter-spacing: 2px;
      }
    }
    &__home-area {
      @include flex(center, center, row);
      .home-area {
        box-shadow: 0 0 0 2px rgba($fc-lightgray, 0.6);
        background: rgba($fc-lightgray, 0.6);
        border-radius: 5px;
        margin-right: 15px;
        width: 91px;
        height: 141px;

        $images: 13;

        @for $i from 0 to $images {
          img:nth-child(#{$i + 1}) {
            transform: translate(-2px, -145px * $i + -2px * ($i + 1));
          }
        }

        &:last-child {
          margin-right: 0;
        }

        &.S {
          background-image: url('~@/assets/images/free-cell/S.png');
        }
        &.H {
          background-image: url('~@/assets/images/free-cell/H.png');
        }
        &.D {
          background-image: url('~@/assets/images/free-cell/D.png');
        }
        &.C {
          background-image: url('~@/assets/images/free-cell/C.png');
        }

        &.S,
        &.H,
        &.D,
        &.C {
          background-size: 35px;
          background-repeat: no-repeat;
          background-position: center;
        }
      }
    }
  }
  &__bottom {
    width: 80%;
    max-width: 1000px;
    margin: 30px auto 0;
    @include flex(space-between, flex-start, row);
    &__column {
      min-width: 95px;
      .empty {
        min-width: 95px;
        min-height: 200px;
      }
      @include flex(flex-start, center, column);
      @for $i from 0 through 10 {
        .card-#{$i} {
          transform: translateY(-120px * $i);
        }
      }
      @for $j from 0 through 20 {
        .narrow-card-#{$j} {
          transform: translateY(-128px * $j);
        }
      }
    }
  }
}
</style>
