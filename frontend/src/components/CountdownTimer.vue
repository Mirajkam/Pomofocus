<template>
  <v-card>
    <div class="timer__display">{{ secondsToTime }}</div>
    <v-btn color="primary"> {{ running ? "Start" : "Stop" }} </v-btn>
  </v-card>
</template>

<script>
import timerTypes from "@/types/timerTypes.ts";
export default {
  name: "CountdownTimer",
  props: {
    initialTime: Number, // intial time is mesaured in seconds
    type: timerTypes,
  },
  data: () => ({
    time: 0, //measured in seconds
    running: true,
    interval: null,
  }),
  created() {
    this.time = this.initialTime;
  },
  computed: {
    secondsToTime() {
      var hrs = ~~(this.time / 3600);
      var mins = ~~((this.time % 3600) / 60);
      var secs = ~~this.time % 60;

      // Output like "1:01" or "4:03:59" or "123:03:59"
      var ret = "";

      if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }

      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
    },
  },
  methods: {
    toggleTimer() {
      if (this.running) {
        clearInterval(this.interval);
      } else {
        let initialTime = this.time;
        setInterval(() => {
          this.time -= 1;
        }, initialTime);
      }
    },
  },
};
</script>
