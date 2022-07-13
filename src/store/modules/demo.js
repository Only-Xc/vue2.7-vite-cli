import { defineStore } from 'pinia'

export const useDemoStore = defineStore('demo', {
  state: () => ({
    count: 1
  }),
  actions: {
    accumulate() {
      this.count++
    }
  }
})
