import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from './Auth'
import SupremeUser from './supremeuser'
import Administrator from './administrator'
import Marketing from './marketing'
import Finance from './finance.js'
import Purchase from './purchase.js'
// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    redirect: '/signin',
    component: () => import('@/pages/login/Login.vue'),
    children:[
      ...Auth
    ],
  },
  {
    path: '/supremeuser',
    name: 'SupremeUser',
    redirect: '/supremeuser/home',
    component: () => import('@/pages/SupremeUser/User.vue'),
    children:[
      ...SupremeUser
    ],
    meta: {
      // 添加该字段，表示进入这个路由是需要登录的
       requireAuth: true, 
     }
  },
  {
    path: '/administrator',
    name: 'Administrator',
    redirect: '/administrator/home',
    component: () => import('@/pages/Administrator/User.vue'),
    children:[
      ...Administrator
    ],
  },
  {
    path: '/marketing',
    name: 'Marketing',
    redirect: '/marketing/home',
    component: () => import('@/pages/Marketing/User.vue'),
    children:[
      ...Marketing
    ],
  },
  {
    path: '/finance',
    name: 'Finance',
    redirect: '/finance/home',
    component: () => import('@/pages/Finance/User.vue'),
    children:[
      ...Finance
    ],
  },
  {
    path: '/purchase',
    name: 'Purchase',
    redirect: '/purchase/home',
    component: () => import('@/pages/Purchase/User.vue'),
    children:[
      ...Purchase
    ],
  }
]

const router = new VueRouter({
  mode:'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if(to.meta.requireAuth){
//     if(store.state.token){
//       next()
//     }else{
//       next({
//         path:'/login',
//         query:{redirect:to.fullpath}
//       })
//     }
//   }else{
//     next()
//   }
// });


export default router
