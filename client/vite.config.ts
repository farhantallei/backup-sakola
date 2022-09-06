/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src'),
      '@auth': path.resolve(__dirname, './src/features/auth'),
      '@course': path.resolve(__dirname, './src/features/course'),
      '@pagination': path.resolve(__dirname, './src/features/pagination'),
      '@progress': path.resolve(__dirname, './src/features/progress'),
      '@sidebar': path.resolve(__dirname, './src/features/sidebar'),
    },
  },
  server: {
    host: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
