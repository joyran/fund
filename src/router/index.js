import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: resolve => require(['@/views/home'], resolve)
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
