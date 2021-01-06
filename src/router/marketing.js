export default [{
    path: 'home',
    name: 'MKHome',
    component: () => import('@/pages/Marketing/components/Home.vue')
  },
    {
    path: 'ca',
    name: 'CA',
    component: () => import('@/pages/Marketing/components/CA.vue')
  },
  {
    path: 'co-partner',
    name: 'Co-partner',
    component: () => import('@/pages/Marketing/components/Co_partner.vue')
  },
  {
    path: 'tender',
    name: 'Tender',
    component: () => import('@/pages/Marketing/components/Tender.vue')
  },
  {
    path: 'contract',
    name: 'Contract',
    component: () => import('@/pages/Marketing/components/Contract.vue')
  }
]