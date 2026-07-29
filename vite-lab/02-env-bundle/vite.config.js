import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    // 终端打印更清晰的 chunk 体积，方便 Day 38 观察
    reportCompressedSize: true,
  },
});
