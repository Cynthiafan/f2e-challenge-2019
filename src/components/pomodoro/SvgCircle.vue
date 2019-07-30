<template lang="pug">
  svg(:width="svgSize" :height="svgSize" style="transform: rotate(-90deg)")
    circle(
      :cx="center" 
      :cy="center" 
      :r="circleRadius" 
      :stroke="borderColor" 
      :fill="circleFill" 
      :stroke-width="strokeWidth")
    path(
      v-if="progress < 1"
      fill="#ea5548"
      :id="id")
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    circleType: {
      type: String,
      default: 'circle',
    },
    radius: {
      type: Number,
      default: 100,
    },
    borderWidth: {
      type: Number,
      defalut: 2,
    },
    progress: {
      type: Number,
    },
    borderColor: {
      type: String,
      default: '#ea5548',
    },
    fillColor: {
      type: String,
      default: '#ea5548',
    },
  },
  computed: {
    circleRadius() {
      return `${this.radius}`;
    },
    circleFill() {
      if (this.circleType === 'circle') {
        return this.progress < 1 ? 'none' : this.fillColor;
      } else {
        return this.fillColor;
      }
    },
    svgSize() {
      return `${this.radius * 2 + this.borderWidth}`;
    },
    center() {
      return `${(this.radius * 2 + this.borderWidth) / 2}`;
    },
    strokeWidth() {
      return `${this.borderWidth}`;
    },
  },
  watch: {
    progress() {
      this.initGraph();
    },
  },
  mounted() {
    this.initGraph();
  },
  methods: {
    initGraph() {
      if (this.progress === 1) return;
      const path = document.getElementById(this.id);

      let r = this.svgSize / 2;

      let progress = this.progress;

      let deg = 360 * progress;

      let x0 = r + r * Math.cos((0 * Math.PI) / 180);
      let y0 = r + r * Math.sin((0 * Math.PI) / 180);
      let x1 = r + r * Math.cos((deg * Math.PI) / 180);
      let y1 = r + r * Math.sin((deg * Math.PI) / 180);

      let arcSweep = deg > 180 ? 1 : 0;

      path.setAttribute('d', `M ${r}, ${r} L ${x0},${y0} A ${r},${r} 1 ${arcSweep} ,1 ${x1} , ${y1} Z`);
    },
  },
};
</script>
