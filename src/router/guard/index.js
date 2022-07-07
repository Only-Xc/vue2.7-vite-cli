import { setupPermissionGuard } from './permission.guard'

/**
 * 设置路由守卫
 * @param {import('vue-router/types/router').VueRouter} router
 */
export function setupGuard(router) {
  setupPermissionGuard(router) // 权限守卫
}
