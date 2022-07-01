# Eslint 代码格式化

在工作中，一个项目往往是很多人共同开发，因为每个人的编码习惯都不一样，就会增加后期维护成本。

为了解决这个问题，我们一般会定义一个开发规范文档，使用约定的方式来统一项目的编码规范。

有了规范文档之后，我们就会在开发中小心翼翼的调整代码风格，每行、每列、每个双引号。这样无疑也会影响开发效率，而且忙的时候可能还会忘记某些规范条例。

为了更好的统一团队的编码规范，在这里我使用了 EditorConfig + ESLint + Prettier 这些工具来辅助解决规范性问题。

## EditorConfig

[EditorConfig](https://editorconfig.org/) 主要用于统一不同 IDE 编辑器的编码风格。

> 当然每个团队最好还是统一一个代码编辑器。

在根目录下添加 `.editorconfig` 文件：

```plain
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = false
insert_final_newline = false
```

> 很多 IDE 中会默认支持此配置，但是也有些不支持，如：VSCode、Atom、Sublime Text 等。
> 
> 具体列表可以参考官网，如果在 VSCode 中使用需要安装 `EditorConfig for VS Code` 插件。

## ESLint

[ESLint](http://eslint.cn/) 是针对 EScript 的一款代码检测工具，它可以检测项目中编写不规范的代码，如果写出不符合规范的代码会被警告。

由此我们就可以借助于 ESLint 强大的功能来统一团队的编码规范。

1. 安装依赖

- [`eslint`](https://github.com/eslint/eslint) - Eslint 本体
- [`eslint-define-config`](https://github.com/Shinigami92/eslint-define-config)- 改善 ESLint 规范编写体验
- [`eslint-plugin-vue`](https://github.com/vuejs/eslint-plugin-vue)- 适用于 Vue 文件的 ESLint 插件
- `vue-eslint-parser`- 使用 `eslint-plugin-vue` 时必须安装的 eslint 解析器

```bash
pnpm add eslint eslint-define-config eslint-plugin-vue vue-eslint-parser -D
```

2. 添加 ESLint 配置文件

在根目录添加一个 `.eslintrc.js` 文件，内容如下：

```javascript
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    /**
     * 继承 eslint-plugin-vue 插件的规则
     * @link https://eslint.vuejs.org/user-guide/#installation
     */
    'plugin:vue/recommended'
  ],
  rules: {
    'vue/multi-word-component-names': 'off'
  }
})
```

> 关于配置文件中的选项大家去看[官方文档](http://eslint.cn/docs/user-guide/configuring)，已经写得很详细了。

3. 添加 ESLint 过滤规则

在根目录添加一个 `.eslintignore` 文件，内容如下：

```plain
public
dist
```

## Prettier

Prettier 是一款强大的代码格式化工具，这里我们使用 ESLint + Prettier 来格式化代码。

1. 安装依赖

- `prettier` - prettier 本体
- `eslint-config-prettier` - 关闭 ESLint 中与 Prettier 中发生冲突的规则
- `eslint-plugin-prettier` - 将 Prettier 的规则设置到 ESLint 的规则中

```bash
pnpm add prettier eslint-config-prettier eslint-plugin-prettier -D
```

2. 添加 Prettier 配置文件

在根目录添加一个 `.prettierrc.js` 文件，内容如下：

```javascript
module.exports = {
  semi: false,
  singleQuote: true,
  printWidth: 80,
  trailingComma: 'none',
  arrowParens: 'avoid',
}
```

3. 修改 ESLint 配置，使 Eslint 兼容 Prettier 规则

```javascript
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  /// ...
  extends: [
    'plugin:vue/vue3-recommended',
    /**
     * 继承 eslint-plugin-prettier 插件的规则
     * @link https://github.com/prettier/eslint-plugin-prettier
     */
    'plugin:prettier/recommended'
  ],
  // ...
})
```

## 自动格式化代码

做好以上配置之后，在编码时不符合规范的地方就会被编辑器标注出来，可以使我们更好的发现问题。

如果你用的是VScode，还可以工作区配置中，添加如下代码，之后就可以享受保存时自动格式化的功能了：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  }
}
```