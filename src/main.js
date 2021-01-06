import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VCharts from 'v-charts'
<<<<<<< HEAD
=======
import VueGoogleCharts from 'vue-google-charts'

>>>>>>> 0052218504708c33ecd611734c095f0d71514235
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios 
Vue.use(VCharts)
<<<<<<< HEAD
=======
Vue.use(VueGoogleCharts)
>>>>>>> 0052218504708c33ecd611734c095f0d71514235


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
