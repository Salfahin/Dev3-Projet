"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureCsrf = ensureCsrf;
exports.csrfGuard = csrfGuard;
const crypto_1 = __importDefault(require("crypto"));
const cookies_1 = require("../utils/cookies");
// Émet un token CSRF si absent
function ensureCsrf(req, res) {
    if (!req.cookies[cookies_1.CSRF_COOKIE]) {
        const token = crypto_1.default.randomBytes(24).toString('hex');
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie(cookies_1.CSRF_COOKIE, token, {
            httpOnly: false, // Lisible côté frontend
            secure: isProduction, // HTTPS obligatoire en prod
            sameSite: isProduction ? 'none' : 'lax',
            path: '/',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
    }
    res.status(204).end();
}
// Vérifie le token CSRF
function csrfGuard(req, res, next) {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method))
        return next();
    const cookieToken = req.cookies[cookies_1.CSRF_COOKIE];
    const headerToken = req.get('x-csrf-token');
    if (!cookieToken || cookieToken !== headerToken) {
        return res.status(403).json({ error: 'Bad CSRF token' });
    }
    next();
}
