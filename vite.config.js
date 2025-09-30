import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 根據您的 GitHub Pages 儲存庫名稱調整基礎路徑
  // 如果您的儲存庫是 username.github.io，則設為 '/'
  // 如果您的儲存庫是 username.github.io/ravBoss.com，則設為 '/ravBoss.com/'
  base: '/',  
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',  // 輸出到當前目錄下的 dist 資料夾
    // 確保 Vite 正確處理資源路徑
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})