import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginTs from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'

export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
    },
    ignores: ['node_modules/**'],
    plugins: { react: eslintPluginReact, '@typescript-eslint': eslintPluginTs },
    rules: {
      'react/react-in-jsx-scope': 'off'
    }
  }
]
