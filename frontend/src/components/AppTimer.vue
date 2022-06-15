<template>
  <div>
    <div
      :class="{ timer__display: true }"
      contenteditable
      @input="stringToSeconds"
    >
      {{ formatTime }}
    </div>
    <v-card-actions>
      <v-btn
        :class="{ app__timer__startButton: true, clicked: !isRunning }"
        @click="countDown"
      >
        {{ isRunning ? "Start" : "Stop" }}</v-btn
      >
      <v-btn v-if="!isRunning" icon="mdi-skip-next" color="grey" size="x-large">
      </v-btn>
    </v-card-actions>
  </div>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "AppTimer",
  data: () => ({
    timeInSeconds: 5,
    interval: null,
    canEditTime: false,
  }),
  props: {
    initialTimeInSeconds: { type: Number, required: true },
  },
  methods: {
    countDown() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      } else {
        this.interval = setInterval(() => {
          if (this.timeInSeconds >= 1) {
            this.timeInSeconds -= 1;
          } else {
            clearInterval(this.interval);
            this.interval = null;
            this.timeInSeconds = this.initialTimeInSeconds;
            this.$emit("timeFinished");
          }
        }, 1000);
      }
    },

    stopTime() {
      clearInterval(this.interval);
      this.interval = null;
    },

    restartInitialTime() {
      this.timeInSeconds = this.initialTimeInSeconds;
    },
  },
  created() {
    this.timeInSeconds = this.initialTimeInSeconds;
  },
  computed: {
    formatTime() {
      let hours = Math.floor(this.timeInSeconds / 3600);
      let minutes = Math.floor((this.timeInSeconds - 3600 * hours) / 60);
      let seconds = Math.floor(
        this.timeInSeconds - 3600 * hours - 60 * minutes
      );

      let hoursStr = hours < 10 ? "0" + hours : hours;
      let minutesStr = minutes < 10 ? "0" + minutes : minutes;
      let secondsStr = seconds < 10 ? "0" + seconds : seconds;
      return `${minutesStr}:${secondsStr}`;
    },

    isRunning() {
      return this.interval === null;
    },
  },
});
</script>


<style scoped lang="scss">
@import "@/variables.scss";

.timer__display {
  font-size: 120px;

  text-align: center;
  color: white;
  font-weight: bold;

  justify-self: start;
}

.app__timer__startButton {
  color: $app-background-color;
  background-color: white;
  box-shadow: rgb(235 235 235) 0px 6px 0px;
  width: 220px;
  height: 55px;
  font-size: 24px;
  margin: auto;
  justify-self: center;
  font-weight: bold;
}

.clicked {
  box-shadow: none;
  transform: translateY(6px);
}
</style>

