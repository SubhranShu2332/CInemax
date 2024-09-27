import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Change to the base URL of your backend
        changeOrigin: true, // For virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix when forwarding to the backend
      },
    },
  },
  plugins: [react()],
});

