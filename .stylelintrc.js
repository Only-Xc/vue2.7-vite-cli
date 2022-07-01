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
    'selector-class-pattern': null,
    'value-keyword-case': null,
    'font-family-no-missing-generic-family-keyword': null
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