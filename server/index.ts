#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const apiApp = express();

const { createMonitoringRouter } = await import('./monitoring-api.js');
apiApp.use(createMonitoringRouter());

const { createBookingRouter } = await import('./booking-api.js');
apiApp.use(createBookingRouter());

// Leiðslu-verkstova registration is now handled client-side via a Google Form
// (see siteConfig.workshopRegistrationForm). The legacy /api/workshop-registration
// endpoint is intentionally left unmounted so it cannot send auto-replies that
// contradict the current "operator notification only" flow.
// const { createWorkshopRegistrationRouter } = await import('./workshop-registration-api.js');
// apiApp.use(createWorkshopRegistrationRouter());

const { startScheduler } = await import('./monitoring.js');
startScheduler();

if (process.env.NODE_ENV === 'production') {
  const { existsSync } = await import('fs');
  const DIST = join(__dirname, 'public');

  apiApp.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    if (req.path.includes('.')) return next();
    const cleanPath = req.path.replace(/\/+$/, '') || '/';
    if (cleanPath === '/') return next();

    const slug = cleanPath.slice(1);
    const dirIndex = join(DIST, slug, 'index.html');
    if (existsSync(dirIndex)) {
      return res.sendFile(dirIndex);
    }
    next();
  });

  apiApp.use(
    express.static(DIST, {
      maxAge: '7d',
      index: 'index.html',
    }),
  );

  apiApp.get('*', (_req, res) => {
    res.sendFile(join(DIST, 'index.html'));
  });

  const PORT = parseInt(process.env.PORT || '5000', 10);
  apiApp.listen(PORT, '0.0.0.0', () => {
    console.log(`Production server listening on http://0.0.0.0:${PORT}`);
  });
} else {
  const API_PORT = 5001;
  apiApp.listen(API_PORT, '0.0.0.0', () => {
    console.log(`API server listening on http://0.0.0.0:${API_PORT}`);
  });

  const { spawn } = await import('child_process');
  console.log('Starting Vite development server...');

  const vite = spawn(
    'npx',
    ['vite', '--config', 'vite.config.custom.js', '--host', '--port', '5000'],
    {
      cwd: rootDir,
      stdio: 'inherit',
      shell: false,
      env: { ...process.env, VITE_CJS_IGNORE_WARNING: 'true' },
    },
  );

  vite.on('error', (err) => {
    console.error('Failed to start Vite:', err);
    process.exit(1);
  });

  vite.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Vite exited with code ${code}`);
      process.exit(code || 1);
    }
  });
}
