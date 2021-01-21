export default [{
        path: 'home',
        name: 'SUHome',
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