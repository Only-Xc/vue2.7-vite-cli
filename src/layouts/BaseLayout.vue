<template>
  <div class="base-layout">
    <ul class="base-layout__menu">
      <li
        v-for="route of routes"
        :key="route.path"
        :class="{ active: isActive(route.path) }"
        @click="toPath(route.path)"
      >
        {{ route.meta.title }}
      </li>
    </ul>

    <div class="base-layout__main">
      <router-view></router-view>
    </div>

    <div class="base-layout__footer">
      Vue2.7 + Vite + Less + Eslint + Stylelint + Commitlint 工程化脚手架。
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from '@/hooks/useRouter'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    const demoRoutes = router.options.routes[1].children

    function isActive(path) {
      return route.value.path === `/demo/${path}`
    }

    function toPath(path) {
      router.push(`/demo/${path}`)
    }

    return {
      /**
       * data
       */
      routes: demoRoutes,

      /**
       * methods
       */
      isActive,
      toPath
    }
  }
}
</script>

<style lang="less" scoped>
.base-layout {
  height: 100%;
  background-color: #f5f5f5;

  &__menu {
    height: 48px;
    padding-top: 8px;
    background-color: #fff;
    border-bottom: 1px solid #eee;

    li {
      position: relative;
      top: 1px;
      display: inline-block;
      height: 41px;
      margin-left: 8px;
      padding: 0 8px;
      font-size: 14px;
      line-height: 40px;
      text-align: center;
      border: 1px solid transparent;
      cursor: pointer;

      &.active,
      &:hover {
        background-color: #f5f5f5;
        border-color: #eee;
        border-bottom-color: #f5f5f5;
        border-radius: 8px 8px 0 0;
      }
    }
  }

  &__main {
    min-height: calc(100% - 45px - 48px);
    padding: 16px;
    overflow: auto;
  }

  &__footer {
    padding: 16px 0;
    color: #c3c3c3;
    font-size: 12px;
    text-align: center;
    border-top: 1px solid #eee;
  }
}
</style>
