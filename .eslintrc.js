module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parseOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  extends: ['eslint:recommended'],
  plugins: ['import'],
  rules: {
    'import/order': ['warn', {
      alphabetize: { 'order': 'asc', 'caseInsensitive': true }
    }],
    complexity: ['error', 10]
  }
};
