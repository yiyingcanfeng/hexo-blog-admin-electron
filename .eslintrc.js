module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'camelcase': [0, {
      'properties': 'always'
    }],
    'space-before-function-paren': [2, 'never'],
    // 有的标签不必严格符合规定，如 <br> 或 <br/> 都应该是合法的
    'vue/html-end-tags': 'off',
    // 没有内容时，组件必须自闭和
    'vue/html-self-closing': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
