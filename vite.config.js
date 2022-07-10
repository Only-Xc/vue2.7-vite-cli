import vue from '@vitejs/plugin-vue2'
import legacy from '@vitejs/plugin-legacy'
import serverProxy from './build/proxy'
import { defineConfig, loadEnv } from 'vite'
import { pathResolve, wrapperEnv } from './build/utils'

const variablesLessPath = pathResolve('./src/styles/global/variables.less')
const utilsLessPath = pathResolve('./src/styles/global/utils.less')

// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const root = process.cwd()
  const isBuild = command === 'build'

  // 在 vite 配置文件中使用环境变量，需要通过 loadEnv 来加载
  const env = loadEnv(mode, root)

  const { VITE_PUBLIC_PATH, VITE_OUTPUT_DIR, VITE_PORT, VITE_LEGACY } =
    wrapperEnv(env)

  const plugins = [vue()]

  /**
   * vite 默认打包文件带有 ES6 语法，在旧版浏览器中是不支持的。
   * 为了支持旧版浏览器，可以在 .env.production 中开启 VITE_LEGACY 设置
   */
  if (isBuild && VITE_LEGACY) {
    plugins.push(legacy())
  }

  return defineConfig({
    root,
    base: VITE_PUBLIC_PATH,
    plugins,
    resolve: {
      alias: {
        // @/xxxx => src/xxxx
        '@': pathResolve('./src')
      }
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: serverProxy
    },
    build: {
      /**
       * 最终构建的浏览器兼容目标
       * https://www.vitejs.net/config/#build-target
       */
      target: 'es2015',
      outDir: VITE_OUTPUT_DIR,
      brotliSize: false, // 关闭 brotli 压缩大小报告，可提升构建速度
      chunkSizeWarningLimit: 2000 // chunk 大小警告的限制（以 kbs 为单位）
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
}
