const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    project: path.join(__dirname, 'tsconfig.json'),
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    '@darraghor/nestjs-typed',
    'jest',
    'no-async-foreach',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@darraghor/nestjs-typed/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    'jest/globals': true,
    jest: true,
    es6: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    '@darraghor/nestjs-typed/injectable-should-be-provided': 'off',
    '@darraghor/nestjs-typed/validated-non-primitive-property-needs-type-decorator': 'off',

    'no-async-foreach/no-async-foreach': 'error',

    'jest/expect-expect': [
      'error',
      {
        assertFunctionNames: ['expect', 'request.**.expect'], // extend to support supertest
        additionalTestBlockFunctions: [],
      },
    ],
  },
};
