"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshIfNeeded = refreshIfNeeded;
exports.requireAuth = requireAuth;
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseClient_1 = require("../lib/supabaseClient");
const cookies_1 = require("../utils/cookies");
const ACCESS_COOKIE = 'sb-access-token';
const REFRESH_COOKIE = 'sb-refresh-token';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnon = process.env.SUPABASE_ANON_KEY;
// Rafraîchit la session si besoin et retourne l'utilisateur + accessToken
async function refreshIfNeeded(req, res) {
    const access = req.cookies[ACCESS_COOKIE];
    const refresh = req.cookies[REFRESH_COOKIE];
    // 1️⃣ Tente avec l'access_token actuel
    if (access) {
        const { data, error } = await supabaseClient_1.supabase.auth.getUser(access);
        if (error)
            console.warn('getUser error:', error.message);
        if (data?.user)
            return { user: data.user, accessToken: access };
    }
    // 2️⃣ Sinon, tente un refresh
    if (!refresh)
        return { user: null, accessToken: null };
    const { data, error: refreshErr } = await supabaseClient_1.supabase.auth.refreshSession({ refresh_token: refresh });
    if (refreshErr || !data?.session)
        return { user: null, accessToken: null };
    // Pose les cookies mis à jour
    (0, cookies_1.setAuthCookies)(res, data.session);
    return { user: data.session.user, accessToken: data.session.access_token };
}
// Middleware d'auth pour routes protégées
async function requireAuth(req, res, next) {
    try {
        const { user, accessToken } = await refreshIfNeeded(req, res);
        if (!user || !accessToken)
            return res.status(401).json({ error: 'Unauthenticated' });
        req.user = user;
        req.supabaseUserClient = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnon, {
            global: { headers: { Authorization: `Bearer ${accessToken}` } },
            auth: { persistSession: false, autoRefreshToken: false },
        });
        next();
    }
    catch (err) {
        console.error('requireAuth error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
