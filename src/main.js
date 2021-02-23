import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VCharts from 'v-charts'
import VueApexCharts from 'vue-apexcharts'
import axios from 'axios'
import '@/svg/index.js'

Vue.config.productionTip = false
Vue.prototype.$http = axios 
Vue.use(VCharts)
Vue.component('apexchart', VueApexCharts)


axios.defaults.baseURL = 'http://localhost:3000/'
axios.interceptors.request.use(function(config) {
  config.headers.Authorization = "Bearer " + store.state.token;
  console.info(config);
  return config;
}, function(error) {
  return Promise.reject(error);
});

axios.defaults.timeout = 30 * 1000

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
