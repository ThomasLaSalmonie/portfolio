/* Recommended to use rushstack with @vue/eslint-config-typescript and @vue/eslint-config-prettier */
require('@rushstack/eslint-patch/modern-module-resolution');
/* eslint-env node */
const path = require('node:path');

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 13
  },
  plugins: ['vue', 'i18n-json', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/recommended',
    'plugin:i18n-json/recommended',
    /*  Configs used by @vue/cli & create-vue setups */
    '@vue/eslint-config-typescript/recommended',
    // Skip prettier formatting with eslint to avoid conflicts between both, formatting can be applied with the prettier command format
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [
    {
      files: ['*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}', './src/locales/*.json']
    }
  ],
  rules: {
    /* TypeScript rules */
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    // Allow TS directives with comments
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
        'ts-expect-error': 'allow-with-description'
      }
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        disallowTypeAnnotations: false
      }
    ],
    /* Vue rules */
    "vue/multi-word-component-names": 0,
    'vue/no-unused-components': ['warn'],
    'vue/component-tags-order': [
      'warn',
      {
        order: ['script', 'template', 'style']
      }
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: true,
        ignores: []
      }
    ],
    'vue/no-v-html': 0,
    'vue/require-default-prop': 0,
    /* import rules */
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling']],
        pathGroups: [{ pattern: 'vue', group: 'external', position: 'before' }],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'import/no-unresolved': 'off',
    /* i18n rules */
    'i18n-json/valid-message-syntax': 0,
    'i18n-json/valid-json': 2,
    'i18n-json/sorted-keys': 0,
    'i18n-json/identical-keys': [
      2,
      {
        filePath: path.resolve('./src/locales/en.json')
      }
    ],
    /* Other rules */
    'eol-last': ['warn', 'always'],
    'no-unused-vars': ['warn'],
    'no-unneeded-ternary': ['error'],
    // Force the use of const when possible
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ]
  }
};
