import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dynamicImport()],
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@routes': path.join(__dirname, 'src/routes'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'build'
  }
})
