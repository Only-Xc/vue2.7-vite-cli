import { defineStore } from 'pinia'

export const useDemoStore = defineStore('demo', {
  state: () => ({
    count: 1
  }),
  actions: {
    addCount(val) {
      this.count += val
    }
  }
})
