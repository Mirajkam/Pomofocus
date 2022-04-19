import { createStore } from "vuex";

export default createStore({
  state: {
    loggedIn: false,
    token: null,
    user: null,
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logToken(state, token) {
      state.token = token;
      state.loggedIn = !!token;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    setToken({ commit }, token) {
      commit("logToken", token);
    },
  },
  modules: {},
});
