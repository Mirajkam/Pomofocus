import timerType from "@/types/timerTypes";
import { createStore } from "vuex";

export default createStore({
  state: {
    loggedIn: false,
    userToken: null, //Jwt token
    user: null, //User object containing the necessary user info
    pomoTime: 5, //global time for pomodoro in seconds
    shortTime: 5, //global time for short break timer in seconds
    longTime: 5,
    currentTimerType: timerType.pommodoro,
  },
  getters: {
    user(state) {
      return state.user;
    },

    pomoTime(state) {
      return state.pomoTime;
    },

    shortTime(state) {
      return state.shortTime;
    },

    longTime(state) {
      return state.longTime;
    },

    currentTimer(state) {
      return state.currentTimerType;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logToken(state, userToken) {
      state.userToken = userToken;
      state.loggedIn = !!userToken;
    },
    setTimerType(state, timerType) {
      state.currentTimerType = timerType;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    setToken({ commit }, userToken) {
      commit("logToken", userToken);
    },
    setTimerType({ commit }, timerType) {
      commit("setTimerType", timerType);
    },
  },
  modules: {},
});
