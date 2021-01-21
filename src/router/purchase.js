export default [{
    path: 'home',
    name: 'PRHome',
    component: () => import('@/pages/Purchase/components/Home.vue')
  },
    {
    path: 'material',
    name: 'Material',
    component: () => import('@/pages/Purchase/components/Material.vue')
  },
  {
    path: 'outsource',
    name: 'Outsource',
    component: () => import('@/pages/Purchase/components/Outsource.vue')
  },
  {
    path: 'supplies',
    name: 'Supplies',
    component: () => import('@/pages/Purchase/components/Supplies.vue')
  },
  {
    path: 'receipt',
    name: 'Receipt',
    component: () => import('@/pages/Purchase/components/Receipt.vue')
  },
  {
    path: 'order',
    name: 'Order',
    component: () => import('@/pages/Purchase/components/Order.vue')
  }
]