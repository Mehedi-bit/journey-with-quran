import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://journey-with-quran-api.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})