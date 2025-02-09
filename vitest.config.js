/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Использование глобальных переменных jest, например, expect
    environment: 'jsdom', // Эмуляция браузера
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['**/*.tsx'], // Включаем только tsx файлы
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        'src/__tests__/setup.ts',
        'src/App.tsx', // Исключаем App.tsx из покрытия
      ],
    },
  },
});
