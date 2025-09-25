import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/futuristic-dark-style-demo",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        products: resolve(__dirname, 'products.html')
      },
      output: {
        assetFileNames: (assetInfo) => {
          // Handle undefined name case
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          
          // Put assets in specific directories based on type
          const ext = assetInfo.name.split('.').pop()?.toLowerCase() || '';
          
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return 'assets/images/[name][extname]';
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return 'assets/fonts/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      }
    },
    // Ensure CSS is properly split and minified
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  server: {
    open: '/index.html',
    port: 3000,
    host: true
  },
  // Disable React optimizations since this is a vanilla JS project
  optimizeDeps: {
    include: [],
    exclude: []
  }
});
