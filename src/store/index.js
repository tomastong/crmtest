/**
 * @file vuex
 * @author donghongyan
 * @date 2020-06-01
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: modules,
  plugins: [createPersistedState()]
});