module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  extends: ['eslint:recommended'],
  plugins: ['import'],
  rules: {
    'import/order': ['warn', {
      alphabetize: { 'order': 'asc', 'caseInsensitive': true }
    }],
    complexity: ['error', 10],
    semi: ['error', 'always'],
    quotes: ['error', 'single']
  }
};
