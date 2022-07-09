import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue2'

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}

const variablesLessPath = pathResolve('./src/styles/global/variables.less')
const utilsLessPath = pathResolve('./src/styles/global/utils.less')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // @/xxxx => src/xxxx
      '@': pathResolve('./src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hask: `
            true;
            @import (reference) "${variablesLessPath}";
            @import (reference) "${utilsLessPath}";
          `
        },
        javascriptEnabled: true
      }
    }
  }
})
