import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"; // 1. 引入 path
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
        },
      },
      css: {
        postcss: {
          plugins: [tailwindcss()]
      }
    }
})
