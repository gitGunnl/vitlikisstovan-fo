#!/usr/bin/env node
// This file exists only to allow the workflow to start properly
// The app is now a static site using Vite for development

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

console.log('Starting Vite development server for static site...');

// Start Vite development server
const vite = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5000'], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: true
});

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