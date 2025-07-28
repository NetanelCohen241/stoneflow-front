import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginTs from '@typescript-eslint/eslint-plugin'
import parserTs from '@typescript-eslint/parser'

export default [
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['node_modules/**', 'coverage/**'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      react: eslintPluginReact,
      '@typescript-eslint': eslintPluginTs,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
]
