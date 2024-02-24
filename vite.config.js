import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ command, mode }) => {
  let base;
  if (mode === 'gh') {
    base = '/bing16/'
  } else if (mode === 'cf') {
    base = '/'
  }
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]}
      ),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    base: base,
    build: {
      outDir: "docs"
    },
    server: {
      host: '0.0.0.0'
    },
    assetsInclude: ["**/*.JPG"],
  }
})
