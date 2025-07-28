import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'src/pages/**',
        'src/styles/**',
        'src/components/Button.tsx',
        'src/components/FormCard.tsx',
        'src/components/Input.tsx',
        'src/components/Layout.tsx',
        'postcss.config.js',
        'tailwind.config.cjs',
        'vite.config.ts',
        'eslint.config.js',
        'vitest.config.ts',
        'src/App.tsx',
        'src/main.tsx',
      ],
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85,
    },
  },
})
