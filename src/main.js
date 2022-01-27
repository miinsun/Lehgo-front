import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import Validator from './plugins/validator';

Vue.config.productionTip = false
Vue.use(Validator);

new Vue({
  vuetify,
  store,
  router,
  Validator,
  render: h => h(App)
}).$mount('#app')
