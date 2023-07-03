module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  rules: {
    'max-len': ['error', {
      code: 120,
      tabWidth: 2,
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'no-unused-expressions': 'off',
    'no-return-assign': 'off',
    'no-shadow': 'off',
    'no-useless-constructor': 'off',
    'no-plusplus': 'off',
    'no-empty-function': 'off',
    'no-restricted-syntax': 'off',
    'no-loop-func': 'off',
    'no-await-in-loop': 'off',
    'no-promise-executor-return': 'off',
    'max-classes-per-file': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-types': 'off',
    'vue/multi-word-component-names': 'off',
  },
  parserOptions: {
    ecmaVersion: 13,
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
