<template>
  <v-card :class="['timer__wrapper']">
    <v-tabs
      background-color="transparent"
      color="white"
      centered
      class="timer__tabs"
      v-model="timerType"
      @click="
        (tabs) => {
          changeTabs(timerType);
        }
      "
      active-class="timerType__tabs__selected"
    >
      <v-tab> Pomodoro</v-tab>
      <v-tab> Short Break</v-tab>
      <v-tab> Long Break</v-tab>
    </v-tabs>

    <v-window v-model="timerType">
      <v-window-item :value="0">
        <app-timer
          :initialTimeInSeconds="getPomo"
          ref="pomodoroTimer"
          @timeFinished="switchToNextTab"
        >
        </app-timer>
      </v-window-item>

      <v-window-item :value="1">
        <app-timer
          :initialTimeInSeconds="getShortTime"
          ref="shortTimer"
          @timeFinished="switchToNextTab"
        >
        </app-timer>
      </v-window-item>

      <v-window-item :value="2">
        <app-timer
          :initialTimeInSeconds="getLongTime"
          ref="longTimer"
          @timeFinished="switchToNextTab"
        >
        </app-timer>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import AppTimer from "./AppTimer.vue";
import timerType from "../types/timerTypes";

const pomodoroTabs = ["Pomodoro"];
export default defineComponent({
  name: "PomodoroTimer",
  components: {
    AppTimer,
  },
  data: () => ({
    tab: timerType.pommodoro,
  }),
  props: {},
  $refs: {
    pomodoroTimer: AppTimer,
    shortTimer: AppTimer,
    longTimer: AppTimer,
  },

  watch: {},

  methods: {
    changeTabs(val: any) {
      console.log(val);
      console.log(this.$refs);
      switch (val) {
        case 0:
          (this.$refs.shortTimer as InstanceType<typeof AppTimer>)?.stopTime();
          (this.$refs.longTimer as InstanceType<typeof AppTimer>)?.stopTime();
          break;
        case 1:
          (
            this.$refs.pomodoroTimer as InstanceType<typeof AppTimer>
          )?.stopTime();
          (this.$refs.longTimer as InstanceType<typeof AppTimer>)?.stopTime();
          break;
        case 2:
          (
            this.$refs.pomodoroTimer as InstanceType<typeof AppTimer>
          )?.stopTime();
          (this.$refs.shortTimer as InstanceType<typeof AppTimer>)?.stopTime();
          break;
      }
    },

    switchToNextTab() {
      console.log(Object.keys(timerType));
      this.timerType =
        (this.timerType + 1) % (Object.keys(timerType).length / 2);
      console.log(this.timerType);
    },
  },

  computed: {
    getPomo() {
      return this.$store.getters.pomoTime;
    },
    getShortTime() {
      return this.$store.getters.shortTime;
    },
    getLongTime() {
      return this.$store.getters.longTime;
    },

    getCurrentTimer() {
      return this.$store.getters.currentTimer;
    },

    timerType: {
      get() {
        return this.$store.getters.currentTimer;
      },

      set(tab: timerType) {
        this.$store.dispatch("setTimerType", tab);
      },
    },
  },
});
</script>
<style scoped lang="scss">
@import "@/variables.scss";

.timer__wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: none;
  background-color: rgb(255, 255, 255, 0.1);
}

::v-deep .v-slide-group__content {
  color: white;
  text-transform: none;
  font-size: 14px;
}

::v-deep .v-slide-group__content button {
  text-transform: none;
  font-weight: 300;
}

.v-tab--selected {
  background-color: rgb(0, 0, 0, 0.1);
  font-weight: bold !important;
}

.timer__tabs {
  padding-top: 10px;
}

.v-card {
  width: 550px;
  height: 350px;
  margin: 0 auto;
  margin-top: 20px;
}

// .timer__wrapper__pomo {
//   background-color: $app-pomo-color;
// }

// .timer__wrapper__shortBreak {
//   background-color: $app-shortBreak-color;
// }

// .timer__wrapper__longBreak {
//   background-color: $app-longBreak-color;
// }
</style>
