import { getCurrentInstance, shallowRef } from 'vue'
import { router } from '@/router'

export function useRouter() {
  const vm = getCurrentInstance()

  if (vm) {
    return router
  }

  console.warn('请在 setup 中调用。')

  return undefined
}

let currentRoute = shallowRef()

export function useRoute() {
  if (!currentRoute.value) {
    const vm = getCurrentInstance()

    if (!vm) {
      console.warn('请在 setup 中调用。')
      return
    }

    currentRoute.value = vm.proxy.$route

    // 每次路由切换时，更新 route 参数
    const router = useRouter()
    router.afterEach(to => (currentRoute.value = to))
  }

  return currentRoute
}
