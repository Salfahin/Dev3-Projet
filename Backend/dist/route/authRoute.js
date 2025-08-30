"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const supabaseClient_1 = require("../lib/supabaseClient");
const cookies_1 = require("../utils/cookies");
const csrf_1 = require("../middleware/csrf");
const router = (0, express_1.Router)();
// --- SIGNUP ---
router.post('/signup', csrf_1.csrfGuard, async (req, res) => {
    try {
        const schema = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(8),
            user_metadata: zod_1.z.object({
                first_name: zod_1.z.string().min(1),
                last_name: zod_1.z.string().min(1),
                username: zod_1.z.string().min(3),
            }).optional(),
        });
        const body = schema.parse(req.body);
        const { data, error } = await supabaseClient_1.supabase.auth.signUp(body);
        if (error)
            return res.status(400).json({ error: error.message });
        if (data.session)
            (0, cookies_1.setAuthCookies)(res, data.session);
        res.status(201).json({
            user: data.user,
            requiresEmailConfirmation: !data.session,
        });
    }
    catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// --- LOGIN ---
router.post('/login', csrf_1.csrfGuard, async (req, res) => {
    try {
        const schema = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(8),
        });
        const body = schema.parse(req.body);
        const { data, error } = await supabaseClient_1.supabase.auth.signInWithPassword(body);
        if (error || !data.session)
            return res.status(401).json({ error: error?.message || 'Authentication failed' });
        (0, cookies_1.setAuthCookies)(res, data.session);
        res.json({ user: data.user });
    }
    catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// --- LOGOUT ---
router.post('/logout', csrf_1.csrfGuard, async (req, res) => {
    try {
        (0, cookies_1.clearAuthCookies)(res);
        res.status(204).end();
    }
    catch (err) {
        console.error('Logout error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// --- ME (GET current user, refresh if needed) ---
router.get('/me', async (req, res) => {
    try {
        const access = req.cookies['sb-access-token'];
        const refresh = req.cookies['sb-refresh-token'];
        // Aucun token
        if (!access && !refresh)
            return res.status(401).json({ error: 'Not authenticated' });
        // Tente avec access token
        let { data, error } = await supabaseClient_1.supabase.auth.getUser(access);
        if (data?.user)
            return res.json({ user: data.user });
        // Sinon, tente refresh
        if (!refresh)
            return res.status(401).json({ error: 'Not authenticated' });
        const { data: refreshed, error: refreshErr } = await supabaseClient_1.supabase.auth.refreshSession({ refresh_token: refresh });
        if (refreshErr || !refreshed?.session)
            return res.status(401).json({ error: 'Not authenticated' });
        // Pose les nouveaux cookies
        (0, cookies_1.setAuthCookies)(res, refreshed.session);
        res.json({ user: refreshed.session.user });
    }
    catch (err) {
        console.error('Me route error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
