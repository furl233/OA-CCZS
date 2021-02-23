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
    path: 'fund',
    name: 'Fund',
    component: () => import('@/pages/Finance/components/Fund.vue')
  },
  {
    path: 'labour_service',
    name: 'Labour_service',
    component: () => import('@/pages/Finance/components/Labour_service.vue')
  },
  {
    path: 'labour_contract',
    name: 'Labour_contract',
    component: () => import('@/pages/Finance/components/Labour_contract.vue'),
  },
  {
    path: 'contractdetail/:id',
    name: 'contractdetail',
    component: () => import('@/pages/Finance/components/Detailpages/contractdetail.vue'),
  },
  {
    path: 'fund_invoice/:id',
    name: 'fund_invoice',
    component: () => import('@/pages/Finance/components/Detailpages/fund_invoice.vue'),
  },
  {
    path: 'fund_payment/:id',
    name: 'fund_payment',
    component: () => import('@/pages/Finance/components/Detailpages/fund_payment.vue'),
  },
  {
    path: 'fund_receive/:id',
    name: 'fund_receive',
    component: () => import('@/pages/Finance/components/Detailpages/fund_receive.vue'),
  }
]