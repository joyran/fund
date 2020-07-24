import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: resolve => require(['@/views/home'], resolve),
    redirect: { name: 'rank' },
    children: [
      {
        path: 'rank',
        name: 'rank',
        component: resolve => require(['@/views/rank'], resolve)
      },
      {
        path: 'optional',
        name: 'optional',
        component: resolve => require(['@/views/optional'], resolve)
      }
    ]
  },
  {
    path: '/mobile',
    name: 'mobile',
    component: resolve => require(['@/views/mobile'], resolve)
  }
  // {
  //   path: '/fund/:code',
  //   name: 'fund',
  //   component: resolve => require(['@/views/fund'], resolve)
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
