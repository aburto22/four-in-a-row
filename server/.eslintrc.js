module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: `${__dirname}/tsconfig.json`,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
  },
  ignorePatterns: ['build/', '.eslintrc.js'],
};