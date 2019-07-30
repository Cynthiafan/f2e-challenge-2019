<template lang="pug">
  div.ringtone 
    div.title RINGTONE
    div.tabs
      div.tabs__tab 
        input(type="radio" name="tab" id="work" value="work" v-model="tab")
        label(for="work") WORK
      div.tabs__tab
        input(type="radio" name="tab" id="break" value="break" v-model="tab")
        label(for="break") BREAK

    ul.list(v-if="tab === 'work'" key="work")
      li.list__item(
        v-for="(item, i) in ringtoneList" 
        :key="item.id"
        @click="")
        div.list__item__prefix-icon
          svg-circle(
            :id="`status-${i}`"
            :radius="circleSetting.radius"
            :borderWidth="circleSetting.borderWidth"
            :progress="item.isSelect ? 1 : 0")
        div.info__name {{ item.name }}
        div.list__item__suffix-icon.icon-start(@click="playAudio(item)")

    audio(
      ref="audio"
      type="audio/mp3"
      @canplay="getDuration"
      @timeupdate="updateTime")

</template>
<script>
import SvgCircle from '@/components/pomodoro/SvgCircle';

export default {
  components: {
    SvgCircle,
  },
  data() {
    return {
      tab: 'work',
      ringtoneList: [
        {
          id: '1',
          name: 'Bugle Tune',
          isSelect: true,
          url: require('@/assets/audio/Bugle_Tune.mp3'),
        },
        {
          id: '2',
          name: 'Digital Watch Alarm',
          isSelect: false,
          url: require('@/assets/audio/Digital_Watch_Alarm_Long.mp3'),
        },
        {
          id: '3',
          name: 'Dinner Bell Triangle',
          isSelect: false,
          url: require('@/assets/audio/Dinner_Bell_Triangle.mp3'),
        },
        {
          id: '4',
          name: 'Mechanical_Clock_Ring',
          isSelect: false,
          url: require('@/assets/audio/Mechanical_Clock_Ring.mp3'),
        },
        {
          id: '5',
          name: 'Medium Bell Ringing',
          isSelect: false,
          url: require('@/assets/audio/Medium_Bell_Ringing_Far.mp3'),
        },
      ],
      circleSetting: {
        radius: 5,
        borderWidth: 2,
      },
    };
  },
  methods: {
    playAudio(id) {
      this.$refs.audio.src = id.url;
      this.$refs.audio.play();
    },
    getDuration() {
      console.log(this.$refs.audio.duration);
    },
    updateTime(e) {
      console.log(e.target.currentTime);
    },
  },
};
</script>
