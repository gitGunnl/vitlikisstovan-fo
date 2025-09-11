import baseConfig from './vite.config.ts';
import { defineConfig, mergeConfig } from 'vite';

// Custom configuration for Replit development environment
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
      // Allow all hosts - this is the key setting for Replit
      allowedHosts: [
        '.replit.dev',
        '.replit.app',
        '.repl.co',
        'localhost'
      ]
    }
  })
);