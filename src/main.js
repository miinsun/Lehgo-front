import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import Validator from './plugins/validator';
import VueCookie from 'vue-cookie'
import naver from 'vue-naver-maps';
import Vuebar from 'vuebar';
//fort-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Validator);
Vue.use(VueCookie);
Vue.use(naver, {
  clientID: 'qqjw37i9dy',
  useGovAPI: false, //공공 클라우드 API 사용 (선택)
  subModules:'' // 서브모듈 (선택)
});
Vue.use(Vuebar);

new Vue({
  vuetify,
  store,
  router,
  Validator,
  render: h => h(App)
}).$mount('#app')
