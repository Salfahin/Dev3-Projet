import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { CSRF_COOKIE } from '../utils/cookies';

// Émet un token CSRF si absent
export function ensureCsrf(req: Request, res: Response) {
  if (!req.cookies[CSRF_COOKIE]) {
    const token = crypto.randomBytes(24).toString('hex');
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie(CSRF_COOKIE, token, {
      httpOnly: false,             // Lisible côté frontend
      secure: isProduction,        // HTTPS obligatoire en prod
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }
  res.status(204).end();
}

// Vérifie le token CSRF
export function csrfGuard(req: Request, res: Response, next: NextFunction) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();

  const cookieToken = req.cookies[CSRF_COOKIE];
  const headerToken = req.get('x-csrf-token');

  if (!cookieToken || cookieToken !== headerToken) {
    return res.status(403).json({ error: 'Bad CSRF token' });
  }
  next();
}
