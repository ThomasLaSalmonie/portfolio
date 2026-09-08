// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

// Formatting is left to Prettier (`stylistic: false` in nuxt.config eslint options),
// so no stylistic rules here — only correctness / consistency.
export default withNuxt({
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    // `consistent-type-imports` needs type-aware linting — enabled with the
    // TS-strict task in Phase 1. The codebase already follows `import type`.
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
    ],
    'no-unneeded-ternary': 'error',
    'prefer-const': ['error', { destructuring: 'any' }],
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-v-html': 'off',
    'vue/no-unused-components': 'warn',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    // Vue 3 allows fragment roots; needed for the <Html>/<Head> SEO pattern
    // until it moves to useSeoMeta in Phase 4.
    'vue/no-multiple-template-root': 'off',
    // Self-closing style is Prettier's job — its Vue output ("<br />") otherwise
    // fights this rule's autofix ("<br>").
    'vue/html-self-closing': 'off'
  }
});
