# Css 样式处理

## 统一浏览器默认样式

在 Web 开发时，因为浏览器内核的不同，所以会导致某些 Html 元素默认的渲染样式有所差别，虽然很细微，但是会影响我们在不同浏览器中的显示效果。

为了解决这个问题，聪明的开发者就将某个元素在各个浏览器中表现不同的样式，通过一段 CSS 进行重置，然后再进行开发，这样就可以保证每个浏览器显示效果的统一性。

目前常用的有两种解决方案：

1. Normalize - [normalize.css](https://necolas.github.io/normalize.css/) 偏向于修复浏览器的默认 BUG 和一致性，但是保留元素的默认样式。
2. Reset - [reset.css](https://meyerweb.com/eric/tools/css/reset/) 偏向于完全重置浏览器默认样式，可控性更高。

在本项目中，我们结合两种方案进行使用，代码在 `styles/normalize.css` 和 `styles/reset.css` 中。

## Less 预处理器

在 Vite 中使用 Less，我们只需要运行以下命令即可：

```bash
pnpm add less -D
```

> 如果需要使用 sass 则把 less 换成 sass 就行。

安装完成之后，无需多余配置，vite 即可对 less 样式进行解析。

在 Vue 文件中，我们如下，即可使用 less 进行样式的编写：

```vue
<style lang="less" scoped>
// less 样式代码
.card {
  &-body {}

  &-header {}
}
</style>
```

> 这里 CSS 命名规范推荐 BEM 命名规范，具体可以自行搜索了解。

### Less 全局变量/方法

一般在项目中会有自己的设计规范，比如像 Element、Antd，它就有一套自己的样式规范。

其中像颜色、边框、边距等都有统一的规范，当我们改一处，所有地方都会改变，这就用到了 less 的变量和 mixin。

然而我们每处都 `@import` 就比较麻烦，这个时候我们可以使用在 vite 中进行 less 的全局样式配置。

```js
import { defineConfig } from 'vite'
import { resolve } from 'path'

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}

// 全局变量
const variablesLessPath = pathResolve('./src/styles/global/variables.less')
// 全局方法
const utilsLessPath = pathResolve('./src/styles/global/utils.less')

export default defineConfig({
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
```

## Vue 样式穿透

[官方文档](https://vuejs.org/api/sfc-css-features.html#scoped-css)

在 Vue2.7 中，改变了以往样式穿透的语法，如果继续使用 `::v-deep`、`/deep/`、`>>>` 等语法的话，会出现一个警告，下面是新的语法：

```css
/* 深度选择器 */
:deep(selector) {
  /* ... */
}

/* 插槽选择器 */
:slotted(selector) {
  /* ... */
}

/* 全局选择器 */
:global(selector) {
  /* ... */
}
```