<template>
  <div>
    <p>当前路由：{{ routePath }}</p>
    <p>上个页面的路径：{{ originPath }}</p>

    <div class="btns">
      <button @click="handleRouteChange">改变路由</button>
      <button @click="toPage('/demo/pinia')">跳转《Pinia使用》</button>
    </div>
  </div>
</template>

<script>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from '@/hooks/useRouter'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    watch(route, () => {
      console.log('route 变化', route.value)
    })

    // 将其转换为响应式对象，才能有双向绑定效果
    const originPath = computed(() => route.value.query.originPath)
    const routePath = computed(() => route.value.fullPath)

    function handleRouteChange() {
      router.push({ path: route.value.path, query: { key: Date.now() } })
    }

    function toPage(path) {
      router.push({ path, query: { originPath: route.value.path } })
    }

    return {
      /**
       * computed
       */
      routePath,
      originPath,

      /**
       * methods
       */
      handleRouteChange,
      toPage
    }
  }
}
</script>

<style lang="less" scoped>
p {
  margin-bottom: 16px;
}

.btns {
  button {
    margin-right: 16px;
  }
}
</style>
