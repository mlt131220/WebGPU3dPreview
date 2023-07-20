import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), topLevelAwait({
    // 每个块模块的顶级await promise的导出名称
    promiseExportName: "__tla",
    // 用于在每个块模块中生成顶级await承诺的导入名称的函数
    promiseImportName: i => `__tla_${i}`
  })],
  resolve: {
    alias: {
      // 设置路径
      '~': path.resolve(__dirname, './'),
      // 设置别名
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.jsx', '.json', '.vue']
  },
})
