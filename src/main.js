import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './router/router-permission'
import store from './store'
import './plugins/element.js'
import './assets/css/reset.css'
import './assets/css/iconfont/iconfont.css'
import api from './api'
import i18n from './lang'

Vue.prototype.$api = api
Vue.config.productionTip = false

let token = localStorage.getItem('userToken')
if (token) {
  store.commit('LoginModule/setUser', JSON.parse(token))
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
