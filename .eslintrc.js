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
    'eslint:recommended',
    /**
     * 继承 eslint-plugin-vue 插件的规则
     * @link https://eslint.vuejs.org/user-guide/#installation
     */
    'plugin:vue/recommended',
    /**
     * 继承 eslint-plugin-prettier 插件的规则
     * @link https://github.com/prettier/eslint-plugin-prettier
     */
    'plugin:prettier/recommended'
  ],
  rules: {
    'vue/multi-word-component-names': 'off'
  }
})
