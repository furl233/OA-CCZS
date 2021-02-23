export default [{
    path: 'home',
    name: 'PRHome',
    component: () => import('@/pages/Purchase/components/Home.vue')
  },
  {
    path: 'outsourcereceipt',
    name: 'OutsourceReceipt',
    component: () => import('@/pages/Purchase/components/outsourceReceipt.vue')
  },
  {
    path: 'supplies',
    name: 'Supplies',
    component: () => import('@/pages/Purchase/components/Supplies.vue')
  },
  {
    path: 'purchasereceipt',
    name: 'purchaseReceipt',
    component: () => import('@/pages/Purchase/components/purchaseReceipt.vue')
  }
]