import Vue from 'vue'
import App from './App.vue'

import { router } from './router/index.js'
import { setupGuard } from './router/guard'

setupGuard(router)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
