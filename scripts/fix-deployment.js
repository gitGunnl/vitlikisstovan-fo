#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(distDir, 'public');

console.log('Fixing deployment structure...');

// Check if dist/public exists
if (!fs.existsSync(publicDir)) {
  console.error('dist/public directory not found. Please run npm run build first.');
  process.exit(1);
}

// Copy all files from dist/public to dist root
function copyRecursive(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy files from dist/public to dist root
copyRecursive(publicDir, distDir);

console.log('Deployment structure fixed successfully!');
console.log('Files copied from dist/public/ to dist/');