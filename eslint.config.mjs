import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'android/**',
      'ios/**',
      '.expo/**',
      'coverage/**',
      'src/proto/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs['recommended-latest'],
  prettier,
  {
    // Jest globals in tests, setup, and mocks.
    files: ['**/__tests__/**/*.{ts,tsx,js}', '**/*.test.{ts,tsx,js}', 'jest-setup.js'],
    languageOptions: {
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        require: 'readonly',
      },
    },
  },
  {
    // Node globals in CommonJS config files.
    files: ['*.js', '*.cjs', 'scripts/**/*'],
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        console: 'readonly',
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Deferred to a follow-up: the tree has ~40 pre-existing `any`s
      // (mostly expo-router `as any` pushes). Baseline stays green instead.
      '@typescript-eslint/no-explicit-any': 'off',
      // jest.mock factories run before imports, so `require` inside them is required.
      '@typescript-eslint/no-require-imports': 'off',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
);
