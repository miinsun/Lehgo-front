
import Axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import userStore from './modules/userStore';
import courseStore from './modules/courseStore';
import placeStore from './modules/placeStore';
import placeListStore from './modules/placeListStore';
import folderStore from './modules/folderStore';
import categoryStore from './modules/categoryStore'
Vue.use(Vuex)

export const vuex = new Vuex.Store({
  state: {
    domain : "http://localhost:9999",
    pageLoaded : true
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
    placeListStore : placeListStore,
    folderStore : folderStore,
    categoryStore : categoryStore
  },
  plugins :[createPersistedState({
    paths: ['userStore', 'courseStore', 'categoryStore'],
  })]
})

function setDefaultHeader(){
  const axios = Axios.create();
  axios.defaults.headers.common['authorization'] = vuex.getters['userStore/getAccessToken'];
  return axios;
}

export const axios = setDefaultHeader();
export default vuex;