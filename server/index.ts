import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { usableRouter } from './routes/usable.js';
import { authMiddleware } from './middleware/auth.js';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const PORT = process.env.PORT || 5000;
const isDevelopment = process.env.NODE_ENV !== 'production';

async function createServer() {
  const app = express();

  // Body parsing middleware
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // Security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Rate limiting for API routes
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Serve OpenAPI specification
  app.get('/openapi.yaml', (req, res) => {
    const openApiPath = path.join(rootDir, 'public', 'openapi.yaml');
    res.sendFile(openApiPath);
  });

  // API routes with authentication and rate limiting
  app.use('/api/usable', apiLimiter, authMiddleware, usableRouter);

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  if (isDevelopment) {
    // In development, use Vite dev server
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // In production, serve built static files
    const distPath = path.join(rootDir, 'dist');
    
    app.use(express.static(distPath));

    // Catch-all route for client-side routing
    app.get('*', (req, res) => {
      // Don't catch API routes
      if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'Not found' });
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Error handling middleware
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Server error:', err);
    res.status(err.status || 500).json({
      error: err.message || 'Internal server error',
      ...(isDevelopment && { stack: err.stack })
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${isDevelopment ? 'development' : 'production'}`);
  });
}

createServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});