import { Response } from 'express';

export const ACCESS_COOKIE = 'sb-access-token';
export const REFRESH_COOKIE = 'sb-refresh-token';
export const CSRF_COOKIE = 'csrf-token';

// Pose les cookies d'auth pour prod
export function setAuthCookies(
  res: Response,
  session: { access_token: string; refresh_token: string }
) {
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie(ACCESS_COOKIE, session.access_token, {
    httpOnly: true,
    secure: isProduction,       // HTTPS obligatoire en prod
    sameSite: isProduction ? 'none' : 'lax', // cross-site pour prod
    path: '/',
    maxAge: 60 * 60 * 1000,     // 1h
  });

  res.cookie(REFRESH_COOKIE, session.refresh_token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30j
  });
}

export function clearAuthCookies(res: Response) {
  res.clearCookie(ACCESS_COOKIE, { path: '/' });
  res.clearCookie(REFRESH_COOKIE, { path: '/' });
}
