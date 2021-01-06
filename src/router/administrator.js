export default [{
    path: 'home',
<<<<<<< HEAD
    name: 'ADHome',
=======
    name: 'Home',
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
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