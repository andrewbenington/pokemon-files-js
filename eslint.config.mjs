import stylistic from '@stylistic/eslint-plugin'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import parserTs from '@typescript-eslint/parser'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  prettierRecommended,
  {
    plugins: {
      '@stylistic': stylistic,
      '@stylistic/ts': stylistic,
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
      parser: parserTs,
    },
    files: ['src/**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
      eqeqeq: 'error',
      '@stylistic/ts/padding-line-between-statements': [
        'error',
        { blankLine: 'never', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
        { blankLine: 'always', prev: ['block-like'], next: ['block-like'] },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        { blankLine: 'always', prev: '*', next: ['interface', 'type'] },
      ],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
]
