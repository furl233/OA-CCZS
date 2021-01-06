export default [{
    path: 'forgot',
    name: 'Forgot',
    component: () => import(/* webpackChunkName: "login" */ '@/pages/login/components/Forgot.vue')
  },
  {
    path: 'reset',
    name: 'Reset',
    component: () => import(/* webpackChunkName: "login" */ '@/pages/login/components/Reset.vue')
  },
  {
    path: 'signin',
    name: 'Signin',
    component: () => import(/* webpackChunkName: "login" */ '@/pages/login/components/Signin.vue')
  },
  {
    path: 'signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "login" */ '@/pages/login/components/Signup.vue')
  },
  {
    path: 'verifyEmail',
    name: 'VerifyEmail',
    component: () => import(/* webpackChunkName: "login" */ '@/pages/login/components/VerifyEmail.vue')
  },
]