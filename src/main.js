import Vue from 'vue'
import App from './App.vue'

import { router } from './router'
import { setupGuard } from './router/guard'

import { store } from './store'

import './styles/index.less'

setupGuard(router)

new Vue({
  router,
  pinia: store,
  render: h => h(App)
}).$mount('#app')
