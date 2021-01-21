export default [{
    path: 'home',
    name: 'ADHome',
    component: () => import('@/pages/Administrator/components/Home.vue')
  },
    {
    path: 'humansource',
    name: 'Humansource',
    component: () => import('@/pages/Administrator/components/Humansource.vue')
  },
  {
    path: 'weeklyreport',
    name: 'Weeklyreport',
    component: () => import('@/pages/Administrator/components/Weeklyreport.vue')
  },
  {
    path: 'license',
    name: 'License',
    component: () => import('@/pages/Administrator/components/License.vue')
  },
  {
    path: 'certificate',
    name: 'Certificate',
    component: () => import('@/pages/Administrator/components/Certificate.vue')
  },
  {
    path: 'vehicle',
    name: 'Vehicle',
    component: () => import('@/pages/Administrator/components/Vehicle.vue')
  }
]