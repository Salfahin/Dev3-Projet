"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSRF_COOKIE = exports.REFRESH_COOKIE = exports.ACCESS_COOKIE = void 0;
exports.setAuthCookies = setAuthCookies;
exports.clearAuthCookies = clearAuthCookies;
exports.ACCESS_COOKIE = 'sb-access-token';
exports.REFRESH_COOKIE = 'sb-refresh-token';
exports.CSRF_COOKIE = 'csrf-token';
// Pose les cookies d'auth pour prod
function setAuthCookies(res, session) {
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie(exports.ACCESS_COOKIE, session.access_token, {
        httpOnly: true,
        secure: isProduction, // HTTPS obligatoire en prod
        sameSite: isProduction ? 'none' : 'lax', // cross-site pour prod
        path: '/',
        maxAge: 60 * 60 * 1000, // 1h
    });
    res.cookie(exports.REFRESH_COOKIE, session.refresh_token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30j
    });
}
function clearAuthCookies(res) {
    res.clearCookie(exports.ACCESS_COOKIE, { path: '/' });
    res.clearCookie(exports.REFRESH_COOKIE, { path: '/' });
}
