import Vue from 'vue';
import Vuex from 'vuex';

import pomodoro from './modules/pomodoro';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  modules: { pomodoro },
  actions: {},
});
