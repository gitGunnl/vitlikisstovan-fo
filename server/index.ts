#!/usr/bin/env node
/**
 * Server entry point.
 *
 * Development  → spawns the Vite dev server (SPA mode).
 * Production   → serves the pre-rendered static files from dist/public/
 *                so every route returns its own page-specific HTML.
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

if (process.env.NODE_ENV === 'production') {
  // ---------- Production: static file server with SPA fallback ----------
  const express = (await import('express')).default;
  const { existsSync } = await import('fs');

  const app = express();
  const DIST = join(__dirname, 'public'); // dist/public when running from dist/

  // For clean URLs like /contact, serve the prerendered HTML
  // BEFORE express.static (which would redirect /contact → /contact/)
  app.get('*', (req, res, next) => {
    // Skip requests for actual files (have extensions like .js, .css, .png)
    if (req.path.includes('.')) return next();
    // Skip root — let it fall through to express.static
    const cleanPath = req.path.replace(/\/+$/, '') || '/';
    if (cleanPath === '/') return next();

    const slug = cleanPath.slice(1);

    // Try flat .html file first (e.g. dist/public/contact.html)
    const flatFile = join(DIST, slug + '.html');
    if (existsSync(flatFile)) {
      return res.sendFile(flatFile);
    }

    // Fall back to directory index (e.g. dist/public/contact/index.html)
    const dirIndex = join(DIST, slug, 'index.html');
    if (existsSync(dirIndex)) {
      return res.sendFile(dirIndex);
    }
    next();
  });

  // Serve static assets (JS, CSS, images, etc.) with caching
  app.use(
    express.static(DIST, {
      maxAge: '7d',
      index: 'index.html', // serve directory index.html (homepage) automatically
    }),
  );

  // SPA fallback: for any remaining GET request, serve root index.html
  app.get('*', (_req, res) => {
    res.sendFile(join(DIST, 'index.html'));
  });

  const PORT = parseInt(process.env.PORT || '5000', 10);
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Production server listening on http://0.0.0.0:${PORT}`);
  });
} else {
  // ---------- Development: Vite dev server ----------
  const { spawn } = await import('child_process');

  console.log('Starting Vite development server...');

  const vite = spawn(
    'npx',
    ['vite', '--config', 'vite.config.custom.js', '--host', '--port', '5000'],
    {
      cwd: rootDir,
      stdio: 'inherit',
      shell: true,
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
