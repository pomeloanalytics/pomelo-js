import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['**/dist/**', '.test-build/**', '.artifacts/**', '**/node_modules/**', '**/generated/**'] },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
);
