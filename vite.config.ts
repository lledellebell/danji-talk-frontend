import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    __WS_URL__: JSON.stringify(process.env.WS_URL),
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://danjitalk.duckdns.org',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (req) => {
            console.log('타겟 서버로 요청:', req.method, req.path);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('타겟 서버로부터 응답:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
});
