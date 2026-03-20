import baseConfig from './vite.config.ts';
import { defineConfig, mergeConfig } from 'vite';

export default defineConfig(
  mergeConfig(baseConfig, {
    server: {
      ...baseConfig.server,
      hmr: {
        clientPort: 443,
        protocol: 'wss'
      },
      host: '0.0.0.0',
      port: 5000,
      strictPort: true,
      allowedHosts: [
        '.replit.dev',
        '.replit.app',
        '.repl.co',
        'localhost'
      ],
      proxy: {
        '/api': {
          target: 'http://localhost:5001',
          changeOrigin: true
        }
      }
    }
  })
);
