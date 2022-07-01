# Husky Git Hook 工具

husky Git Hook 工具，为 git 提供一系列钩子函数，在提交前（pre-commit）、提交消息（commit-msg）等钩子触发时可以为我们执行一些脚本。

我们可以使用 husky 工具来进行代码提交前的自动格式化，以及 commit message 的校验。

## 提交前代码格式化

1. 首先安装 husky

```bash
pnpm add husky -D
```

2. 初始化 husky

```bash
pnpm husky install
```

并在 package.json 中添加如下内容

```json
{
	"scripts": {
    //...
    "prepare": "husky install"
  }
}
```

3. 添加 git hook

```bash
pnpm husky add .husky/pre-commit
```

到这里之后我们还需要使用另外一个工具： [`lint-staged`](https://www.npmjs.com/package/lint-staged)，它是对 git 暂存区文件进行 lint 检查的工具。

4. 安装 lint-staged

```bash
pnpm add lint-staged -D
```

5. 在 `package.json` 中添加如下配置

```json
{
  //...
	"lint-staged": {
    "*.{js,ts,jsx,tsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.vue": [
      "stylelint --fix",
      "prettier --write",
      "eslint --fix"
    ],
    "*.{less,css}": [
      "stylelint --fix",
      "prettier --write"
    ]
  }
}
```

6. 在 `.husky/pre-commit` 文件中写入以下内容

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm lint-staged
```

经过以上配置之后，我们就可以在每次提交之前对所有代码进行格式化，保证线上代码的规范性。


> 在实际中如果遇见 `Use the --allow-empty option to continue, or check your task configuration` 这个问题。
>
> 我们可以修改 `pnpm lint-staged` 为 `pnpm lint-staged --allow-empty` 来暂时屏蔽这个问题。