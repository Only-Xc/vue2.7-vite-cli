<template>
  <div>home <button @click="routeChange">变化</button></div>
</template>

<script>
import { watch } from 'vue'
import { useRoute, useRouter } from '@/hooks/useRouter'

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

    return {
      routeChange
    }
  }
}
</script>

<style></style>
