<template>
  <div>
    <div v-if="hasOriginPath" style="margin-bottom: 16px">
      <button @click="goBack">返回上一页</button>
    </div>

    <p>当前数量：{{ count }}</p>

    <button @click="accumulate">累加</button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute, useRouter } from '@/hooks/useRouter'
import { useDemoStore } from '@/store'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const hasOriginPath = computed(() => !!route.value.query.originPath)

    function goBack() {
      const { path, query } = route.value
      router.replace({ path: query.originPath, query: { originPath: path } })
    }

    const demoStore = useDemoStore()
    const count = computed(() => demoStore.count) // 获取单个 state 时，需要使用 computed，否则数据不是响应式
    const accumulate = () => demoStore.accumulate()

    return {
      /**
       * store
       */
      count,

      /**
       * computed
       */
      hasOriginPath,

      /**
       * methods
       */
      goBack,
      accumulate
    }
  }
}
</script>

<style lang="less" scoped>
p {
  margin-bottom: 16px;
}
</style>
