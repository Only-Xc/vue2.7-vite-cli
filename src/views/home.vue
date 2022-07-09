<template>
  <div>
    home <button @click="routeChange">变化</button>

    <button @click="addNum">{{ num }} + 1</button>
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

<style></style>
