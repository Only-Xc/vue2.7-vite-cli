<template>
  <div>
    home <button @click="routeChange">变化</button>

    <button @click="addNum">{{ num }} + 1</button>

    <p style="width: 300px">
      多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略
    </p>
  </div>
</template>

<script>
import { watch, computed } from 'vue'
import { useRoute, useRouter } from '@/hooks/useRouter'

import { useDemoStore } from '@/store/modules/demo'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    watch(route, () => {
      console.log('route 变化', route.value)
    })

    function routeChange() {
      router.push({ path: '/home', query: { key: Date.now() } })
    }

    const demoStore = useDemoStore()

    const num = computed(() => demoStore.count)

    function addNum() {
      demoStore.addCount(1)
    }

    return {
      routeChange,
      num,
      addNum
    }
  }
}
</script>

<style lang="less" scoped>
p {
  color: @primaryColor;
  .multi-ellipsis(3);

  :deep(span) {
    font-size: 14px;
  }
}
</style>
