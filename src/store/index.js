import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import userStore from './modules/userStore';
import courseStore from './modules/courseStore';
import placeStore from './modules/placeStore';
import placeListStore from './modules/placeListStore';
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    domain : 'http://localhost:8080'
  },
  getters : {
    getDomain : state => state.domain,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userStore: userStore,
    courseStore : courseStore,
    placeStore : placeStore,
    placeListStore : placeListStore
  },
  plugins :[createPersistedState({
    paths: ['userStore', 'courseStore', 'placeListStore'],
  })]
})