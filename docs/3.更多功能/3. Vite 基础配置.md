# Vite 基础配置

## 目录说明

有关 vite 配置的功能都在以下的目录中。

```sh
.
├── build # 打包配置文件
├── src # 主目录
│   ├── utils 
│   │   └── env.js # 环境变量判断方法
├── .env # 基础环境变量
├── .env.development # 开发环境变量
├── .env.production # 生产环境变量
└── vite.config.js # vite 配置
```

## 基础配置

完整的 vite 配置如下所示，配置了大概有以下的功能：

1. 环境变量
2. alias 别名
3. 跨域配置
4. 构建兼容性
5. less 全局样式

```javascript
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
```

## 跨域配置

这里我们使用的是 vite 自带的 [http-proxy](https://github.com/http-party/node-http-proxy) 来解决跨域，这也是我们在开发中比较常见的解决跨域的一种方式。

我们打开 `build/proxy.js` 文件可以看到其中有一个 `proxyList` 变量，我们的跨域配置写在这里即可。

```javascript
const proxyList = [
  { prefix: '/demo', target: 'http://localhost:3000/demo', removePrefix: true },
  { prefix: '/api', target: 'http://localhost:3000/api' }
]

// 以上配置最终会被转换为 vite 所需要的格式：

{
  '/demo': {
    target: 'http://localhost:3000/demo',
    changeOrigin: true,
    ws: true,
    rewrite: path => path.replace(new RegExp('^/demo'), '')
   },
   '/api': {
    target: 'http://localhost:3000/demo',
    changeOrigin: true,
    ws: true,
   }
}
```

## 环境变量

[官方文档](https://www.vitejs.net/guide/env-and-mode.html)

在本脚手架中配置了2种环境：

1. development 开发环境
2. production 生产环境

环境变量数据在 vue 项目中可以直接使用 `import.meta.env` 这个变量获取，比如 `src/utils/env.js` 中：

```javascript
/**
 * 是否为开发环境
 * @returns {Boolean}
 */
export function isDev() {
  return import.meta.env.DEV
}

/**
 * 是否为生产环境
 * @returns {Boolean}
 */
export function isProd() {
  return import.meta.env.PROD
}

```

但是如果需要在 `vite.config.js` 中使用的话，需要用到 `loadEnv` 这个方法：

```javascript
import { defineConfig, loadEnv } from 'vite'


export default ({ mode }) => {
  // 通过 loadEnv 获取环境变量数据
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    /* vite 配置 */
  })
}
```
