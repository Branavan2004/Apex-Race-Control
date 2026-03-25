import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('framer-motion')) {
            return 'framer-motion';
          }

          if (id.includes('recharts')) {
            return 'charts';
          }

          if (id.includes('node_modules')) {
            return 'vendor';
          }

          if (id.includes('/components/overlays/') || id.includes('/hooks/')) {
            return 'animations';
          }

          return undefined;
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8787',
      '/health': 'http://localhost:8787',
    },
  },
  preview: {
    port: 4173,
  },
});
