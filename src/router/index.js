import Vue from 'vue'
import VueRouter from 'vue-router'

import routeModules from './modules'

import { HOME_PATH } from './constants'

Vue.use(VueRouter)

/**
 * @type {import('vue-router').RouteConfig[]}
 */
const routes = [
  {
    path: '/',
    redirect: HOME_PATH
  },
  ...routeModules
]

export const router = new VueRouter({
  mode: 'hash',
  routes
})
