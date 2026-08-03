import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    ignores: ['node_modules/**', '.npm-cache/**', 'quiz/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'warn',
      eqeqeq: 'error',
      'prefer-const': 'error',
    },
  },
];
