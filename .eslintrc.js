/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    '@rocketseat/eslint-config/react',
  ],
  plugins: ['eslint-plugin-import-helpers'],
  rules: {
    camelcase: 'off',
    'react/self-closing-comp': 'error',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          '/^node:/',
          ['/^@remix-run/', '/^react/'],
          'module',
          '/~//',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
}
