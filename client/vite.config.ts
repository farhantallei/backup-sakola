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
    },
  },
  server: {
    host: true,
  },
});
