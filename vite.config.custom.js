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
      host: true, // This allows all hosts
      port: 5000,
      strictPort: true
    }
  })
);