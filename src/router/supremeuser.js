export default [{
        path: 'home',
<<<<<<< HEAD
        name: 'SUHome',
=======
        name: 'Home',
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
        component: () => import(/* webpackChunkName: "login" */ '@/pages/SupremeUser/components/Home.vue')
      },
      {
        path: 'business',
        name: 'Business',
        component: () => import(/* webpackChunkName: "login" */ '@/pages/SupremeUser/components/Business.vue')
      },
      {
        path: 'administration',
        name: 'Administration',
        component: () => import(/* webpackChunkName: "login" */ '@/pages/SupremeUser/components/Administration.vue')
      },
      {
        path: 'material',
        name: 'Material',
        component: () => import(/* webpackChunkName: "login" */ '@/pages/SupremeUser/components/Material.vue')
      },
      {
        path: 'balance',
        name: 'Balance',
        component: () => import(/* webpackChunkName: "login" */ '@/pages/SupremeUser/components/Balance.vue')
      },
      {
        path: 'construct',
        name: 'Construct',
        component: () => import(/* webpackChunkName: "login" */ '@/pages/SupremeUser/components/Construct.vue')
      },
      {
        path: 'chart',
        name: 'Chart',
        component: () => import(/* webpackChunkName: "login" */ '@/pages/SupremeUser/components/Chart.vue')
      }
]