import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import prismjs from 'vite-plugin-prismjs'
import compression from 'vite-plugin-compression';

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
      prismjs({
        languages: ['json','python','bash','cpp','php'],
      }),
      compression({
        verbose: true, // 是否在控制台输出压缩结果
        disable: false, // 是否禁用 gzip 压缩
        threshold: 10240, // 压缩文件的大小阈值（以字节为单位）
        algorithm: 'gzip', // 压缩算法
        ext: '.gz', // 压缩文件的后缀名
        deleteOriginFile: false, // 是否删除原文件
        // 需要压缩的文件类型
        filter: (filename) => {
          return /(\.js$|\.css$|\.html$|\.json$|\.ttf$)/.test(filename);
        },
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
