import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
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
        rewrite: (path) => path.replace(/^\/api/, '/api')
        // 디버깅이 필요한 경우 아래 설정을 활성화
        /*
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('타겟 서버로 요청:', req.method, req.url);
            // 요청 바디 로깅
            if (req.body) {
              const bodyData = JSON.stringify(req.body);
              proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
              proxyReq.write(bodyData);
            }
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('타겟 서버로부터 응답:', {
              statusCode: proxyRes.statusCode,
              url: req.url,
              headers: proxyRes.headers
            });
          });
        },
        */
      },
    },
  },
});
