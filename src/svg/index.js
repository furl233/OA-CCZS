import Vue from 'vue'
import SvgIcon from './index.vue'// svg组件
 
// register globally
Vue.component('svg-icon', SvgIcon)
 
const req = require.context('./svgimg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)