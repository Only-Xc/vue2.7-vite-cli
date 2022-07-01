# Stylelint CSS 格式化

Stylelint 是一个强大、先进的 CSS 代码检查器（linter），可以帮助你规避 CSS 代码中的错误并保持一致的编码风格。

1. 安装依赖

- [`stylelint`](https://stylelint.io/) - Stylelint 本体
- [`stylelint-config-prettier`](https://github.com/prettier/stylelint-config-prettier)- 关闭 Stylelint 中与 Prettier 中会发生冲突的规则。
- [`stylelint-config-rational-order`](https://github.com/constverum/stylelint-config-rational-order) - 对 CSS 声明进行排序
- [`stylelint-config-standard`](https://github.com/stylelint/stylelint-config-standard)- Stylelint 官方推荐规则
- `stylelint-order` 使用 `stylelint-config-rational-order` 时依赖的模块

```bash
pnpm add stylelint stylelint-config-prettier stylelint-config-rational-order stylelint-config-standard stylelint-order -D
```

2. 添加 StyleLint 配置文件

在根目录添加一个 `.stylelintrc.js` 文件，内容如下：

```javascript
module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-prettier'
  ],
  defaultSeverity: 'warning',
  plugins: ['stylelint-order'],
  rules: {
    'no-empty-source': null,
    'selector-class-pattern': null
  }
}
```

在根目录添加一个 `.stylelintignore` 文件，内容如下：

```plain
public
dist
```

3. 启用 Vue 文件支持

`stylelint` v14 版本默认是不支持 vue 文件中的 style 代码自动检测，详情我们可以查看[官方迁移指南](https://github.com/stylelint/stylelint/blob/main/docs/migration-guide/to-14.md)，具体配置如下：

- `stylelint-config-html` 解析 vue 文件
- `postcss-html` 使用 `stylelint-config-html` 依赖的模块
- `postcss-less` 对 less 文件进行解析

```bash
pnpm add stylelint-config-html postcss-html postcss-less -D
```

4. 修改 `.stylelintrc.js` 文件：

```javascript
module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
    'stylelint-config-html/vue' // 需要放在最后一位
  ],
  defaultSeverity: 'warning',
  plugins: ['stylelint-order'],
  rules: {
    'no-empty-source': null,
    'selector-class-pattern': null
  },
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      rules: {
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['deep', 'global']
          }
        ],
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted']
          }
        ]
      }
    }
  ]
}
```

5. 在 VSCode 工作区配置中，添加如下代码：

```json
{
  "stylelint.validate": ["vue"] // Add "vue" language.
}
```
