import Vue from 'vue';
import Vuex from 'vuex';

import plan from './modules/plan';
import story from './modules/story';
import person from './modules/person';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  getters: {},
  modules: { plan, story, person }
});
