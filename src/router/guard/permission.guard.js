/**
 * 设置权限守卫
 * @param {import('vue-router/types/router').VueRouter} router
 */
export function setupPermissionGuard(router) {
  router.beforeEach((to, from, next) => {
    console.log('beforeEach', to, from)
    next()
  })

  router.afterEach((to, from) => {
    console.log('afterEach', to, from)
  })
}
