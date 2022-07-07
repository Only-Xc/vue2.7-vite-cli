import Vue from 'vue'
import VueRouter from 'vue-router'

import routeModules from './modules'

Vue.use(VueRouter)

/**
 * @type {import('vue-router').RouteConfig[]}
 */
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  ...routeModules
]

export const router = new VueRouter({
  mode: 'hash',
  routes
})
