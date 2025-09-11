#!/usr/bin/env node
import { spawn } from 'child_process';

// Start Vite development server directly
const vite = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5000'], {
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
    process.exit(code);
  }
});