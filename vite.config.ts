/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite конфигурация
export default defineConfig({
  plugins: [react()],
});
