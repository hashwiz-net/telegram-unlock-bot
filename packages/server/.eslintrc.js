module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
      destructuring: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true
  },
  extends: ['eslint:recommended'],
  rules: {
    'computed-property-spacing': ['error'],
    'jsx-quotes': ['error'],
    'key-spacing': ['error'],
    'no-case-declarations': ['off'],
    'no-console': ['off'],
    'no-var': ['error'],
    'object-curly-spacing': ['error', 'always'],
    'prefer-const': ['error'],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: ['error', 'never'],
    'require-atomic-updates': 'off',
    'no-async-promise-executor': 'warn',
    'no-prototype-builtins': 'warn'
  }
}
