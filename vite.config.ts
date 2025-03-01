import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3000, // 使用端口 3000 替代默认的 5173
    strictPort: false, // 如果端口被占用，尝试下一个可用端口
  },
});
