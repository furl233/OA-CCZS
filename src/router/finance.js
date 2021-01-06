export default [{
    path: 'home',
    name: 'FNHome',
    component: () => import('@/pages/Finance/components/Home.vue')
  },
    {
    path: 'account',
    name: 'Account',
    component: () => import('@/pages/Finance/components/Account.vue')
  },
  {
    path: 'detail_card',
    name: 'Detail_card',
    component: () => import('@/pages/Finance/components/Detail_card.vue')
  },
  {
    path: 'labour_service',
    name: 'Labour_service',
    component: () => import('@/pages/Finance/components/Labour_service.vue')
  },
]