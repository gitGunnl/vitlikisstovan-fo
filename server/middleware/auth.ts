import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid Authorization header format' });
  }

  const expectedToken = process.env.GATEWAY_API_KEY;

  if (!expectedToken) {
    console.error('GATEWAY_API_KEY not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (token !== expectedToken) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  next();
}