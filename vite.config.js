import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import path from 'path'

// https://vite.dev/config/
const __dirname = path.dirname(new URL(import.meta.url).pathname);
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        content: 'src/content.jsx',
        background: 'src/background.js',
      },
    }
  }
})
