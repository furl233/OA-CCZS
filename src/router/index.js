import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from './Auth'
import SupremeUser from './supremeuser'
import Administrator from './administrator'
<<<<<<< HEAD
import Marketing from './marketing'
import Finance from './finance.js'
=======
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    redirect: '/signin',
<<<<<<< HEAD
    component: () => import('@/pages/login/Login.vue'),
=======
    component: () => import(/* webpackChunkName: "login" */ '@/pages/login/Login.vue'),
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
    children:[
      ...Auth
    ],
  },
  {
    path: '/supremeuser',
    name: 'SupremeUser',
    redirect: '/supremeuser/home',
<<<<<<< HEAD
    component: () => import('@/pages/SupremeUser/User.vue'),
=======
    component: () => import(/* webpackChunkName: "login" */ '@/pages/SupremeUser/User.vue'),
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
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
<<<<<<< HEAD
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
=======
    component: () => import(/* webpackChunkName: "login" */ '@/pages/Administrator/User.vue'),
    children:[
      ...Administrator
    ],
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
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
