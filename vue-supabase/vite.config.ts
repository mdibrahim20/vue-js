import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'unplugin-vue-router/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template:{
        compilerOptions:{
          isCustomElement: (tag)=>tag.startsWith('iconify-icon')
        }
      }
    }),
    tailwindcss(),
    vueJsx(),
    vueDevTools(),
    VueRouter({
      dts: './typed-router.d.ts', // ✅ Type-safe routes
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
