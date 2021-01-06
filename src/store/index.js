import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navigator:true,
    user: JSON.parse(window.localStorage.getItem("currentuser")) || {},
    token: window.localStorage.getItem("currenttoken") || '',
    isLogin: false,
    meetinglist:[],
    menuList: [],
  },
  mutations: {
    LOGIN_IN(state,data) {
      state.isLogin = true
      window.localStorage.setItem('currentuser', JSON.stringify(data.user));
      state.user = data.user
      window.localStorage.setItem('currenttoken', data.token);
      state.token = data.token
      console.log('token、user保存到vuex和storage成功！');
    },
    LOGIN_OUT(state) {
      state.isLogin = false
      state.token = ''
      state.user = {}
      window.localStorage.removeItem('currenttoken')
      window.localStorage.removeItem('currentuser')
    },
    Nav_TOGGLE(state){
      state.navigator = !state.navigator
    }
  },
  actions: {
  },
  modules: {
  }
})
